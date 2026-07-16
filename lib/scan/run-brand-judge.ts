import { createAdminClient } from "@/lib/supabase/admin";
import { judgeWithTruthSheet, type RecommendationPosition } from "./anomaly-judge";
import { getIsoWeek } from "./iso-week";
import { mapWithConcurrency } from "./concurrency";

const CONCURRENCY = 3;

const RECOMMENDATION_SCORES: Record<RecommendationPosition, number> = {
  recommended: 100,
  neutral: 60,
  not_mentioned: 40,
  competitor_preferred: 0,
};

export interface BrandForJudge {
  id: string;
  name: string;
}

export interface BrandJudgeSummary {
  brandId: string;
  responsesJudged: number;
  errors: number;
}

// Juge les réponses brutes déjà stockées par runBrandScan (CDC 6.4) : anomalies
// détectées via la fiche de vérité, puis score hebdomadaire agrégé.
export async function runBrandJudge(brand: BrandForJudge): Promise<BrandJudgeSummary> {
  const supabase = createAdminClient();
  const { week, year } = getIsoWeek(new Date());

  const { data: truthSheetRow } = await supabase
    .from("truth_sheets")
    .select("legal_status, offering, pricing_facts, key_people, differentiators, known_competitors, forbidden_claims")
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
  };

  const { data: unjudged } = await supabase
    .from("llm_responses")
    .select("id, response_text")
    .eq("brand_id", brand.id)
    .eq("week_number", week)
    .eq("year", year)
    .is("judged_at", null)
    .not("response_text", "is", null);

  let responsesJudged = 0;
  let errors = 0;

  await mapWithConcurrency(unjudged ?? [], CONCURRENCY, async (response) => {
    try {
      const result = await judgeWithTruthSheet(brand.name, truthSheet, response.response_text as string);

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
          }))
        );
        if (anomaliesError) throw anomaliesError;
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

  await updateWeeklyScore(supabase, brand.id, week, year);

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
  brandId: string,
  week: number,
  year: number
) {
  const { data: judgedResponses } = await supabase
    .from("llm_responses")
    .select("id, llm_provider, sentiment_score, accuracy_score, recommendation_position")
    .eq("brand_id", brandId)
    .eq("week_number", week)
    .eq("year", year)
    .not("judged_at", "is", null);

  if (!judgedResponses || judgedResponses.length === 0) return;

  const responseIds = judgedResponses.map((r) => r.id);
  const { data: anomaliesForWeek } = await supabase.from("anomalies").select("severity").in("llm_response_id", responseIds);

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

  await supabase.from("scores").upsert(
    {
      brand_id: brandId,
      week_number: week,
      year,
      global_score: Math.round(globalScore),
      score_by_provider: scoreByProvider,
      anomalies_count: anomaliesCount,
    },
    { onConflict: "brand_id,week_number,year" }
  );
}
