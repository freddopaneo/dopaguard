"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { PROVIDER_ORDER, PROVIDER_SHORT_LABELS } from "@/lib/providers";

export interface ScanProgressEntry {
  seq: number;
  provider: string;
  category: string;
  status: "done" | "error";
  hasFlag: boolean;
  ts: string;
}

// Le scan gratuit interroge 3 IA sur 5 catégories de questions chacune (lib/scan/run-scan.ts).
const CHAINS_PER_PROVIDER = 5;
const TOTAL_CHAINS = CHAINS_PER_PROVIDER * PROVIDER_ORDER.length;

const CENTER = 160;
const RADIUS_RING = 132;
const RADIUS_NODES = 96;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS_RING;

// Répartit les nœuds à égale distance autour du cercle, en partant du haut.
const NODE_ANGLES = PROVIDER_ORDER.map((_, index) => -90 + index * (360 / PROVIDER_ORDER.length));

function polarToCartesian(angleDeg: number, radius: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

// Compteur animé sans dépendance : anime la valeur affichée vers la vraie
// valeur cible à chaque nouvelle réponse reçue.
function useCountUp(target: number, durationMs = 500) {
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const elapsed = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return value;
}

type NodeState = "active" | "done" | "flagged";

function getNodeState(count: number, hasFlag: boolean): NodeState {
  if (count < CHAINS_PER_PROVIDER) return "active";
  return hasFlag ? "flagged" : "done";
}

const NODE_COLORS: Record<NodeState, { fill: string; stroke: string }> = {
  active: { fill: "#1e4d5e", stroke: "#c7ff98" },
  done: { fill: "#10B981", stroke: "#10B981" },
  flagged: { fill: "#EF4444", stroke: "#EF4444" },
};

export function ScanVisualizer({ progress }: { progress: ScanProgressEntry[] }) {
  const completedCount = progress.length;
  const displayedCount = useCountUp(completedCount);
  const ringFraction = Math.min(1, completedCount / TOTAL_CHAINS);

  const providerStats = PROVIDER_ORDER.map((provider, index) => {
    const entries = progress.filter((e) => e.provider === provider);
    const hasFlag = entries.some((e) => e.hasFlag);
    const state = getNodeState(entries.length, hasFlag);
    const position = polarToCartesian(NODE_ANGLES[index], RADIUS_NODES);
    return { provider, state, ...position };
  });

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 320 320"
        className="h-64 w-64 sm:h-72 sm:w-72"
        role="img"
        aria-label="Progression du scan en direct"
      >
        <circle cx={CENTER} cy={CENTER} r={RADIUS_RING} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6} />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS_RING}
          fill="none"
          stroke="#c7ff98"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - ringFraction) }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />

        {providerStats.map(({ provider, state, x, y }) => (
          <motion.line
            key={`beam-${provider}`}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke={NODE_COLORS[state].stroke}
            strokeWidth={2}
            initial={{ opacity: 0.25 }}
            animate={{ opacity: state === "active" ? [0.25, 0.6, 0.25] : 0.8 }}
            transition={
              state === "active"
                ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}

        <circle cx={CENTER} cy={CENTER} r={30} fill="#0d2e38" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />

        {providerStats.map(({ provider, state, x, y }) => (
          <g key={provider}>
            <motion.circle
              cx={x}
              cy={y}
              r={22}
              fill={NODE_COLORS[state].fill}
              stroke={NODE_COLORS[state].stroke}
              strokeWidth={2}
              initial={false}
              animate={{ scale: state === "active" ? [1, 1.06, 1] : 1 }}
              transition={
                state === "active"
                  ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }
              }
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
            <text x={x} y={y + 40} textAnchor="middle" className="fill-white/70 text-[11px] font-medium">
              {PROVIDER_SHORT_LABELS[provider] ?? provider}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-2 text-center">
        <p className="text-3xl font-bold tabular-nums text-white">
          {displayedCount}
          <span className="text-white/40">/{TOTAL_CHAINS}</span>
        </p>
        <p className="text-xs text-white/50">réponses analysées</p>
      </div>
    </div>
  );
}
