"use client";

import { Button } from "./ui/Button";
import { TextField } from "./ui/TextField";

export function ScanForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Le lancement réel du scan (magic link) sera branché à l'Étape 6.
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
      <TextField id="brandName" name="brandName" label="Nom de marque" required placeholder="Ex. Dopaneo" />
      <TextField id="website" name="website" label="Site web" type="url" required placeholder="https://votre-site.fr" />
      <TextField id="email" name="email" label="Email professionnel" type="email" required placeholder="vous@entreprise.fr" />
      <Button type="submit" className="mt-2 w-full">
        Lancer mon scan gratuit
      </Button>
      <p className="text-xs text-slate-500">
        Un lien de vérification vous sera envoyé par email. Résultat en moins de 3 minutes.
      </p>
    </form>
  );
}
