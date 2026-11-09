import { SiteHeader } from "@/components/landing/SiteHeader";
import { ScanPanel } from "@/components/landing/ScanPanel";
import type { VerticalMeta } from "@/lib/verticals";

function AngleTitle({ angle, highlight }: { angle: string; highlight: string }) {
  const index = angle.indexOf(highlight);
  if (index === -1) {
    return <>{angle}</>;
  }
  const before = angle.slice(0, index);
  const after = angle.slice(index + highlight.length);
  return (
    <>
      {before}
      <span className="marqueur">{highlight}</span>
      {after}
    </>
  );
}

export function VerticalHero({ vertical }: { vertical: VerticalMeta }) {
  return (
    <div className="relative">
      <SiteHeader />

      <main className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-10 sm:pb-28 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-flex animate-monte items-center gap-2.5 rounded-full border border-dopaguard-navy/10 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-dopaguard-navyMid shadow-sm [animation-delay:.05s]">
            <span className="relative h-2 w-2 rounded-full bg-dopaguard-teal">
              <span className="absolute -inset-1 animate-pulse-dot rounded-full bg-dopaguard-teal/50" />
            </span>
            {vertical.heroKicker}
          </span>

          <h1 className="mt-7 animate-monte text-5xl font-bold leading-[1.06] tracking-[-0.025em] text-dopaguard-navy [animation-delay:.15s] sm:text-6xl xl:text-[68px]">
            <AngleTitle angle={vertical.angle} highlight={vertical.heroHighlight} />
          </h1>

          <p className="mt-6 max-w-2xl animate-monte text-lg leading-relaxed text-dopaguard-navyMid/90 [animation-delay:.25s]">
            {vertical.heroSubtitle}
          </p>
        </div>

        <ScanPanel />
      </main>
    </div>
  );
}
