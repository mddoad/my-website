"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-hairline text-ink"
      >
        <span
          aria-hidden
          className="block h-0.5 w-5 bg-current shadow-[0_-6px_0_0_currentColor,0_6px_0_0_currentColor]"
        />
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-16 z-50 border-t border-hairline bg-canvas"
        >
          <nav
            aria-label="Mobile primary"
            className="flex flex-col gap-1 px-6 py-6"
          >
            {site.nav.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base text-charcoal hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-brand-green px-5 text-sm font-semibold text-on-primary"
            >
              Request a quote
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
