import { AiResponseCard } from "@/components/AiResponseCard";
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
          <AiResponseCard
            key={example.highlight}
            quote={example.quote}
            highlight={example.highlight}
            note={example.note}
            borderClassName={ACCENT_BORDER[vertical.accent]}
          />
        ))}
      </div>
    </section>
  );
}
