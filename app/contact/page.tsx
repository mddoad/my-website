import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Send ${site.name} a drawing, a volume profile, and a target date. We respond within five business days.`,
  alternates: { canonical: "/contact" },
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />

      <Section padding="lg">
        <Container size="wide">
          <Heading as={1} eyebrow="Contact">
            Tell us about your program.
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            Send a drawing, a volume profile, and a target date. We&rsquo;ll
            come back with a quote, a process plan, and a quality plan
            within five business days.
          </p>
        </Container>
      </Section>

      <Section tone="muted" padding="lg">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Form column */}
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-hairline bg-canvas p-8 shadow-card">
                <h2 className="text-xl font-semibold text-ink">
                  Request a quote
                </h2>
                <p className="mt-2 text-sm text-slate">
                  We only ask for what we need to quote your program.
                  We never share your information.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Contact details column */}
            <aside className="lg:col-span-5">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                    Sales
                  </h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 block text-lg font-medium text-ink hover:text-brand-green-dark"
                  >
                    {site.email}
                  </a>
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="mt-1 block text-lg font-medium text-ink hover:text-brand-green-dark"
                  >
                    {site.phone}
                  </a>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                    Facility
                  </h3>
                  <address className="mt-2 not-italic text-base text-charcoal">
                    {site.name}
                    <br />
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.region}{" "}
                    {site.address.postal}
                    <br />
                    {site.address.country}
                  </address>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                    Hours
                  </h3>
                  <p className="mt-2 text-base text-charcoal">
                    Monday&ndash;Friday, 7:00 AM&ndash;5:00 PM ET
                  </p>
                </div>

                <div className="rounded-md border border-hairline bg-canvas p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                    For urgent programs
                  </h3>
                  <p className="mt-2 text-sm text-slate">
                    Call the sales line and ask for the engineering
                    manager on duty. We can usually respond same-day for
                    active quote requests.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
