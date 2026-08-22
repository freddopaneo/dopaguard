"use client";

import { useState } from "react";
import { TruncatedText } from "@/components/ui/TruncatedText";
import { PROVIDER_ORDER, PROVIDER_SHORT_LABELS } from "@/lib/providers";
import { CATEGORY_ORDER, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/lib/prompts/types";
import { computeByCategory, scoreTier, FLAG_TYPE_LABELS } from "@/lib/scan/score";

interface ResponseFlag {
  type: string;
  excerpt: string;
  explanation: string;
}

interface ScanResponseEntry {
  provider: string;
  category: string;
  responseText: string | null;
  flags: ResponseFlag[];
  error: string | null;
}

const TIER_PILL_CLASSES: Record<string, string> = {
  high: "bg-dopaguard-lime/15 text-dopaguard-navy border border-dopaguard-lime/40",
  mid: "bg-dopaguard-teal/15 text-dopaguard-navy border border-dopaguard-teal/40",
  low: "bg-dopaguard-critical/10 text-dopaguard-critical border border-dopaguard-critical/30",
};

export function ScanCategoryAccordion({ responses }: { responses: ScanResponseEntry[] }) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const byCategory = computeByCategory(responses);

  function toggle(category: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {CATEGORY_ORDER.map((category) => {
        const isOpen = openCategories.has(category);
        const breakdown = byCategory[category];
        const tier = breakdown ? scoreTier(breakdown.score) : null;
        const pillClasses = tier ? TIER_PILL_CLASSES[tier] : "bg-dopaguard-muted text-dopaguard-navyMid/60 border border-dopaguard-muted";
        const flaggedCount = breakdown ? breakdown.total - breakdown.clean : 0;
        const hasFlags = flaggedCount > 0;
        const entries = PROVIDER_ORDER.map((provider) => ({
          provider,
          entry: responses.find((r) => r.category === category && r.provider === provider) ?? null,
        }));

        return (
          <div key={category} className="rounded-2xl border border-dopaguard-muted bg-white">
            <button
              type="button"
              onClick={() => toggle(category)}
              aria-expanded={isOpen}
              className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <div>
                <span className="font-medium text-dopaguard-navy">{CATEGORY_LABELS[category] ?? category}</span>
                <p className="mt-0.5 text-xs text-dopaguard-navyMid/60">{CATEGORY_DESCRIPTIONS[category] ?? ""}</p>
              </div>
              <div className="flex items-center gap-3">
                {breakdown && breakdown.total > 0 && (
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${pillClasses}`}>
                    {hasFlags
                      ? `${flaggedCount} écart${flaggedCount > 1 ? "s" : ""} détecté${flaggedCount > 1 ? "s" : ""} sur ${breakdown.total}`
                      : "Aucun écart détecté"}
                  </span>
                )}
                <span className="shrink-0 text-xl text-dopaguard-navyMid/60">{isOpen ? "−" : "+"}</span>
              </div>
            </button>

            <div className={`flex-col gap-4 px-5 pb-5 ${isOpen ? "flex" : "hidden"}`}>
              {entries.map(({ provider, entry }) => (
                <div key={provider} className="rounded-xl border border-dopaguard-muted p-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-dopaguard-navyMid/60">
                    {PROVIDER_SHORT_LABELS[provider] ?? provider}
                  </span>
                  {!entry || entry.error || !entry.responseText ? (
                    <p className="mt-2 text-sm text-dopaguard-navyMid/60">Réponse indisponible pour cette question.</p>
                  ) : (
                    <div className="mt-2">
                      <TruncatedText
                        text={entry.responseText}
                        highlightExcerpts={entry.flags.map((f) => f.excerpt)}
                        className="text-sm leading-relaxed text-dopaguard-navyMid"
                        toggleClassName="mt-1 self-start text-xs font-medium text-dopaguard-navy underline underline-offset-2"
                      />
                      {entry.flags.length > 0 && (
                        <ul className="mt-3 flex flex-col gap-1.5 border-l-2 border-dopaguard-critical/30 pl-3">
                          {entry.flags.map((flag, i) => (
                            <li key={i} className="text-xs text-dopaguard-navyMid/80">
                              <span className="font-semibold text-dopaguard-critical">
                                {FLAG_TYPE_LABELS[flag.type] ?? flag.type}
                              </span>
                              {flag.explanation && <> — {flag.explanation}</>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {hasFlags && (
                <p className="text-xs text-dopaguard-navyMid/70">
                  Repéré une fois ne veut pas dire corrigé —{" "}
                  <a href="/#tarifs" className="font-medium text-dopaguard-navy underline underline-offset-2">
                    Dopaguard vérifie chaque semaine →
                  </a>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
