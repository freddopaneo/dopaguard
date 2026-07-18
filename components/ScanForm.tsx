"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { TextField } from "./ui/TextField";

type Status = "idle" | "loading" | "success" | "error";

export function ScanForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      brandName: formData.get("brandName"),
      website: formData.get("website"),
      email: formData.get("email"),
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Une erreur est survenue. Réessayez plus tard.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Une erreur est survenue. Réessayez plus tard.");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_-15px_rgba(13,46,56,0.35)]">
        <h2 className="text-lg font-semibold text-dopaguard-navy">Vérifiez votre boîte mail</h2>
        <p className="mt-2 text-sm text-dopaguard-navyMid">
          Un email de confirmation vient de vous être envoyé. Cliquez sur le lien qu&apos;il
          contient pour lancer votre scan gratuit.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-[0_20px_60px_-15px_rgba(13,46,56,0.35)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <TextField id="brandName" name="brandName" label="Nom de marque" required placeholder="Dopaneo" />
        <TextField
          id="website"
          name="website"
          label="Site web"
          type="text"
          required
          placeholder="www.dopaneo.ai"
        />
        <TextField id="email" name="email" label="Email professionnel" type="email" required placeholder="vous@entreprise.fr" />
      </div>
      <label className="mt-4 flex items-start gap-2 text-left text-xs text-slate-500">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>
          J&apos;accepte que mes données soient traitées conformément à la{" "}
          <a href="/confidentialite" className="underline hover:text-dopaguard-navy" target="_blank" rel="noreferrer">
            politique de confidentialité
          </a>
          .
        </span>
      </label>
      <Button type="submit" disabled={status === "loading"} className="mt-4 w-full">
        {status === "loading" ? "Envoi en cours…" : "Lancer mon scan gratuit →"}
      </Button>
      {status === "error" && (
        <p className="mt-3 text-center text-sm font-medium text-dopaguard-critical">{errorMessage}</p>
      )}
      <p className="mt-3 text-center text-xs text-slate-400">
        Résultat en moins de 3 minutes · Aucune carte bancaire requise
      </p>
    </form>
  );
}
