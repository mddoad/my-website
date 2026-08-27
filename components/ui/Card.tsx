import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "li";
};

export function Card({
  children,
  className,
  interactive = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-steel-200 bg-paper shadow-card",
        interactive &&
          "transition-shadow hover:shadow-raised focus-within:shadow-raised",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
