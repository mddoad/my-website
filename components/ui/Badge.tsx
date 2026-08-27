import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "inverted" | "accent";
};

// Tones from docs/design.md:
//   default   → badge-green-soft   (brand-green-soft bg, brand-green-dark text)
//   inverted  → ink bg, on-dark text, sm radius
//   accent    → badge-popular       (brand-teal-deep bg, brand-green text, full radius)
const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-brand-green-soft text-brand-green-dark rounded-full",
  inverted: "bg-ink text-on-dark rounded-sm",
  accent: "bg-brand-teal-deep text-brand-green rounded-full",
};

/**
 * Small label for tags, categories, and metadata.
 */
export function Badge({ children, className, tone = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[13px] font-semibold leading-[1.40]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
