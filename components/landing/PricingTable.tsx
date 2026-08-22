"use client";

import { useState } from "react";
import type { PlanSlug } from "@/lib/stripe/plans";

type Plan = {
  slug: PlanSlug;
  name: string;
  price: string;
  audience: string;
  recommended?: boolean;
  brands: string;
  ais: string;
  digest: boolean;
  criticalAlerts: boolean;
  competitors: string;
  whiteLabel: boolean;
  support: string;
};

const PLANS: Plan[] = [
  {
    slug: "essentiel",
    name: "Essentiel",
    price: "69 €/mois",
    audience: "Pour surveiller une entreprise sur les 3 IA principales.",
    brands: "1",
    ais: "3",
    digest: true,
    criticalAlerts: true,
    competitors: "—",
    whiteLabel: false,
    support: "standard",
  },
  {
    slug: "pro",
    name: "Pro",
    price: "149 €/mois",
    audience: "Pour une couverture complète des 5 IA, avec un concurrent à l'œil.",
    recommended: true,
    brands: "1",
    ais: "5",
    digest: true,
    criticalAlerts: true,
    competitors: "1",
    whiteLabel: false,
    support: "standard",
  },
  {
    slug: "agence",
    name: "Agence",
    price: "349 €/mois",
    audience: "Pour les agences, réseaux et franchises jusqu'à 10 marques.",
    brands: "jusqu'à 10",
    ais: "5",
    digest: true,
    criticalAlerts: true,
    competitors: "1 par marque",
    whiteLabel: true,
    support: "prioritaire",
  },
];

function Check({ on }: { on: boolean }) {
  return on ? (
    <span className="text-dopaguard-success">✓</span>
  ) : (
    <span className="text-dopaguard-navyMid/30">—</span>
  );
}

const VALUE_STACK = [
  {
    label: "Surveillance hebdomadaire de vos IA",
    value: "l'équivalent de plusieurs heures de vérification manuelle chaque semaine",
  },
  {
    label: "Alertes immédiates sur anomalie critique",
    value: "l'Essentiel coûte 828 €/an — évitez la perte d'un seul client et l'abonnement est rentabilisé plusieurs fois",
  },
  {
    label: "Rapport mensuel prêt à partager",
    value: "du temps de reporting épargné chaque mois",
  },
  {
    label: "Suivi de concurrent inclus (Pro/Agence)",
    value: "l'équivalent d'une veille concurrentielle payante",
  },
];

export function PricingTable() {
  const [loadingPlan, setLoadingPlan] = useState<PlanSlug | null>(null);
  const [error, setError] = useState("");

  async function handleSelectPlan(plan: PlanSlug) {
    setLoadingPlan(plan);
    setError("");

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        setError(data.error || "Une erreur est survenue. Réessayez plus tard.");
        setLoadingPlan(null);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Une erreur est survenue. Réessayez plus tard.");
      setLoadingPlan(null);
    }
  }

  return (
    <section id="tarifs" className="mx-auto max-w-5xl px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">Programme Réputation IA</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Une réputation surveillée, à partir de 69 € par mois.
        </h2>
        <p className="mt-4 text-lg text-dopaguard-navyMid/80">
          Essai 14 jours, sans engagement. Vous n&apos;êtes jamais débité si vous annulez avant la fin.
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-dopaguard-lime bg-dopaguard-lime/10 px-3.5 py-1.5 text-xs font-medium text-dopaguard-navy">
          <span className="h-1.5 w-1.5 rounded-full bg-dopaguard-lime" />
          Les 20 premiers comptes : session de configuration personnelle avec le fondateur
        </span>
        {error && <p className="mt-4 text-sm font-medium text-dopaguard-critical">{error}</p>}
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dopaguard-muted bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-dopaguard-navyMid/50">Ce que ça vous fait gagner</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {VALUE_STACK.map((item) => (
            <div key={item.label} className="flex gap-3">
              <span className="mt-0.5 shrink-0 text-dopaguard-success">✓</span>
              <div>
                <p className="text-sm font-medium text-dopaguard-navy">{item.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-dopaguard-navyMid/70">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border bg-white p-6 transition-all duration-200 hover:-translate-y-1 ${
              plan.recommended
                ? "border-2 border-dopaguard-lime shadow-[0_24px_70px_-15px_rgba(13,46,56,0.35)] lg:scale-[1.04]"
                : "border-dopaguard-muted hover:shadow-[0_16px_40px_-20px_rgba(13,46,56,0.3)]"
            }`}
          >
            {plan.recommended && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-dopaguard-navy px-3.5 py-1.5 text-xs font-semibold text-dopaguard-lime">
                ★ Le plus choisi
              </span>
            )}
            <h3 className="text-lg font-semibold text-dopaguard-navy">{plan.name}</h3>
            <p className="mt-1 text-3xl font-bold text-dopaguard-navy">
              {plan.price.split("/")[0]}
              <span className="text-base font-medium text-dopaguard-navyMid/60">/mois</span>
            </p>
            <p className="mt-2 min-h-[2.5rem] text-xs leading-relaxed text-dopaguard-navyMid/70">{plan.audience}</p>

            <dl className="mt-6 flex flex-1 flex-col gap-3 text-sm text-dopaguard-navyMid">
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Marques surveillées</dt>
                <dd className="font-medium">{plan.brands}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>IA surveillées</dt>
                <dd className="font-medium">{plan.ais}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Digest hebdomadaire</dt>
                <dd><Check on={plan.digest} /></dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Alertes critiques immédiates</dt>
                <dd><Check on={plan.criticalAlerts} /></dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Suivi de concurrents</dt>
                <dd className="font-medium">{plan.competitors}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Rapports en marque blanche</dt>
                <dd><Check on={plan.whiteLabel} /></dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Support</dt>
                <dd className="font-medium capitalize">{plan.support}</dd>
              </div>
            </dl>

            <button
              type="button"
              disabled={loadingPlan !== null}
              onClick={() => handleSelectPlan(plan.slug)}
              className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 ${
                plan.recommended
                  ? "bg-dopaguard-lime text-dopaguard-navy shadow-[0_8px_24px_-8px_rgba(199,255,152,0.8)]"
                  : "bg-dopaguard-navy text-white"
              }`}
            >
              {loadingPlan === plan.slug ? "Redirection…" : "Démarrer l'essai de 14 jours"}
            </button>
            <p className="mt-2.5 text-center text-[11px] text-dopaguard-navyMid/50">
              Sans engagement · Jamais débité si vous annulez avant la fin de l&apos;essai
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-dopaguard-navy px-6 py-6 text-center text-white">
        <p className="text-base font-semibold">
          🛡️ <span className="text-dopaguard-lime">Garantie Essai Zéro Risque</span>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Vous ne payez rien avant la fin des 14 jours d&apos;essai. Si Dopaguard ne vous a rien appris d&apos;utile
          sur ce que les IA disent de votre entreprise, annulez avant la fin de l&apos;essai : vous ne serez jamais
          débité.
        </p>
      </div>
    </section>
  );
}
