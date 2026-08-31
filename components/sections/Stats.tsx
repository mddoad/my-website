import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Counter } from "@/components/motion/Counter";
import { stats } from "@/content/stats";
import { parseStat } from "@/lib/utils";

export function Stats() {
  return (
    <Section padding="md" className="border-y border-hairline">
      <Container size="full">
        <Stagger as="dl" className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => {
            const stat = parseStat(s.value);
            return (
              <Reveal
                as="div"
                key={s.label}
                className="text-center sm:text-left"
              >
                <dt className="order-2 text-sm text-slate sm:order-1">
                  {s.label}
                </dt>
                <dd className="order-1 text-4xl font-semibold text-ink sm:order-2 sm:text-5xl">
                  {stat ? (
                    <Counter
                      value={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  ) : (
                    s.value
                  )}
                </dd>
              </Reveal>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
