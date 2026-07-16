"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface PromptItem {
  id: string;
  category: string;
  template: string;
  defaultSelected: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  reputation: "Réputation",
  reliability: "Fiabilité",
  recommendation: "Recommandation",
  comparison: "Comparaison",
  factual: "Factuel",
};

export function PromptSelectionStep({
  brandId,
  brandName,
  onDone,
}: {
  brandId: string;
  brandName: string;
  onDone: (promptCount: number) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [cap, setCap] = useState(20);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch(`/api/onboarding/prompts/list?brandId=${brandId}`);
        const data = await response.json();
        if (cancelled) return;
        const items: PromptItem[] = data.prompts ?? [];
        setPrompts(items);
        setCap(data.cap ?? 20);
        setSelected(new Set(items.filter((p) => p.defaultSelected).map((p) => p.id)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [brandId]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= cap) return prev;
        next.add(id);
      }
      return next;
    });
  }

  async function handleSubmit() {
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandId, promptTemplateIds: Array.from(selected) }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Une erreur est survenue.");
        setSaving(false);
        return;
      }

      onDone(selected.size);
    } catch {
      setError("Une erreur est survenue.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-dopaguard-navyMid">Chargement des prompts…</p>
      </div>
    );
  }

  const grouped = prompts.reduce<Record<string, PromptItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-dopaguard-navy">Choisissez vos prompts</h2>
      <p className="text-sm text-dopaguard-navyMid">
        {selected.size} / {cap} sélectionnés — ce sont les questions posées aux IA chaque semaine.
      </p>
      <div className="flex max-h-96 flex-col gap-5 overflow-y-auto pr-1">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-dopaguard-navyMid/60">
              {CATEGORY_LABELS[category] ?? category}
            </h3>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <label key={item.id} className="flex items-start gap-2 text-sm text-dopaguard-navy">
                  <input type="checkbox" checked={selected.has(item.id)} onChange={() => toggle(item.id)} className="mt-1" />
                  <span>{item.template.replace(/{{brand}}/g, brandName).replace(/\s*{{website}}/g, "").replace(/{{sector}}/g, "votre secteur")}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button type="button" onClick={handleSubmit} disabled={saving || selected.size === 0}>
        {saving ? "Enregistrement…" : "Continuer"}
      </Button>
      {error && <p className="text-sm font-medium text-dopaguard-critical">{error}</p>}
    </div>
  );
}
