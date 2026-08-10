import { HighlightedText } from "@/components/HighlightedText";
import type { VerticalAccent, VerticalMeta } from "@/lib/verticals";

const ACCENT_BADGE: Record<VerticalAccent, string> = {
  teal: "bg-dopaguard-teal text-dopaguard-navy",
  lime: "bg-dopaguard-lime text-dopaguard-navy",
  navy: "bg-dopaguard-navy text-white",
};

const ACCENT_BORDER: Record<VerticalAccent, string> = {
  teal: "border-dopaguard-teal/40",
  lime: "border-dopaguard-lime/50",
  navy: "border-dopaguard-navy/20",
};

export function VerticalPainPoints({ vertical }: { vertical: VerticalMeta }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span
          className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${ACCENT_BADGE[vertical.accent]}`}
        >
          {vertical.label}
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Ce que Dopaguard peut détecter sur votre activité
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-dopaguard-navyMid/80">
          Deux exemples réels du type d&apos;anomalie qu&apos;une IA peut produire sur une entreprise comme la
          vôtre.
        </p>
      </div>

      <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2">
        {vertical.painExamples.map((example) => (
          <div
            key={example.highlight}
            className={`relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border bg-white p-6 text-left ${ACCENT_BORDER[vertical.accent]}`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-3 -top-6 select-none text-7xl font-serif text-dopaguard-muted"
            >
              &ldquo;
            </span>
            <p className="relative flex-1 text-sm leading-relaxed text-dopaguard-navyMid">
              <HighlightedText text={example.quote} excerpts={[example.highlight]} />
            </p>
            <p className="relative border-t border-dopaguard-muted pt-2.5 text-xs text-dopaguard-navyMid/60">
              {example.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
