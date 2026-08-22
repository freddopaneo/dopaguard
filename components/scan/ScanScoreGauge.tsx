import { scoreTier } from "@/lib/scan/score";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TIER_COLOR: Record<string, string> = {
  high: "#c7ff98", // dopaguard-lime
  mid: "#60d9d1", // dopaguard-teal
  low: "#EF4444", // dopaguard-critical
};

export type GaugeKind = "reliability" | "visibility";

// Deux mesures distinctes, donc deux jeux de libellés : un score bas de fiabilité
// signale des erreurs à corriger, un score bas de visibilité signale une absence
// de notoriété -- deux diagnostics très différents.
const TIER_LABELS: Record<GaugeKind, Record<string, string>> = {
  reliability: {
    high: "Ce que disent les IA est fiable",
    mid: "Quelques écarts à surveiller",
    low: "Plusieurs écarts détectés",
  },
  visibility: {
    high: "Les IA vous connaissent bien",
    mid: "Les IA vous connaissent mal",
    low: "Vous êtes presque invisible",
  },
};

const TITLES: Record<GaugeKind, string> = {
  reliability: "Fiabilité",
  visibility: "Visibilité",
};

// Même géométrie et mêmes seuils que components/dashboard/ScoreGauge.tsx,
// habillage clair pour s'intégrer à la page de résultats du scan gratuit —
// composant distinct pour ne jamais risquer de régression sur le dashboard payant.
export function ScanScoreGauge({ score, kind }: { score: number | null; kind: GaugeKind }) {
  const tier = scoreTier(score);
  const clamped = score === null ? 0 : Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);
  const color = tier ? TIER_COLOR[tier] : "#e8f0ee";

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dopaguard-muted bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">{TITLES[kind]}</p>
      <div className="h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#e8f0ee" strokeWidth="12" />
          {score !== null && (
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
            />
          )}
          <text x="60" y="66" textAnchor="middle" className="fill-dopaguard-navy text-3xl font-bold">
            {score === null ? "—" : Math.round(clamped)}
          </text>
        </svg>
      </div>
      <p className="text-center text-sm font-medium text-dopaguard-navy">
        {tier ? TIER_LABELS[kind][tier] : "Indisponible pour ce scan"}
      </p>
    </div>
  );
}
