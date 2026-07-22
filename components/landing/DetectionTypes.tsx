import { HighlightedText } from "@/components/HighlightedText";

type Accent = "teal" | "lime" | "navy";

const ACCENT_BADGE: Record<Accent, string> = {
  teal: "bg-dopaguard-teal text-dopaguard-navy",
  lime: "bg-dopaguard-lime text-dopaguard-navy",
  navy: "bg-dopaguard-navy text-white",
};

const ACCENT_BORDER: Record<Accent, string> = {
  teal: "border-dopaguard-teal/40",
  lime: "border-dopaguard-lime/50",
  navy: "border-dopaguard-navy/20",
};

const ANOMALY_TYPES = [
  "Erreur factuelle",
  "Sentiment négatif",
  "Concurrent recommandé",
  "Hallucination",
  "Information datée",
];

const EXAMPLE_GROUPS: {
  label: string;
  accent: Accent;
  examples: { quote: string; highlight: string; note: string }[];
}[] = [
  {
    label: "Profession libérale",
    accent: "teal",
    examples: [
      {
        quote: "Il semblerait que ce cabinet ait cessé son activité, aucune information récente n'est disponible.",
        highlight: "cessé son activité",
        note: "Une IA a laissé entendre qu'un professionnel indépendant avait arrêté son activité, sans preuve récente.",
      },
      {
        quote: "Pour ce type de dossier, mieux vaut consulter un cabinet plus expérimenté dans ce domaine.",
        highlight: "un cabinet plus expérimenté",
        note: "Une IA a orienté l'utilisateur vers un concurrent plutôt que vers le professionnel interrogé.",
      },
    ],
  },
  {
    label: "Hôtel",
    accent: "lime",
    examples: [
      {
        quote: "Cet hôtel a reçu plusieurs avis mentionnant des problèmes de propreté récurrents récemment.",
        highlight: "problèmes de propreté récurrents",
        note: "Une IA a relayé un sentiment négatif non vérifié sur la qualité réelle de l'établissement.",
      },
      {
        quote: "Les chambres standard sont proposées à partir de 45€ la nuit, selon les dernières données.",
        highlight: "45€ la nuit",
        note: "Une IA a cité un tarif obsolète, en dessous des prix actuellement pratiqués par l'hôtel.",
      },
    ],
  },
  {
    label: "Entreprise",
    accent: "navy",
    examples: [
      {
        quote: "Cette entreprise a cessé son activité en 2022 et ne serait plus opérationnelle aujourd'hui.",
        highlight: "cessé son activité en 2022",
        note: "Une IA a déclaré fermée une entreprise pourtant toujours active et en développement.",
      },
      {
        quote: "Leurs tarifs démarrent autour de 15€ par mois pour l'offre de base, d'après nos informations.",
        highlight: "15€ par mois",
        note: "Une IA a cité un tarif obsolète, changé depuis plus d'un an par cette entreprise.",
      },
    ],
  },
];

export function DetectionTypes() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Ce que Dopaguard détecte
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-dopaguard-navyMid/80">
          Chaque réponse d&apos;IA est analysée pour repérer 5 types d&apos;anomalies.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {ANOMALY_TYPES.map((type) => (
          <span
            key={type}
            className="rounded-full border border-dopaguard-critical/30 bg-dopaguard-critical/10 px-4 py-1.5 text-sm font-medium text-dopaguard-critical"
          >
            {type}
          </span>
        ))}
      </div>

      <div className="mt-14 grid items-stretch gap-x-10 gap-y-4 sm:grid-cols-3">
        {EXAMPLE_GROUPS.map((group) => (
          <span
            key={group.label}
            className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${ACCENT_BADGE[group.accent]}`}
          >
            {group.label}
          </span>
        ))}

        {[0, 1].map((exampleIndex) =>
          EXAMPLE_GROUPS.map((group) => {
            const example = group.examples[exampleIndex];
            return (
              <div
                key={`${group.label}-${exampleIndex}`}
                className={`relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border bg-white p-5 text-left ${ACCENT_BORDER[group.accent]}`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-6 select-none text-7xl font-serif text-dopaguard-muted"
                >
                  &ldquo;
                </span>
                <p className="relative flex-1 text-sm leading-relaxed text-dopaguard-navyMid">
                  <HighlightedText text={example.quote} excerpts={[example.highlight]} />
                </p>
                <p className="relative border-t border-dopaguard-muted pt-2.5 text-xs text-dopaguard-navyMid/60">
                  {example.note}
                </p>
              </div>
            );
          }),
        )}
      </div>
    </section>
  );
}
