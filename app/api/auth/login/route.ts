import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendLoginLink } from "@/lib/auth/send-login-link";

const loginRequestSchema = z.object({
  email: z.string().trim().email("Email invalide."),
});

const GENERIC_MESSAGE = "Si un compte existe avec cet email, un lien de connexion vient de vous être envoyé.";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = loginRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Requête invalide." }, { status: 400 });
  }

  const { email } = parsed.data;
  const supabase = createAdminClient();

  // Réponse générique dans tous les cas : ne révèle jamais si un compte existe pour cet email.
  try {
    const { data: profile } = await supabase.from("profiles").select("id").eq("email", email).maybeSingle();
    if (profile) {
      await sendLoginLink(email);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await supabase.from("error_logs").insert({ source: "auth-login", message, context: { email } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
  }

  return NextResponse.json({ message: GENERIC_MESSAGE });
}
