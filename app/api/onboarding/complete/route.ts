import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

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
