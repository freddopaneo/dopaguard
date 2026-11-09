import { ScanForm } from "@/components/ScanForm";
import { RadarIA } from "@/components/landing/RadarIA";

/**
 * Right-hand hero panel: the animated radar sits fully visible above the scan form,
 * on every screen size (smaller on mobile). The form card overlaps the bottom of the
 * radar slightly so the two read as one object.
 */
export function ScanPanel() {
  return (
    <div id="scan-form" className="scroll-mt-24 animate-monte [animation-delay:.3s]">
      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center">
        <RadarIA className="pointer-events-none relative z-0 h-44 w-44 sm:h-56 sm:w-56 lg:h-64 lg:w-64" />
        <p className="relative z-0 -mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-dopaguard-navyMid/60">
          5 IA interrogées chaque semaine
        </p>
        <div className="relative z-10 mt-4 w-full">
          <ScanForm />
        </div>
      </div>
    </div>
  );
}
