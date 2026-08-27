import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Centralized metadata builder. Every page exports a `generateMetadata` that
 * spreads the result of this helper and overrides the title/description.
 */
export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title
    ? `${overrides.title} | ${site.name}`
    : `${site.name} — ${site.tagline}`;

  return {
    title,
    description: site.description,
    metadataBase: new URL(site.url),
    openGraph: {
      type: "website",
      siteName: site.name,
      title: typeof overrides.title === "string" ? overrides.title : site.name,
      description: site.description,
      url: site.url,
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: site.description,
    },
    robots: { index: true, follow: true },
    ...overrides,
  } as Metadata;
}
