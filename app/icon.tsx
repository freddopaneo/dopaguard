import { ImageResponse } from "next/og";
import { radarIconTree } from "@/lib/radar-icon";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        {radarIconTree(24)}
      </div>
    ),
    { ...size }
  );
}
