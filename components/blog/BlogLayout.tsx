import Link from "next/link";
import { Nuages } from "@/components/ui/Nuages";
import { CATEGORY_LABELS, type BlogArticleMeta } from "@/lib/blog/articles";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function BlogLayout({ meta, children }: { meta: BlogArticleMeta; children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-dopaguard-cream px-6 py-12 text-dopaguard-navy">
      <Nuages />
      <div className="relative z-10 mx-auto max-w-2xl">
        <Breadcrumbs
          items={[{ label: "Accueil", href: "/" }, { label: "Blog", href: "/blog" }, { label: meta.title }]}
        />
        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">
          {CATEGORY_LABELS[meta.category]}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{meta.title}</h1>
        <div className="mt-6 flex flex-col gap-5 text-sm leading-relaxed text-dopaguard-navyMid">{children}</div>

        <div data-reveal className="mt-12 rounded-2xl border border-dopaguard-teal/40 bg-gradient-to-br from-dopaguard-teal/20 via-white to-dopaguard-lime/25 p-6 text-center shadow-[0_24px_48px_-32px_rgba(19,55,66,.35)]">
          <p className="font-semibold text-dopaguard-navy">
            Découvrez gratuitement ce que les IA disent de votre entreprise.
          </p>
          <p className="mt-1 text-sm text-dopaguard-navyMid/80">Scan gratuit, résultat en 3 minutes, sans carte bancaire.</p>
          <Link
            href="/#scan-form"
            className="mt-4 inline-block rounded-full bg-dopaguard-navy px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(19,55,66,.6)] transition hover:-translate-y-0.5 hover:bg-dopaguard-navyMid"
          >
            Lancer mon scan gratuit →
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-dopaguard-navyMid/60">
          Votre activité a son propre angle :{" "}
          <Link href="/secteurs" className="font-medium text-dopaguard-navy underline underline-offset-2">
            découvrez les pages par secteur
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
