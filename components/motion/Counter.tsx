"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Animated number that counts up from 0 to `value` when scrolled
 * into view. Used for the `<Stats>` section and the case-study
 * metric list — the strongest single conversion element on the
 * site (visitors scan the numbers before they read a word).
 *
 * Implementation: a `MotionValue<number>` holds the current
 * numeric value. When the element enters the viewport
 * (`useInView({ once: true })`), we run `animate()` against
 * the motion value with an `easeOut` curve. We subscribe to
 * the value's `change` events and store the formatted string
 * in React state so the rendered text re-renders on every
 * frame. Once the count-up finishes, the subscription's value
 * is the final formatted string and the component is
 * essentially static.
 *
 * Why `useMotionValueEvent` rather than reading the motion
 * value directly in the JSX: a `MotionValue<string>` is not a
 * React child. Subscribing with `useMotionValueEvent` and
 * storing the formatted string in state is the documented
 * pattern and the one that composes cleanly with React's
 * rendering model.
 *
 * Reduced motion: when the user prefers reduced motion, this
 * component renders the final value immediately. The count-up
 * is the only animation in the motion library that's
 * specifically a *number animating over time*; the reveal /
 * stagger animations are spatial. Skipping the count-up for
 * reduced-motion users is the right call because an
 * auto-incrementing number can't be "paused at the end
 * position" by the CSS rule alone.
 */
type CounterProps = {
  /** Target value. The animation goes 0 → value. */
  value: number;
  /** Decimal places to render. Default 0. */
  decimals?: number;
  /** Prefix string, e.g. "±" or "$". Default "". */
  prefix?: string;
  /** Suffix string, e.g. "%" or "+". Default "". */
  suffix?: string;
  /** Animation duration in seconds. Default 1.2. */
  duration?: number;
  /** Pass-through className for the rendered `<span>`. */
  className?: string;
};

const MAX_DURATION = 1.5; // Counter can run longer than Reveal
                          // because it's not a "settle" — it's a
                          // deliberate "look at the number grow."

const formatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

/**
 * Render a number with a fixed number of decimals and locale
 * grouping. The motion value is a continuous number (e.g. 0.5,
 * 1.0, 1.5 …), so we round to `decimals` here rather than in
 * the JSX. Doing the rounding inside the formatter is what
 * prevents "0.5000001" flicker on the last frame.
 */
function format(
  n: number,
  decimals: number,
  prefix: string,
  suffix: string,
): string {
  const rounded =
    decimals === 0
      ? Math.round(n).toString()
      : n.toFixed(decimals);
  // Apply locale grouping only to the integer part to keep the
  // decimal point intact.
  const [intPart, decPart] = rounded.split(".");
  const grouped = formatter.format(Number(intPart));
  const body = decPart ? `${grouped}.${decPart}` : grouped;
  return `${prefix}${body}${suffix}`;
}

export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.2,
  className,
}: CounterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState<string>(
    reduced ? format(value, decimals, prefix, suffix) : "0",
  );

  // Subscribe to motion value changes and keep React state in
  // sync. This is what re-renders the <span> on every frame.
  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(format(latest, decimals, prefix, suffix));
  });

  // Kick off the count-up the first time the element enters
  // the viewport. `useInView` with `once: true` only flips
  // false → true once, so the animation only ever fires once
  // per page load.
  useEffect(() => {
    if (reduced) return;
    if (!isInView) return;
    const safeDuration = Math.min(Math.max(duration, 0), MAX_DURATION);
    const controls = animate(motionValue, value, {
      duration: safeDuration,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, value, duration, motionValue, reduced]);

  // Reduced-motion path: render the final value as a static
  // span. We do this *outside* the useEffect so the first
  // render is already correct — no "0" flash for users who
  // have asked for less motion.
  if (reduced) {
    return (
      <span ref={ref} className={className}>
        {format(value, decimals, prefix, suffix)}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
