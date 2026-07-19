import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_ARTICLES, CATEGORY_LABELS } from "@/lib/blog/articles";

export const metadata: Metadata = {
  title: "Blog — Réputation IA",
  description:
    "Conseils et guides pour comprendre et surveiller ce que les IA génératives (ChatGPT, Claude, Gemini, Perplexity) disent de votre entreprise.",
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-dopaguard-cream px-6 py-12 text-dopaguard-navy">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-xs font-semibold text-dopaguard-navyMid/60 hover:text-dopaguard-navyMid">
          ← {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Blog</h1>
        <p className="mt-2 max-w-xl text-sm text-dopaguard-navyMid/80">
          Comprendre et surveiller ce que les IA génératives disent de votre entreprise.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="flex flex-col gap-2 rounded-2xl border border-dopaguard-muted bg-white p-5 hover:border-dopaguard-navy/30"
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
