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

const sizeClasses: Record<HeadingLevel, string> = {
  1: "text-4xl sm:text-5xl lg:text-6xl font-semibold",
  2: "text-3xl sm:text-4xl lg:text-5xl font-semibold",
  3: "text-2xl sm:text-3xl font-semibold",
  4: "text-xl sm:text-2xl font-semibold",
};

/**
 * Consistent heading with optional eyebrow label.
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
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
          {eyebrow}
        </span>
      )}
      <Tag className={cn("text-ink-900", sizeClasses[as], className)}>
        {children}
      </Tag>
    </div>
  );
}
