import Link from "next/link";
import type { Metadata } from "next";
import { VERTICALS } from "@/lib/verticals";
import { getAppUrl } from "@/lib/app-url";

export const metadata: Metadata = {
  title: "Solutions par secteur d'activité",
  description:
    "Dopaguard adapté à votre secteur : hôtels, restaurants, immobilier, avocats et professions libérales, consultants, coachs et agences.",
  alternates: { canonical: `${getAppUrl()}/secteurs` },
};

export default function VerticalsIndexPage() {
  return (
    <div className="min-h-screen bg-dopaguard-cream px-6 py-12 text-dopaguard-navy">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-xs font-semibold text-dopaguard-navyMid/60 hover:text-dopaguard-navyMid">
          ← {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Solutions par secteur d&apos;activité</h1>
        <p className="mt-2 max-w-xl text-sm text-dopaguard-navyMid/80">
          Ce que les IA génératives disent de votre entreprise dépend de votre métier. Découvrez l&apos;angle
          spécifique à votre secteur.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {VERTICALS.map((vertical) => (
            <Link
              key={vertical.slug}
              href={`/secteurs/${vertical.slug}`}
              className="flex flex-col gap-2 rounded-2xl border border-dopaguard-muted bg-white p-5 hover:border-dopaguard-navy/30"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">
                {vertical.label}
              </span>
              <span className="font-semibold text-dopaguard-navy">{vertical.angle}</span>
              <span className="text-sm text-dopaguard-navyMid/70">{vertical.metaDescription}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
