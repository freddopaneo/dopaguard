import { TruncatedText } from "@/components/ui/TruncatedText";
import { CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/lib/prompts/types";

export function ResponseCard({ category, responseText }: { category: string; responseText: string | null }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
          {CATEGORY_LABELS[category] ?? category}
        </span>
        <p className="mt-0.5 text-[11px] text-white/30">{CATEGORY_DESCRIPTIONS[category] ?? ""}</p>
      </div>
      {responseText ? (
        <TruncatedText
          text={responseText}
          className="text-sm leading-relaxed text-white/70"
          toggleClassName="self-start text-xs font-medium text-dopaguard-lime underline underline-offset-2"
        />
      ) : (
        <p className="text-sm text-white/40">Réponse indisponible pour cette question.</p>
      )}
    </div>
  );
}
