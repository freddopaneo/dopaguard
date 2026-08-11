import { scoreTier } from "@/lib/scan/score";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TIER_COLOR: Record<string, string> = {
  high: "#c7ff98", // dopaguard-lime
  mid: "#60d9d1", // dopaguard-teal
  low: "#EF4444", // dopaguard-critical
};

const TIER_LABEL: Record<string, string> = {
  high: "Bonne visibilité dans les IA",
  mid: "Visibilité à surveiller",
  low: "Visibilité fragile dans les IA",
};

// Même géométrie et mêmes seuils que components/dashboard/ScoreGauge.tsx,
// habillage clair pour s'intégrer à la page de résultats du scan gratuit —
// composant distinct pour ne jamais risquer de régression sur le dashboard payant.
export function ScanScoreGauge({ score }: { score: number | null }) {
  const tier = scoreTier(score);
  const clamped = score === null ? 0 : Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);
  const color = tier ? TIER_COLOR[tier] : "#e8f0ee";

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dopaguard-muted bg-white p-6">
      <div className="h-40 w-40">
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
      <p className="text-sm font-medium text-dopaguard-navy">
        {tier ? TIER_LABEL[tier] : "Score indisponible pour ce scan"}
      </p>
    </div>
  );
}
