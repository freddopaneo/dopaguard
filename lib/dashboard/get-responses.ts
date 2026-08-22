import type { createServerSupabaseClient } from "@/lib/supabase/server";

export interface WeekOption {
  week: number;
  year: number;
}

export interface WeekResponse {
  id: string;
  provider: string;
  category: string;
  responseText: string | null;
  createdAt: string;
}

// Requête légère : seulement week_number/year, jamais response_text -- sûr même
// si l'historique s'étend sur des dizaines de semaines.
export async function getAvailableWeeks(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  brandId: string
): Promise<WeekOption[]> {
  const { data } = await supabase
    .from("llm_responses")
    .select("week_number, year")
    .eq("brand_id", brandId)
    .eq("competitor_name", "");

  const seen = new Set<string>();
  const weeks: WeekOption[] = [];
  for (const row of data ?? []) {
    const key = `${row.year}-${row.week_number}`;
    if (seen.has(key)) continue;
    seen.add(key);
    weeks.push({ week: row.week_number, year: row.year });
  }
  return weeks.sort((a, b) => b.year - a.year || b.week - a.week);
}

// Requête scopée à UNE semaine : volume borné (au plus 30 prompts x 5 fournisseurs).
export async function getResponsesForWeek(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  brandId: string,
  week: number,
  year: number
): Promise<WeekResponse[]> {
  const { data } = await supabase
    .from("llm_responses")
    .select("id, llm_provider, response_text, created_at, prompt_templates(category)")
    .eq("brand_id", brandId)
    .eq("week_number", week)
    .eq("year", year)
    .eq("competitor_name", "");

  return (data ?? []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    provider: row.llm_provider as string,
    category: (row.prompt_templates as { category: string } | null)?.category ?? "inconnue",
    responseText: row.response_text as string | null,
    createdAt: row.created_at as string,
  }));
}
