import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { caseStudies, picsumUrl } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) {
    return buildMetadata({ title: "Case study not found" });
  }
  return buildMetadata({
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
          { name: study.title, href: `/case-studies/${study.slug}` },
        ])}
      />

      {/* Hero with image */}
      <section className="border-b border-hairline bg-surface">
        <Container size="full" className="py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            <Link href="/case-studies" className="hover:text-ink">
              Case Studies
            </Link>{" "}
            / <span className="text-ink">{study.client}</span>
          </p>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Badge tone="default">
                {study.industry} · {study.year}
              </Badge>
              <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
                {study.title}
              </h1>
              <p className="mt-5 text-lg text-slate">{study.summary}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-soft">
              <Image
                src={picsumUrl(study.picsumSeed, 1600, 1200)}
                alt={study.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Metrics */}
      <Section padding="md" className="border-y border-hairline">
        <Container size="wide">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-3">
            {study.metrics.map((m) => (
              <div key={m.label} className="text-center sm:text-left">
                <dt className="text-sm text-muted">{m.label}</dt>
                <dd className="mt-1 text-4xl font-semibold text-ink sm:text-5xl">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Challenge / Approach / Result */}
      <Section padding="lg">
        <Container size="prose">
          <div className="space-y-12">
            <div>
              <Heading as={2} eyebrow="Challenge">
                What the customer was up against
              </Heading>
              <p className="mt-6 text-lg text-slate">{study.challenge}</p>
            </div>
            <div>
              <Heading as={2} eyebrow="Approach">
                What we changed
              </Heading>
              <p className="mt-6 text-lg text-slate">{study.approach}</p>
            </div>
            <div>
              <Heading as={2} eyebrow="Result">
                What happened next
              </Heading>
              <p className="mt-6 text-lg text-slate">{study.result}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="inverted" padding="lg">
        <Container size="prose">
          <div className="text-center">
            <Heading
              as={2}
              align="center"
              eyebrow="Your move"
              tone="inverted"
              className="text-3xl font-semibold sm:text-4xl"
            >
              Want a result like this?
            </Heading>
            <p className="mt-4 text-lg text-on-dark-muted">
              We&rsquo;ll come back with a quote, a process plan, and a
              quality plan within five business days.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact" size="lg">
                Request a quote
              </Button>
              <Button href="/case-studies" variant="secondary" size="lg">
                More case studies
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
