const WIDTH = 600;
const HEIGHT = 140;
const PADDING = { top: 10, bottom: 18, left: 4, right: 4 };
const CHART_WIDTH = WIDTH - PADDING.left - PADDING.right;
const CHART_HEIGHT = HEIGHT - PADDING.top - PADDING.bottom;

export function DailyBarChart({ data, color }: { data: { date: string; count: number }[]; color: string }) {
  const maxCount = Math.max(1, ...data.map((d) => d.count));
  const slotWidth = CHART_WIDTH / data.length;
  const barWidth = Math.max(slotWidth - 2, 1);

  return (
    <div>
      <div className="h-36 w-full">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full">
          {data.map((d, i) => {
            const barHeight = (d.count / maxCount) * CHART_HEIGHT;
            const x = PADDING.left + i * slotWidth;
            const y = PADDING.top + (CHART_HEIGHT - barHeight);
            return (
              <rect
                key={d.date}
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barHeight, 1)}
                fill={color}
                opacity={d.count > 0 ? 1 : 0.15}
                rx="1"
              />
            );
          })}
        </svg>
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-white/40">
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </div>
  );
}
