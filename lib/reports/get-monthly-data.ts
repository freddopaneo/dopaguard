import type { AdminClient } from "@/lib/supabase/admin";
import { sortAnomalies } from "@/lib/anomalies";
import { ALL_PROVIDERS, PROVIDER_ORDER } from "@/lib/providers";

export interface AnomalyRow {
  id: string;
  type: string;
  severity: string;
  summary: string | null;
  evidence: string | null;
  recommended_action: string | null;
  status: string;
  created_at: string;
  llmProvider: string | null;
}

export interface Verbatim {
  text: string;
  provider: string;
  kind: "anomaly" | "positive";
}

export interface MonthlyReportData {
  monthLabel: string;
  providers: readonly string[];
  score: {
    current: number | null;
    previous: number | null;
    byProvider: Record<string, number>;
    weeksIncluded: number;
  };
  anomalies: {
    resolved: AnomalyRow[];
    open: AnomalyRow[];
  };
  verbatims: Verbatim[];
}

function monthRange(month: number, year: number): { start: string; end: string } {
  return {
    start: new Date(Date.UTC(year, month - 1, 1)).toISOString(),
    end: new Date(Date.UTC(year, month, 1)).toISOString(),
  };
}

function previousMonth(month: number, year: number): { month: number; year: number } {
  return month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year };
}

function average(values: number[]): number | null {
  if (values.length === 0) return null;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

async function getAverageScoreForMonth(
  supabase: AdminClient,
  brandId: string,
  month: number,
  year: number
): Promise<{ current: number | null; byProvider: Record<string, number>; weeksIncluded: number }> {
  const { start, end } = monthRange(month, year);
  const { data } = await supabase
    .from("scores")
    .select("global_score, score_by_provider")
    .eq("brand_id", brandId)
    .gte("created_at", start)
    .lt("created_at", end);

  const rows = data ?? [];
  const scores = rows.map((r) => Number(r.global_score)).filter((n) => !Number.isNaN(n));

  const byProviderSums: Record<string, { total: number; count: number }> = {};
  for (const row of rows) {
    const byProvider = (row.score_by_provider ?? {}) as Record<string, number>;
    for (const [provider, value] of Object.entries(byProvider)) {
      if (!byProviderSums[provider]) byProviderSums[provider] = { total: 0, count: 0 };
      byProviderSums[provider].total += Number(value);
      byProviderSums[provider].count++;
    }
  }
  const byProvider: Record<string, number> = {};
  for (const [provider, { total, count }] of Object.entries(byProviderSums)) {
    byProvider[provider] = Math.round(total / count);
  }

  return { current: average(scores), byProvider, weeksIncluded: rows.length };
}

export async function getMonthlyReportData(
  supabase: AdminClient,
  params: { brandId: string; plan: string | null; month: number; year: number }
): Promise<MonthlyReportData> {
  const { brandId, plan, month, year } = params;
  const { start, end } = monthRange(month, year);
  const prev = previousMonth(month, year);

  const [currentScore, previousScoreData, anomaliesResult, responsesResult] = await Promise.all([
    getAverageScoreForMonth(supabase, brandId, month, year),
    getAverageScoreForMonth(supabase, brandId, prev.month, prev.year),
    supabase
      .from("anomalies")
      .select("id, type, severity, summary, evidence, recommended_action, status, created_at, llm_responses(llm_provider)")
      .eq("brand_id", brandId)
      .gte("created_at", start)
      .lt("created_at", end),
    supabase
      .from("llm_responses")
      .select("response_text, llm_provider, accuracy_score")
      .eq("brand_id", brandId)
      .gte("created_at", start)
      .lt("created_at", end)
      .not("judged_at", "is", null)
      .order("accuracy_score", { ascending: false })
      .limit(5),
  ]);

  const rawAnomalies = (anomaliesResult.data ?? []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    type: row.type as string,
    severity: row.severity as string,
    summary: row.summary as string | null,
    evidence: row.evidence as string | null,
    recommended_action: row.recommended_action as string | null,
    status: row.status as string,
    created_at: row.created_at as string,
    llmProvider: (row.llm_responses as { llm_provider: string } | null)?.llm_provider ?? null,
  }));

  const allAnomalies = sortAnomalies(rawAnomalies);
  const resolved = allAnomalies.filter((a) => a.status === "resolved");
  const open = allAnomalies.filter((a) => a.status !== "resolved");

  const verbatims: Verbatim[] = allAnomalies
    .slice(0, 5)
    .filter((a) => a.evidence)
    .map((a) => ({ text: a.evidence as string, provider: a.llmProvider ?? "", kind: "anomaly" as const }));

  if (verbatims.length < 3) {
    for (const r of responsesResult.data ?? []) {
      if (verbatims.length >= 5) break;
      if (!r.response_text) continue;
      verbatims.push({ text: r.response_text.slice(0, 220), provider: r.llm_provider, kind: "positive" });
    }
  }

  const providers = plan === "essentiel" ? PROVIDER_ORDER : ALL_PROVIDERS;

  return {
    monthLabel: new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
    providers,
    score: {
      current: currentScore.current,
      previous: previousScoreData.current,
      byProvider: currentScore.byProvider,
      weeksIncluded: currentScore.weeksIncluded,
    },
    anomalies: { resolved, open },
    verbatims,
  };
}
