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

// Icones SVG dessinees a la main, une par type d'anomalie (convention du projet :
// SVG inline, aucune lib graphique). Traits navy, le rouge reste reserve au petit
// point d'alerte pour ne pas saturer la section de rouge.
function FactErrorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 15.5l5 3M14.5 15.5l-5 3" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NegativeSentimentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-7l-4 4v-4H6a2 2 0 01-2-2V6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 11c1.2-1.4 2.6-1.4 4 0s2.8 1.4 4 0" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CompetitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <circle cx="7" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="3.2" stroke="#EF4444" strokeWidth="1.6" />
      <path d="M9.5 13.5L14 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.2 8.6l1.6-.4-.4 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HallucinationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M7 15a4 4 0 011-7.9A5 5 0 0117.6 9 3.5 3.5 0 0117 15.9H7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10.6 11.2c0-.9.7-1.5 1.5-1.5s1.5.6 1.5 1.4c0 1-1.5 1-1.5 2" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12.1" cy="15.1" r="0.9" fill="#EF4444" />
    </svg>
  );
}

function OutdatedInfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ANOMALY_TYPES = [
  { label: "Erreur factuelle", icon: FactErrorIcon },
  { label: "Sentiment négatif", icon: NegativeSentimentIcon },
  { label: "Concurrent recommandé", icon: CompetitorIcon },
  { label: "Hallucination", icon: HallucinationIcon },
  { label: "Information datée", icon: OutdatedInfoIcon },
];

function AiAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-dopaguard-navy">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-dopaguard-lime" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="12" y1="12" x2="16.5" y2="7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}

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

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ANOMALY_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-dopaguard-muted bg-white px-4 py-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-dopaguard-teal/50 hover:shadow-[0_16px_40px_-20px_rgba(13,46,56,0.35)]"
            >
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-dopaguard-muted text-dopaguard-navy">
                <Icon />
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-dopaguard-critical" />
              </span>
              <span className="text-sm font-semibold leading-tight text-dopaguard-navy">{type.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-14 grid items-stretch gap-x-8 gap-y-4 sm:grid-cols-3">
        {/* Rangee de badges alignee (desktop uniquement -- sur mobile chaque carte
            porte son badge, sinon les 3 badges s'empilent detaches de leurs cartes). */}
        {EXAMPLE_GROUPS.map((group) => (
          <span
            key={group.label}
            className={`hidden w-fit items-center rounded-full px-3 py-1 text-xs font-semibold sm:inline-flex ${ACCENT_BADGE[group.accent]}`}
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
                className={`flex h-full flex-col gap-3 rounded-2xl border bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(13,46,56,0.35)] ${ACCENT_BORDER[group.accent]}`}
              >
                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold sm:hidden ${ACCENT_BADGE[group.accent]}`}
                >
                  {group.label}
                </span>
                <div className="flex items-start gap-2.5">
                  <AiAvatar />
                  <div className="flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-dopaguard-navyMid/50">
                      Réponse d&apos;une IA
                    </p>
                    <div className="mt-1.5 rounded-2xl rounded-tl-sm bg-dopaguard-muted/60 px-3.5 py-2.5">
                      <p className="text-sm leading-relaxed text-dopaguard-navyMid">
                        <HighlightedText text={example.quote} excerpts={[example.highlight]} />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex items-start gap-2 border-t border-dopaguard-muted pt-3">
                  <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-dopaguard-critical" aria-hidden>
                    <path
                      d="M12 4l9 16H3l9-16z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path d="M12 10v4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="12" cy="17" r="0.9" fill="currentColor" />
                  </svg>
                  <p className="text-xs leading-relaxed text-dopaguard-navyMid/70">{example.note}</p>
                </div>
              </div>
            );
          }),
        )}
      </div>
    </section>
  );
}
