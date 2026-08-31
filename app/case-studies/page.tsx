import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { caseStudies, picsumUrl } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Real OEM programs: lead-time reductions, EV enclosures, wind turbine conversions, and the metrics behind them.",
  alternates: { canonical: "/case-studies" },
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
        ])}
      />

      <Section padding="lg">
        <Container size="wide">
          <Heading as={1} eyebrow="Case Studies">
            Programs, not pitches.
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            Three real programs — the brief, what we changed, and the
            numbers. Clients are anonymized where requested.
          </p>
        </Container>
      </Section>

      <Section tone="muted" padding="lg">
        <Container size="full">
          <Stagger
            as="ul"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {caseStudies.map((cs) => (
              <Reveal as="li" key={cs.slug} className="h-full">
                <Card as="article" className="flex h-full flex-col overflow-hidden p-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
                    <Image
                      src={picsumUrl(cs.picsumSeed, 1600, 1200)}
                      alt={cs.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Badge tone="default">
                      {cs.industry} · {cs.year}
                    </Badge>
                    <h3 className="mt-4 text-xl font-semibold text-ink">
                      {cs.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate">{cs.summary}</p>
                    <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-hairline pt-4 text-xs">
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="text-slate">{m.label}</dt>
                          <dd className="mt-1 text-base font-semibold text-ink">
                            {m.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="mt-6 inline-flex text-sm font-medium text-ink hover:text-brand-green-dark"
                    >
                      Read the story →
                    </Link>
                  </div>
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
                eyebrow="Let&rsquo;s go"
                tone="inverted"
              size="cta"
              >
                Want a program like this on your side?
              </Heading>
              <p className="mt-4 text-lg text-on-dark-muted">
                Tell us about your program. We&rsquo;ll come back with a quote,
                a process plan, and a quality plan within five business days.
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
