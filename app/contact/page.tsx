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
  description:
    "Send Meridian Manufacturing a drawing, a volume profile, and a target date. We respond within five business days.",
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
          <p className="mt-6 max-w-2xl text-lg text-steel-700">
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
              <div className="rounded-lg border border-steel-200 bg-paper p-8 shadow-card">
                <h2 className="font-serif text-xl font-semibold text-ink-900">
                  Request a quote
                </h2>
                <p className="mt-2 text-sm text-steel-600">
                  Required fields are marked. We never share your
                  information.
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
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
                    Sales
                  </h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 block text-lg font-medium text-ink-900 hover:text-accent-600"
                  >
                    {site.email}
                  </a>
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="mt-1 block text-lg font-medium text-ink-900 hover:text-accent-600"
                  >
                    {site.phone}
                  </a>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
                    Facility
                  </h3>
                  <address className="mt-2 not-italic text-base text-steel-800">
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
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
                    Hours
                  </h3>
                  <p className="mt-2 text-base text-steel-800">
                    Monday&ndash;Friday, 7:00 AM&ndash;5:00 PM ET
                  </p>
                </div>

                <div className="rounded-md border border-steel-200 bg-paper p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
                    For urgent programs
                  </h3>
                  <p className="mt-2 text-sm text-steel-700">
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
