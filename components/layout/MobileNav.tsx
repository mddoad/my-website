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
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-steel-200 text-ink-900"
      >
        <span
          aria-hidden
          className="block h-0.5 w-5 bg-current shadow-[0_-6px_0_0_currentColor,0_6px_0_0_currentColor]"
        />
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-16 z-50 border-t border-steel-200 bg-paper"
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
                className="rounded-md px-2 py-3 text-base text-steel-800 hover:bg-steel-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-ink-900 px-5 text-sm font-medium text-paper"
            >
              Request a quote
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
