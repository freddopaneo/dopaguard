import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  ATTACHMENT_ALLOWED_TYPES,
  ATTACHMENT_MAX_SIZE_BYTES,
  extractAttachmentFactsFromBuffer,
} from "@/lib/truth-sheet/attachments";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const brandId = formData.get("brandId");
  const label = formData.get("label");
  const file = formData.get("file");

  if (typeof brandId !== "string" || !brandId) {
    return NextResponse.json({ error: "Marque manquante." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier fourni." }, { status: 400 });
  }

  const extension = ATTACHMENT_ALLOWED_TYPES[file.type];
  if (!extension) {
    return NextResponse.json({ error: "Format non supporté (PDF, PNG ou JPG uniquement)." }, { status: 400 });
  }
  if (file.size > ATTACHMENT_MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "Fichier trop volumineux (8 Mo maximum)." }, { status: 400 });
  }

  // Vérifie que la marque appartient bien à l'utilisateur connecté (RLS via le client de session).
  const { data: brand } = await supabase.from("brands").select("id").eq("id", brandId).maybeSingle();
  if (!brand) {
    return NextResponse.json({ error: "Marque introuvable." }, { status: 404 });
  }

  const admin = createAdminClient();

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = `${brandId}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await admin.storage
      .from("truth-sheet-attachments")
      .upload(path, buffer, { contentType: file.type });
    if (uploadError) throw uploadError;

    let extractedText: string | null = null;
    try {
      const extraction = await extractAttachmentFactsFromBuffer(buffer, file.type as keyof typeof ATTACHMENT_ALLOWED_TYPES);
      extractedText = extraction.text;
      await admin.from("api_usage").insert({
        brand_id: brandId,
        provider: "anthropic",
        tokens_in: extraction.tokensIn,
        tokens_out: extraction.tokensOut,
        estimated_cost_eur: extraction.estimatedCostEur,
      });
    } catch (extractionError) {
      // La lecture par l'IA peut échouer (document illisible, etc.) -- le fichier reste
      // téléversé et consultable, seule l'aide à la détection est indisponible pour celui-ci.
      const message = extractionError instanceof Error ? extractionError.message : String(extractionError);
      await admin.from("error_logs").insert({
        source: "truth-sheet-attachment-extraction",
        brand_id: brandId,
        message,
        context: { path },
      });
    }

    const { data: inserted, error: insertError } = await admin
      .from("truth_sheet_attachments")
      .insert({
        brand_id: brandId,
        label: typeof label === "string" && label.trim() ? label.trim().slice(0, 200) : null,
        file_path: path,
        file_name: file.name.slice(0, 200),
        mime_type: file.type,
        file_size: file.size,
        extracted_text: extractedText,
      })
      .select("id, label, file_name, mime_type, file_size, extracted_text, created_at")
      .single();
    if (insertError) throw insertError;

    return NextResponse.json({ attachment: inserted });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await admin.from("error_logs").insert({ source: "truth-sheet-attachment-upload", brand_id: brandId, message, context: {} });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
