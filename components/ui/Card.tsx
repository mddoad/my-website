import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "li";
};

/**
 * card-base from docs/design.md: bg-canvas, rounded-lg, p-xl,
 * hairline border. `interactive` adds a hairline-strong border on
 * hover/focus-within for clickable cards. No default shadow —
 * design.md's card pattern is flat with hairlines; sections
 * that need elevation apply it explicitly.
 */
export function Card({
  children,
  className,
  interactive = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-hairline bg-canvas",
        interactive &&
          "transition-colors hover:border-hairline-strong focus-within:border-hairline-strong",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
