import type { CityMeta } from "@/lib/cities";
import type { VerticalMeta } from "@/lib/verticals";

export function VerticalCityContext({
  vertical,
  city,
  localParagraph,
}: {
  vertical: VerticalMeta;
  city: CityMeta;
  localParagraph: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-14 sm:pt-20">
      <div data-reveal className="rounded-2xl border border-dopaguard-muted bg-white/90 p-6 shadow-[0_24px_48px_-32px_rgba(19,55,66,.3)] sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-dopaguard-navyMid/60">
          {vertical.label} à {city.name}
        </span>
        <p className="mt-3 text-base leading-relaxed text-dopaguard-navyMid">{localParagraph}</p>
      </div>
    </section>
  );
}
