import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities",
  description:
    "Precision machining, sheet metal fabrication, mechanical assembly, design and engineering, finishing, and quality and metrology for OEM programs.",
  alternates: { canonical: "/products" },
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Capabilities", href: "/products" },
        ])}
      />

      {/* Hero */}
      <Section padding="lg">
        <Container size="wide">
          <Heading as={1} eyebrow="Capabilities">
            What we manufacture
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            Six integrated capabilities under one roof — from raw stock to
            finished, tested, documented assemblies. Pick a capability for
            details, or send a drawing and we&rsquo;ll route it to the right
            team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Request a quote
            </Button>
            <Button href="/case-studies" variant="secondary" size="lg">
              See our work
            </Button>
          </div>
        </Container>
      </Section>

      {/* Capability index */}
      <Section tone="muted" padding="lg">
        <Container size="full">
          <Stagger
            as="ul"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((s) => (
              <Reveal as="li" key={s.slug} className="h-full">
                <Card as="article" className="flex h-full flex-col p-6">
                  <Heading as={3}>{s.name}</Heading>
                  <p className="mt-3 text-sm text-slate">{s.short}</p>
                  <ul className="mt-5 space-y-1.5 text-sm text-slate">
                    {s.capabilities.slice(0, 4).map((c) => (
                      <li key={c} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-green"
                        />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/products/${s.slug}`}
                    className="mt-6 inline-flex text-sm font-medium text-ink hover:text-brand-green-dark"
                  >
                    Details →
                  </Link>
                </Card>
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Closing CTA — same shape as FinalCta but tailored */}
      <Section tone="inverted" padding="lg">
        <Container size="prose">
          <Reveal>
            <div className="text-center">
              <Heading
                as={2}
                align="center"
                eyebrow="Not sure where to start?"
                tone="inverted"
                className="text-3xl font-semibold sm:text-4xl"
              >
                Send a drawing. We&rsquo;ll route it.
              </Heading>
              <p className="mt-4 text-lg text-on-dark-muted">
                Every capability here is staffed. Send your print, your volume,
                and your target date — we&rsquo;ll come back with a quote, a
                process plan, and a quality plan within five business days.
              </p>
              <div className="mt-8">
                <Button href="/contact" size="lg">
                  Request a quote
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
