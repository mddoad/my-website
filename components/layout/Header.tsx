import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-steel-200 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <Container size="full" className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg font-semibold text-ink-900"
          aria-label={`${site.name} home`}
        >
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-sm bg-ink-900 text-paper text-sm font-bold"
          >
            M
          </span>
          <span>{site.shortName}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-7"
        >
          {site.nav.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-steel-700 hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-ink-900 px-4 text-sm font-medium text-paper transition-colors hover:bg-ink-700"
          >
            Request a quote
          </Link>
        </div>

        <div className="lg:hidden">
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
