import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { runBrandScan } from "@/lib/scan/run-brand-scan";
import { runBrandJudge } from "@/lib/scan/run-brand-judge";

// Peut prendre plusieurs minutes pour un plan Pro/Agence (5 IA × jusqu'à 30 prompts) --
// appelée séparément de /api/onboarding/complete, sans que le navigateur attende sa
// réponse (cf. commentaire dans ConfirmationStep.tsx). Même moteur que le cron
// hebdomadaire, aucun risque de double appel pour la même semaine ISO.
export const maxDuration = 300;

const requestSchema = z.object({
  brandId: z.string().uuid(),
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

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Vérifie la propriété via la session (jamais admin ici) avant de basculer sur
  // service_role pour l'analyse elle-même.
  const { data: owned } = await supabase.from("brands").select("id").eq("id", parsed.data.brandId).maybeSingle();
  if (!owned) {
    return NextResponse.json({ error: "Marque introuvable." }, { status: 404 });
  }

  const admin = createAdminClient();

  try {
    const { data: brand } = await admin
      .from("brands")
      .select("id, name, website, sector, plan, owner_id")
      .eq("id", parsed.data.brandId)
      .single();

    if (brand) {
      await runBrandScan(brand);
      await runBrandJudge({ id: brand.id, name: brand.name, ownerId: brand.owner_id });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await admin
        .from("error_logs")
        .insert({ source: "onboarding-first-scan", brand_id: parsed.data.brandId, message, context: {} });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
