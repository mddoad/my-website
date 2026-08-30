import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { caseStudies } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return buildMetadata({ title: "Capability not found" });
  }
  return buildMetadata({
    title: service.name,
    description: service.short,
    alternates: { canonical: `/products/${service.slug}` },
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  // Surface 2-3 case studies whose industry matches the capability name
  // loosely — for v1 we just show the most recent two so the section is
  // never empty.
  const related = caseStudies.slice(0, 2);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Capabilities", href: "/products" },
          { name: service.name, href: `/products/${service.slug}` },
        ])}
      />

      {/* Hero */}
      <Section padding="lg">
        <Container size="wide">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            <Link href="/products" className="hover:text-ink">
              Capabilities
            </Link>{" "}
            / <span className="text-ink">{service.name}</span>
          </p>
          <Heading as={1} className="mt-4">
            {service.name}
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            {service.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Request a quote
            </Button>
            <Button href="/products" variant="secondary" size="lg">
              All capabilities
            </Button>
          </div>
        </Container>
      </Section>

      {/* Capabilities list */}
      <Section tone="muted" padding="lg">
        <Container size="wide">
          <Heading as={2} eyebrow="What we do">
            Capability highlights
          </Heading>
          <Stagger
            as="ul"
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {service.capabilities.map((c) => (
              <Reveal
                as="li"
                key={c}
                className="flex items-start gap-3 rounded-md border border-hairline bg-canvas p-5"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-green"
                />
                <span className="text-base text-charcoal">{c}</span>
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Related work */}
      <Section padding="lg">
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Heading as={2} eyebrow="Related work">
              Programs that use this capability
            </Heading>
            <Link
              href="/case-studies"
              className="text-sm font-medium text-ink hover:text-brand-green-dark"
            >
              All case studies →
            </Link>
          </div>
          <Stagger
            as="ul"
            className="mt-10 grid gap-6 md:grid-cols-2"
          >
            {related.map((cs) => (
              <Reveal as="li" key={cs.slug}>
                <Card as="article" className="h-full p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {cs.industry} · {cs.year}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-ink">
                    {cs.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate">{cs.summary}</p>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="mt-5 inline-flex text-sm font-medium text-ink hover:text-brand-green-dark"
                  >
                    Read the story →
                  </Link>
                </Card>
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section tone="inverted" padding="lg">
        <Container size="prose">
          <Reveal>
            <div className="text-center">
              <Heading
                as={2}
                align="center"
                eyebrow={service.name}
                tone="inverted"
                className="text-3xl font-semibold sm:text-4xl"
              >
                Have a drawing for {service.name.toLowerCase()}?
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
