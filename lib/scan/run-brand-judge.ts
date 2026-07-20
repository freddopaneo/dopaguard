import { createAdminClient } from "@/lib/supabase/admin";
import { judgeWithTruthSheet, type RecommendationPosition } from "./anomaly-judge";
import { judgeCompetitorResponse } from "./competitor-judge";
import { getIsoWeek } from "./iso-week";
import { mapWithConcurrency } from "./concurrency";
import { sendCriticalAlertEmail, sendWeeklyDigestEmail } from "@/lib/email/resend";
import { getAppUrl } from "@/lib/app-url";

const CONCURRENCY = 3;
const SEVERITY_RANK: Record<string, number> = { critical: 0, major: 1, minor: 2 };

export const RECOMMENDATION_SCORES: Record<RecommendationPosition, number> = {
  recommended: 100,
  neutral: 60,
  not_mentioned: 40,
  competitor_preferred: 0,
};

export interface BrandForJudge {
  id: string;
  name: string;
  ownerId: string;
}

export interface BrandJudgeSummary {
  brandId: string;
  responsesJudged: number;
  errors: number;
}

// Juge les réponses brutes déjà stockées par runBrandScan (CDC 6.4) : anomalies
// détectées via la fiche de vérité, puis score hebdomadaire agrégé.
//
// `silent` (utilisé uniquement pour la toute première analyse, déclenchée à la fin
// de l'onboarding) : les anomalies et le score sont bien enregistrés -- seuls les
// emails (alerte critique + bilan hebdomadaire) sont sautés, pour ne pas alerter un
// client qui n'a même pas encore vu son tableau de bord une première fois. Décision
// de Frédéric : les alertes "immédiates" du CDC 6.5 reprennent normalement dès le
// cycle hebdomadaire suivant.
export async function runBrandJudge(brand: BrandForJudge, options?: { silent?: boolean }): Promise<BrandJudgeSummary> {
  const silent = options?.silent ?? false;
  const supabase = createAdminClient();
  const { week, year } = getIsoWeek(new Date());

  const { data: truthSheetRow } = await supabase
    .from("truth_sheets")
    .select(
      "legal_status, offering, pricing_facts, key_people, differentiators, known_competitors, forbidden_claims, opening_hours, address, official_links, certifications"
    )
    .eq("brand_id", brand.id)
    .maybeSingle();

  if (!truthSheetRow) {
    try {
      await supabase.from("error_logs").insert({
        source: "weekly-judge",
        brand_id: brand.id,
        message: "Fiche de vérité absente : jugement impossible.",
        context: {},
      });
    } catch {
      // Le logging ne doit jamais interrompre le traitement des autres marques.
    }
    return { brandId: brand.id, responsesJudged: 0, errors: 0 };
  }

  const truthSheet = {
    legalStatus: truthSheetRow.legal_status,
    offering: truthSheetRow.offering,
    pricingFacts: truthSheetRow.pricing_facts,
    keyPeople: truthSheetRow.key_people,
    differentiators: truthSheetRow.differentiators,
    knownCompetitors: truthSheetRow.known_competitors,
    forbiddenClaims: truthSheetRow.forbidden_claims,
    openingHours: truthSheetRow.opening_hours,
    address: truthSheetRow.address,
    officialLinks: truthSheetRow.official_links,
    certifications: truthSheetRow.certifications,
  };

  const { data: attachmentRows } = await supabase
    .from("truth_sheet_attachments")
    .select("label, file_name, extracted_text")
    .eq("brand_id", brand.id)
    .not("extracted_text", "is", null)
    .order("created_at", { ascending: false })
    .limit(3);

  const attachments = (attachmentRows ?? []).map((a) => ({
    label: a.label,
    fileName: a.file_name,
    extractedText: a.extracted_text as string,
  }));

  const { data: unjudged } = await supabase
    .from("llm_responses")
    .select("id, response_text, llm_provider")
    .eq("brand_id", brand.id)
    .eq("week_number", week)
    .eq("year", year)
    .eq("competitor_name", "")
    .is("judged_at", null)
    .not("response_text", "is", null);

  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select("email, notify_critical_alerts, notify_weekly_digest")
    .eq("id", brand.ownerId)
    .maybeSingle();
  const ownerEmail = ownerProfile?.email ?? null;
  const notifyCriticalAlerts = ownerProfile?.notify_critical_alerts ?? true;
  const notifyWeeklyDigest = ownerProfile?.notify_weekly_digest ?? true;
  const dashboardUrl = `${getAppUrl()}/login`;

  let responsesJudged = 0;
  let errors = 0;

  await mapWithConcurrency(unjudged ?? [], CONCURRENCY, async (response) => {
    try {
      const result = await judgeWithTruthSheet(brand.name, truthSheet, response.response_text as string, attachments);

      if (result.anomalies.length > 0) {
        const { error: anomaliesError } = await supabase.from("anomalies").insert(
          result.anomalies.map((a) => ({
            brand_id: brand.id,
            llm_response_id: response.id,
            type: a.type,
            severity: a.severity,
            summary: a.summary,
            evidence: a.evidence,
            expected_truth: a.expectedTruth,
            recommended_action: a.recommendedAction,
          }))
        );
        if (anomaliesError) throw anomaliesError;

        if (!silent && ownerEmail && notifyCriticalAlerts) {
          for (const anomaly of result.anomalies.filter((a) => a.severity === "critical")) {
            try {
              await sendCriticalAlertEmail({
                to: ownerEmail,
                brandName: brand.name,
                anomaly: { type: anomaly.type, summary: anomaly.summary, evidence: anomaly.evidence },
                llmProvider: response.llm_provider,
                dashboardUrl,
              });
            } catch (emailError) {
              const message = emailError instanceof Error ? emailError.message : String(emailError);
              try {
                await supabase.from("error_logs").insert({ source: "weekly-alert", brand_id: brand.id, message, context: {} });
              } catch {
                // Le logging ne doit jamais interrompre le jugement.
              }
            }
          }
        }
      }

      const { error: updateError } = await supabase
        .from("llm_responses")
        .update({
          judged_at: new Date().toISOString(),
          sentiment_score: result.sentimentScore,
          accuracy_score: result.accuracyScore,
          recommendation_position: result.recommendationPosition,
        })
        .eq("id", response.id);
      if (updateError) throw updateError;

      const { error: usageError } = await supabase.from("api_usage").insert({
        brand_id: brand.id,
        provider: "anthropic",
        tokens_in: result.tokensIn,
        tokens_out: result.tokensOut,
        estimated_cost_eur: result.estimatedCostEur,
      });
      if (usageError) throw usageError;

      responsesJudged++;
    } catch (error) {
      errors++;
      const message = error instanceof Error ? error.message : String(error);
      try {
        await supabase.from("error_logs").insert({
          source: "weekly-judge",
          brand_id: brand.id,
          message,
          context: { llmResponseId: response.id },
        });
      } catch {
        // Le logging ne doit jamais interrompre le jugement des autres réponses.
      }
    }
  });

  await updateWeeklyScore(
    supabase,
    { id: brand.id, name: brand.name, ownerEmail, notifyWeeklyDigest: notifyWeeklyDigest && !silent, dashboardUrl },
    week,
    year
  );

  return { brandId: brand.id, responsesJudged, errors };
}

