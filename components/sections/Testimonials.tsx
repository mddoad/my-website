import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section padding="lg">
      <Container size="full">
        <Heading as={2} eyebrow="From our customers">
          What OEM partners say
        </Heading>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={i}>
              <Card as="article" className="h-full p-6">
                <blockquote className="text-base text-steel-800">
                  <p>“{t.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-steel-200 pt-4 text-sm">
                  <p className="font-medium text-ink-900">{t.role}</p>
                  <p className="text-steel-500">{t.company}</p>
                </figcaption>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
