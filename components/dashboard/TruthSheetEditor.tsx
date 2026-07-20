"use client";

import { useState } from "react";
import { TruthSheetForm, type TruthSheetValues } from "@/components/truth-sheet/TruthSheetForm";
import { AttachmentUploader, type AttachmentValues } from "@/components/truth-sheet/AttachmentUploader";

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function TruthSheetEditor({
  brandId,
  initialValues,
  initialLastValidatedAt,
  initialAttachments,
}: {
  brandId: string;
  initialValues: TruthSheetValues;
  initialLastValidatedAt: string | null;
  initialAttachments: AttachmentValues[];
}) {
  const [lastValidatedAt, setLastValidatedAt] = useState(initialLastValidatedAt);
  const [justSaved, setJustSaved] = useState(false);

  async function handleSave(values: TruthSheetValues): Promise<{ ok: true } | { ok: false; error: string }> {
    setJustSaved(false);

    const response = await fetch("/api/onboarding/truth-sheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandId, ...values }),
    });
    const data = await response.json();

    if (!response.ok) {
      return { ok: false, error: data.error || "Une erreur est survenue." };
    }

    setLastValidatedAt(new Date().toISOString());
    setJustSaved(true);
    return { ok: true };
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <p className="mb-4 text-xs text-white/40">
        {lastValidatedAt ? `Dernière mise à jour le ${formatDate(lastValidatedAt)}.` : "Jamais enregistrée."}
      </p>
      <div className="rounded-xl bg-white p-6">
        <TruthSheetForm initialValues={initialValues} submitLabel="Enregistrer" savingLabel="Enregistrement…" onSave={handleSave} />
        <AttachmentUploader brandId={brandId} initialAttachments={initialAttachments} />
      </div>
      {justSaved && <p className="mt-3 text-sm font-medium text-dopaguard-success">Enregistré ✓</p>}
    </div>
  );
}
