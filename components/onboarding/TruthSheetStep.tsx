"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface Draft {
  legalStatus: string;
  offering: string;
  pricingFacts: string;
  keyPeople: string;
  differentiators: string;
  knownCompetitors: string[];
}

const EMPTY_DRAFT: Draft = {
  legalStatus: "",
  offering: "",
  pricingFacts: "",
  keyPeople: "",
  differentiators: "",
  knownCompetitors: [],
};

function TextAreaField({
  id,
  name,
  label,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        defaultValue={defaultValue}
        rows={2}
        className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-dopaguard-navy focus:ring-4 focus:ring-dopaguard-navy/10"
      />
    </div>
  );
}

export function TruthSheetStep({ brandId, onDone }: { brandId: string; onDone: () => void }) {
  const [loadingDraft, setLoadingDraft] = useState(true);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [competitorsText, setCompetitorsText] = useState("");
  const [forbiddenClaims, setForbiddenClaims] = useState("");
  const [scraped, setScraped] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch("/api/onboarding/truth-sheet/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brandId }),
        });
        const data = await response.json();
        if (cancelled) return;
        const nextDraft: Draft = data.draft ?? EMPTY_DRAFT;
        setDraft(nextDraft);
        setCompetitorsText(nextDraft.knownCompetitors.join(", "));
        setScraped(data.scraped !== false);
      } finally {
        if (!cancelled) setLoadingDraft(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [brandId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      brandId,
      legalStatus: formData.get("legalStatus"),
      offering: formData.get("offering"),
      pricingFacts: formData.get("pricingFacts"),
      keyPeople: formData.get("keyPeople"),
      differentiators: formData.get("differentiators"),
      knownCompetitors: competitorsText
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      forbiddenClaims,
    };

    try {
      const response = await fetch("/api/onboarding/truth-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  if (loadingDraft) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-dopaguard-navyMid">Analyse de votre site en cours…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-dopaguard-navy">Votre fiche de vérité</h2>
      <p className="text-sm text-dopaguard-navyMid">
        {scraped
          ? "Nous avons pré-rempli ces champs à partir de votre site. Vérifiez et corrigez chaque information — c'est la référence utilisée pour juger ce que les IA disent de vous."
          : "Nous n'avons pas pu analyser votre site automatiquement. Remplissez ces champs vous-même."}
      </p>
      <TextAreaField id="legalStatus" name="legalStatus" label="Statut / ancienneté" defaultValue={draft.legalStatus} />
      <TextAreaField id="offering" name="offering" label="Produits / services proposés" defaultValue={draft.offering} />
      <TextAreaField id="pricingFacts" name="pricingFacts" label="Tarifs publics" defaultValue={draft.pricingFacts} />
      <TextAreaField id="keyPeople" name="keyPeople" label="Dirigeants" defaultValue={draft.keyPeople} />
      <TextAreaField id="differentiators" name="differentiators" label="Points forts" defaultValue={draft.differentiators} />
      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor="competitors" className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Concurrents connus (séparés par des virgules)
        </label>
        <input
          id="competitors"
          value={competitorsText}
          onChange={(event) => setCompetitorsText(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-dopaguard-navy focus:ring-4 focus:ring-dopaguard-navy/10"
        />
      </div>
      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor="forbiddenClaims" className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Ce qui ne doit jamais être dit sur vous
        </label>
        <textarea
          id="forbiddenClaims"
          value={forbiddenClaims}
          onChange={(event) => setForbiddenClaims(event.target.value)}
          placeholder="ex. « fermé », « en liquidation »…"
          rows={2}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-dopaguard-navy focus:ring-4 focus:ring-dopaguard-navy/10"
        />
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Enregistrement…" : "Valider et continuer"}
      </Button>
      {error && <p className="text-sm font-medium text-dopaguard-critical">{error}</p>}
    </form>
  );
}
