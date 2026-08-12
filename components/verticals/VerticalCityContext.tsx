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
      <div className="rounded-2xl border border-dopaguard-muted bg-white p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-dopaguard-navyMid/60">
          {vertical.label} à {city.name}
        </span>
        <p className="mt-3 text-base leading-relaxed text-dopaguard-navyMid">{localParagraph}</p>
      </div>
    </section>
  );
}
