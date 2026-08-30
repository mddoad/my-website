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
};

export default nextConfig;
