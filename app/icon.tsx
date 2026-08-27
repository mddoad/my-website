import { ImageResponse } from "next/og";

/**
 * Replaces the create-next-app default favicon with the brand mark — the
 * "M" glyph on the industrial blue background. Rendered at /icon.
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
          background: "#0b1f3a",
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 4,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
