/**
 * Small class-name combiner. Avoids pulling in a dependency.
 */
export function cn(
  ...classes: Array<string | undefined | null | false | 0>
): string {
  return classes.filter(Boolean).join(" ");
}
