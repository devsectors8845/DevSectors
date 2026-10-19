import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function CtaBand({
  eyebrow = "Have a product in mind?",
  title = "Turn the next idea into a clear build plan.",
  description = "Tell us what needs to change. We will help shape the scope, identify the fastest useful release, and map a practical way forward."
}: CtaBandProps) {
  return (
    <section className="wide-shell pb-2 sm:pb-4">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-gradient-to-br from-surface-2 to-surface px-5 py-16 text-ink-soft sm:rounded-[2rem] sm:px-10 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(142,235,77,0.10),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(0,174,239,0.12),transparent_45%)]" />
        <div className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full border-[42px] border-signal/20" />
        <div className="content-shell relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-4xl">
            <span className="eyebrow text-signal">{eyebrow}</span>
            <h2 className="heading-section mt-6 max-w-4xl">{title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="button-base button-primary">
              <span>Start a conversation</span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
            <Link href="/services" className="button-base button-outline-light">
              <span>View our capabilities</span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}