"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * Hamburger menu for viewports below `lg`. Renders a single
 * `<button>` that toggles a localized dropdown panel anchored
 * to the bottom of the sticky header.
 *
 * Accessibility:
 * - The toggle uses `aria-expanded` and `aria-controls` to
 *   associate the button with the panel.
 * - When the menu opens, focus moves to the first link inside
 *   the panel and Tab/Shift+Tab is trapped within the panel.
 * - `Escape` closes the menu and returns focus to the toggle.
 * - `body` scroll is locked while the menu is open so the
 *   page doesn't scroll behind the dropdown.
 * - The panel uses `role="dialog" aria-modal="true"` so
 *   screen readers announce it as a modal navigation.
 *
 * The same control still works without JavaScript: the toggle
 * is a real `<button>`, but no menu is shown. The desktop
 * primary nav (`<nav className="hidden lg:flex">` in
 * `Header.tsx`) is the always-visible fallback.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Close on Escape, lock body scroll, and focus the first
  // link when the menu opens. Cleanup restores body scroll
  // and focus regardless of how the menu was dismissed.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        // Focus trap: cycle focus within the panel.
        const focusables =
          panelRef.current.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])',
          );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus to the first link after the panel mounts.
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // After close, return focus to the toggle. This is a separate
  // effect so it runs *after* the open-path's cleanup.
  useEffect(() => {
    if (open) return;
    // Only restore focus if the toggle is still in the document
    // (i.e. the user hasn't navigated to a different page).
    if (toggleRef.current && document.activeElement === document.body) {
      toggleRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-hairline text-ink transition-colors active:bg-surface"
      >
        <span
          aria-hidden
          className="block h-0.5 w-5 bg-current shadow-[0_-6px_0_0_currentColor,0_6px_0_0_currentColor]"
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 top-16 z-50 border-t border-hairline bg-canvas shadow-raised"
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
