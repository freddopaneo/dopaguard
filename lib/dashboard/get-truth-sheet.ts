import type { createServerSupabaseClient } from "@/lib/supabase/server";

export interface TruthSheetRecord {
  legalStatus: string;
  offering: string;
  pricingFacts: string;
  keyPeople: string;
  differentiators: string;
  knownCompetitors: string[];
  forbiddenClaims: string;
  lastValidatedAt: string | null;
}

const EMPTY: TruthSheetRecord = {
  legalStatus: "",
  offering: "",
  pricingFacts: "",
  keyPeople: "",
  differentiators: "",
  knownCompetitors: [],
  forbiddenClaims: "",
  lastValidatedAt: null,
};

// Charge la fiche déjà enregistrée -- ne déclenche jamais un nouveau brouillon IA
// (contrairement à l'onboarding), pour ne jamais écraser les modifications du client.
export async function getTruthSheet(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  brandId: string
): Promise<TruthSheetRecord> {
  const { data } = await supabase
    .from("truth_sheets")
    .select("legal_status, offering, pricing_facts, key_people, differentiators, known_competitors, forbidden_claims, last_validated_at")
    .eq("brand_id", brandId)
    .maybeSingle();

  if (!data) return EMPTY;

  return {
    legalStatus: data.legal_status ?? "",
    offering: data.offering ?? "",
    pricingFacts: data.pricing_facts ?? "",
    keyPeople: data.key_people ?? "",
    differentiators: data.differentiators ?? "",
    knownCompetitors: data.known_competitors ?? [],
    forbiddenClaims: data.forbidden_claims ?? "",
    lastValidatedAt: data.last_validated_at,
  };
}
