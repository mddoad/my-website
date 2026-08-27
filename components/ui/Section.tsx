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
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-32",
};

const toneMap: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-paper text-steel-800",
  inverted: "bg-ink-900 text-steel-100",
  muted: "bg-steel-50 text-steel-800",
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
