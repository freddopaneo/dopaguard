/**
 * Animated radar: Dopaguard's brand mark brought to life. A sweep turns continuously,
 * the five monitored AIs sit on the rings and "ping" in turn, the brand sits at the
 * centre. Pure SVG + CSS (project convention: no graphics library).
 */
const NODES = [
  { label: "ChatGPT", x: 100, y: 22, r: 0 },
  { label: "Claude", x: 168, y: 74, r: 1 },
  { label: "Gemini", x: 148, y: 158, r: 2 },
  { label: "Perplexity", x: 52, y: 158, r: 3 },
  { label: "Mistral", x: 32, y: 74, r: 4 },
];

export function RadarIA({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#60d9d1" stopOpacity="0" />
          <stop offset="1" stopColor="#60d9d1" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c7ff98" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c7ff98" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Rings */}
      <circle cx="100" cy="100" r="88" stroke="#133742" strokeOpacity="0.1" />
      <circle cx="100" cy="100" r="62" stroke="#133742" strokeOpacity="0.14" strokeDasharray="3 5" />
      <circle cx="100" cy="100" r="36" stroke="#133742" strokeOpacity="0.18" />
      <path d="M100 12v176M12 100h176" stroke="#133742" strokeOpacity="0.07" />

      {/* Sweep (rotates around the centre) */}
      <g style={{ transformOrigin: "100px 100px" }} className="animate-radar-sweep">
        <path d="M100 100 L100 12 A88 88 0 0 1 162 38 Z" fill="url(#sweep)" />
        <line x1="100" y1="100" x2="100" y2="12" stroke="#60d9d1" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* AI nodes with staggered ping */}
      {NODES.map((n) => (
        <g key={n.label}>
          <circle
            cx={n.x}
            cy={n.y}
            r="9"
            fill="#c7ff98"
            opacity="0.5"
            className="animate-radar-ping"
            style={{ transformOrigin: `${n.x}px ${n.y}px`, animationDelay: `${n.r * 1.2}s` }}
          />
          <circle cx={n.x} cy={n.y} r="9" fill="white" stroke="#133742" strokeOpacity="0.2" />
          <circle cx={n.x} cy={n.y} r="3.5" fill={n.r % 2 === 0 ? "#60d9d1" : "#133742"} />
        </g>
      ))}

      {/* Brand at the centre */}
      <circle cx="100" cy="100" r="22" fill="url(#glow)" />
      <circle cx="100" cy="100" r="12" fill="#133742" />
      <circle cx="100" cy="100" r="4" fill="#c7ff98" />
    </svg>
  );
}
