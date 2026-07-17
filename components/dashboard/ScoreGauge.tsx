const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function colorForScore(score: number): string {
  if (score >= 80) return "#c7ff98"; // dopaguard-lime
  if (score >= 50) return "#60d9d1"; // dopaguard-teal
  return "#EF4444"; // dopaguard-critical
}

export function ScoreGauge({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="h-40 w-40">
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke={colorForScore(clamped)}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="66" textAnchor="middle" className="fill-white text-3xl font-bold">
            {Math.round(clamped)}
          </text>
        </svg>
      </div>
      <p className="text-sm text-white/60">Score de réputation global</p>
    </div>
  );
}
