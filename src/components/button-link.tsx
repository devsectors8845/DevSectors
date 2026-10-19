import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark" | "outline" | "outline-light";
  className?: string;
  arrow?: boolean;
};

const variants = {
  primary: "button-primary",
  dark: "button-dark",
  outline: "button-outline",
  "outline-light": "button-outline-light",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = true,
}: ButtonLinkProps) {
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowUpRight aria-hidden="true" className="size-4" />}
    </>
  );
  const classes = `button-base ${variants[variant]} ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}