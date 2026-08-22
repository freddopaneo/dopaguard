import type { createServerSupabaseClient } from "@/lib/supabase/server";

export type OnboardingStep = 1 | 2 | 3 | 4 | "done";

// Détermine à quelle étape de l'assistant reprendre pour une marque déjà créée
// (infos marque déjà faites, donc jamais l'étape 1 ici) -- utilisé aussi bien pour
// la reprise générale (/onboarding) que pour reprendre une marque précise depuis
// l'espace agence (/dashboard/marques/nouvelle?brandId=...).
export async function getOnboardingResumeStep(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  brand: { id: string; onboarding_completed_at: string | null }
): Promise<OnboardingStep> {
  if (brand.onboarding_completed_at) return "done";

  const { data: truthSheet } = await supabase.from("truth_sheets").select("id").eq("brand_id", brand.id).maybeSingle();

  if (!truthSheet) return 2;

  const { count } = await supabase
    .from("brand_prompts")
    .select("id", { count: "exact", head: true })
    .eq("brand_id", brand.id)
    .eq("enabled", true);

  return count && count > 0 ? 4 : 3;
}
