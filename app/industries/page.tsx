import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "Aerospace & defense, automotive & mobility, energy & industrial, and medical & life sciences — industries Meridian serves.",
  alternates: { canonical: "/industries" },
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
        ])}
      />

      <Section padding="lg">
        <Container size="wide">
          <Heading as={1} eyebrow="Industries">
            We build for OEM programs that can&rsquo;t fail.
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            Four industries, each with their own quality system, regulatory
            burden, and definition of on-time. We hold certifications in all
            four and run dedicated program management for each.
          </p>
        </Container>
      </Section>

      <Section tone="muted" padding="lg">
        <Container size="full">
          <ul className="grid gap-6 md:grid-cols-2">
            {industries.map((i) => (
              <li key={i.slug} className="h-full">
                <Card as="article" className="flex h-full flex-col p-8">
                  <Heading as={3}>{i.name}</Heading>
                  <p className="mt-3 text-base text-slate">{i.short}</p>
                  <p className="mt-4 text-sm text-slate">{i.description}</p>
                  <ul className="mt-6 space-y-2 border-t border-hairline pt-5 text-sm text-charcoal">
                    {i.outcomes.map((o) => (
                      <li key={o} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-green"
                        />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/industries/${i.slug}`}
                    className="mt-6 inline-flex text-sm font-medium text-ink hover:text-brand-green-dark"
                  >
                    Industry detail →
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="inverted" padding="lg">
        <Container size="prose">
          <div className="text-center">
            <Heading
              as={2}
              align="center"
              eyebrow="Got something else?"
              className="text-on-dark text-3xl font-semibold sm:text-4xl"
            >
              Don&rsquo;t see your industry?
            </Heading>
            <p className="mt-4 text-lg text-on-dark-muted">
              We take on programs across adjacent verticals — heavy industrial,
              rail, semiconductor, and more. Tell us what you&rsquo;re building.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Request a quote
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
