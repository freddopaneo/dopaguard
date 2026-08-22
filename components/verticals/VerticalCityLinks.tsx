import { CITIES } from "@/lib/cities";
import type { VerticalMeta } from "@/lib/verticals";

export function VerticalCityLinks({ vertical }: { vertical: VerticalMeta }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-14 sm:pb-20">
      <h2 className="text-center text-2xl font-bold tracking-tight text-dopaguard-navy sm:text-3xl">
        Disponible aussi pour votre ville
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-dopaguard-navyMid/70">
        {vertical.label} : découvrez ce que les IA disent des entreprises de votre secteur dans votre ville.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4">
        {CITIES.map((city) => (
          <a
            key={city.slug}
            href={`/secteurs/${vertical.slug}/${city.slug}`}
            className="text-sm text-dopaguard-navyMid hover:text-dopaguard-navy hover:underline"
          >
            {vertical.label} à {city.name}
          </a>
        ))}
      </div>
    </section>
  );
}
