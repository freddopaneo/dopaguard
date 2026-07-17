import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const notificationsRequestSchema = z.object({
  notifyCriticalAlerts: z.boolean(),
  notifyWeeklyDigest: z.boolean(),
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

  const parsed = notificationsRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Requête invalide." }, { status: 400 });
  }

  try {
    // La sécurité RLS + la restriction de colonnes (migration 0021) garantissent qu'on ne
    // peut toucher qu'à ses propres préférences, jamais aux autres champs de profiles.
    const { data, error } = await supabase
      .from("profiles")
      .update({
        notify_critical_alerts: parsed.data.notifyCriticalAlerts,
        notify_weekly_digest: parsed.data.notifyWeeklyDigest,
      })
      .eq("id", user.id)
      .select("notify_critical_alerts, notify_weekly_digest")
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: "Profil introuvable." }, { status: 404 });
    }

    return NextResponse.json({
      notifyCriticalAlerts: data.notify_critical_alerts,
      notifyWeeklyDigest: data.notify_weekly_digest,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin.from("error_logs").insert({ source: "settings-notifications-save", message, context: { userId: user.id } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
