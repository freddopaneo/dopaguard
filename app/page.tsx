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
import { MotTournant } from "@/components/landing/MotTournant";
import { RadarIA } from "@/components/landing/RadarIA";
import { Nuages } from "@/components/ui/Nuages";
import { getAppUrl } from "@/lib/app-url";
import { ORGANIZATION_JSON_LD, PRODUCT_JSON_LD } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: { absolute: "Dopaguard — Surveillance de réputation dans ChatGPT, Claude, Gemini, Perplexity" },
  description:
    "Découvrez gratuitement ce que ChatGPT, Claude, Gemini et Perplexity disent de votre entreprise, puis surveillez votre réputation IA chaque semaine.",
  alternates: { canonical: getAppUrl() },
};

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen bg-dopaguard-cream text-dopaguard-navy">
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSON_LD) }} />

      <Nuages />

      <div className="relative z-10">
        <SiteHeader />

        <main className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-10 sm:pb-28 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-flex animate-monte items-center gap-2.5 rounded-full border border-dopaguard-navy/10 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-dopaguard-navyMid shadow-sm [animation-delay:.05s]">
              <span className="relative h-2 w-2 rounded-full bg-dopaguard-teal">
                <span className="absolute -inset-1 animate-pulse-dot rounded-full bg-dopaguard-teal/50" />
              </span>
              Scan gratuit · Sans carte bancaire · Résultat en 3 minutes
            </span>

            <h1 className="mt-7 animate-monte text-5xl font-bold leading-[1.06] tracking-[-0.025em] text-dopaguard-navy [animation-delay:.15s] sm:text-6xl xl:text-[68px]">
              Savez-vous ce que{" "}
              <MotTournant mots={["ChatGPT", "Claude", "Gemini", "Perplexity", "Mistral"]} />{" "}
              dit de votre entreprise&nbsp;?
            </h1>

            <p className="mt-6 max-w-2xl animate-monte text-lg leading-relaxed text-dopaguard-navyMid/90 [animation-delay:.25s]">
              Les IA recommandent votre marque à vos futurs clients chaque jour — ou la desservent,
              sans que vous le sachiez. Et ce qu&apos;elles en disent change en permanence. Dopaguard
              surveille votre réputation dans les 5 grandes IA, semaine après semaine, et vous alerte
              dès que ça dérape.
            </p>

            <span className="mt-6 inline-flex animate-monte items-center gap-2 rounded-full border border-dopaguard-lime bg-dopaguard-lime/25 px-3.5 py-1.5 text-xs font-medium text-dopaguard-navy [animation-delay:.35s]">
              <span className="h-1.5 w-1.5 rounded-full bg-dopaguard-navy" />
              Les 20 premiers comptes : session de configuration personnelle avec le fondateur
            </span>
          </div>

          <div id="scan-form" className="relative scroll-mt-24 animate-monte [animation-delay:.3s]">
            {/* Radar animé : la marque de Dopaguard, en mouvement, derrière le formulaire */}
            <RadarIA className="pointer-events-none absolute -right-10 -top-24 hidden h-56 w-56 opacity-90 lg:block xl:-right-16 xl:-top-28 xl:h-64 xl:w-64" />
            <div className="relative">
              <ScanForm />
            </div>
          </div>
        </main>
      <WhyContinuousMonitoring />
      <HowItWorks />
      <DetectionTypes />
      <PricingTable />
      <Faq />
      <About />

      <section className="mx-auto max-w-3xl px-6 py-12 text-center sm:py-20" data-reveal>
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Ce que l&apos;IA dit de vous change cette semaine. Le saurez-vous ?
        </h2>
        <a
          href="#scan-form"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-dopaguard-navy px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(19,55,66,.6)] transition hover:-translate-y-0.5 hover:bg-dopaguard-navyMid"
        >
          Lancer mon scan gratuit (3 min)
        </a>
      </section>

      <Footer />
      </div>
    </div>
  );
}
