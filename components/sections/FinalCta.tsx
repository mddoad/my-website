import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <Section tone="inverted" padding="lg">
      <Container size="prose">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
            Ready when you are
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-paper sm:text-4xl lg:text-5xl">
            Tell us about your program.
          </h2>
          <p className="mt-4 text-lg text-steel-300">
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
              className="inline-flex h-12 items-center justify-center rounded-md border border-ink-700 px-6 text-base font-medium text-paper transition-colors hover:border-paper"
            >
              About Meridian
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
