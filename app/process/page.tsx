import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { processSteps } from "@/content/stats";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Process",
  description:
    "How an OEM program moves at Meridian — Discover, Engineer, Produce, Deliver. DFM upfront, locked process plan, full documentation.",
  alternates: { canonical: "/process" },
});

/**
 * Long-form expansion of each process step. The `processSteps` array in
 * `content/stats.ts` is the single-line version; this file adds the
 * detail per step without duplicating the source of truth.
 */
const stepDetails: { title: string; bullets: string[] }[] = [
  {
    title: "Discover",
    bullets: [
      "Drawing review against the customer's stated tolerances, materials, and volumes.",
      "Program timeline review: SOP date, ramp curve, and any contract milestones.",
      "Quality plan alignment: PPAP level, AS9102 First Article, customer-specific testing.",
      "Commercial alignment on pricing, payment terms, and long-term agreement scope.",
    ],
  },
  {
    title: "Engineer",
    bullets: [
      "Design for manufacturability (DFM) review with the customer's engineering team.",
      "Fixture, tooling, and gauge design — built in-house.",
      "Process flow with cycle time, bottleneck, and capacity model.",
      "Quality plan: inspection points, control plans, and FAI documentation.",
    ],
  },
  {
    title: "Produce",
    bullets: [
      "First article inspection against the full drawing — every datum, every GD&T callout.",
      "Production runs with in-process inspection at the planned control points.",
      "Weekly program reporting: output, quality, and any engineering changes.",
      "Material and lot traceability from raw stock through finished goods.",
    ],
  },
  {
    title: "Deliver",
    bullets: [
      "On-time shipment with full documentation: COC, material certs, inspection reports.",
      "Engineering change order support — ECNs processed within 48 hours.",
      "Volume ramp management — capacity is planned for 1.5x the baseline at launch.",
      "Long-term program support: quarterly business reviews and continuous improvement.",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Process", href: "/process" },
        ])}
      />

      {/* Hero */}
      <Section padding="lg">
        <Container size="wide">
          <Heading as={1} eyebrow="Process">
            How an OEM program moves at Meridian.
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            Four phases, each with its own deliverables and gates. We don&rsquo;t
            move to the next phase until the current one is signed off.
          </p>
        </Container>
      </Section>

      {/* Steps */}
      <Section tone="muted" padding="lg">
        <Container size="wide">
          <Stagger as="ol" className="space-y-12">
            {processSteps.map((s, i) => (
              <Reveal
                as="li"
                key={s.step}
                className="grid gap-6 rounded-lg border border-hairline bg-canvas p-8 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-3">
                  <div className="text-5xl font-semibold text-brand-green">
                    {s.step}
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold text-ink">
                    {s.title}
                  </h2>
                </div>
                <div className="lg:col-span-9">
                  <p className="text-lg text-slate">{s.body}</p>
                  <ul className="mt-6 space-y-3 border-t border-hairline pt-6 text-sm text-charcoal">
                    {stepDetails[i].bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-green"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                eyebrow="Get started"
                tone="inverted"
              size="cta"
              >
                Start with Discover.
              </Heading>
              <p className="mt-4 text-lg text-on-dark-muted">
                Send a drawing, a volume profile, and a target date. We&rsquo;ll
                come back with a quote, a process plan, and a quality plan
                within five business days.
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
