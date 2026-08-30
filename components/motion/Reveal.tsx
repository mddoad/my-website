"use client";

import { useReducedMotion, type Variants } from "motion/react";
import type { ReactNode, ElementType } from "react";
import { getMotionComponent, type AsTag } from "./motion-helpers";

/**
 * Single-element scroll reveal. Fades the wrapped content up by
 * `y` pixels (default 12) and into full opacity when it scrolls
 * into view. Animation fires once per page load (`viewport.once`)
 * with a -10% bottom margin so the trigger happens a touch before
 * the element is fully on-screen — feels more responsive than
 * waiting for the full element to be visible.
 *
 * The ease curve `[0.22, 1, 0.36, 1]` is a hand-tuned out-expo:
 * fast start, slow finish. The same shape Stripe's marketing pages
 * use for content "settling in." It is not a spring, not a bounce,
 * and never lasts more than 600ms (the longest `duration` we'd
 * reasonably pass is the 500ms default).
 *
 * `useReducedMotion()` is checked *before* any motion logic runs.
 * When the user prefers reduced motion, the component returns a
 * plain passthrough — no motion, no extra DOM, no hydration cost
 * beyond a `<div>`. This is the second layer of the reduced-motion
 * defense (the first is the CSS block in `globals.css`; the third
 * is `MotionConfig reducedMotion="user"` in `MotionProvider`).
 */
type RevealProps = {
  children: ReactNode;
  /**
   * Rendered element. `"div"` by default. Use `"li"` inside a
   * `<ul>` / `<ol>`, `"article"` for cards, etc. The full set
   * of valid tags is the unified `AsTag` union in
   * `./motion-helpers` — shared with `<Stagger>` so a single
   * helper serves both.
   */
  as?: AsTag;
  /** Delay in seconds before the reveal starts. Default 0. */
  delay?: number;
  /** Vertical translate distance in px. Default 12. */
  y?: number;
  /** Duration in seconds. Default 0.5. Capped at 0.6 by guardrail. */
  duration?: number;
  /** Pass-through className. */
  className?: string;
};

const MAX_DURATION = 0.6; // Plan guardrail: no motion > 600ms.
const MAX_Y = 24; // Cap the translate to keep things subtle.

/**
 * `revealItem` is the per-child `Variants` shape that `<Stagger>`
 * uses to coordinate a group. The keys are `hidden` and `visible`
 * because the parent `<Stagger>` flips between them via
 * `animate="visible"`. `<Reveal>` itself uses the inline
 * `initial` / `whileInView` form so it can be used standalone.
 */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 12,
  duration = 0.5,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();

  // Reduced motion: render the requested element with no motion
  // logic at all. The third-layer `MotionConfig reducedMotion="user"`
  // in the provider would also bypass transforms, but checking
  // here lets us skip the motion.div wrapper entirely.
  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const safeY = Math.min(Math.max(y, 0), MAX_Y);
  const safeDuration = Math.min(Math.max(duration, 0), MAX_DURATION);

  const MotionTag = getMotionComponent(as);

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: safeY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: safeDuration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
