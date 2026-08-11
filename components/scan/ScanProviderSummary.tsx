import { PROVIDER_ORDER, PROVIDER_SHORT_LABELS } from "@/lib/providers";
import { computeByProvider, scoreTier, type ScoredResponse } from "@/lib/scan/score";

const TIER_PILL_CLASSES: Record<string, string> = {
  high: "bg-dopaguard-lime/15 text-dopaguard-navy border border-dopaguard-lime/40",
  mid: "bg-dopaguard-teal/15 text-dopaguard-navy border border-dopaguard-teal/40",
  low: "bg-dopaguard-critical/10 text-dopaguard-critical border border-dopaguard-critical/30",
};

export function ScanProviderSummary({ responses }: { responses: ScoredResponse[] }) {
  const byProvider = computeByProvider(responses);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {PROVIDER_ORDER.map((provider) => {
        const breakdown = byProvider[provider];
        const tier = breakdown ? scoreTier(breakdown.score) : null;
        const pillClasses = tier ? TIER_PILL_CLASSES[tier] : "bg-dopaguard-muted text-dopaguard-navyMid/60 border border-dopaguard-muted";

        return (
          <div key={provider} className="flex flex-col gap-1.5 rounded-xl border border-dopaguard-muted bg-white px-4 py-3">
            <span className="text-sm font-medium text-dopaguard-navy">{PROVIDER_SHORT_LABELS[provider] ?? provider}</span>
            <span className={`w-fit whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${pillClasses}`}>
              {breakdown && breakdown.total > 0
                ? breakdown.clean === breakdown.total
                  ? "Aucun écart"
                  : `${breakdown.total - breakdown.clean} écart${breakdown.total - breakdown.clean > 1 ? "s" : ""} sur ${breakdown.total}`
                : "Indisponible"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
