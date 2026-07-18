"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function AccountDeletion({ initialHasPendingRequest }: { initialHasPendingRequest: boolean }) {
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [requested, setRequested] = useState(initialHasPendingRequest);
  const [error, setError] = useState("");

  async function handleConfirm() {
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/account/delete-request", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Une erreur est survenue.");
      } else {
        setRequested(true);
        setConfirming(false);
      }
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setSending(false);
    }
  }

  if (requested) {
    return (
      <p className="text-sm text-white/60">
        Votre demande de suppression a bien été enregistrée. Vos données seront supprimées sous 30 jours,
        conformément à notre politique de confidentialité.
      </p>
    );
  }

  if (!confirming) {
    return (
      <div>
        <p className="mb-3 text-xs text-white/50">
          Supprime définitivement votre compte et toutes vos données (marques, réponses, scores, rapports).
        </p>
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="text-xs font-medium text-dopaguard-critical underline underline-offset-2 hover:text-dopaguard-critical/80"
        >
          Demander la suppression de mon compte
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-white">
        Êtes-vous sûr ? Cette action déclenchera la suppression de toutes vos données sous 30 jours.
      </p>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={sending}
          className="w-fit bg-dopaguard-critical px-4 py-2 text-xs text-white hover:brightness-95"
        >
          {sending ? "Envoi…" : "Oui, confirmer la suppression"}
        </Button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-xs text-white/50 underline underline-offset-2 hover:text-white/80"
        >
          Annuler
        </button>
      </div>
      {error && <p className="text-xs font-medium text-dopaguard-critical">{error}</p>}
    </div>
  );
}
