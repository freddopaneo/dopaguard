import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dopaguard — Surveillance de réputation dans les IA génératives";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#c7ff98" }} />
          <span style={{ fontSize: 28, fontWeight: 700 }}>Dopaguard</span>
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.15, maxWidth: 950 }}>
          Savez-vous ce que ChatGPT, Claude et Perplexity disent de votre entreprise ?
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.65)", marginTop: 28 }}>
          Scan gratuit · Résultat en 3 minutes
        </div>
      </div>
    ),
    { ...size }
  );
}
