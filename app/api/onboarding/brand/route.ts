import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SECTORS } from "@/lib/onboarding/sectors";

const brandRequestSchema = z.object({
  name: z.string().trim().min(1, "Nom de marque requis.").max(200),
  website: z.string().trim().min(1, "Site web requis."),
  sector: z.enum(SECTORS),
  country: z.string().trim().min(2).max(2).default("FR"),
});

function normalizeWebsite(website: string): string {
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

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

  const parsed = brandRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Requête invalide." }, { status: 400 });
  }

  const { name, sector, country } = parsed.data;
  const website = normalizeWebsite(parsed.data.website);
  const MAX_BRANDS_PER_ACCOUNT = 10;

  try {
    const admin = createAdminClient();
    const { data: subscription } = await admin
      .from("subscriptions")
      .select("plan, brand_id")
      .eq("profile_id", user.id)
      .maybeSingle();

    const { count: brandCount } = await admin
      .from("brands")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", user.id);

    if ((brandCount ?? 0) >= MAX_BRANDS_PER_ACCOUNT) {
      return NextResponse.json({ error: "Limite de 10 marques atteinte pour ce compte." }, { status: 400 });
    }

    // Compte Agence : rattache automatiquement la marque à l'agence unique du compte
    // (créée si elle n'existe pas encore) pour que les réglages white-label du rapport
    // PDF s'appliquent à toutes ses marques sans étape manuelle.
    let agencyId: string | null = null;
    if (subscription?.plan === "agence") {
      const { data: existingAgency } = await admin.from("agencies").select("id").eq("owner_id", user.id).maybeSingle();
      if (existingAgency) {
        agencyId = existingAgency.id;
      } else {
        const { data: newAgency, error: agencyError } = await admin
          .from("agencies")
          .insert({ owner_id: user.id, name })
          .select("id")
          .single();
        if (agencyError || !newAgency) throw agencyError || new Error("Échec de création de l'agence.");
        agencyId = newAgency.id;
      }
    }

    const { data: brand, error: insertError } = await supabase
      .from("brands")
      .insert({
        owner_id: user.id,
        name,
        website,
        sector,
        country,
        status: "trial",
        plan: subscription?.plan ?? null,
        agency_id: agencyId,
      })
      .select("id")
      .single();

    if (insertError || !brand) throw insertError || new Error("Échec de création de la marque.");

    // Ne repointe subscriptions.brand_id que s'il n'est pas déjà lié à une marque --
    // évite d'écraser le lien vers une marque déjà configurée lors de l'ajout d'une
    // 2e à 10e marque (compte Agence).
    if (subscription && !subscription.brand_id) {
      const { error: linkError } = await admin.from("subscriptions").update({ brand_id: brand.id }).eq("profile_id", user.id);
      if (linkError) throw linkError;
    }

    return NextResponse.json({ brandId: brand.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin.from("error_logs").insert({ source: "onboarding-brand", message, context: { userId: user.id } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
