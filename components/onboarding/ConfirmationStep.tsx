"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function ConfirmationStep({
  brandId,
  brandName: initialBrandName,
  promptCount: initialPromptCount,
  onDone,
}: {
  brandId: string;
  brandName: string;
  promptCount: number;
  onDone: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [brandName, setBrandName] = useState(initialBrandName);
  const [promptCount, setPromptCount] = useState(initialPromptCount);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Toujours re-vérifié auprès du serveur : initialPromptCount n'est fiable que
    // lorsqu'on vient de terminer l'étape 3 dans la même session (pas en cas de reprise).
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch(`/api/onboarding/summary?brandId=${brandId}`);
        const data = await response.json();
        if (cancelled) return;
        setBrandName(data.brandName ?? "");
        setPromptCount(data.promptCount ?? 0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [brandId]);

  async function handleConfirm() {
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandId }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Une erreur est survenue.");
        setSaving(false);
        return;
      }

      onDone();
    } catch {
      setError("Une erreur est survenue.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-dopaguard-navyMid">Préparation du récapitulatif…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-center">
      <h2 className="text-lg font-semibold text-dopaguard-navy">Récapitulatif</h2>
      <div className="rounded-xl bg-dopaguard-muted p-4 text-left text-sm text-dopaguard-navy">
        <p>
          <span className="font-medium">Marque :</span> {brandName}
        </p>
        <p className="mt-1">
          <span className="font-medium">Prompts sélectionnés :</span> {promptCount}
        </p>
        <p className="mt-1">
          <span className="font-medium">Fiche de vérité :</span> validée
        </p>
      </div>
      <Button type="button" onClick={handleConfirm} disabled={saving}>
        {saving ? "Confirmation…" : "Confirmer et terminer"}
      </Button>
      {error && <p className="text-sm font-medium text-dopaguard-critical">{error}</p>}
    </div>
  );
}
