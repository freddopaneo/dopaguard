import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const truthSheetRequestSchema = z.object({
  brandId: z.string().uuid(),
  legalStatus: z.string().trim().max(2000).default(""),
  offering: z.string().trim().max(2000).default(""),
  pricingFacts: z.string().trim().max(2000).default(""),
  keyPeople: z.string().trim().max(2000).default(""),
  differentiators: z.string().trim().max(2000).default(""),
  knownCompetitors: z.array(z.string().trim().max(200)).max(20).default([]),
  forbiddenClaims: z.string().trim().max(2000).default(""),
});

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = truthSheetRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Requête invalide." }, { status: 400 });
  }

  const { brandId, legalStatus, offering, pricingFacts, keyPeople, differentiators, knownCompetitors, forbiddenClaims } =
    parsed.data;

  try {
    const { error: upsertError } = await supabase.from("truth_sheets").upsert(
      {
        brand_id: brandId,
        legal_status: legalStatus,
        offering,
        pricing_facts: pricingFacts,
        key_people: keyPeople,
        differentiators,
        known_competitors: knownCompetitors,
        forbidden_claims: forbiddenClaims,
        last_validated_at: new Date().toISOString(),
      },
      { onConflict: "brand_id" }
    );
    if (upsertError) throw upsertError;

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin.from("error_logs").insert({ source: "onboarding-truth-sheet-save", message, context: { brandId } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
