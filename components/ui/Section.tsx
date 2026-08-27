import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "inverted" | "muted";
  padding?: "sm" | "md" | "lg";
  as?: "section" | "div" | "header" | "footer";
  id?: string;
};

const paddingMap: Record<NonNullable<SectionProps["padding"]>, string> = {
  sm: "py-12 sm:py-[48px]",
  md: "py-16 sm:py-[64px]",
  lg: "py-24 sm:py-[96px]",
};

const toneMap: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-canvas text-charcoal",
  inverted: "bg-brand-teal-deep text-on-dark",
  muted: "bg-surface text-charcoal",
};

/**
 * Vertical section with consistent padding and tone variants.
 * Default: paper background, default padding (md).
 */
export function Section({
  children,
  className,
  tone = "default",
  padding = "md",
  as: Tag = "section",
  id,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(paddingMap[padding], toneMap[tone], className)}>
      {children}
    </Tag>
  );
}
