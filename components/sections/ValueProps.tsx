import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";

const props = [
  {
    title: "Engineering before tooling",
    body:
      "We embed with your team on day one. DFM, fixture design, and a locked process plan before the first chip is cut or the first brake is set.",
  },
  {
    title: "Quality built in, not inspected in",
    body:
      "CMM inspection on every batch, temperature-controlled metrology, and a full PPAP / First Article package for regulated industries.",
  },
  {
    title: "Capacity that scales with you",
    body:
      "180,000 sq ft, 2,400 active part numbers, and program management that has launched three EV programs in the last 18 months.",
  },
];

export function ValueProps() {
  return (
    <Section padding="lg">
      <Container size="full">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading as={2} eyebrow="Why Meridian">
              We make your program easier to run.
            </Heading>
          </div>
          <div className="lg:col-span-8">
            <dl className="grid gap-8 sm:grid-cols-2">
              {props.map((p) => (
                <div key={p.title} className="border-t border-hairline pt-6">
                  <dt className="text-lg font-semibold text-ink">
                    {p.title}
                  </dt>
                  <dd className="mt-3 text-base text-slate">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
