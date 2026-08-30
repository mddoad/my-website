/**
 * Small class-name combiner. Avoids pulling in a dependency.
 */
export function cn(
  ...classes: Array<string | undefined | null | false | 0>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Parse a stat-display string like "99.2%", "2,400", "50+",
 * "180k" into the (value, prefix, suffix, decimals) shape that
 * `<Counter>` consumes. Lets the content module keep a
 * human-readable string ("99.2%") while the animated
 * component animates the actual number and reattaches the
 * decorations.
 *
 * Examples:
 *   "99.2%"  -> { value: 99.2, decimals: 1, suffix: "%" }
 *   "2,400"  -> { value: 2400, decimals: 0, suffix: "" }
 *   "50+"    -> { value: 50,  decimals: 0, suffix: "+" }
 *   "180k"   -> { value: 180, decimals: 0, suffix: "k" }
 *
 * The function is conservative: if it can't parse the number
 * cleanly (no digits, multiple sign markers, etc.) it returns
 * `null` so the caller can fall back to rendering the raw
 * string in a static `<span>`.
 */
export function parseStat(raw: string): {
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
} | null {
  const s = raw.trim();
  if (s.length === 0) return null;

  // Match: optional prefix, digits with optional decimal, optional suffix.
  // The prefix/suffix can be any non-digit, non-comma, non-dot characters.
  const m = s.match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;

  const [, prefix, numStr, suffix] = m;
  const cleaned = numStr.replace(/,/g, "");
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;

  const dotIdx = cleaned.indexOf(".");
  const decimals = dotIdx === -1 ? 0 : cleaned.length - dotIdx - 1;

  return { value: n, decimals, prefix, suffix };
}
