import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { testimonials } from "@/content/testimonials";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials",
  description: `What OEM partners say about working with ${site.name}.`,
  alternates: { canonical: "/testimonials" },
});

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Testimonials", href: "/testimonials" },
        ])}
      />

      <Section padding="lg">
        <Container size="wide">
          <Heading as={1} eyebrow="Testimonials">
            What OEM partners say.
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            Direct quotes from procurement, manufacturing, and supply chain
            leaders at our customer companies. Shared with their
            permission; names withheld where requested.
          </p>
        </Container>
      </Section>

      <Section tone="muted" padding="lg">
        <Container size="full">
          <Stagger
            as="ul"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((t, i) => (
              <Reveal as="li" key={i}>
                <Card as="article" className="flex h-full flex-col p-8">
                  <blockquote className="text-lg leading-relaxed text-charcoal">
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-8 border-t border-hairline pt-4 text-sm">
                    <p className="font-medium text-ink">{t.role}</p>
                    <p className="text-slate">{t.company}</p>
                  </figcaption>
                </Card>
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="inverted" padding="lg">
        <Container size="prose">
          <Reveal>
            <div className="text-center">
              <Heading
                as={2}
                align="center"
                eyebrow="Your turn"
                tone="inverted"
              size="cta"
              >
                Become the next one.
              </Heading>
              <p className="mt-4 text-lg text-on-dark-muted">
                We&rsquo;ll come back with a quote, a process plan, and a
                quality plan within five business days.
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
