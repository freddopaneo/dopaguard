import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VERTICALS, getVerticalBySlug, type VerticalMeta } from "@/lib/verticals";
import { CITIES, getCityBySlug } from "@/lib/cities";
import { getCityVerticalContent, mergePainExamples } from "@/lib/city-verticals";
import { getArticleBySlug } from "@/lib/blog/articles";
import { getAppUrl } from "@/lib/app-url";
import { ORGANIZATION_JSON_LD, PRODUCT_JSON_LD } from "@/lib/jsonld";
import { VerticalHero } from "@/components/verticals/VerticalHero";
import { VerticalCityContext } from "@/components/verticals/VerticalCityContext";
import { VerticalPainPoints } from "@/components/verticals/VerticalPainPoints";
import { VerticalFaq } from "@/components/verticals/VerticalFaq";
import { WhyContinuousMonitoring } from "@/components/landing/WhyContinuousMonitoring";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingTable } from "@/components/landing/PricingTable";
import { About } from "@/components/landing/About";
import { Footer } from "@/components/landing/Footer";

// Un angle H1 par verticale, avec la ville inseree au bon endroit grammaticalement --
// impossible a generaliser automatiquement vu la diversite des tournures des 7 angles
// existants (lib/verticals.ts), donc un petit gabarit dedie par verticale plutot qu'une
// insertion generique qui produirait des phrases bancales.
const CITY_ANGLE_TEMPLATES: Record<string, (cityName: string) => { angle: string; heroHighlight: string }> = {
  hotels: (city) => ({ angle: `ChatGPT recommande-t-il votre hôtel à ${city} ?`, heroHighlight: "ChatGPT" }),
  restaurants: (city) => ({
    angle: `À ${city}, quelle adresse l'IA recommande-t-elle à votre place ?`,
    heroHighlight: "l'IA",
  }),
  immobilier: (city) => ({ angle: `Quelle agence ChatGPT recommande-t-il à ${city} ?`, heroHighlight: "ChatGPT" }),
  "avocats-professions-liberales": (city) => ({
    angle: `À ${city}, que dit une IA lorsqu'un prospect demande qui vous êtes ?`,
    heroHighlight: "une IA",
  }),
  "consultants-coachs-agences": (city) => ({
    angle: `À ${city}, êtes-vous visible lorsqu'un prospect cherche un expert avec une IA ?`,
    heroHighlight: "une IA",
  }),
  "commerce-ecommerce": (city) => ({
    angle: `À ${city}, quelle boutique l'IA recommande-t-elle à votre place ?`,
    heroHighlight: "l'IA",
  }),
  "sante-cabinets-medicaux": (city) => ({
    angle: `À ${city}, que répond une IA quand un patient cherche votre cabinet ?`,
    heroHighlight: "une IA",
  }),
};

export function generateStaticParams() {
  return VERTICALS.flatMap((vertical) => CITIES.map((city) => ({ slug: vertical.slug, ville: city.slug })));
}

export function generateMetadata({ params }: { params: { slug: string; ville: string } }): Metadata {
  const vertical = getVerticalBySlug(params.slug);
  const city = getCityBySlug(params.ville);
  if (!vertical || !city) return {};

  // Le titre generique des pages verticales est une accroche marketing (bonne pour le
  // H1 et les IA generatives), pas un titre oriente mots-cles pour Google -- ici on part
  // volontairement sur un format different, plus proche de la requete tapee.
  const title = `Surveillance réputation IA — ${vertical.label} à ${city.name}`;

  const objectMatch = vertical.metaDescription.match(/disent de (?:votre|vos) ([^,]+),/);
  const object = objectMatch ? objectMatch[1] : vertical.label.toLowerCase();
  const surveillanceMatch = vertical.metaDescription.match(/et surveillez (.+?) dans les IA/);
  const surveillance = surveillanceMatch ? surveillanceMatch[1] : "votre réputation";
  const description = `Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre ${object} à ${city.name}, et surveillez ${surveillance} dans les IA chaque semaine.`;

  const url = `${getAppUrl()}/secteurs/${vertical.slug}/${city.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

function buildCityVertical(vertical: VerticalMeta, cityName: string, painExampleOverride?: VerticalMeta["painExamples"][number]): VerticalMeta {
  const template = CITY_ANGLE_TEMPLATES[vertical.slug];
  const { angle, heroHighlight } = template
    ? template(cityName)
    : { angle: vertical.angle, heroHighlight: vertical.heroHighlight };

  return {
    ...vertical,
    angle,
    heroHighlight,
    heroKicker: `${vertical.heroKicker} · ${cityName}`,
    painExamples: mergePainExamples(vertical.painExamples, painExampleOverride),
  };
}

export default function CityVerticalPage({ params }: { params: { slug: string; ville: string } }) {
  const vertical = getVerticalBySlug(params.slug);
  const city = getCityBySlug(params.ville);
  if (!vertical || !city) {
    notFound();
  }

  const content = getCityVerticalContent(vertical.slug, city.slug);
  if (!content) {
    notFound();
  }

  const cityVertical = buildCityVertical(vertical, city.name, content.painExampleOverride);
  const relatedArticle = getArticleBySlug(vertical.relatedArticleSlug);

  return (
    <div className="min-h-screen bg-dopaguard-cream text-dopaguard-navy">
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSON_LD) }} />

      <VerticalHero vertical={cityVertical} />
      <VerticalCityContext vertical={vertical} city={city} localParagraph={content.localParagraph} />

      <WhyContinuousMonitoring />
      <VerticalPainPoints vertical={cityVertical} />
      <HowItWorks />
      <PricingTable />
      <VerticalFaq vertical={vertical} />

      <section className="mx-auto flex max-w-3xl flex-col gap-3 px-6 pb-14 sm:flex-row">
        <a
          href={`/secteurs/${vertical.slug}`}
          className="flex flex-1 flex-col gap-2 rounded-2xl border border-dopaguard-muted bg-white p-6 hover:border-dopaguard-navy/30"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">Voir aussi</span>
          <span className="font-semibold text-dopaguard-navy">{vertical.label} — toutes les villes</span>
        </a>
        {relatedArticle && (
          <a
            href={`/blog/${relatedArticle.slug}`}
            className="flex flex-1 flex-col gap-2 rounded-2xl border border-dopaguard-muted bg-white p-6 hover:border-dopaguard-navy/30"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">
              Pour aller plus loin
            </span>
            <span className="font-semibold text-dopaguard-navy">{relatedArticle.title}</span>
          </a>
        )}
      </section>

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
