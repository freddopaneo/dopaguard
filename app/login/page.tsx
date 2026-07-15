"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

type Status = "idle" | "loading" | "success" | "error";

export default function LoginPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)" }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_-15px_rgba(13,46,56,0.35)]">
        {status === "success" ? (
          <>
            <h1 className="text-xl font-bold text-dopaguard-navy">Vérifiez votre boîte mail</h1>
            <p className="mt-3 text-sm leading-relaxed text-dopaguard-navyMid">
              Si un compte existe avec cet email, un lien de connexion vient de vous être envoyé.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-dopaguard-navy">Connexion</h1>
            <p className="mt-2 text-sm text-dopaguard-navyMid">
              Recevez un lien de connexion par email, sans mot de passe.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                required
                placeholder="vous@entreprise.fr"
              />
              <Button type="submit" disabled={status === "loading"} className="w-full">
                {status === "loading" ? "Envoi en cours…" : "Recevoir mon lien de connexion"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
