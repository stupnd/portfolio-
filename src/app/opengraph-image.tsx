import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site.config";

export const alt = `${site.name}: ${site.issue.coverLine}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F5F0E6";
const INK = "#1B1814";
const INK_2 = "#544C42";
const OXBLOOD = "#7A1E2B";

// The cover, reprinted at card size: nameplate over the double rule, the cover
// line and dek in Instrument Serif, and the cover photograph framed.
// Rendered at build time on the Node runtime from files in the repo.
export default async function OpenGraphImage() {
  const dir = join(process.cwd(), "src/assets/og");
  const [regular, photo] = await Promise.all([
    readFile(join(dir, "InstrumentSerif-Regular.ttf")),
    readFile(join(dir, "cover.jpg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const { number, season, coverLine } = site.issue;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          fontFamily: "Instrument Serif",
          padding: "40px 64px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22 }}>
          <div style={{ display: "flex", color: INK_2, width: 260 }}>
            Issue {number} · {season}
          </div>
          <div style={{ display: "flex", letterSpacing: 9, fontSize: 24 }}>{site.name.toUpperCase()}</div>
          <div style={{ display: "flex", color: OXBLOOD, width: 260, justifyContent: "flex-end" }}>stutipnd.net</div>
        </div>
        <div style={{ display: "flex", marginTop: 16, borderTop: `3px solid ${INK}`, height: 7, borderBottom: `1.5px solid ${INK}` }} />

        <div style={{ display: "flex", flex: 1, marginTop: 36, gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", fontSize: 128, lineHeight: 0.92, letterSpacing: -2 }}>{coverLine}</div>
            <div style={{ display: "flex", marginTop: 30, fontSize: 34, lineHeight: 1.25, color: INK_2 }}>
              AI and backend engineer. Computer Engineering at uOttawa, December 2026.
            </div>
          </div>
          <div style={{ display: "flex", border: `1.5px solid ${INK}`, padding: 8, height: 418 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoSrc} alt="" width={300} height={400} style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: regular, style: "normal", weight: 400 },
      ],
    }
  );
}
