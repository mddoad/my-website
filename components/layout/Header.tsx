import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/80">
      <Container size="full" className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-ink"
          aria-label={`${site.name} home`}
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-md bg-brand-green text-on-primary text-sm font-bold"
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
              className="text-sm text-slate hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button href="/contact" size="sm">
            Request a quote
          </Button>
        </div>

        <div className="lg:hidden">
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
