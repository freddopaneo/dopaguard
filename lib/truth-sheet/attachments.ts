import { extractAttachmentText } from "@/lib/llm-gateway";

export const ATTACHMENT_ALLOWED_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpg",
};
export const ATTACHMENT_MAX_SIZE_BYTES = 8 * 1024 * 1024;

// Tronqué avant d'être injecté dans le prompt du juge IA (lib/scan/anomaly-judge.ts) --
// un document ne doit pas faire exploser le coût/la taille de chaque jugement hebdomadaire.
export const ATTACHMENT_EXTRACTED_TEXT_MAX_LENGTH = 3000;

const EXTRACTION_INSTRUCTIONS =
  "Ce document a été fourni par une entreprise comme preuve de ses informations publiques " +
  "(tarifs, horaires, adresse, offre, certifications...). Transcris fidèlement, en texte brut " +
  "et sans commentaire, tout fait vérifiable qu'il contient. Si le document ne contient rien " +
  "d'exploitable, réponds uniquement « Aucune information exploitable. ».";

export interface ExtractedAttachment {
  text: string;
  tokensIn: number;
  tokensOut: number;
  estimatedCostEur: number;
}

export async function extractAttachmentFactsFromBuffer(
  buffer: Buffer,
  mimeType: keyof typeof ATTACHMENT_ALLOWED_TYPES
): Promise<ExtractedAttachment> {
  const result = await extractAttachmentText({
    base64Data: buffer.toString("base64"),
    mimeType: mimeType as "application/pdf" | "image/png" | "image/jpeg",
    instructions: EXTRACTION_INSTRUCTIONS,
  });

  return {
    text: result.text.trim().slice(0, ATTACHMENT_EXTRACTED_TEXT_MAX_LENGTH),
    tokensIn: result.tokensIn,
    tokensOut: result.tokensOut,
    estimatedCostEur: result.estimatedCostEur,
  };
}
