import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "prose" | "wide" | "full";
};

const sizeMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  prose: "max-w-3xl",
  wide: "max-w-6xl",
  full: "max-w-7xl",
};

/**
 * Centered content with consistent horizontal padding.
 * - `prose` (max-w-3xl) for text-heavy pages
 * - `wide` (max-w-6xl) for marketing sections
 * - `full` (max-w-7xl) for landing pages
 */
export function Container({
  children,
  className,
  size = "wide",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", sizeMap[size], className)}>
      {children}
    </div>
  );
}
