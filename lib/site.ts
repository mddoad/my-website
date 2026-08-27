/**
 * Site-wide configuration. Single source of truth for brand, contact,
 * navigation, and social. Edit this file to rebrand the entire site.
 */

export const site = {
  name: "Meridian Manufacturing",
  shortName: "Meridian",
  tagline: "Precision components. Engineered to spec.",
  description:
    "Meridian Manufacturing is a B2B industrial manufacturer delivering precision components, assemblies, and engineered solutions for OEM customers.",
  url: "https://example.com",
  email: "sales@example.com",
  phone: "+1 (555) 010-0100",
  address: {
    street: "1200 Industrial Way",
    city: "Cleveland",
    region: "OH",
    postal: "44101",
    country: "USA",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/example",
  },
  nav: {
    primary: [
      { label: "Capabilities", href: "/products" },
      { label: "Industries", href: "/industries" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Process", href: "/process" },
      { label: "About", href: "/about" },
      { label: "Insights", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
  certifications: [
    { label: "ISO 9001:2015", note: "Quality Management" },
    { label: "AS9100D", note: "Aerospace" },
    { label: "ISO 14001", note: "Environmental" },
    { label: "ITAR Registered", note: "Defense" },
    { label: "OSHA VPP", note: "Safety" },
  ],
  established: 1972,
} as const;

export type Site = typeof site;
