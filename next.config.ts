import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // picsum.photos serves a deterministic random image for a given
        // seed. The case-study hero URLs in `content/case-studies.ts`
        // are built via `picsumUrl(seed, w, h)` so the same image
        // appears on every build.
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    // Sensible security defaults for a static marketing site. Most
    // hosts (Vercel in particular) add their own defaults, but on a
    // generic Node host these are the headers a real browser will
    // need:
    //   - X-Content-Type-Options: stops MIME-sniffing-based attacks
    //   - Referrer-Policy: only send the origin on cross-origin
    //     requests (preserves analytics, blocks referer leakage)
    //   - X-Frame-Options: clickjacking — only allow same-origin
    //     framing
    //   - Permissions-Policy: disable unused features (camera,
    //     mic, geolocation) on a site that has no use for them
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
