import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "inverted" | "accent";
};

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-steel-100 text-ink-900 border border-steel-200",
  inverted: "bg-ink-900 text-paper border border-ink-700",
  accent: "bg-accent-100 text-accent-700 border border-accent-200",
};

/**
 * Small label for tags, categories, and metadata.
 */
export function Badge({ children, className, tone = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
