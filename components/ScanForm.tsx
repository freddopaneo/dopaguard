"use client";

import { Button } from "./ui/Button";
import { TextField } from "./ui/TextField";

export function ScanForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Le lancement réel du scan (magic link) sera branché à l'Étape 6.
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <TextField id="brandName" name="brandName" label="Nom de marque" required placeholder="Dopaneo" />
        <TextField id="website" name="website" label="Site web" type="url" required placeholder="dopaneo.ai" />
        <TextField id="email" name="email" label="Email professionnel" type="email" required placeholder="vous@entreprise.fr" />
      </div>
      <Button type="submit" className="mt-5 w-full">
        Lancer mon scan gratuit →
      </Button>
      <p className="mt-3 text-center text-xs text-slate-400">
        Résultat en moins de 3 minutes · Aucune carte bancaire requise
      </p>
    </form>
  );
}
