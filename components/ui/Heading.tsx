import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingProps = {
  children: ReactNode;
  className?: string;
  as?: HeadingLevel;
  eyebrow?: string;
  align?: "left" | "center";
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
}: HeadingProps) {
  const Tag = `h${as}` as "h1" | "h2" | "h3" | "h4";
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        align === "center" && "items-center text-center",
      )}
    >
      {eyebrow && (
        <span className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green-dark">
          {eyebrow}
        </span>
      )}
      <Tag
        className={cn(
          "text-ink font-medium",
          sizeClasses[as],
          className,
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
