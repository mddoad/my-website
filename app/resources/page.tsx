import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resources",
  description:
    "Insights, articles, and reference material for OEM procurement, manufacturing engineering, and supply chain teams.",
  alternates: { canonical: "/resources" },
});

const upcoming = [
  {
    tag: "Whitepaper",
    title: "Designing for manufacturability: a checklist for OEM engineers",
    body: "A practical DFM checklist drawn from 200+ program launches. Covers materials, tolerances, finishes, and the questions to ask before tooling.",
  },
  {
    tag: "Article",
    title: "How to read a PPAP package (and what to push back on)",
    body: "A walkthrough of every element of a PPAP submission, with the items procurement and quality should review before signing off.",
  },
  {
    tag: "Case study",
    title: "Why we don&rsquo;t quote on lead time alone",
    body: "Lead time is a number. Cycle time, queue time, and validation time are the system behind it. A look at how we model capacity for new programs.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
        ])}
      />

      <Section padding="lg">
        <Container size="wide">
          <Heading as={1} eyebrow="Resources">
            Insights for OEM programs.
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            Whitepapers, articles, and reference material for the people
            running OEM programs — procurement, manufacturing engineering,
            and supply chain.
          </p>
        </Container>
      </Section>

      <Section tone="muted" padding="lg">
        <Container size="full">
          <ul className="grid gap-6 md:grid-cols-3">
            {upcoming.map((u) => (
              <li key={u.title}>
                <Card as="article" className="flex h-full flex-col p-6">
                  <Badge tone="accent">{u.tag}</Badge>
                  <h2 className="mt-4 text-xl font-semibold text-ink">
                    {u.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate">{u.body}</p>
                  <p className="mt-6 text-xs uppercase tracking-[0.15em] text-slate">
                    Coming soon
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section padding="lg">
        <Container size="prose">
          <div className="rounded-lg border border-dashed border-hairline-strong bg-surface-soft p-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              In the meantime
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">
              Have a question we can answer now?
            </h2>
            <p className="mt-3 text-base text-slate">
              Skip the whitepaper. Send us a drawing and a target date,
              and we&rsquo;ll come back with a real answer.
            </p>
            <div className="mt-6">
              <Button href="/contact">Request a quote</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
