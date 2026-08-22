"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function PasswordSettings() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaved(false);

    if (password.length < 8) {
      setError("8 caractères minimum.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Une erreur est survenue.");
      } else {
        setSaved(true);
        setPassword("");
        setConfirmPassword("");
      }
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-xs text-white/50">
        Une fois défini, vous pourrez vous connecter directement avec votre email et ce mot de passe, sans attendre un
        lien par email à chaque fois. Le lien de connexion reste toujours disponible en secours.
      </p>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="new-password" className="text-xs font-medium uppercase tracking-wide text-white/40">
          Nouveau mot de passe
        </label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/30"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirm-password" className="text-xs font-medium uppercase tracking-wide text-white/40">
          Confirmer le mot de passe
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/30"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving} className="w-fit px-5 py-2.5 text-xs">
          {saving ? "Enregistrement…" : "Définir ce mot de passe"}
        </Button>
        {saved && <span className="text-xs font-medium text-dopaguard-success">Enregistré ✓</span>}
        {error && <span className="text-xs font-medium text-dopaguard-critical">{error}</span>}
      </div>
    </form>
  );
}
