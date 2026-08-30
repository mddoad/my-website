import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export function TrustBar() {
  return (
    <section
      aria-label="Certifications"
      className="border-y border-hairline bg-surface py-10 sm:py-12"
    >
      <Container size="full">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[1px] text-muted">
            Certified to the standards your industry requires
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
            {site.certifications.map((c) => (
              <li
                key={c.label}
                className="flex flex-col items-center gap-1 border-l border-hairline pl-4 first:border-l-0 sm:items-start sm:border-l sm:first:border-l"
              >
                <span className="text-base font-semibold text-ink">
                  {c.label}
                </span>
                <span className="text-xs text-stone">{c.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
