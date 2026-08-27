import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { stats } from "@/content/stats";

export function Stats() {
  return (
    <Section padding="md" className="border-y border-hairline">
      <Container size="full">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <dt className="order-2 text-sm text-muted sm:order-1">
                {s.label}
              </dt>
              <dd className="order-1 text-4xl font-semibold text-ink sm:order-2 sm:text-5xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
