import { ImageResponse } from "next/og";
import { firmBrand } from "@/content/firm";
import { loadShareCardAssets } from "@/lib/share-card";

// SERVER ONLY. The branded 1200 × 630 card shown when a page is shared on
// LinkedIn, WhatsApp or X. Matches the site-wide card in app/opengraph-image.png.

const shareCardSize = { width: 1200, height: 630 };

const navy = "#061a2e";
const band = "#0c2a48";
const sky = "#bae6fd";

export async function renderShareCard({
  section,
  title,
  detail,
}: {
  /** Small label above the title, e.g. "Insights · Article". */
  section: string;
  title: string;
  /** One quiet line under the rule, e.g. the practice and date. */
  detail: string;
}) {
  const { logo, fonts } = await loadShareCardAssets();
  // The generator can't take an empty font name, so only set fonts it has.
  const fontStyle = (name: string) =>
    fonts.some((font) => font.name === name) ? { fontFamily: name } : {};
  const serif = fontStyle("Newsreader");
  const sans = fontStyle("Manrope");

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: navy,
        color: "white",
        ...sans,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: 250,
          padding: "0 0 64px 60px",
          background: band,
          borderRight: "1px solid rgba(186, 230, 253, 0.25)",
          color: sky,
        }}
      >
        <span style={{ fontSize: 22, letterSpacing: 2 }}>EST.</span>
        <span style={{ fontSize: 76, lineHeight: 1, ...serif }}>1993</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "70px 80px 64px 70px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img src={logo} alt={firmBrand.name} width={290} height={98} />
        <span
          style={{
            marginTop: "auto",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: sky,
          }}
        >
          {section}
        </span>
        <span
          style={{
            marginTop: 18,
            fontSize: title.length > 60 ? 56 : 68,
            lineHeight: 1.08,
            ...serif,
          }}
        >
          {title}
        </span>
        <div
          style={{ width: 70, height: 3, background: "#38bdf8", marginTop: 34 }}
        />
        <span style={{ marginTop: 24, fontSize: 24, color: "#cbd5e1" }}>
          {detail}
        </span>
      </div>
    </div>,
    // An empty list would replace the built-in font, so pass none instead.
    { ...shareCardSize, ...(fonts.length ? { fonts } : {}) },
  );
}
