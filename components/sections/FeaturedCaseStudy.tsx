import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { caseStudies, picsumUrl } from "@/content/case-studies";

export function FeaturedCaseStudy() {
  const study = caseStudies[0];

  return (
    <Section padding="lg">
      <Container size="full">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-soft">
            <Image
              src={picsumUrl(study.picsumSeed, 1600, 1200)}
              alt={study.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Badge tone="default">Featured case study · {study.year}</Badge>
            <h2 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
              {study.title}
            </h2>
            <p className="mt-4 text-lg text-slate">{study.summary}</p>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-hairline pt-6">
              {study.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="text-xs text-stone">{m.label}</dt>
                  <dd className="mt-1 text-2xl text-ink">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/case-studies/${study.slug}`}>Read the story</Button>
              <Button href="/case-studies" variant="secondary">
                All case studies
              </Button>
            </div>
            <p className="mt-6 text-sm text-stone">
              <Link
                href="/case-studies"
                className="underline-offset-2 hover:underline"
              >
                {study.client}
              </Link>{" "}
              · {study.industry}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
