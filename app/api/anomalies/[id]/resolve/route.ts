import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const idSchema = z.string().uuid();

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const parsedId = idSchema.safeParse(params.id);
  if (!parsedId.success) {
    return NextResponse.json({ error: "Identifiant invalide." }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  try {
    // La sécurité RLS (policy "anomalies_update_status_own") garantit qu'on ne peut
    // toucher qu'aux anomalies de ses propres marques -- aucune vérification manuelle
    // de propriété nécessaire ici : si la ligne n'appartient pas à l'utilisateur,
    // la mise à jour ne touche simplement aucune ligne.
    const { data, error } = await supabase
      .from("anomalies")
      .update({ status: "resolved" })
      .eq("id", parsedId.data)
      .select("id, status")
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: "Anomalie introuvable." }, { status: 404 });
    }

    return NextResponse.json({ id: data.id, status: data.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin
        .from("error_logs")
        .insert({ source: "anomalies-resolve", message, context: { userId: user.id, anomalyId: parsedId.data } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
