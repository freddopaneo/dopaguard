"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PROVIDER_ORDER, ALL_PROVIDERS, PROVIDER_LABELS } from "@/lib/providers";

function providersForPlan(plan: string | null): string[] {
  const providers = plan === "essentiel" ? PROVIDER_ORDER : ALL_PROVIDERS;
  return providers.map((p) => PROVIDER_LABELS[p]);
}

export function ConfirmationStep({
  brandId,
  brandName: initialBrandName,
  promptCount: initialPromptCount,
  onDone,
}: {
  brandId: string;
  brandName: string;
  promptCount: number;
  onDone: (plan: string | null) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [brandName, setBrandName] = useState(initialBrandName);
  const [promptCount, setPromptCount] = useState(initialPromptCount);
  const [plan, setPlan] = useState<string | null>(null);
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
        setPlan(data.plan ?? null);
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

      // Déclenchée sans attendre sa réponse : pour un plan Pro/Agence (5 IA), cette
      // analyse peut prendre plusieurs minutes -- bien trop long pour que le
      // navigateur reste bloqué dessus. Elle continue de tourner côté serveur
      // indépendamment de la navigation qui suit.
      fetch("/api/onboarding/run-first-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandId }),
      }).catch(() => {
        // Un échec ici n'empêche jamais la suite : le prochain cron hebdomadaire rattrapera.
      });

      onDone(plan);
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

  const providers = providersForPlan(plan);

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
        <p className="mt-1">
          <span className="font-medium">IA interrogées :</span> {providers.join(", ")}
        </p>
      </div>
      <Button type="button" onClick={handleConfirm} disabled={saving}>
        {saving ? "Confirmation…" : "Confirmer et terminer"}
      </Button>
      {error && <p className="text-sm font-medium text-dopaguard-critical">{error}</p>}
    </div>
  );
}
