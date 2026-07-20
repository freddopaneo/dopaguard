import { ImageResponse } from "next/og";
import { radarIconTree } from "@/lib/radar-icon";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#133742",
        }}
      >
        {radarIconTree(132)}
      </div>
    ),
    { ...size }
  );
}
