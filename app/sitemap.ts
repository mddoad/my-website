import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/case-studies";

/**
 * Sitemap for search engines. Enumerates every static route plus every
 * content-derived dynamic route. Next renders this at /sitemap.xml.
 */

type Entry = MetadataRoute.Sitemap[number];

const lastModified = new Date();

// Static routes. Priority and changeFrequency reflect how often the
// underlying content changes in practice.
const staticRoutes: { path: string; priority: Entry["priority"]; changeFrequency: Entry["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/team", priority: 0.5, changeFrequency: "yearly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.9, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.9, changeFrequency: "monthly" },
  { path: "/process", priority: 0.7, changeFrequency: "yearly" },
  { path: "/testimonials", priority: 0.6, changeFrequency: "yearly" },
  { path: "/resources", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];

const dynamicPaths: { prefix: string; items: { slug: string }[]; priority: Entry["priority"]; changeFrequency: Entry["changeFrequency"] }[] = [
  { prefix: "/products", items: services, priority: 0.8, changeFrequency: "monthly" },
  { prefix: "/industries", items: industries, priority: 0.8, changeFrequency: "monthly" },
  { prefix: "/case-studies", items: caseStudies, priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  for (const { prefix, items, priority, changeFrequency } of dynamicPaths) {
    for (const item of items) {
      entries.push({
        url: `${site.url}${prefix}/${item.slug}`,
        lastModified,
        changeFrequency,
        priority,
      });
    }
  }

  return entries;
}
