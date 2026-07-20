"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export interface AttachmentValues {
  id: string;
  label: string | null;
  fileName: string;
  mimeType: string;
  fileSize: number;
  hasExtractedText: boolean;
  createdAt: string;
  viewUrl: string | null;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function AttachmentUploader({
  brandId,
  initialAttachments,
}: {
  brandId: string;
  initialAttachments: AttachmentValues[];
}) {
  const [attachments, setAttachments] = useState(initialAttachments);
  const [label, setLabel] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Choisissez d'abord un fichier.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("brandId", brandId);
    formData.append("label", label);
    formData.append("file", file);

    try {
      const response = await fetch("/api/dashboard/truth-sheet/attachments", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Une erreur est survenue.");
        return;
      }
      setAttachments((prev) => [{ ...data.attachment, viewUrl: null }, ...prev]);
      setLabel("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setError("Une erreur est survenue. Réessayez plus tard.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError("");
    try {
      const response = await fetch(`/api/dashboard/truth-sheet/attachments/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Une erreur est survenue.");
        return;
      }
      setAttachments((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError("Une erreur est survenue. Réessayez plus tard.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6 border-t border-slate-200 pt-6">
      <h3 className="text-sm font-semibold text-slate-900">Pièces justificatives</h3>
      <p className="mt-1 text-xs text-slate-500">
        Carte tarifaire, extrait Kbis, certificat… Ces documents sont lus par le juge IA pour corroborer les faits déclarés
        ci-dessus. PDF, PNG ou JPG, 8 Mo maximum.
      </p>

      {attachments.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {attachments.map((attachment) => (
            <li
              key={attachment.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900">{attachment.label || attachment.fileName}</p>
                <p className="text-xs text-slate-500">
                  {attachment.fileName} · {formatSize(attachment.fileSize)} · ajouté le {formatDate(attachment.createdAt)}
                  {!attachment.hasExtractedText && " · non lu par le juge IA"}
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-3">
                {attachment.viewUrl && (
                  <a
                    href={attachment.viewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-dopaguard-navy underline hover:text-dopaguard-navyMid"
                  >
                    Voir
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(attachment.id)}
                  disabled={deletingId === attachment.id}
                  className="text-xs font-medium text-dopaguard-critical hover:underline disabled:opacity-50"
                >
                  {deletingId === attachment.id ? "Suppression…" : "Supprimer"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleUpload} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="attachment-label" className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Description (optionnel)
          </label>
          <input
            id="attachment-label"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="ex. Carte des tarifs 2026"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-dopaguard-navy focus:ring-4 focus:ring-dopaguard-navy/10"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="attachment-file" className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Fichier
          </label>
          <input
            id="attachment-file"
            ref={fileInputRef}
            type="file"
            accept="application/pdf,image/png,image/jpeg"
            className="text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-medium file:text-slate-700"
          />
        </div>
        <Button type="submit" disabled={uploading} className="px-4 py-2.5">
          {uploading ? "Envoi…" : "Ajouter"}
        </Button>
      </form>
      {error && <p className="mt-2 text-sm font-medium text-dopaguard-critical">{error}</p>}
    </div>
  );
}
