import { ImageResponse } from "next/og";
import { getVerticalBySlug } from "@/lib/verticals";

export const runtime = "edge";
export const alt = "Dopaguard — Surveillance de réputation dans les IA génératives";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage({ params }: { params: { slug: string } }) {
  const vertical = getVerticalBySlug(params.slug);
  const label = vertical?.label ?? "Dopaguard";
  const headline = vertical?.angle ?? "Surveillance de réputation dans les IA génératives";

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
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#c7ff98",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          {label}
        </div>
        <div style={{ display: "flex", fontSize: 52, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          {headline}
        </div>
      </div>
    ),
    { ...size },
  );
}
