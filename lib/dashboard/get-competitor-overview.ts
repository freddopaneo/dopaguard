import type { createServerSupabaseClient } from "@/lib/supabase/server";

export interface CompetitorOverview {
  competitorName: string;
  currentScore: number | null;
}

// Score simplifié (sans fiche de vérité pour le concurrent) -- cf. lib/scan/run-brand-judge.ts
// (runCompetitorJudge). Ne récupère que le score de la semaine la plus récente, pour
// une simple comparaison sur la Vue d'ensemble.
export async function getCompetitorOverview(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  brandId: string,
  competitorName: string
): Promise<CompetitorOverview> {
  const { data } = await supabase
    .from("scores")
    .select("global_score")
    .eq("brand_id", brandId)
    .eq("competitor_name", competitorName)
    .order("year", { ascending: false })
    .order("week_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  return {
    competitorName,
    currentScore: data?.global_score === undefined || data?.global_score === null ? null : Number(data.global_score),
  };
}
