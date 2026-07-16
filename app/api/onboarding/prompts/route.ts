import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const promptsRequestSchema = z.object({
  brandId: z.string().uuid(),
  promptTemplateIds: z.array(z.string().uuid()).min(1, "Choisissez au moins un prompt."),
});

const CAP_ESSENTIEL = 20;
const CAP_OTHER = 30;

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

  const parsed = promptsRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Requête invalide." }, { status: 400 });
  }

  const { brandId, promptTemplateIds } = parsed.data;

  const { data: brand } = await supabase.from("brands").select("plan").eq("id", brandId).maybeSingle();
  if (!brand) {
    return NextResponse.json({ error: "Marque introuvable." }, { status: 404 });
  }

  const cap = brand.plan === "essentiel" ? CAP_ESSENTIEL : CAP_OTHER;
  if (promptTemplateIds.length > cap) {
    return NextResponse.json({ error: `Votre offre autorise au maximum ${cap} prompts.` }, { status: 400 });
  }

  try {
    const { error: deleteError } = await supabase.from("brand_prompts").delete().eq("brand_id", brandId);
    if (deleteError) throw deleteError;

    const { error: insertError } = await supabase
      .from("brand_prompts")
      .insert(promptTemplateIds.map((promptTemplateId) => ({ brand_id: brandId, prompt_template_id: promptTemplateId, enabled: true })));
    if (insertError) throw insertError;

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin.from("error_logs").insert({ source: "onboarding-prompts", message, context: { brandId } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
