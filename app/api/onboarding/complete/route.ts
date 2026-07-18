import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { runBrandScan } from "@/lib/scan/run-brand-scan";
import { runBrandJudge } from "@/lib/scan/run-brand-judge";

export const maxDuration = 300;

const completeRequestSchema = z.object({
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

  const parsed = completeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  try {
    const { error: updateError } = await supabase
      .from("brands")
      .update({ onboarding_completed_at: new Date().toISOString() })
      .eq("id", parsed.data.brandId);
    if (updateError) throw updateError;

    // Déclenche la toute première analyse immédiatement, plutôt que d'attendre le
    // prochain passage du cron du lundi -- même moteur, aucun risque de double appel
    // (le cron ne rejoue jamais ce qui existe déjà pour la semaine ISO courante).
    // Non bloquant pour la confirmation elle-même : un échec ici est loggé mais
    // n'empêche jamais l'onboarding de se terminer.
    try {
      const admin = createAdminClient();
      const { data: brand } = await admin
        .from("brands")
        .select("id, name, website, sector, plan, owner_id")
        .eq("id", parsed.data.brandId)
        .single();

      if (brand) {
        await runBrandScan(brand);
        await runBrandJudge({ id: brand.id, name: brand.name, ownerId: brand.owner_id });
      }
    } catch (scanError) {
      const message = scanError instanceof Error ? scanError.message : String(scanError);
      try {
        const admin = createAdminClient();
        await admin
          .from("error_logs")
          .insert({ source: "onboarding-first-scan", brand_id: parsed.data.brandId, message, context: {} });
      } catch {
        // Le logging ne doit jamais empêcher de répondre au client.
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin
        .from("error_logs")
        .insert({ source: "onboarding-complete", message, context: { brandId: parsed.data.brandId } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
