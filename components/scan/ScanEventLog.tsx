"use client";

import { AnimatePresence, motion } from "motion/react";
import { PROVIDER_SHORT_LABELS } from "@/lib/providers";
import { CATEGORY_LABELS } from "@/lib/prompts/types";
import type { ScanProgressEntry } from "./ScanVisualizer";

const MAX_VISIBLE_ENTRIES = 6;

function describeEntry(entry: ScanProgressEntry): { icon: string; label: string; tone: "default" | "flagged" | "error" } {
  const provider = PROVIDER_SHORT_LABELS[entry.provider] ?? entry.provider;
  const category = CATEGORY_LABELS[entry.category] ?? entry.category;

  if (entry.status === "error") {
    return { icon: "✕", label: `${provider} · ${category} indisponible`, tone: "error" };
  }
  if (entry.hasFlag) {
    return { icon: "⚠", label: `${provider} · ${category} — écart détecté`, tone: "flagged" };
  }
  return { icon: "✓", label: `${provider} · ${category} reçue`, tone: "default" };
}

const TONE_CLASSES: Record<"default" | "flagged" | "error", string> = {
  default: "text-white/60",
  flagged: "text-dopaguard-critical",
  error: "text-white/30",
};

export function ScanEventLog({ progress }: { progress: ScanProgressEntry[] }) {
  const visible = progress.slice(-MAX_VISIBLE_ENTRIES).reverse();

  if (visible.length === 0) {
    return (
      <p className="mt-4 text-center font-mono text-xs text-white/30">En attente des premières réponses…</p>
    );
  }

  return (
    <ul className="mt-4 flex w-full max-w-sm flex-col gap-1.5 font-mono text-xs">
      <AnimatePresence initial={false}>
        {visible.map((entry) => {
          const { icon, label, tone } = describeEntry(entry);
          return (
            <motion.li
              key={entry.seq}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-baseline gap-2 ${TONE_CLASSES[tone]}`}
            >
              <span aria-hidden>{icon}</span>
              <span>{label}</span>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}
