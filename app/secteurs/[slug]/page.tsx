import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VERTICALS, getVerticalBySlug } from "@/lib/verticals";
import { getArticleBySlug } from "@/lib/blog/articles";
import { getAppUrl } from "@/lib/app-url";
import { ORGANIZATION_JSON_LD, PRODUCT_JSON_LD } from "@/lib/jsonld";
import { VerticalHero } from "@/components/verticals/VerticalHero";
import { VerticalPainPoints } from "@/components/verticals/VerticalPainPoints";
import { VerticalFaq } from "@/components/verticals/VerticalFaq";
import { VerticalCityLinks } from "@/components/verticals/VerticalCityLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhyContinuousMonitoring } from "@/components/landing/WhyContinuousMonitoring";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingTable } from "@/components/landing/PricingTable";
import { About } from "@/components/landing/About";
import { Footer } from "@/components/landing/Footer";

export function generateStaticParams() {
  return VERTICALS.map((vertical) => ({ slug: vertical.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const vertical = getVerticalBySlug(params.slug);
  if (!vertical) return {};

  const url = `${getAppUrl()}/secteurs/${vertical.slug}`;
  return {
    title: vertical.metaTitle,
    description: vertical.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: vertical.metaTitle,
      description: vertical.metaDescription,
      url,
      type: "website",
    },
  };
}

export default function VerticalPage({ params }: { params: { slug: string } }) {
  const vertical = getVerticalBySlug(params.slug);
  if (!vertical) {
    notFound();
  }

  const relatedArticle = getArticleBySlug(vertical.relatedArticleSlug);

  return (
    <div className="min-h-screen bg-dopaguard-cream text-dopaguard-navy">
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSON_LD) }} />

      <VerticalHero vertical={vertical} />

      <div className="mx-auto max-w-5xl px-6 pt-6">
        <Breadcrumbs
          items={[{ label: "Accueil", href: "/" }, { label: "Secteurs", href: "/secteurs" }, { label: vertical.label }]}
        />
      </div>

      <WhyContinuousMonitoring />
      <VerticalPainPoints vertical={vertical} />
      <HowItWorks />
      <PricingTable />
      <VerticalFaq vertical={vertical} />
      <VerticalCityLinks vertical={vertical} />

      {relatedArticle && (
        <section className="mx-auto max-w-3xl px-6 pb-14">
          <a
            href={`/blog/${relatedArticle.slug}`}
            className="flex flex-col gap-2 rounded-2xl border border-dopaguard-muted bg-white p-6 hover:border-dopaguard-navy/30"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">
              Pour aller plus loin
            </span>
            <span className="font-semibold text-dopaguard-navy">{relatedArticle.title}</span>
            <span className="text-sm text-dopaguard-navyMid/70">{relatedArticle.description}</span>
          </a>
        </section>
      )}

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
