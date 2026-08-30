import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonTone = "default" | "inverted";

const baseClasses =
  "inline-flex items-center justify-center font-semibold leading-[1.30] transition-colors disabled:opacity-50 disabled:pointer-events-none";

// Variants from docs/design.md. Primary/secondary are full-radius
// (rounded-full); ghost keeps md-radius (8px) per design.md
// button-ghost.
//
// `secondary` is tone-aware: on a light surface the text and
// border are ink; on an inverted (dark) surface they become
// on-dark / hairline-dark so the button stays legible. The
// ghost variant is only used on light surfaces and stays ink.
const variantClasses: Record<
  ButtonVariant,
  Record<ButtonTone, string>
> = {
  primary: {
    default:
      "bg-brand-green text-on-primary rounded-full hover:bg-primary-deep focus-visible:outline-brand-green-dark",
    inverted:
      "bg-brand-green text-on-primary rounded-full hover:bg-primary-deep focus-visible:outline-brand-green-dark",
  },
  secondary: {
    default:
      "bg-transparent text-ink rounded-full border border-hairline-strong hover:border-ink",
    inverted:
      "bg-transparent text-on-dark rounded-full border border-hairline-dark hover:border-on-dark",
  },
  ghost: {
    default: "text-ink rounded-md px-3 py-2 hover:bg-surface",
    inverted: "text-on-dark rounded-md px-3 py-2 hover:bg-brand-teal",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Visual register. "default" pairs with a light canvas
   * (ink text/border); "inverted" pairs with the brand-teal-deep
   * surface (on-dark text, hairline-dark border). Match the
   * parent `Section` tone so the secondary/ghost button stays
   * legible without per-site overrides.
   */
  tone?: ButtonTone;
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
  tone: ButtonTone,
  className?: string,
) {
  return cn(
    baseClasses,
    variantClasses[variant][tone],
    sizeClasses[size],
    className,
  );
}

export function Button(props: ButtonAsButtonProps | ButtonAsLinkProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const tone = props.tone ?? "default";

  if ("href" in props && props.href) {
    const isExternal = props.external ?? props.href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classesFor(variant, size, tone, props.className)}
        >
          {props.children}
        </a>
      );
    }
    return (
      <Link
        href={props.href}
        className={classesFor(variant, size, tone, props.className)}
      >
        {props.children}
      </Link>
    );
  }

  const { className, children, ...rest } = props as ButtonAsButtonProps;
  return (
    <button {...rest} className={classesFor(variant, size, tone, className)}>
      {children}
    </button>
  );
}
