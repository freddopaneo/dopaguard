import type { createServerSupabaseClient } from "@/lib/supabase/server";

export const SELECTED_BRAND_COOKIE = "dg_selected_brand";

export interface CurrentBrand {
  id: string;
  name: string;
  status: string;
  onboarding_completed_at: string | null;
  agency_id: string | null;
}

export interface BrandListItem {
  id: string;
  name: string;
  status: string;
  plan: string | null;
  agency_id: string | null;
  onboarding_completed_at: string | null;
  created_at: string;
}

export async function getUserBrands(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  userId: string
): Promise<BrandListItem[]> {
  const { data } = await supabase
    .from("brands")
    .select("id, name, status, plan, agency_id, onboarding_completed_at, created_at")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  return data ?? [];
}

// Résout la marque "courante" du dashboard : la marque sélectionnée (cookie) si elle
// appartient bien au compte, sinon la plus récente -- comportement strictement
// identique à l'ancien code pour un compte à une seule marque (le cookie n'est jamais
// posé tant que le sélecteur multi-marques ne s'affiche pas, réservé au plan Agence).
export async function getCurrentBrand(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  userId: string,
  selectedBrandId: string | null
): Promise<CurrentBrand | null> {
  const brands = await getUserBrands(supabase, userId);
  if (brands.length === 0) return null;

  const selected = selectedBrandId ? brands.find((b) => b.id === selectedBrandId) : undefined;
  return selected ?? brands[0];
}
