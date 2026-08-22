import type { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const SIGNED_URL_EXPIRY_SECONDS = 300;

export interface TruthSheetAttachment {
  id: string;
  label: string | null;
  fileName: string;
  mimeType: string;
  fileSize: number;
  hasExtractedText: boolean;
  createdAt: string;
  viewUrl: string | null;
}

// RLS via le client de session pour la liste (comme getTruthSheet), URL signée générée
// avec le client admin (le bucket est privé, même pattern que les rapports PDF mensuels).
export async function getTruthSheetAttachments(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  brandId: string
): Promise<TruthSheetAttachment[]> {
  const { data } = await supabase
    .from("truth_sheet_attachments")
    .select("id, label, file_path, file_name, mime_type, file_size, extracted_text, created_at")
    .eq("brand_id", brandId)
    .order("created_at", { ascending: false });

  if (!data || data.length === 0) return [];

  const admin = createAdminClient();

  return Promise.all(
    data.map(async (row) => {
      const { data: signed } = await admin.storage
        .from("truth-sheet-attachments")
        .createSignedUrl(row.file_path, SIGNED_URL_EXPIRY_SECONDS);

      return {
        id: row.id,
        label: row.label,
        fileName: row.file_name,
        mimeType: row.mime_type,
        fileSize: row.file_size,
        hasExtractedText: Boolean(row.extracted_text),
        createdAt: row.created_at,
        viewUrl: signed?.signedUrl ?? null,
      };
    })
  );
}