function weightedScore(r: {
  sentiment_score: number | null;
  accuracy_score: number | null;
  recommendation_position: string | null;
}): number {
  const sentiment = r.sentiment_score ?? 50;
  const accuracy = r.accuracy_score ?? 50;
  const position = RECOMMENDATION_SCORES[(r.recommendation_position as RecommendationPosition) ?? "neutral"] ?? 60;
  return accuracy * 0.5 + sentiment * 0.3 + position * 0.2;
}

async function updateWeeklyScore(
  supabase: ReturnType<typeof createAdminClient>,
  brand: { id: string; name: string; ownerEmail: string | null; notifyWeeklyDigest: boolean; dashboardUrl: string },
  week: number,
  year: number
) {
  const { data: judgedResponses } = await supabase
    .from("llm_responses")
    .select("id, llm_provider, sentiment_score, accuracy_score, recommendation_position")
    .eq("brand_id", brand.id)
    .eq("week_number", week)
    .eq("year", year)
    .eq("competitor_name", "")
    .not("judged_at", "is", null);

  if (!judgedResponses || judgedResponses.length === 0) return;

  const responseIds = judgedResponses.map((r) => r.id);
  const { data: anomaliesForWeek } = await supabase
    .from("anomalies")
    .select("type, severity, summary")
    .in("llm_response_id", responseIds);

  const anomaliesCount = { critical: 0, major: 0, minor: 0 };
  for (const anomaly of anomaliesForWeek ?? []) {
    if (anomaly.severity in anomaliesCount) {
      anomaliesCount[anomaly.severity as keyof typeof anomaliesCount]++;
    }
  }

  const globalScore = judgedResponses.reduce((sum, r) => sum + weightedScore(r), 0) / judgedResponses.length;

  const byProvider: Record<string, { total: number; count: number }> = {};
  for (const r of judgedResponses) {
    const key = r.llm_provider;
    if (!byProvider[key]) byProvider[key] = { total: 0, count: 0 };
    byProvider[key].total += weightedScore(r);
    byProvider[key].count++;
  }
  const scoreByProvider: Record<string, number> = {};
  for (const [provider, { total, count }] of Object.entries(byProvider)) {
    scoreByProvider[provider] = Math.round(total / count);
  }

  const roundedGlobalScore = Math.round(globalScore);

  const { data: existingScore } = await supabase
    .from("scores")
    .select("digest_sent_at")
    .eq("brand_id", brand.id)
    .eq("week_number", week)
    .eq("year", year)
    .eq("competitor_name", "")
    .maybeSingle();

  await supabase.from("scores").upsert(
    {
      brand_id: brand.id,
      week_number: week,
      year,
      competitor_name: "",
      global_score: roundedGlobalScore,
      score_by_provider: scoreByProvider,
      anomalies_count: anomaliesCount,
    },
    { onConflict: "brand_id,week_number,year,competitor_name" }
  );

  if (existingScore?.digest_sent_at || !brand.ownerEmail || !brand.notifyWeeklyDigest) return;

  const { data: recentScores } = await supabase
    .from("scores")
    .select("week_number, year, global_score")
    .eq("brand_id", brand.id)
    .eq("competitor_name", "")
    .order("year", { ascending: false })
    .order("week_number", { ascending: false })
    .limit(2);

  const previousScore =
    (recentScores ?? []).find((s) => !(s.week_number === week && s.year === year))?.global_score ?? null;

  const topAnomalies = (anomaliesForWeek ?? [])
    .slice()
    .sort((a, b) => (SEVERITY_RANK[a.severity] ?? 3) - (SEVERITY_RANK[b.severity] ?? 3))
    .slice(0, 3)
    .map((a) => ({ type: a.type, severity: a.severity, summary: a.summary ?? "" }));

  try {
    await sendWeeklyDigestEmail({
      to: brand.ownerEmail,
      brandName: brand.name,
      score: roundedGlobalScore,
      previousScore,
      topAnomalies,
      dashboardUrl: brand.dashboardUrl,
    });
    await supabase
      .from("scores")
      .update({ digest_sent_at: new Date().toISOString() })
      .eq("brand_id", brand.id)
      .eq("week_number", week)
      .eq("year", year)
      .eq("competitor_name", "");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await supabase.from("error_logs").insert({ source: "weekly-alert", brand_id: brand.id, message, context: {} });
    } catch {
      // Le logging ne doit jamais interrompre le cycle.
    }
  }
}

