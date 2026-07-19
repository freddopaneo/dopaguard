import type { Metadata } from "next";
import { ScanForm } from "@/components/ScanForm";
import { WhyContinuousMonitoring } from "@/components/landing/WhyContinuousMonitoring";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DetectionTypes } from "@/components/landing/DetectionTypes";
import { PricingTable } from "@/components/landing/PricingTable";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { getAppUrl } from "@/lib/app-url";
import { PLAN_PRICES_EUR } from "@/lib/stripe/plans";

export const metadata: Metadata = {
  title: { absolute: "Dopaguard — Surveillance de réputation dans ChatGPT, Claude, Gemini, Perplexity" },
  description:
    "Découvrez gratuitement ce que ChatGPT, Claude, Gemini et Perplexity disent de votre entreprise, puis surveillez votre réputation IA chaque semaine.",
  alternates: { canonical: getAppUrl() },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dopaguard",
  url: getAppUrl(),
  parentOrganization: { "@type": "Organization", name: "Dopaneo.ai" },
};

const PRODUCT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dopaguard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Surveillance hebdomadaire de la réputation d'une entreprise dans les IA génératives.",
  offers: [
    { "@type": "Offer", name: "Essentiel", price: PLAN_PRICES_EUR.essentiel, priceCurrency: "EUR" },
    { "@type": "Offer", name: "Pro", price: PLAN_PRICES_EUR.pro, priceCurrency: "EUR" },
    { "@type": "Offer", name: "Agence", price: PLAN_PRICES_EUR.agence, priceCurrency: "EUR" },
  ],
};

function RadarLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-dopaguard-lime" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="12" y1="12" x2="17.5" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="16.5" cy="8" r="1.3" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-dopaguard-cream text-dopaguard-navy">
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSON_LD) }} />
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)",
        }}
      >
        <header className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-6 py-8">
          <div className="flex items-center gap-2">
            <RadarLogo />
            <span className="text-sm font-semibold tracking-tight text-white">
              {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
            </span>
          </div>
          <a href="/login" className="text-xs font-medium text-white/60 underline-offset-2 hover:text-white hover:underline">
            Se connecter
          </a>
        </header>

        <main className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-8 text-center sm:pb-32 sm:pt-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-dopaguard-lime" />
            Scan gratuit · Résultat en 3 minutes
          </span>

          <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Savez-vous ce que <span className="text-dopaguard-lime">ChatGPT</span>,{" "}
            <span className="text-dopaguard-lime">Claude</span> et{" "}
            <span className="text-dopaguard-lime">Perplexity</span> disent de votre
            entreprise ?
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            ChatGPT, Gemini et Perplexity recommandent votre marque à vos futurs clients chaque
            jour — ou la desservent, sans que vous le sachiez. Et ce qu&apos;ils en disent change
            en permanence. Dopaguard surveille votre réputation dans les 5 grandes IA, semaine
            après semaine, et vous alerte dès que ça dérape.
          </p>

          <div id="scan-form" className="mt-10 w-full scroll-mt-24">
            <ScanForm />
          </div>
        </main>
      </div>

      <WhyContinuousMonitoring />
      <HowItWorks />
      <DetectionTypes />
      <PricingTable />
      <Faq />

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Ce que l&apos;IA dit de vous change cette semaine. Le saurez-vous ?
        </h2>
        <a
          href="#scan-form"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-dopaguard-navy px-6 py-3 text-sm font-semibold text-white hover:bg-dopaguard-navyMid"
        >
          Lancer mon scan gratuit (2 min)
        </a>
      </section>

      <Footer />
    </div>
  );
}
