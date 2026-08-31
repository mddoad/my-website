import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section padding="lg">
      <Container size="prose">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green-dark">
            404
          </p>
          <Heading as={1} className="mt-4">
            That page isn&rsquo;t here.
          </Heading>
          <p className="mt-6 text-lg text-slate">
            The link you followed may be outdated, or the page may have
            moved. From here you can head back to the home page or jump
            straight to our capabilities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href="/products" variant="secondary" size="lg">
              See capabilities
            </Button>
          </div>
          <p className="mt-10 text-sm text-slate">
            Looking for something specific?{" "}
            <Link
              href="/contact"
              className="font-medium text-ink underline-offset-2 hover:underline"
            >
              Get in touch
            </Link>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
