import { PROVIDER_ORDER, PROVIDER_SHORT_LABELS } from "@/lib/providers";

const WIDTH = 320;
const HEIGHT = 200;
const PADDING = { top: 24, bottom: 32 };
const CHART_HEIGHT = HEIGHT - PADDING.top - PADDING.bottom;
const BAR_WIDTH = 60;
const GAP = 20;

export function ScoreByProviderChart({ scoreByProvider }: { scoreByProvider: Record<string, number> }) {
  const providers = PROVIDER_ORDER;
  const totalWidth = providers.length * BAR_WIDTH + (providers.length - 1) * GAP;
  const left = (WIDTH - totalWidth) / 2;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <p className="mb-4 text-sm text-white/60">Score par IA</p>
      <div className="mx-auto h-48 max-w-xs">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full">
          {providers.map((provider, i) => {
            const score = scoreByProvider[provider];
            const hasScore = typeof score === "number" && !Number.isNaN(score);
            const barHeight = hasScore ? (score / 100) * CHART_HEIGHT : 0;
            const x = left + i * (BAR_WIDTH + GAP);
            const yTop = PADDING.top + (CHART_HEIGHT - barHeight);

            return (
              <g key={provider}>
                <rect x={x} y={yTop} width={BAR_WIDTH} height={barHeight} rx="4" fill="#60d9d1" opacity={hasScore ? 1 : 0.15} />
                <text x={x + BAR_WIDTH / 2} y={yTop - 6} textAnchor="middle" className="fill-white text-xs font-semibold">
                  {hasScore ? Math.round(score) : "—"}
                </text>
                <text
                  x={x + BAR_WIDTH / 2}
                  y={HEIGHT - PADDING.bottom + 16}
                  textAnchor="middle"
                  className="fill-white/50 text-[10px]"
                >
                  {PROVIDER_SHORT_LABELS[provider] ?? provider}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
