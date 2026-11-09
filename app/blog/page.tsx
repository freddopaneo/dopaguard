import Link from "next/link";
import { Nuages } from "@/components/ui/Nuages";
import type { Metadata } from "next";
import { BLOG_ARTICLES, CATEGORY_LABELS } from "@/lib/blog/articles";
import { getAppUrl } from "@/lib/app-url";

export const metadata: Metadata = {
  title: "Blog — Réputation IA",
  description:
    "Conseils et guides pour comprendre et surveiller ce que les IA génératives (ChatGPT, Claude, Gemini, Perplexity) disent de votre entreprise.",
  alternates: { canonical: `${getAppUrl()}/blog` },
};

export default function BlogIndexPage() {
  return (
    <div className="relative min-h-screen bg-dopaguard-cream px-6 py-12 text-dopaguard-navy">
      <Nuages />
      <div className="relative z-10 mx-auto max-w-4xl">
        <Link href="/" className="text-xs font-semibold text-dopaguard-navyMid/60 hover:text-dopaguard-navyMid">
          ← {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Blog</h1>
        <p className="mt-2 max-w-xl text-sm text-dopaguard-navyMid/80">
          Comprendre et surveiller ce que les IA génératives disent de votre entreprise.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              data-reveal
              className="card-hover flex flex-col gap-2 rounded-2xl border border-dopaguard-muted bg-white/90 p-5 hover:-translate-y-1 hover:border-dopaguard-teal/50 hover:shadow-[0_24px_48px_-32px_rgba(19,55,66,.35)]"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">
                {CATEGORY_LABELS[article.category]}
              </span>
              <span className="font-semibold text-dopaguard-navy">{article.title}</span>
              <span className="text-sm text-dopaguard-navyMid/70">{article.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
