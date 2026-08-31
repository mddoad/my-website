import type { ComponentType } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

/**
 * Resolved element type for the polymorphic `as` prop on the
 * motion primitives. Covers every HTML element a motion-wrapped
 * container can render to: the sectioning / list elements plus
 * the per-item elements used inside a `<Stagger>`.
 *
 * Kept as a single union so the same helper serves both
 * `<Reveal>` (per-item elements) and `<Stagger>` (container
 * elements) without a per-file `AsTag`.
 */
export type AsTag =
  | "div"
  | "section"
  | "ul"
  | "ol"
  | "dl"
  | "li"
  | "article"
  | "header"
  | "footer";

/**
 * A `motion`-wrapped HTML element. `motion.create()` returns a
 * component that accepts the underlying element's HTML props
 * plus the motion-only props (`initial`, `whileInView`,
 * `variants`, …); both are surfaced through `HTMLMotionProps<T>`.
 */
type MotionElement<T extends AsTag> = ComponentType<HTMLMotionProps<T>>;

/**
 * Pre-resolved motion components keyed by `AsTag`. Built once at
 * module load rather than per render — creating a component
 * mid-render is a `react-hooks/static-components` violation
 * (it would unmount and remount on every parent render, losing
 * the in-flight animation state).
 *
 * `motion.create()` is the motion 12+ replacement for the
 * deprecated `motion(tag)` call form. The cast through `unknown`
 * is necessary because `typeof motion` does not declare an index
 * signature, but the function form is part of its public API.
 */
const createMotion = (
  motion as unknown as {
    create: <T extends AsTag>(t: T) => MotionElement<T>;
  }
).create;

/**
 * Pre-resolved motion components keyed by `AsTag`. Consumers
 * should read directly from this map (`MOTION_BY_TAG[as]`) —
 * the indirection through `getMotionComponent()` exists for
 * older call sites, but direct lookup avoids the
 * `react-hooks/static-components` warning that fires on any
 * function call inside a render body, even one that just
 * indexes into a frozen record.
 */
export const MOTION_BY_TAG: { [T in AsTag]: MotionElement<T> } = {
  div: createMotion("div"),
  section: createMotion("section"),
  ul: createMotion("ul"),
  ol: createMotion("ol"),
  dl: createMotion("dl"),
  li: createMotion("li"),
  article: createMotion("article"),
  header: createMotion("header"),
  footer: createMotion("footer"),
};

/**
 * Look up a `motion` element by tag name. Returns a stable
 * component reference for each tag.
 */
export function getMotionComponent<T extends AsTag>(
  tag: T,
): MotionElement<T> {
  return MOTION_BY_TAG[tag];
}
