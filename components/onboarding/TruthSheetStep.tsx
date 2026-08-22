"use client";

import { useEffect, useState } from "react";
import { TruthSheetForm, type TruthSheetValues } from "@/components/truth-sheet/TruthSheetForm";

interface Draft {
  legalStatus: string;
  offering: string;
  pricingFacts: string;
  keyPeople: string;
  differentiators: string;
  knownCompetitors: string[];
  openingHours: string;
  address: string;
  officialLinks: string;
  certifications: string;
}

const EMPTY_DRAFT: Draft = {
  legalStatus: "",
  offering: "",
  pricingFacts: "",
  keyPeople: "",
  differentiators: "",
  knownCompetitors: [],
  openingHours: "",
  address: "",
  officialLinks: "",
  certifications: "",
};

export function TruthSheetStep({ brandId, onDone }: { brandId: string; onDone: () => void }) {
  const [loadingDraft, setLoadingDraft] = useState(true);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [scraped, setScraped] = useState(true);

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
        setScraped(data.scraped !== false);
      } finally {
        if (!cancelled) setLoadingDraft(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [brandId]);

  async function handleSave(values: TruthSheetValues): Promise<{ ok: true } | { ok: false; error: string }> {
    const response = await fetch("/api/onboarding/truth-sheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandId, ...values }),
    });
    const data = await response.json();

    if (!response.ok) {
      return { ok: false, error: data.error || "Une erreur est survenue." };
    }

    onDone();
    return { ok: true };
  }

  if (loadingDraft) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-dopaguard-navyMid">Analyse de votre site en cours…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-dopaguard-navy">Votre fiche de vérité</h2>
      <p className="text-sm text-dopaguard-navyMid">
        {scraped
          ? "Nous avons pré-rempli ces champs à partir de votre site. Vérifiez et corrigez chaque information — c'est la référence utilisée pour juger ce que les IA disent de vous."
          : "Nous n'avons pas pu analyser votre site automatiquement. Remplissez ces champs vous-même."}
      </p>
      <TruthSheetForm
        initialValues={{ ...draft, forbiddenClaims: "" }}
        submitLabel="Valider et continuer"
        savingLabel="Enregistrement…"
        onSave={handleSave}
      />
    </div>
  );
}
