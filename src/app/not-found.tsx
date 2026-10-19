import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="wide-shell flex min-h-[calc(100vh-1rem)] items-center py-2 sm:py-4">
      <section className="sector-grid-dark relative flex min-h-[calc(100vh-1rem)] w-full items-center overflow-hidden rounded-[1.35rem] bg-canvas px-5 text-ink-soft sm:rounded-[2rem] sm:px-10">
        <div className="content-shell relative grid items-end gap-12 py-20 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="eyebrow text-coral">404 / Outside the map</span>
            <h1 className="display-page mt-6 max-w-4xl">
              This sector <span className="text-signal">doesn&apos;t exist.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
              The page may have moved, the address may be incomplete, or the link
              may belong to an older version of the site.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/" className="button-base button-primary">
                <ArrowLeft aria-hidden="true" className="size-4" />
                Return home
              </Link>
              <Link href="/services" className="button-base button-outline-light">
                <Search aria-hidden="true" className="size-4" />
                Explore services
              </Link>
            </div>
          </div>
          <div className="hidden font-display text-[15rem] font-black leading-none text-ink-soft/[0.06] lg:block" aria-hidden="true">
            404
          </div>
        </div>
      </section>
    </main>
  );
}
