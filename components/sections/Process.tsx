import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { processSteps } from "@/content/stats";

export function Process() {
  return (
    <Section tone="inverted" padding="lg">
      <Container size="full">
        <Heading as={2} eyebrow="Process" align="center">
          How an OEM program moves at Meridian
        </Heading>

        <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li key={s.step} className="relative">
              <div className="font-serif text-5xl font-semibold text-accent-500">
                {s.step}
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-paper">
                {s.title}
              </h3>
              <p className="mt-3 text-base text-steel-300">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
