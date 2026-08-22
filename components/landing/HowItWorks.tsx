// Illustrations SVG dessinees a la main (convention du projet : aucune lib
// graphique, meme approche que ScoreGauge/ScanScoreGauge et le logo radar).

function TruthSheetIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full" aria-hidden>
      {/* Document */}
      <rect x="52" y="10" width="96" height="104" rx="8" fill="white" stroke="#133742" strokeOpacity="0.15" />
      {/* Bandeau titre */}
      <rect x="64" y="22" width="52" height="7" rx="3.5" fill="#133742" />
      <rect x="64" y="33" width="34" height="5" rx="2.5" fill="#1e4d5e" opacity="0.35" />
      {/* Lignes validées */}
      {[50, 68, 86].map((y) => (
        <g key={y}>
          <circle cx="71" cy={y + 2.5} r="6.5" fill="#c7ff98" />
          <path
            d={`M68 ${y + 2.5}l2.2 2.4 4-4.6`}
            stroke="#133742"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="84" y={y - 1} width="52" height="4.5" rx="2.25" fill="#1e4d5e" opacity="0.25" />
          <rect x="84" y={y + 5.5} width="34" height="3.5" rx="1.75" fill="#1e4d5e" opacity="0.12" />
        </g>
      ))}
      {/* Curseur / stylo de validation */}
      <circle cx="146" cy="102" r="13" fill="#60d9d1" />
      <path d="M141 102l3.4 3.6 6.2-7" stroke="#133742" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AiOrbitIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full" aria-hidden>
      {/* Orbites */}
      <circle cx="100" cy="60" r="46" stroke="#133742" strokeOpacity="0.12" strokeDasharray="3 5" />
      <circle cx="100" cy="60" r="28" stroke="#133742" strokeOpacity="0.18" />
      {/* Faisceaux vers les IA */}
      {[
        { x: 100, y: 14 },
        { x: 144, y: 46 },
        { x: 127, y: 98 },
        { x: 73, y: 98 },
        { x: 56, y: 46 },
      ].map((node) => (
        <line
          key={`${node.x}-${node.y}`}
          x1="100"
          y1="60"
          x2={node.x}
          y2={node.y}
          stroke="#60d9d1"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      ))}
      {/* Nœuds IA */}
      {[
        { x: 100, y: 14 },
        { x: 144, y: 46 },
        { x: 127, y: 98 },
        { x: 73, y: 98 },
        { x: 56, y: 46 },
      ].map((node, i) => (
        <g key={`n-${node.x}-${node.y}`}>
          <circle cx={node.x} cy={node.y} r="10" fill="white" stroke="#133742" strokeOpacity="0.2" />
          <circle cx={node.x} cy={node.y} r="4" fill={i % 2 === 0 ? "#60d9d1" : "#c7ff98"} />
        </g>
      ))}
      {/* Votre marque, au centre */}
      <circle cx="100" cy="60" r="14" fill="#133742" />
      <circle cx="100" cy="60" r="5" fill="#c7ff98" />
    </svg>
  );
}

function AlertIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full" aria-hidden>
      {/* Enveloppe */}
      <rect x="42" y="34" width="90" height="62" rx="8" fill="white" stroke="#133742" strokeOpacity="0.15" />
      <path
        d="M46 40l41 30 41-30"
        stroke="#1e4d5e"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pastille d'alerte */}
      <circle cx="132" cy="36" r="13" fill="#EF4444" />
      <rect x="130.6" y="29" width="2.8" height="9" rx="1.4" fill="white" />
      <circle cx="132" cy="42" r="1.7" fill="white" />
      {/* Mini-score en marge */}
      <rect x="146" y="62" width="38" height="34" rx="7" fill="white" stroke="#133742" strokeOpacity="0.15" />
      <rect x="152" y="86" width="7" height="5" rx="1.5" fill="#60d9d1" />
      <rect x="162" y="78" width="7" height="13" rx="1.5" fill="#60d9d1" />
      <rect x="172" y="70" width="7" height="21" rx="1.5" fill="#c7ff98" />
      {/* Ondes d'envoi */}
      <path d="M30 52a22 22 0 000 26" stroke="#60d9d1" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 46a32 32 0 000 38" stroke="#60d9d1" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const STEPS = [
  {
    label: "Fiche de vérité",
    body: "Vous validez, en quelques clics, les faits qui vous concernent : activité, tarifs, horaires, positionnement. C'est la référence sur laquelle Dopaguard s'appuie pour juger les réponses des IA.",
    illustration: TruthSheetIllustration,
    tint: "bg-dopaguard-lime/15",
  },
  {
    label: "Interrogation hebdomadaire des IA",
    body: "Chaque semaine, Dopaguard interroge 3 à 5 IA selon votre plan (ChatGPT, Claude, Gemini, Perplexity, Mistral) avec des questions qu'un vrai client poserait.",
    illustration: AiOrbitIllustration,
    tint: "bg-dopaguard-teal/15",
  },
  {
    label: "Alertes",
    body: "Une anomalie critique déclenche un email immédiat. Sinon, vous recevez un digest hebdomadaire avec votre score et les écarts détectés.",
    illustration: AlertIllustration,
    tint: "bg-dopaguard-navy/5",
  },
];

export function HowItWorks() {
  return (
    <section id="produits" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Comment ça marche
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-dopaguard-navyMid/80">
          Trois étapes, dix minutes de mise en place, puis Dopaguard travaille chaque semaine sans vous.
        </p>
      </div>

      <div className="relative mt-14 grid gap-8 sm:grid-cols-3">
        {/* Ligne de liaison entre les étapes (desktop) */}
        <div
          aria-hidden
          className="absolute left-[16.66%] right-[16.66%] top-24 hidden border-t-2 border-dashed border-dopaguard-teal/40 sm:block"
        />

        {STEPS.map((step, index) => {
          const Illustration = step.illustration;
          return (
            <div
              key={step.label}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-dopaguard-muted bg-white shadow-[0_12px_40px_-20px_rgba(13,46,56,0.25)]"
            >
              <div className={`relative h-44 ${step.tint}`}>
                <Illustration />
                <span className="absolute left-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-dopaguard-navy text-sm font-bold text-dopaguard-lime">
                  {index + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-semibold text-dopaguard-navy">{step.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dopaguard-navyMid/80">{step.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
