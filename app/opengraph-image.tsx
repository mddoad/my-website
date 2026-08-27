import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Default Open Graph image rendered at /opengraph-image. Used as the
 * fallback when a route doesn't override its own. Style: industrial
 * blue background, "M" mark, and the brand tagline.
 */

export const alt = `${site.name} — ${site.tagline}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b1f3a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand mark + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              background: "#ffffff",
              color: "#0b1f3a",
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>{site.name}</div>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 900,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1 }}>
            {site.tagline}
          </div>
          <div style={{ fontSize: 24, color: "#c9d1d9" }}>
            Tier 1 supplier of precision components and assemblies for
            OEM programs in aerospace, automotive, energy, and medical.
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20,
            color: "#93acc6",
            borderTop: "1px solid #234a78",
            paddingTop: 24,
          }}
        >
          <span>AS9100D</span>
          <span>·</span>
          <span>ISO 9001:2015</span>
          <span>·</span>
          <span>ITAR Registered</span>
          <span style={{ marginLeft: "auto" }}>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
