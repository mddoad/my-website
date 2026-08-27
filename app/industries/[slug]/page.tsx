import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) {
    return buildMetadata({ title: "Industry not found" });
  }
  return buildMetadata({
    title: industry.name,
    description: industry.short,
    alternates: { canonical: `/industries/${industry.slug}` },
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  // Match case studies by industry label — loose contains-match.
  const related = caseStudies.filter((cs) =>
    industry.name
      .toLowerCase()
      .split(/[ &]+/)
      .some((part) => part.length > 2 && cs.industry.toLowerCase().includes(part)),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
          { name: industry.name, href: `/industries/${industry.slug}` },
        ])}
      />

      <Section padding="lg">
        <Container size="wide">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
            <Link href="/industries" className="hover:text-ink-900">
              Industries
            </Link>{" "}
            / <span className="text-ink-900">{industry.name}</span>
          </p>
          <Heading as={1} className="mt-4">
            {industry.name}
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-steel-700">
            {industry.description}
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

      <Section tone="muted" padding="lg">
        <Container size="wide">
          <Heading as={2} eyebrow="What it gets you">
            Program outcomes
          </Heading>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {industry.outcomes.map((o) => (
              <li
                key={o}
                className="flex items-start gap-3 rounded-md border border-steel-200 bg-paper p-5"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-500"
                />
                <span className="text-base text-steel-800">{o}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section padding="lg">
          <Container size="wide">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Heading as={2} eyebrow="Related work">
                {industry.name} case studies
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
      )}

      <Section tone="inverted" padding="lg">
        <Container size="prose">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-semibold text-paper sm:text-4xl">
              Building for {industry.name.toLowerCase()}?
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
