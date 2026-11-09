/**
 * Decorative background: large pastel radial halos behind the landing sections.
 * Same device as dopaneo.ai, in Dopaguard's own tones (teal, lime, night blue, warm).
 */
const HALOS: { c: string; w: number; h: number; x: string; y: string; d: number }[] = [
  { c: "var(--halo-teal)", w: 1000, h: 820, x: "-14%", y: "-240px", d: 0 },
  { c: "var(--halo-lime)", w: 900, h: 720, x: "70%", y: "-180px", d: 3 },
  { c: "var(--halo-warm)", w: 900, h: 720, x: "44%", y: "420px", d: 6 },
  { c: "var(--halo-blue)", w: 900, h: 720, x: "-20%", y: "700px", d: 2 },
  { c: "var(--halo-teal)", w: 1000, h: 820, x: "76%", y: "1200px", d: 5 },
  { c: "var(--halo-lime)", w: 900, h: 800, x: "-14%", y: "1750px", d: 1 },
  { c: "var(--halo-blue)", w: 900, h: 720, x: "68%", y: "2350px", d: 4 },
  { c: "var(--halo-warm)", w: 900, h: 720, x: "-10%", y: "2900px", d: 7 },
  { c: "var(--halo-teal)", w: 1000, h: 820, x: "60%", y: "3450px", d: 2 },
  { c: "var(--halo-lime)", w: 900, h: 760, x: "-16%", y: "4050px", d: 5 },
  { c: "var(--halo-blue)", w: 900, h: 760, x: "72%", y: "4650px", d: 0 },
  { c: "var(--halo-warm)", w: 900, h: 720, x: "-8%", y: "5250px", d: 3 },
  { c: "var(--halo-teal)", w: 1000, h: 820, x: "64%", y: "5850px", d: 6 },
  { c: "var(--halo-lime)", w: 900, h: 760, x: "-14%", y: "6450px", d: 1 },
  { c: "var(--halo-blue)", w: 900, h: 760, x: "70%", y: "7050px", d: 4 },
];

export function Nuages() {
  return (
    <div className="nuages" aria-hidden="true">
      {HALOS.map((h, i) => (
        <span
          key={i}
          className="halo"
          style={{
            width: h.w,
            height: h.h,
            left: h.x,
            top: h.y,
            background: `radial-gradient(closest-side, ${h.c}, transparent)`,
            animationDelay: `-${h.d * 2.7}s`,
          }}
        />
      ))}
    </div>
  );
}
