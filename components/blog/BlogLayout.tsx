import Link from "next/link";
import { CATEGORY_LABELS, type BlogArticleMeta } from "@/lib/blog/articles";

export function BlogLayout({ meta, children }: { meta: BlogArticleMeta; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dopaguard-cream px-6 py-12 text-dopaguard-navy">
      <div className="mx-auto max-w-2xl">
        <Link href="/blog" className="text-xs font-semibold text-dopaguard-navyMid/60 hover:text-dopaguard-navyMid">
          ← Blog {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">
          {CATEGORY_LABELS[meta.category]}
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{meta.title}</h1>
        <div className="mt-6 flex flex-col gap-5 text-sm leading-relaxed text-dopaguard-navyMid">{children}</div>

        <div className="mt-12 rounded-2xl border border-dopaguard-muted bg-white p-6 text-center">
          <p className="font-semibold text-dopaguard-navy">
            Découvrez gratuitement ce que les IA disent de votre entreprise.
          </p>
          <p className="mt-1 text-sm text-dopaguard-navyMid/80">Scan gratuit, résultat en 3 minutes, sans carte bancaire.</p>
          <Link
            href="/#scan-form"
            className="mt-4 inline-block rounded-xl bg-dopaguard-navy px-5 py-2.5 text-sm font-semibold text-white"
          >
            Lancer mon scan gratuit →
          </Link>
        </div>
      </div>
    </div>
  );
}
