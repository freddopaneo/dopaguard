"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function AgencyBrandingForm({
  initialName,
  initialPrimaryColor,
  hasLogo,
}: {
  initialName: string;
  initialPrimaryColor: string;
  hasLogo: boolean;
}) {
  const [name, setName] = useState(initialName);
  const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoUploaded, setLogoUploaded] = useState(hasLogo);
  const [logoError, setLogoError] = useState("");

  async function handleSaveDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const response = await fetch("/api/dashboard/agency", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, primaryColor }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Une erreur est survenue.");
      } else {
        setSaved(true);
      }
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUploadLogo() {
    if (!logoFile) return;
    setUploadingLogo(true);
    setLogoError("");

    try {
      const formData = new FormData();
      formData.append("logo", logoFile);
      const response = await fetch("/api/dashboard/agency/logo", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        setLogoError(data.error || "Une erreur est survenue.");
      } else {
        setLogoUploaded(true);
        setLogoFile(null);
      }
    } catch {
      setLogoError("Une erreur est survenue.");
    } finally {
      setUploadingLogo(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSaveDetails} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="agency-name" className="text-xs font-medium uppercase tracking-wide text-white/40">
            Nom de l&apos;agence
          </label>
          <input
            id="agency-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="agency-color" className="text-xs font-medium uppercase tracking-wide text-white/40">
            Couleur primaire (page de garde des rapports)
          </label>
          <div className="flex items-center gap-3">
            <input
              id="agency-color"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-10 w-16 cursor-pointer rounded border border-white/10 bg-transparent"
            />
            <span className="text-sm text-white/60">{primaryColor}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving} className="w-fit px-5 py-2.5 text-xs">
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
          {saved && <span className="text-xs font-medium text-dopaguard-success">Enregistré ✓</span>}
          {error && <span className="text-xs font-medium text-dopaguard-critical">{error}</span>}
        </div>
      </form>

      <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
        <label className="text-xs font-medium uppercase tracking-wide text-white/40">Logo (PNG ou JPG, 2 Mo max)</label>
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
            className="text-xs text-white/60"
          />
          <Button type="button" disabled={!logoFile || uploadingLogo} onClick={handleUploadLogo} className="w-fit px-4 py-2 text-xs">
            {uploadingLogo ? "Envoi…" : "Téléverser"}
          </Button>
        </div>
        {logoUploaded && !logoFile && <p className="text-xs text-white/40">Un logo est déjà enregistré.</p>}
        {logoError && <p className="text-xs font-medium text-dopaguard-critical">{logoError}</p>}
      </div>
    </div>
  );
}
