"use client";

import { useEffect, useState } from "react";

type Step = "idle" | "loading-offer" | "offer-shown" | "loading-cancel" | "cancel-confirmed" | "error";

const SUBTLE_LINK_CLASSES = "text-xs text-white/50 underline underline-offset-2 hover:text-white/80";

export function CancellationFlow({ initialOfferAlreadySent }: { initialOfferAlreadySent: boolean }) {
  const [step, setStep] = useState<Step>(initialOfferAlreadySent ? "loading-offer" : "idle");
  const [percentOff, setPercentOff] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialOfferAlreadySent) {
      requestOffer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestOffer() {
    setStep("loading-offer");
    setErrorMessage("");
    try {
      const res = await fetch("/api/stripe/retention-offer", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Une erreur est survenue.");
        setStep("error");
        return;
      }
      setPercentOff(data.percentOff);
      setStep("offer-shown");
    } catch {
      setErrorMessage("Une erreur est survenue.");
      setStep("error");
    }
  }

  async function confirmCancel() {
    setStep("loading-cancel");
    setErrorMessage("");
    try {
      const res = await fetch("/api/stripe/cancel", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Une erreur est survenue.");
        setStep("error");
        return;
      }
      setStep("cancel-confirmed");
    } catch {
      setErrorMessage("Une erreur est survenue.");
      setStep("error");
    }
  }

  if (step === "idle") {
    return (
      <button type="button" onClick={requestOffer} className={SUBTLE_LINK_CLASSES}>
        Demander la résiliation
      </button>
    );
  }

  if (step === "loading-offer" || step === "loading-cancel") {
    return <p className="text-xs text-white/40">Un instant…</p>;
  }

  if (step === "error") {
    return (
      <div className="flex flex-col items-end gap-1">
        <p className="text-xs font-medium text-dopaguard-critical">{errorMessage}</p>
        <button type="button" onClick={() => setStep("idle")} className={SUBTLE_LINK_CLASSES}>
          Réessayer
        </button>
      </div>
    );
  }

  if (step === "cancel-confirmed") {
    return (
      <p className="max-w-xs text-right text-xs text-white/60">
        Votre abonnement ne sera pas renouvelé. Vous conservez l&apos;accès à Dopaguard jusqu&apos;à la fin de la période en cours.
      </p>
    );
  }

  return (
    <div className="flex max-w-xs flex-col items-end gap-2 text-right">
      <p className="text-xs text-white/60">
        {percentOff
          ? `Une réduction de ${percentOff}% a été appliquée sur votre prochain paiement.`
          : "Une réduction a déjà été appliquée à votre abonnement."}
      </p>
      <button
        type="button"
        onClick={() => setStep("idle")}
        className="text-xs font-semibold text-dopaguard-lime underline underline-offset-2"
      >
        Garder mon abonnement
      </button>
      <button type="button" onClick={confirmCancel} className="text-xs text-white/40 underline underline-offset-2 hover:text-white/60">
        Résilier quand même
      </button>
    </div>
  );
}
