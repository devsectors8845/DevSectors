"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { navigation, type NavigationItem } from "@/data/site";

const navigationItems: readonly NavigationItem[] = navigation;

function pathIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavMenu() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      menuButtonRef.current?.focus();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  function closeDisclosure(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.closest("details")?.removeAttribute("open");
  }

  function closeMobileDisclosure(event: MouseEvent<HTMLAnchorElement>) {
    closeDisclosure(event);
    closeMobileMenu();
  }

  function handleDisclosureKeyDown(
    event: ReactKeyboardEvent<HTMLDetailsElement>,
  ) {
    if (event.key !== "Escape" || !event.currentTarget.open) return;
    event.preventDefault();
    event.currentTarget.open = false;
    event.currentTarget.querySelector<HTMLElement>("summary")?.focus();
  }

  return (
    <>
      <nav aria-label="Primary navigation" className="hidden xl:block">
        <ul className="flex items-center gap-0.5">
          {navigationItems.map((item) => {
            const active =
              pathIsActive(pathname, item.href) ||
              item.children?.some((child) =>
                pathIsActive(pathname, child.href),
              );

            if (item.isCallToAction) {
              return (
                <li key={item.href} className="ml-2">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="button-base button-primary min-h-11 px-5"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            if (item.children) {
              return (
                <li key={item.href}>
                  <details
                    className="group relative"
                    onKeyDown={handleDisclosureKeyDown}
                  >
                    <summary
                      className={`flex min-h-11 list-none items-center gap-1.5 rounded-full px-3 text-[0.82rem] font-bold transition hover:bg-surface hover:text-signal [&::-webkit-details-marker]:hidden ${
                        active ? "text-signal" : "text-ink-soft/85"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className="size-3.5 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="absolute right-0 top-[calc(100%+0.65rem)] w-72 rounded-2xl border border-line bg-surface-2 p-2 shadow-2xl">
                      <Link
                        href={item.href}
                        onClick={closeDisclosure}
                        aria-current={
                          pathIsActive(pathname, item.href) ? "page" : undefined
                        }
                        className="block rounded-xl px-4 py-3 text-ink-soft transition hover:bg-surface-3"
                      >
                        <span className="block text-sm font-extrabold">
                          {item.label} overview
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted">
                          Explore the full {item.label.toLowerCase()} section.
                        </span>
                      </Link>
                      <ul className="mt-1 border-t border-line pt-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeDisclosure}
                              aria-current={
                                pathIsActive(pathname, child.href)
                                  ? "page"
                                  : undefined
                              }
                              className={`block rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-surface-3 hover:text-signal ${
                                pathIsActive(pathname, child.href)
                                  ? "bg-surface-3 text-signal"
                                  : "text-ink-soft/85"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center rounded-full px-3 text-[0.82rem] font-bold transition hover:bg-surface hover:text-signal ${
                    active ? "text-signal" : "text-ink-soft/85"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        ref={menuButtonRef}
        type="button"
        aria-expanded={mobileOpen}
        aria-controls="mobile-primary-navigation"
        onClick={() => setMobileOpen((open) => !open)}
        className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition hover:border-coral hover:text-signal xl:hidden"
      >
        {mobileOpen ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
        <span className="sr-only">
          {mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        </span>
      </button>

      {mobileOpen && (
        <nav
          id="mobile-primary-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-y border-line bg-canvas shadow-2xl xl:hidden"
        >
          <ul className="content-shell space-y-1 py-4">
            {navigationItems.map((item) => {
              const active =
                pathIsActive(pathname, item.href) ||
                item.children?.some((child) =>
                  pathIsActive(pathname, child.href),
                );

              if (item.children) {
                return (
                  <li key={item.href}>
                    <details
                      className="group rounded-2xl border border-line bg-surface"
                      onKeyDown={handleDisclosureKeyDown}
                    >
                      <summary
                        className={`flex min-h-12 list-none items-center justify-between gap-3 px-4 font-bold [&::-webkit-details-marker]:hidden ${
                          active ? "text-signal" : "text-ink-soft"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden="true"
                          className="size-4 transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <ul className="border-t border-line px-2 py-2">
                        <li>
                          <Link
                            href={item.href}
                            onClick={closeMobileDisclosure}
                            aria-current={
                              pathIsActive(pathname, item.href)
                                ? "page"
                                : undefined
                            }
                            className="block rounded-xl px-3 py-3 text-sm font-bold text-ink-soft/85 hover:bg-surface-2"
                          >
                            {item.label} overview
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeMobileDisclosure}
                              aria-current={
                                pathIsActive(pathname, child.href)
                                  ? "page"
                                  : undefined
                              }
                              className={`block rounded-xl px-3 py-3 text-sm font-bold hover:bg-surface-2 ${
                                pathIsActive(pathname, child.href)
                                  ? "bg-surface-2 text-signal"
                                  : "text-ink-soft/85"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center rounded-2xl px-4 font-bold transition ${
                      item.isCallToAction
                        ? "justify-center button-primary"
                        : active
                          ? "bg-surface-2 text-signal"
                          : "bg-surface text-ink-soft hover:bg-surface-2"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}