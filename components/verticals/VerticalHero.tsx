import { ScanForm } from "@/components/ScanForm";
import { SiteHeader } from "@/components/landing/SiteHeader";
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
      <span className="text-dopaguard-lime">{highlight}</span>
      {after}
    </>
  );
}

export function VerticalHero({ vertical }: { vertical: VerticalMeta }) {
  return (
    <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)" }}>
      <SiteHeader />

      <main className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-6 sm:pb-28 sm:pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-dopaguard-lime" />
            {vertical.heroKicker}
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl xl:text-7xl">
            <AngleTitle angle={vertical.angle} highlight={vertical.heroHighlight} />
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{vertical.heroSubtitle}</p>
        </div>

        <div id="scan-form" className="scroll-mt-24">
          <ScanForm />
        </div>
      </main>
    </div>
  );
}
