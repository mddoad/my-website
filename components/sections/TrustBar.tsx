import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function TrustBar() {
  return (
    <section
      aria-label="Certifications"
      className="border-y border-steel-200 bg-steel-50 py-10 sm:py-12"
    >
      <Container size="full">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
          Certified to the standards your industry requires
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
          {site.certifications.map((c) => (
            <li
              key={c.label}
              className="flex flex-col items-center gap-1 border-l border-steel-200 pl-4 first:border-l-0 sm:items-start sm:border-l sm:first:border-l"
            >
              <span className="font-serif text-base font-semibold text-ink-900">
                {c.label}
              </span>
              <span className="text-xs text-steel-500">{c.note}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
