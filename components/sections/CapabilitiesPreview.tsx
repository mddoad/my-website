import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { services } from "@/content/services";

export function CapabilitiesPreview() {
  return (
    <Section tone="muted" padding="lg">
      <Container size="full">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading as={2} eyebrow="Capabilities">
            What we manufacture
          </Heading>
          <Link
            href="/products"
            className="text-sm font-medium text-ink hover:text-brand-green-dark"
          >
            All capabilities →
          </Link>
        </div>

        <Stagger
          as="ul"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.slice(0, 6).map((s) => (
            <Reveal as="li" key={s.slug}>
              <Card as="article" className="h-full p-6">
                <h3 className="text-lg font-semibold text-ink">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-stone">{s.short}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-slate">
                  {s.capabilities.slice(0, 3).map((c) => (
                    <li key={c} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-green"
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/products/${s.slug}`}
                  className="mt-6 inline-flex text-sm font-medium text-ink hover:text-brand-green-dark"
                >
                  Details →
                </Link>
              </Card>
            </Reveal>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
