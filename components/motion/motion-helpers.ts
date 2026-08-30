import type { ComponentType } from "react";
import { motion } from "motion/react";

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
 * Look up a `motion` element by tag name. `motion` is both a
 * function (`motion.create("div")`) and an object (`motion.div`);
 * the function form is what the type system actually infers for
 * dynamic tag names. The bare function form `motion(tag)` is
 * deprecated in motion 12+ — `motion.create` is the modern alias.
 */
export function getMotionComponent(
  tag: AsTag,
): ComponentType<any> {
  // The cast through `unknown` is necessary because `typeof
  // motion` doesn't declare an index signature, but the function
  // form (`motion.create("div")`) is part of its public type and
  // is the documented polymorphic API.
  return (
    motion as unknown as { create: (t: AsTag) => ComponentType<any> }
  ).create(tag);
}
