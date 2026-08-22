"use client";

import { useState } from "react";
import type { VerticalMeta } from "@/lib/verticals";

export function VerticalFaq({ vertical }: { vertical: VerticalMeta }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: vertical.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-14 sm:py-24">
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h2 className="text-center text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
        Questions fréquentes — {vertical.label}
      </h2>

      <div className="mt-10 flex flex-col gap-3">
        {vertical.faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="rounded-2xl border border-dopaguard-muted bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-medium text-dopaguard-navy">{item.question}</span>
                <span className="shrink-0 text-xl text-dopaguard-navyMid/60">{isOpen ? "−" : "+"}</span>
              </button>
              {/* Toujours présent dans le HTML (visible aux robots qui n'exécutent pas
                  JS, dont la plupart des robots IA) -- seul l'affichage est contrôlé
                  par CSS, jamais le rendu React. */}
              <p
                className={`px-5 pb-4 text-sm leading-relaxed text-dopaguard-navyMid/80 ${isOpen ? "block" : "hidden"}`}
              >
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
