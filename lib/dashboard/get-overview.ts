import type { createServerSupabaseClient } from "@/lib/supabase/server";

export interface WeeklyScorePoint {
  weekNumber: number;
  year: number;
  globalScore: number | null;
  scoreByProvider: Record<string, number>;
}

export interface DashboardOverview {
  scores: WeeklyScorePoint[];
  openAnomaliesCount: number;
}

// Note : scores.global_score est une colonne numeric Postgres, renvoyée par Supabase
// sous forme de chaîne -- on la caste ici une fois pour toutes.
function toScoreByProvider(raw: unknown): Record<string, number> {
  if (!raw || typeof raw !== "object") return {};
  return Object.fromEntries(Object.entries(raw as Record<string, unknown>).map(([provider, value]) => [provider, Number(value)]));
}

export async function getDashboardOverview(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  brandId: string
): Promise<DashboardOverview> {
  const [scoresResult, anomaliesResult] = await Promise.all([
    supabase
      .from("scores")
      .select("week_number, year, global_score, score_by_provider")
      .eq("brand_id", brandId)
      .order("year", { ascending: false })
      .order("week_number", { ascending: false })
      .limit(12),
    supabase.from("anomalies").select("id", { count: "exact", head: true }).eq("brand_id", brandId).neq("status", "resolved"),
  ]);

  const scores: WeeklyScorePoint[] = (scoresResult.data ?? [])
    .map((row) => ({
      weekNumber: row.week_number,
      year: row.year,
      globalScore: row.global_score === null ? null : Number(row.global_score),
      scoreByProvider: toScoreByProvider(row.score_by_provider),
    }))
    .reverse();

  return {
    scores,
    openAnomaliesCount: anomaliesResult.count ?? 0,
  };
}
