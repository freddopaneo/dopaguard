import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendAccountDeletionConfirmationEmail, sendAccountDeletionNotificationEmail } from "@/lib/email/resend";

export async function POST() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  const { data: existing } = await supabase
    .from("account_deletion_requests")
    .select("id")
    .eq("profile_id", user.id)
    .is("processed_at", null)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "Une demande est déjà en cours." }, { status: 409 });
  }

  const { error: insertError } = await supabase.from("account_deletion_requests").insert({ profile_id: user.id });

  if (insertError) {
    try {
      const admin = createAdminClient();
      await admin
        .from("error_logs")
        .insert({ source: "account-delete-request", message: insertError.message, context: { userId: user.id } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }

  const clientEmail = user.email ?? "";
  try {
    await Promise.all([
      sendAccountDeletionConfirmationEmail({ to: clientEmail }),
      sendAccountDeletionNotificationEmail({ clientEmail }),
    ]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin
        .from("error_logs")
        .insert({ source: "account-delete-request-email", message, context: { userId: user.id } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client -- la demande est déjà enregistrée.
    }
  }

  return NextResponse.json({ ok: true });
}