export interface CompetitorJudgeSummary {
  brandId: string;
  responsesJudged: number;
  errors: number;
}

// Score simplifié pour un concurrent (pas de fiche de vérité, donc pas d'exactitude
// possible) : uniquement ton (60 %) et position de recommandation (40 %) -- étiqueté
// côté dashboard comme une estimation, pas une note comparable à l'identique.
function competitorWeightedScore(r: { sentiment_score: number | null; recommendation_position: string | null }): number {
  const sentiment = r.sentiment_score ?? 50;
  const position = RECOMMENDATION_SCORES[(r.recommendation_position as RecommendationPosition) ?? "neutral"] ?? 60;
  return sentiment * 0.6 + position * 0.4;
}

// Juge les réponses brutes du concurrent suivi (cf. runCompetitorScan) -- aucune
// détection d'anomalie ni email, seulement un score hebdomadaire comparable au score
// de la marque elle-même sur la page Vue d'ensemble.
export async function runCompetitorJudge(brandId: string, competitorName: string): Promise<CompetitorJudgeSummary> {
  const supabase = createAdminClient();
  const { week, year } = getIsoWeek(new Date());

  const { data: unjudged } = await supabase
    .from("llm_responses")
    .select("id, response_text, llm_provider")
    .eq("brand_id", brandId)
    .eq("week_number", week)
    .eq("year", year)
    .eq("competitor_name", competitorName)
    .is("judged_at", null)
    .not("response_text", "is", null);

  let responsesJudged = 0;
  let errors = 0;

  await mapWithConcurrency(unjudged ?? [], CONCURRENCY, async (response) => {
    try {
      const result = await judgeCompetitorResponse(competitorName, response.response_text as string);

      const { error: updateError } = await supabase
        .from("llm_responses")
        .update({
          judged_at: new Date().toISOString(),
          sentiment_score: result.sentimentScore,
          recommendation_position: result.recommendationPosition,
        })
        .eq("id", response.id);
      if (updateError) throw updateError;

      const { error: usageError } = await supabase.from("api_usage").insert({
        brand_id: brandId,
        provider: "anthropic",
        tokens_in: result.tokensIn,
        tokens_out: result.tokensOut,
        estimated_cost_eur: result.estimatedCostEur,
      });
      if (usageError) throw usageError;

      responsesJudged++;
    } catch (error) {
      errors++;
      const message = error instanceof Error ? error.message : String(error);
      try {
        await supabase.from("error_logs").insert({
          source: "weekly-judge-competitor",
          brand_id: brandId,
          message,
          context: { llmResponseId: response.id, competitorName },
        });
      } catch {
        // Le logging ne doit jamais interrompre le jugement des autres réponses.
      }
    }
  });

  const { data: judgedResponses } = await supabase
    .from("llm_responses")
    .select("llm_provider, sentiment_score, recommendation_position")
    .eq("brand_id", brandId)
    .eq("week_number", week)
    .eq("year", year)
    .eq("competitor_name", competitorName)
    .not("judged_at", "is", null);

  if (judgedResponses && judgedResponses.length > 0) {
    const globalScore = judgedResponses.reduce((sum, r) => sum + competitorWeightedScore(r), 0) / judgedResponses.length;

    const byProvider: Record<string, { total: number; count: number }> = {};
    for (const r of judgedResponses) {
      const key = r.llm_provider;
      if (!byProvider[key]) byProvider[key] = { total: 0, count: 0 };
      byProvider[key].total += competitorWeightedScore(r);
      byProvider[key].count++;
    }
    const scoreByProvider: Record<string, number> = {};
    for (const [provider, { total, count }] of Object.entries(byProvider)) {
      scoreByProvider[provider] = Math.round(total / count);
    }

    await supabase.from("scores").upsert(
      {
        brand_id: brandId,
        week_number: week,
        year,
        competitor_name: competitorName,
        global_score: Math.round(globalScore),
        score_by_provider: scoreByProvider,
        anomalies_count: null,
      },
      { onConflict: "brand_id,week_number,year,competitor_name" }
    );
  }

  return { brandId, responsesJudged, errors };
}
