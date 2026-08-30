import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <Section tone="inverted" padding="lg">
      <Container size="prose">
        <div className="text-center">
          <Heading
            as={2}
            align="center"
            eyebrow="Ready when you are"
            tone="inverted"
            className="text-3xl font-semibold sm:text-4xl"
          >
            Tell us about your program.
          </Heading>
          <p className="mt-4 text-lg text-on-dark-muted">
            Send a drawing, a volume profile, and a target date. We&rsquo;ll
            come back with a quote, a process plan, and a quality plan within
            five business days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg">
              Request a quote
            </Button>
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-full border border-hairline-dark px-6 text-base font-medium text-on-dark transition-colors hover:border-on-dark"
            >
              About Meridian
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
