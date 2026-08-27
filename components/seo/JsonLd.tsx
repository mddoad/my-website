import { site } from "@/lib/site";

/**
 * JSON-LD helpers. Each function returns a typed payload that is then
 * serialized into a <script type="application/ld+json"> tag.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    sameAs: [site.social.linkedin],
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

type JsonLdProps = {
  data: object | object[];
};

/**
 * Renders one or more JSON-LD payloads. Place inside the root layout
 * (for site-wide data) or inside a page (for route-specific data).
 */
export function JsonLd({ data }: JsonLdProps) {
  const payloads = Array.isArray(data) ? data : [data];
  return (
    <>
      {payloads.map((payload, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Safe: the payloads are authored in this codebase, never from user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
        />
      ))}
    </>
  );
}
