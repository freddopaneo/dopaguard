"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through the AI names in the hero headline (ChatGPT → Claude → …).
 * The longest word reserves the width so the sentence never jumps.
 */
export function MotTournant({ mots, intervalMs = 2400 }: { mots: string[]; intervalMs?: number }) {
  const [index, setIndex] = useState(0);
  const [sortant, setSortant] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => {
        setSortant(i);
        return (i + 1) % mots.length;
      });
      window.setTimeout(() => setSortant(null), 500);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [mots.length, intervalMs]);

  return (
    <span className="mot-tournant" aria-live="off">
      {mots.map((mot, i) => (
        <span
          key={mot}
          className={`justify-self-start ${i === index ? "actif" : i === sortant ? "sortant" : ""}`}
          aria-hidden={i !== index}
        >
          <span className="marqueur">{mot}</span>
        </span>
      ))}
    </span>
  );
}
