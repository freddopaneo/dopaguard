"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { SECTORS } from "@/lib/onboarding/sectors";

export function BrandInfoStep({ onDone }: { onDone: (brandId: string, brandName: string) => void }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const payload = {
      name,
      website: formData.get("website"),
      sector: formData.get("sector"),
      country: "FR",
    };

    try {
      const response = await fetch("/api/onboarding/brand", {
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

      onDone(data.brandId, name);
    } catch {
      setError("Une erreur est survenue.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-dopaguard-navy">Informations sur votre marque</h2>
      <TextField id="name" name="name" label="Nom de la marque" required placeholder="Dopaguard" />
      <TextField id="website" name="website" label="Site web" required placeholder="www.dopaguard.ai" />
      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor="sector" className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Secteur
        </label>
        <select
          id="sector"
          name="sector"
          required
          defaultValue=""
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-dopaguard-navy focus:ring-4 focus:ring-dopaguard-navy/10"
        >
          <option value="" disabled>
            Choisir un secteur
          </option>
          {SECTORS.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Enregistrement…" : "Continuer"}
      </Button>
      {error && <p className="text-sm font-medium text-dopaguard-critical">{error}</p>}
    </form>
  );
}
