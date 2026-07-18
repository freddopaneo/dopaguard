import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const setPasswordSchema = z.object({
  password: z.string().min(8, "8 caractères minimum."),
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

  const parsed = setPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Requête invalide." }, { status: 400 });
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });

  if (error) {
    try {
      const admin = createAdminClient();
      await admin
        .from("error_logs")
        .insert({ source: "auth-set-password", message: error.message, context: { userId: user.id } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Impossible d'enregistrer le mot de passe. Réessayez plus tard." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
