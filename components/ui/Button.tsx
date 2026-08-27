import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center font-medium tracking-tight transition-colors disabled:opacity-50 disabled:pointer-events-none rounded-md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ink-900 text-paper hover:bg-ink-700 focus-visible:outline-ink-900",
  secondary:
    "bg-paper text-ink-900 border border-ink-200 hover:border-ink-900",
  ghost: "text-ink-900 hover:bg-steel-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

function classesFor(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

export function Button(props: ButtonAsButtonProps | ButtonAsLinkProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";

  if ("href" in props && props.href) {
    const isExternal = props.external ?? props.href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classesFor(variant, size, props.className)}
        >
          {props.children}
        </a>
      );
    }
    return (
      <Link
        href={props.href}
        className={classesFor(variant, size, props.className)}
      >
        {props.children}
      </Link>
    );
  }

  const { className, children, ...rest } = props as ButtonAsButtonProps;
  return (
    <button {...rest} className={classesFor(variant, size, className)}>
      {children}
    </button>
  );
}
