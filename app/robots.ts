import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Search engine crawler policy. Allows all user agents across the site
 * and points them at the sitemap. Next renders this at /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
