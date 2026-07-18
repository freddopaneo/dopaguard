"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

type Status = "idle" | "loading" | "success" | "error";
type Mode = "link" | "password";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("link");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLinkSubmit(event: React.FormEvent<HTMLFormElement>) {
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

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/login-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Une erreur est survenue.");
        setStatus("error");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("Une erreur est survenue.");
      setStatus("error");
    }
  }

  function switchMode(next: Mode) {
    setMode(next);
    setStatus("idle");
    setErrorMessage("");
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
        ) : mode === "link" ? (
          <>
            <h1 className="text-xl font-bold text-dopaguard-navy">Connexion</h1>
            <p className="mt-2 text-sm text-dopaguard-navyMid">
              Recevez un lien de connexion par email, sans mot de passe.
            </p>
            <form onSubmit={handleLinkSubmit} className="mt-6 flex flex-col gap-4">
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
            <button
              type="button"
              onClick={() => switchMode("password")}
              className="mt-4 text-xs text-dopaguard-navyMid/70 underline hover:text-dopaguard-navyMid"
            >
              J&apos;ai un mot de passe
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-dopaguard-navy">Connexion</h1>
            <p className="mt-2 text-sm text-dopaguard-navyMid">Connectez-vous avec votre email et votre mot de passe.</p>
            <form onSubmit={handlePasswordSubmit} className="mt-6 flex flex-col gap-4">
              <TextField id="email" name="email" label="Email" type="email" required placeholder="vous@entreprise.fr" />
              <TextField id="password" name="password" label="Mot de passe" type="password" required />
              {errorMessage && <p className="text-xs font-medium text-red-600">{errorMessage}</p>}
              <Button type="submit" disabled={status === "loading"} className="w-full">
                {status === "loading" ? "Connexion…" : "Se connecter"}
              </Button>
            </form>
            <button
              type="button"
              onClick={() => switchMode("link")}
              className="mt-4 text-xs text-dopaguard-navyMid/70 underline hover:text-dopaguard-navyMid"
            >
              Pas de mot de passe ? Recevoir un lien de connexion
            </button>
          </>
        )}
      </div>
    </div>
  );
}
