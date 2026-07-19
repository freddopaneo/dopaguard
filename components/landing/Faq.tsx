"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Est-ce vraiment un sujet, ou un phénomène anecdotique ?",
    answer:
      "De plus en plus de décisions d'achat commencent par une question posée à une IA plutôt qu'à un moteur de recherche. Ce que l'IA répond sur vous oriente ces décisions — en votre faveur ou non. L'angle mort, c'est que personne ne vous prévient quand la réponse est fausse.",
  },
  {
    question: "Je peux le vérifier moi-même, non ?",
    answer:
      "Ponctuellement, oui. Mais il faudrait interroger 5 IA, avec des dizaines de questions, chaque semaine, comparer chaque réponse à vos informations exactes, et détecter les écarts. Dopaguard automatise tout cela et vous alerte uniquement quand c'est nécessaire.",
  },
  {
    question: "Pourquoi un abonnement plutôt qu'une vérification ponctuelle ?",
    answer:
      "Parce qu'une vérification ponctuelle est périmée la semaine suivante. Vos infos changent, les IA se mettent à jour, de nouveaux contenus apparaissent. La valeur n'est pas dans le constat d'un jour, mais dans la surveillance dans la durée.",
  },
  {
    question: "Mes données sont-elles confidentielles ?",
    answer:
      "Oui. Vos informations et vos rapports ne sont jamais partagés. Vous pouvez supprimer votre compte et vos données à tout moment.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      <h2 className="text-center text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
        Questions fréquentes
      </h2>

      <div className="mt-10 flex flex-col gap-3">
        {FAQ_ITEMS.map((item, index) => {
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
