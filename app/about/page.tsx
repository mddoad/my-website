import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { stats } from "@/content/stats";
import { team } from "@/content/team";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Meridian Manufacturing was established in 1972. AS9100D, ISO 9001:2015, and ITAR registered. 180,000 sq ft of manufacturing in Cleveland, OH.",
  alternates: { canonical: "/about" },
});

export default function AboutPage() {
  const year = new Date().getFullYear();
  const years = year - site.established;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />

      {/* Hero */}
      <Section padding="lg">
        <Container size="wide">
          <Heading as={1} eyebrow="About">
            We&rsquo;ve been building OEM programs since {site.established}.
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            For {years} years, Meridian has been a Tier 1 supplier of
            precision-machined and fabricated components to OEM customers
            in aerospace, automotive, energy, and medical. We&rsquo;re
            privately held, family-influenced, and run by operators.
          </p>
        </Container>
      </Section>

      {/* Stats */}
      <Section padding="md" className="border-y border-hairline">
        <Container size="wide">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-1 text-4xl font-semibold text-ink sm:text-5xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Company history */}
      <Section padding="lg">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Heading as={2} eyebrow="Our story">
                Built one program at a time.
              </Heading>
            </div>
            <div className="lg:col-span-8 space-y-6 text-lg text-slate">
              <p>
                Meridian was founded in {site.established} as a small
                tool-and-die shop serving the Cleveland industrial base.
                Through the 1980s and 90s we added CNC capacity and
                entered aerospace and defense supply chains. The 2000s
                brought ISO 9001 and AS9100 certifications; the 2010s
                brought Tier 1 automotive programs.
              </p>
              <p>
                Today we run {stats[1].value} square feet of
                manufacturing, with {stats[2].value} active part numbers
                across four industries. We&rsquo;re privately held, and
                our leadership team has an average tenure of 14 years
                with the company.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Certifications */}
      <Section tone="muted" padding="lg" id="certifications">
        <Container size="wide">
          <Heading as={2} eyebrow="Certifications">
            Registered and certified.
          </Heading>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.certifications.map((c) => (
              <li
                key={c.label}
                className="rounded-lg border border-hairline bg-canvas p-6"
              >
                <p className="text-lg font-semibold text-ink">
                  {c.label}
                </p>
                <p className="mt-2 text-sm text-slate">{c.note}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Leadership preview */}
      <Section padding="lg">
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Heading as={2} eyebrow="Leadership">
              The team running your program.
            </Heading>
            <a
              href="/team"
              className="text-sm font-medium text-ink hover:text-brand-green-dark"
            >
              Full team →
            </a>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name}>
                <Card as="article" className="h-full p-6">
                  <div
                    aria-hidden
                    className="grid h-12 w-12 place-items-center rounded-full bg-brand-teal-deep text-base font-semibold text-on-dark"
                  >
                    {m.initials}
                  </div>
                  <p className="mt-4 text-base font-semibold text-ink">
                    {m.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-brand-green-dark">
                    {m.role}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="inverted" padding="lg">
        <Container size="prose">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-on-dark sm:text-4xl">
              Come see the floor.
            </h2>
            <p className="mt-4 text-lg text-on-dark-muted">
              We host customer visits at our Cleveland facility by
              appointment. Send a note and we&rsquo;ll set one up.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Request a visit
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
