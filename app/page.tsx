import type { Metadata } from "next";
import { ScanForm } from "@/components/ScanForm";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { WhyContinuousMonitoring } from "@/components/landing/WhyContinuousMonitoring";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DetectionTypes } from "@/components/landing/DetectionTypes";
import { PricingTable } from "@/components/landing/PricingTable";
import { Faq } from "@/components/landing/Faq";
import { About } from "@/components/landing/About";
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

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-dopaguard-cream text-dopaguard-navy">
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
        <SiteHeader />

        <main className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-6 sm:pb-28 sm:pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-dopaguard-lime" />
              Scan gratuit · Résultat en 3 minutes
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl xl:text-7xl">
              Savez-vous ce que <span className="text-dopaguard-lime">ChatGPT</span>,{" "}
              <span className="text-dopaguard-lime">Claude</span> et{" "}
              <span className="text-dopaguard-lime">Perplexity</span> disent de votre
              entreprise ?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              ChatGPT, Gemini et Perplexity recommandent votre marque à vos futurs clients chaque
              jour — ou la desservent, sans que vous le sachiez. Et ce qu&apos;ils en disent change
              en permanence. Dopaguard surveille votre réputation dans les 5 grandes IA, semaine
              après semaine, et vous alerte dès que ça dérape.
            </p>
          </div>

          <div id="scan-form" className="scroll-mt-24">
            <ScanForm />
          </div>
        </main>
      </div>

      <WhyContinuousMonitoring />
      <HowItWorks />
      <DetectionTypes />
      <PricingTable />
      <Faq />
      <About />

      <section className="mx-auto max-w-3xl px-6 py-12 text-center sm:py-20">
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
