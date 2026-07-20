"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export interface TruthSheetValues {
  legalStatus: string;
  offering: string;
  pricingFacts: string;
  keyPeople: string;
  differentiators: string;
  knownCompetitors: string[];
  forbiddenClaims: string;
  openingHours: string;
  address: string;
  officialLinks: string;
  certifications: string;
}

interface TruthSheetFormProps {
  initialValues: TruthSheetValues;
  onSave: (values: TruthSheetValues) => Promise<{ ok: true } | { ok: false; error: string }>;
  submitLabel: string;
  savingLabel: string;
}

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

export function TruthSheetForm({ initialValues, onSave, submitLabel, savingLabel }: TruthSheetFormProps) {
  const [competitorsText, setCompetitorsText] = useState(initialValues.knownCompetitors.join(", "));
  const [forbiddenClaims, setForbiddenClaims] = useState(initialValues.forbiddenClaims);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const values: TruthSheetValues = {
      legalStatus: String(formData.get("legalStatus") ?? ""),
      offering: String(formData.get("offering") ?? ""),
      pricingFacts: String(formData.get("pricingFacts") ?? ""),
      keyPeople: String(formData.get("keyPeople") ?? ""),
      differentiators: String(formData.get("differentiators") ?? ""),
      knownCompetitors: competitorsText
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      forbiddenClaims,
      openingHours: String(formData.get("openingHours") ?? ""),
      address: String(formData.get("address") ?? ""),
      officialLinks: String(formData.get("officialLinks") ?? ""),
      certifications: String(formData.get("certifications") ?? ""),
    };

    const result = await onSave(values);

    if (!result.ok) {
      setError(result.error);
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextAreaField id="legalStatus" name="legalStatus" label="Statut / ancienneté" defaultValue={initialValues.legalStatus} />
      <TextAreaField id="offering" name="offering" label="Produits / services proposés" defaultValue={initialValues.offering} />
      <TextAreaField id="pricingFacts" name="pricingFacts" label="Tarifs publics" defaultValue={initialValues.pricingFacts} />
      <TextAreaField id="keyPeople" name="keyPeople" label="Dirigeants" defaultValue={initialValues.keyPeople} />
      <TextAreaField
        id="differentiators"
        name="differentiators"
        label="Points forts"
        defaultValue={initialValues.differentiators}
      />
      <TextAreaField id="openingHours" name="openingHours" label="Horaires d'ouverture" defaultValue={initialValues.openingHours} />
      <TextAreaField id="address" name="address" label="Adresse / coordonnées officielles" defaultValue={initialValues.address} />
      <TextAreaField
        id="officialLinks"
        name="officialLinks"
        label="Site et réseaux officiels (un lien par ligne)"
        defaultValue={initialValues.officialLinks}
      />
      <TextAreaField
        id="certifications"
        name="certifications"
        label="Certifications / labels"
        defaultValue={initialValues.certifications}
      />
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
        {saving ? savingLabel : submitLabel}
      </Button>
      {error && <p className="text-sm font-medium text-dopaguard-critical">{error}</p>}
    </form>
  );
}
