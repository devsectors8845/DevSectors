"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="content-shell flex min-h-[70vh] items-center py-16">
      <section className="w-full rounded-[1.75rem] border border-line bg-paper p-7 sm:p-12">
        <span className="flex size-12 items-center justify-center rounded-full bg-coral/15 text-coral-ink">
          <AlertTriangle aria-hidden="true" className="size-6" />
        </span>
        <span className="eyebrow mt-8 text-coral-ink">
          Something interrupted this page
        </span>
        <h1 className="font-display mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl">
          The request did not finish cleanly.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          Try the page again. If the problem continues, return home or contact
          DevSectors with the page address.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="button-base button-dark">
            <RefreshCcw aria-hidden="true" className="size-4" />
            Try again
          </button>
          <Link href="/" className="button-base button-outline">
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
