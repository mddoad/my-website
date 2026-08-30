"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Site-wide motion configuration.
 *
 * Mounted once at the root layout (`app/layout.tsx`). Every motion
 * primitive in `components/motion/` inherits the same `reducedMotion`
 * behavior, so we don't have to remember to set it per-component.
 *
 * `reducedMotion="user"` tells `motion` to:
 * 1. read `prefers-reduced-motion` from the OS, and
 * 2. bypass its own transforms when the user prefers reduced motion
 *    (no fade-up, no count-up — content just appears).
 *
 * This is the third layer of the reduced-motion defense. The first
 * is the CSS block at `app/globals.css:146-155`, which shortens
 * every animation and transition to 0.01ms regardless of source.
 * The second is the per-component `useReducedMotion()` checks in
 * `<Reveal>` and `<Counter>`, which return the static element
 * before any motion logic runs. All three must be present; if any
 * one is missed, reduced-motion users see motion they can't opt
 * out of.
 *
 * Why a "user" value and not "always": we want motion on by default
 * (the site is a marketing site where a little polish is the point)
 * and only off when the user has explicitly asked. "never" would
 * disable motion for everyone; the absence of this provider would
 * make motion unaware of the OS preference and run animations even
 * for users who asked them off.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}
