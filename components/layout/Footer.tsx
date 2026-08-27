import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

const sitemap = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/contact" },
    ],
  },
  {
    heading: "Capabilities",
    links: [
      { label: "Products & Services", href: "/products" },
      { label: "Industries", href: "/industries" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights", href: "/resources" },
      { label: "Quality & Certifications", href: "/about#certifications" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-steel-200 bg-ink-900 text-steel-200">
      <Container size="full" className="py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-serif text-lg font-semibold text-paper">
              <span
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-sm bg-paper text-ink-900 text-sm font-bold"
              >
                M
              </span>
              <span>{site.shortName}</span>
            </div>
            <p className="max-w-sm text-sm text-steel-300">{site.description}</p>
            <address className="not-italic text-sm text-steel-300">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postal}
            </address>
            <div className="space-y-1 text-sm">
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="block text-steel-100 hover:text-paper"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block text-steel-100 hover:text-paper"
              >
                {site.email}
              </a>
            </div>
          </div>

          {sitemap.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-400">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-steel-200 hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-700 pt-6 text-xs text-steel-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Established {site.established}. AS9100D · ISO 9001:2015 · ITAR
            Registered.
          </p>
        </div>
      </Container>
    </footer>
  );
}
