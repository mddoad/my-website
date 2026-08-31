"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { MOTION_BY_TAG, type AsTag } from "./motion-helpers";
import { revealItem } from "./Reveal";

/**
 * Coordinates a group of `<Reveal>` children so they animate in
 * sequence rather than all at once.
 *
 * Implementation: this component renders a `motion.div` (or
 * `motion.ul` / `motion.ol` / `motion.dl` / `motion.section`
 * depending on `as`) whose `variants` describes a parent that
 * switches between `hidden` and `visible` states with
 * `staggerChildren` and `delayChildren` transitions. Each child
 * `<Reveal>` uses the matching `revealItem` variants object
 * (exported from `Reveal.tsx`) and inherits the cascade
 * automatically.
 *
 * The 80ms default keeps even the longest list under 500ms total
 * (`CapabilitiesPreview` has six items, so 5 × 80 = 400ms + the
 * first item's own 500ms duration, well under the 1-second
 * "felt as instant" threshold).
 *
 * Reduced motion: when the user prefers reduced motion, this
 * component returns a plain passthrough container. The
 * per-child `<Reveal>`s also detect reduced motion and render
 * as plain elements, so there is no animation at all.
 */
type StaggerProps = {
  children: ReactNode;
  /**
   * Container element. Default `"div"`. Use `"ul"` / `"ol"` for
   * lists, `"dl"` for description lists, `"section"` for
   * standalone sections. The full set of valid tags is the
   * unified `AsTag` union in `./motion-helpers`.
   */
  as?: AsTag;
  /** Initial delay before the first child reveals, in seconds. */
  delay?: number;
  /** Time between children, in seconds. Default 0.08 (80ms). */
  step?: number;
  /**
   * Pass-through className for the container. Lets the call site
   * keep its existing layout (e.g. `grid gap-6 sm:grid-cols-3`).
   */
  className?: string;
};

const MAX_STEP = 0.2; // Cap so a misconfigured 10-item list still
                       // finishes in under 2.5s.

export function Stagger({
  children,
  as = "div",
  delay = 0,
  step = 0.08,
  className,
}: StaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const MotionTag = MOTION_BY_TAG[as];
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  const safeStep = Math.min(Math.max(step, 0), MAX_STEP);

  const container: import("motion/react").Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: safeStep,
      },
    },
  };

  const MotionTag = MOTION_BY_TAG[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={container}
    >
      {/*
       * The children must be <Reveal> elements (or any element
       * using the `revealItem` variants). The parent variants
       * above flip them between `hidden` and `visible` with
       * the staggered delay. We don't assert this at the type
       * level because doing so would require coupling
       * <Stagger> to <Reveal>'s prop signature; the runtime
       * behavior is "if a child listens to `hidden`/`visible`
       * variants, it cascades; otherwise it shows immediately."
       */}
      {children}
    </MotionTag>
  );
}

/**
 * Re-export `revealItem` so a call site can compose a custom
 * stagger without re-importing from `<Reveal>`. The intent is:
 * `import { Stagger, revealItem } from "@/components/motion/Stagger"`.
 */
export { revealItem };
