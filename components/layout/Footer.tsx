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
    <footer className="mt-auto bg-brand-teal-deep text-on-dark">
      <Container size="full" className="py-[64px]">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-on-dark">
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-md bg-canvas text-brand-teal-deep text-sm font-bold"
              >
                M
              </span>
              <span>{site.shortName}</span>
            </div>
            <p className="max-w-sm text-sm text-on-dark-muted">{site.description}</p>
            <address className="not-italic text-sm text-on-dark-muted">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postal}
            </address>
            <div className="space-y-1 text-sm">
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="block text-on-dark hover:text-brand-green"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block text-on-dark hover:text-brand-green"
              >
                {site.email}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <div className="grid gap-10 sm:grid-cols-3">
              {sitemap.map((col) => (
                <div key={col.heading}>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[1px] text-on-dark-muted">
                    {col.heading}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-on-dark-muted hover:text-on-dark"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-hairline-dark pt-6 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
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
