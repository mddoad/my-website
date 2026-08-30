import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingTone = "default" | "inverted";

type HeadingProps = {
  children: ReactNode;
  className?: string;
  as?: HeadingLevel;
  eyebrow?: string;
  align?: "left" | "center";
  /**
   * Visual register. "default" pairs with a light canvas (ink
   * title, brand-green-dark eyebrow). "inverted" pairs with the
   * brand-teal-deep inverted section (on-dark title, brand-green
   * eyebrow). Match the parent `Section` tone so contrast is
   * correct without per-site overrides.
   */
  tone?: HeadingTone;
};

// Type scale from docs/design.md. Mobile drops to the lower
// end of each band via the existing sm:/lg: breakpoints so the
// hero-display 72/1.10 doesn't overflow on phones.
const sizeClasses: Record<HeadingLevel, string> = {
  1: "text-[40px] leading-[1.10] tracking-[-1.5px] sm:text-[56px] lg:text-[72px]",
  2: "text-[32px] leading-[1.20] tracking-[-0.5px] sm:text-[40px] lg:text-[48px]",
  3: "text-[24px] leading-[1.30] sm:text-[28px]",
  4: "text-[20px] leading-[1.35] sm:text-[22px]",
};

const toneClasses: Record<HeadingTone, { eyebrow: string; title: string }> = {
  default: { eyebrow: "text-brand-green-dark", title: "text-ink" },
  inverted: { eyebrow: "text-brand-green", title: "text-on-dark" },
};

/**
 * Consistent heading with optional eyebrow label. Inter sets the
 * typeface (substitutes design.md's Euclid Circular A — paid).
 */
export function Heading({
  children,
  className,
  as = 2,
  eyebrow,
  align = "left",
  tone = "default",
}: HeadingProps) {
  const Tag = `h${as}` as "h1" | "h2" | "h3" | "h4";
  const toneTokens = toneClasses[tone];
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[1px]",
            toneTokens.eyebrow,
          )}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        className={cn(
          "font-medium",
          toneTokens.title,
          sizeClasses[as],
          className,
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
