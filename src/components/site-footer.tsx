import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { SiteLogo } from "@/components/site-logo";
import { navigation, services, siteConfig } from "@/data/site";

export function SiteFooter() {
  const { contact, identity } = siteConfig;

  return (
    <footer className="mt-20 border-t border-line bg-canvas text-ink-soft sm:mt-28">
      <div className="content-shell py-14 sm:py-20">
        <div className="grid gap-12 border-b border-line pb-14 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:gap-16">
          <div>
            <SiteLogo />
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">
              Plan clearly. Design intentionally. Build reliably. Keep improving.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-signal transition hover:text-coral"
            >
              Discuss a project
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Explore
            </h2>
            <ul className="mt-5 space-y-1">
              {navigation
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-10 items-center text-sm font-bold text-ink-soft/75 transition hover:text-signal"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <nav aria-label="Service navigation">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Capabilities
            </h2>
            <ul className="mt-5 space-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex min-h-10 items-center text-sm font-bold leading-5 text-ink-soft/75 transition hover:text-signal"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid gap-8 border-b border-line py-10 md:grid-cols-3">
          <a
            href={contact.emailHref}
            className="group flex min-h-11 items-start gap-3 text-sm text-muted transition hover:text-ink-soft"
          >
            <Mail
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-signal"
            />
            <span>
              <span className="block font-mono text-[0.62rem] font-bold uppercase tracking-wider text-muted">
                Email
              </span>
              <span className="mt-1 block font-bold group-hover:text-signal">
                {contact.email}
              </span>
            </span>
          </a>
          <a
            href={contact.phoneHref}
            className="group flex min-h-11 items-start gap-3 text-sm text-muted transition hover:text-ink-soft"
          >
            <Phone
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-signal"
            />
            <span>
              <span className="block font-mono text-[0.62rem] font-bold uppercase tracking-wider text-muted">
                Phone
              </span>
              <span className="mt-1 block font-bold group-hover:text-signal">
                {contact.phone}
              </span>
            </span>
          </a>
          <div className="flex items-start gap-3 text-sm text-muted">
            <MapPin
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-signal"
            />
            <span>
              <span className="block font-mono text-[0.62rem] font-bold uppercase tracking-wider text-muted">
                Based in
              </span>
              <span className="mt-1 block font-bold">
                {identity.locationLabel}
              </span>
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-signal via-coral to-mineral" />

        <div className="flex flex-col gap-4 pt-7 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {identity.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center font-bold text-muted transition hover:text-signal"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="inline-flex min-h-11 items-center font-bold text-muted transition hover:text-signal"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}