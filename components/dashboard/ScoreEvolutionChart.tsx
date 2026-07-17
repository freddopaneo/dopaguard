import type { WeeklyScorePoint } from "@/lib/dashboard/get-overview";

const WIDTH = 640;
const HEIGHT = 220;
const PADDING = { top: 16, right: 16, bottom: 28, left: 32 };
const CHART_WIDTH = WIDTH - PADDING.left - PADDING.right;
const CHART_HEIGHT = HEIGHT - PADDING.top - PADDING.bottom;

function y(score: number): number {
  return PADDING.top + ((100 - score) / 100) * CHART_HEIGHT;
}

export function ScoreEvolutionChart({ points }: { points: WeeklyScorePoint[] }) {
  const withScores = points.filter((p): p is WeeklyScorePoint & { globalScore: number } => p.globalScore !== null);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <p className="mb-4 text-sm text-white/60">Évolution du score sur {points.length} semaine{points.length > 1 ? "s" : ""}</p>

      {withScores.length < 2 ? (
        <div className="flex h-56 flex-col items-center justify-center gap-2 text-center">
          {withScores.length === 1 && (
            <span className="text-2xl font-bold text-white">{Math.round(withScores[0].globalScore)}</span>
          )}
          <p className="text-xs text-white/40">L&apos;historique s&apos;affichera à partir de la semaine prochaine.</p>
        </div>
      ) : (
        <div className="h-56 w-full">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="h-full w-full">
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(96,217,209,0.25)" />
                <stop offset="100%" stopColor="rgba(96,217,209,0)" />
              </linearGradient>
            </defs>

            {[25, 50, 75].map((mark) => (
              <g key={mark}>
                <line x1={PADDING.left} y1={y(mark)} x2={WIDTH - PADDING.right} y2={y(mark)} stroke="rgba(255,255,255,0.08)" />
                <text x={PADDING.left - 8} y={y(mark) + 3} textAnchor="end" className="fill-white/40 text-[9px]">
                  {mark}
                </text>
              </g>
            ))}

            {(() => {
              const n = withScores.length;
              const xFor = (i: number) => PADDING.left + (i * CHART_WIDTH) / (n - 1);
              const coords = withScores.map((p, i) => ({ x: xFor(i), y: y(p.globalScore), point: p }));
              const linePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");
              const areaPath = `M ${coords[0].x},${HEIGHT - PADDING.bottom} L ${coords
                .map((c) => `${c.x},${c.y}`)
                .join(" L ")} L ${coords[coords.length - 1].x},${HEIGHT - PADDING.bottom} Z`;

              return (
                <>
                  <path d={areaPath} fill="url(#scoreGradient)" />
                  <polyline points={linePoints} fill="none" stroke="#60d9d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {coords.map((c) => (
                    <g key={`${c.point.year}-${c.point.weekNumber}`}>
                      <circle cx={c.x} cy={c.y} r="3" fill="#60d9d1">
                        <title>{`Semaine ${c.point.weekNumber}/${c.point.year} : ${Math.round(c.point.globalScore)}`}</title>
                      </circle>
                      <text x={c.x} y={HEIGHT - PADDING.bottom + 14} textAnchor="middle" className="fill-white/40 text-[9px]">
                        S{c.point.weekNumber}
                      </text>
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
      )}
    </div>
  );
}
