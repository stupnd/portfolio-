import { ImageResponse } from "next/og";
import { site } from "@/content/site.config";

export const runtime = "edge";
export const alt = `${site.name} | Backend & Infrastructure Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same world as the site: paper ground, ink type, a cobalt record panel.
export default function OpenGraphImage() {
  const rows = site.records.slice(-4);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#EEF1F4",
          color: "#0E1726",
          fontFamily: "sans-serif",
          padding: 64,
          gap: 48,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 470 }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>
            {site.name.split(" ")[0]}
          </div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>
            {site.name.split(" ").slice(1).join(" ")}
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, marginTop: 28, lineHeight: 1.25 }}>{site.headline}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            background: "#1C3FE0",
            color: "#FFFFFF",
            borderRadius: 6,
            padding: "24px 28px",
            justifyContent: "center",
          }}
        >
          {rows.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 20,
                padding: "16px 0",
                borderBottom: "1px solid #4E6CEC",
                fontSize: 24,
                lineHeight: 1.3,
              }}
            >
              <div style={{ color: "#C4CFFC", width: 70 }}>{String(site.records.length - 4 + i).padStart(4, "0")}</div>
              <div style={{ flex: 1 }}>{r.text}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
