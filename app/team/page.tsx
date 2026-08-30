import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { team } from "@/content/team";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Team",
  description: `${site.name}'s leadership team — CEO, VP of Engineering, VP of Operations, and Director of Quality.`,
  alternates: { canonical: "/team" },
});

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Team", href: "/team" },
        ])}
      />

      <Section padding="lg">
        <Container size="wide">
          <Heading as={1} eyebrow="Team">
            Leadership.
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            The people accountable for your program. Average tenure at
            Meridian: 14 years.
          </p>
        </Container>
      </Section>

      <Section tone="muted" padding="lg">
        <Container size="full">
          <Stagger
            as="ul"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
          >
            {team.map((m) => (
              <Reveal as="li" key={m.name}>
                <Card as="article" className="flex h-full gap-6 p-8">
                  <div
                    aria-hidden
                    className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-full bg-brand-teal-deep text-2xl font-semibold text-on-dark"
                  >
                    {m.initials}
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-ink">
                      {m.name}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-green-dark">
                      {m.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate">
                      {m.bio}
                    </p>
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
                eyebrow="Talk to us"
                tone="inverted"
                className="text-3xl font-semibold sm:text-4xl"
              >
                Want to talk to one of them directly?
              </Heading>
              <p className="mt-4 text-lg text-on-dark-muted">
                Tell us about your program and we&rsquo;ll route you to the
                right person.
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
