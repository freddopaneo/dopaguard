import type { Metadata } from "next";
import { GLOSSARY_TERMS } from "@/lib/glossary";
import { getAppUrl } from "@/lib/app-url";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Glossaire — Réputation IA",
  description:
    "GEO, hallucination IA, LLM, fiche de vérité... Les termes à connaître pour comprendre la réputation d'une entreprise dans les IA génératives.",
  alternates: { canonical: `${getAppUrl()}/glossaire` },
};

export default function GlossaryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glossaire de la réputation IA",
    hasDefinedTerm: GLOSSARY_TERMS.map((term) => ({
      "@type": "DefinedTerm",
      name: term.term,
      description: term.definition,
    })),
  };

  return (
    <div className="min-h-screen bg-dopaguard-cream px-6 py-12 text-dopaguard-navy">
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-2xl">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Glossaire" }]} />

        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Glossaire de la réputation IA</h1>
        <p className="mt-3 text-sm leading-relaxed text-dopaguard-navyMid/80">
          Les termes utilisés sur ce site, expliqués simplement. Pas de jargon inutile : chaque définition tient en
          quelques phrases.
        </p>

        <dl className="mt-10 flex flex-col gap-8">
          {GLOSSARY_TERMS.map((term) => (
            <div key={term.slug} id={term.slug} className="scroll-mt-24 border-t border-dopaguard-muted pt-6">
              <dt className="text-lg font-semibold text-dopaguard-navy">{term.term}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-dopaguard-navyMid/80">{term.definition}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 rounded-2xl border border-dopaguard-muted bg-white p-6 text-center">
          <p className="font-semibold text-dopaguard-navy">
            Découvrez gratuitement ce que les IA disent de votre entreprise.
          </p>
          <p className="mt-1 text-sm text-dopaguard-navyMid/80">Scan gratuit, résultat en 3 minutes, sans carte bancaire.</p>
          <a
            href="/#scan-form"
            className="mt-4 inline-block rounded-xl bg-dopaguard-navy px-5 py-2.5 text-sm font-semibold text-white"
          >
            Lancer mon scan gratuit →
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-2xl">
        <Footer />
      </div>
    </div>
  );
}
