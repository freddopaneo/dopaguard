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

  try {
    const admin = createAdminClient();
    const { data: subscription } = await admin
      .from("subscriptions")
      .select("plan")
      .eq("profile_id", user.id)
      .maybeSingle();

    const { data: brand, error: insertError } = await supabase
      .from("brands")
      .insert({ owner_id: user.id, name, website, sector, country, status: "trial", plan: subscription?.plan ?? null })
      .select("id")
      .single();

    if (insertError || !brand) throw insertError || new Error("Échec de création de la marque.");

    const { error: linkError } = await admin.from("subscriptions").update({ brand_id: brand.id }).eq("profile_id", user.id);
    if (linkError) throw linkError;

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
