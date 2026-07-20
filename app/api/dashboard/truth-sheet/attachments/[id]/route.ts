import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  // Le client de session applique RLS : ne renvoie la ligne que si la marque
  // associée appartient bien à l'utilisateur connecté.
  const { data: attachment } = await supabase
    .from("truth_sheet_attachments")
    .select("id, file_path")
    .eq("id", params.id)
    .maybeSingle();

  if (!attachment) {
    return NextResponse.json({ error: "Pièce jointe introuvable." }, { status: 404 });
  }

  try {
    const admin = createAdminClient();
    const { error: removeError } = await admin.storage.from("truth-sheet-attachments").remove([attachment.file_path]);
    if (removeError) throw removeError;

    const { error: deleteError } = await admin.from("truth_sheet_attachments").delete().eq("id", params.id);
    if (deleteError) throw deleteError;

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin.from("error_logs").insert({ source: "truth-sheet-attachment-delete", message, context: { id: params.id } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
