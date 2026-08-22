import type { createServerSupabaseClient } from "@/lib/supabase/server";

export interface TruthSheetRecord {
  legalStatus: string;
  offering: string;
  pricingFacts: string;
  keyPeople: string;
  differentiators: string;
  knownCompetitors: string[];
  forbiddenClaims: string;
  openingHours: string;
  address: string;
  officialLinks: string;
  certifications: string;
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
  openingHours: "",
  address: "",
  officialLinks: "",
  certifications: "",
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
    .select(
      "legal_status, offering, pricing_facts, key_people, differentiators, known_competitors, forbidden_claims, opening_hours, address, official_links, certifications, last_validated_at"
    )
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
    openingHours: data.opening_hours ?? "",
    address: data.address ?? "",
    officialLinks: data.official_links ?? "",
    certifications: data.certifications ?? "",
    lastValidatedAt: data.last_validated_at,
  };
}
