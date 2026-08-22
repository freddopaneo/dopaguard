"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function CompetitorTracker({
  brandId,
  knownCompetitors,
  initialTrackedCompetitor,
}: {
  brandId: string;
  knownCompetitors: string[];
  initialTrackedCompetitor: string | null;
}) {
  const [selected, setSelected] = useState(initialTrackedCompetitor ?? "");
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setJustSaved(false);

    try {
      const response = await fetch("/api/dashboard/tracked-competitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandId, competitor: selected || null }),
      });
      if (!response.ok) {
        setError("Une erreur est survenue.");
        return;
      }
      setJustSaved(true);
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  }

  if (knownCompetitors.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="mb-2 text-sm font-semibold text-white">Suivi d&apos;un concurrent</h2>
        <p className="text-sm text-white/60">
          Ajoutez au moins un concurrent connu ci-dessus pour pouvoir suivre son score de réputation IA.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <h2 className="mb-2 text-sm font-semibold text-white">Suivi d&apos;un concurrent</h2>
      <p className="mb-4 text-sm text-white/60">
        Un seul concurrent peut être suivi à la fois, avec un score simplifié (sans fiche de vérité pour lui).
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="rounded-lg border border-white/10 bg-dopaguard-navyDark px-3 py-2 text-sm text-white outline-none focus:border-white/30"
        >
          <option value="">Aucun</option>
          {knownCompetitors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <Button type="button" disabled={saving} onClick={handleSave} className="px-4 py-2 text-xs">
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
        {justSaved && <span className="text-sm font-medium text-dopaguard-success">Enregistré ✓</span>}
        {error && <span className="text-sm font-medium text-dopaguard-critical">{error}</span>}
      </div>
    </div>
  );
}
