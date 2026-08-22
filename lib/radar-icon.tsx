// Reproduit à l'identique le RadarLogo affiché dans l'en-tête (app/page.tsx),
// mais en positions absolues (px) pour next/og, qui ne supporte pas <svg>.
export function radarIconTree(canvasSize: number) {
  const scale = canvasSize / 24;
  const lime = "#c7ff98";

  const outerR = 9 * scale;
  const middleR = 5.5 * scale;
  const centerDotR = 1.6 * scale;
  const blipR = 1.3 * scale;
  const centerX = 12 * scale;
  const centerY = 12 * scale;
  const blipX = 16.5 * scale;
  const blipY = 8 * scale;

  const lineDx = 17.5 * scale - centerX;
  const lineDy = 6.5 * scale - centerY;
  const lineLength = Math.sqrt(lineDx * lineDx + lineDy * lineDy);
  const lineAngle = (Math.atan2(lineDy, lineDx) * 180) / Math.PI;

  return (
    <div style={{ position: "relative", width: canvasSize, height: canvasSize, display: "flex" }}>
      <div
        style={{
          position: "absolute",
          left: centerX - outerR,
          top: centerY - outerR,
          width: outerR * 2,
          height: outerR * 2,
          borderRadius: "50%",
          border: `${1.5 * scale}px solid rgba(199,255,152,0.4)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: centerX - middleR,
          top: centerY - middleR,
          width: middleR * 2,
          height: middleR * 2,
          borderRadius: "50%",
          border: `${1.5 * scale}px solid rgba(199,255,152,0.7)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: centerX,
          top: centerY - (1.5 * scale) / 2,
          width: lineLength,
          height: 1.5 * scale,
          background: lime,
          borderRadius: scale,
          transform: `rotate(${lineAngle}deg)`,
          transformOrigin: "0% 50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: centerX - centerDotR,
          top: centerY - centerDotR,
          width: centerDotR * 2,
          height: centerDotR * 2,
          borderRadius: "50%",
          background: lime,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: blipX - blipR,
          top: blipY - blipR,
          width: blipR * 2,
          height: blipR * 2,
          borderRadius: "50%",
          background: lime,
        }}
      />
    </div>
  );
}
