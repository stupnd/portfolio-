import { ImageResponse } from "next/og";
import { site } from "@/content/site.config";

export const runtime = "edge";
export const alt = `${site.name} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #07080c 55%, #10131c 100%)",
          color: "#e8eaf2",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(108,124,255,0.35), transparent 65%)",
          }}
        />
        <div style={{ fontSize: 28, color: "#6c7cff", letterSpacing: 4, textTransform: "uppercase" }}>
          {site.location}
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16, letterSpacing: -2 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 36, color: "#9aa1b5", marginTop: 20, maxWidth: 900 }}>
          {site.headline}
        </div>
        <div style={{ fontSize: 26, color: "#5c6377", marginTop: 40 }}>
          Backend · Distributed Systems · LLM Evaluation
        </div>
      </div>
    ),
    { ...size }
  );
}
