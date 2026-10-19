import Link from "next/link";

import { navigation, type NavigationItem } from "@/data/site";

export function NavCta({ className = "" }: { className?: string }) {
  const cta = (navigation as readonly NavigationItem[]).find(
    (item) => item.isCallToAction,
  );

  if (!cta) return null;

  return (
    <Link href={cta.href} className={`button-base button-primary rounded-full ${className}`}>
      <span>{cta.label}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Link>
  );
}
