import { ImageResponse } from "next/og";

/**
 * Brand favicon rendered at /icon. The "M" glyph on the brand-green
 * field per `docs/design.md` (brand-green #00ed64, on-primary #001e2b).
 * Rounded-sm (6px) per the new radius scale.
 */

export const size = {
  width: 32,
  height: 32,
};

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
          background: "#00ed64",
          color: "#001e2b",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
