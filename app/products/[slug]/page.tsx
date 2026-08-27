import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
            <Link href="/products" className="hover:text-ink-900">
              Capabilities
            </Link>{" "}
            / <span className="text-ink-900">{service.name}</span>
          </p>
          <Heading as={1} className="mt-4">
            {service.name}
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-steel-700">
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
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.capabilities.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-md border border-steel-200 bg-paper p-5"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-500"
                />
                <span className="text-base text-steel-800">{c}</span>
              </li>
            ))}
          </ul>
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
              className="text-sm font-medium text-ink-900 hover:text-accent-600"
            >
              All case studies →
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {related.map((cs) => (
              <li key={cs.slug}>
                <Card as="article" className="h-full p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
                    {cs.industry} · {cs.year}
                  </p>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-ink-900">
                    {cs.title}
                  </h3>
                  <p className="mt-3 text-sm text-steel-700">{cs.summary}</p>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="mt-5 inline-flex text-sm font-medium text-ink-900 hover:text-accent-600"
                  >
                    Read the story →
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section tone="inverted" padding="lg">
        <Container size="prose">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-semibold text-paper sm:text-4xl">
              Have a drawing for {service.name.toLowerCase()}?
            </h2>
            <p className="mt-4 text-lg text-steel-300">
              We&rsquo;ll come back with a quote, a process plan, and a
              quality plan within five business days.
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
