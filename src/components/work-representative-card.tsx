import Link from "next/link";
import { ArrowUpRight, Eye, ShieldCheck } from "lucide-react";

import type { RepresentativeWorkItem } from "@/data/site";

type WorkRepresentativeCardProps = {
  item: RepresentativeWorkItem;
  industryName: string;
  index?: number;
  inverse?: boolean;
};

export function WorkRepresentativeCard({
  item,
  industryName,
  index = 0,
  inverse = false,
}: WorkRepresentativeCardProps) {
  const sequence = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`card-lift group flex h-full flex-col overflow-hidden rounded-[1.35rem] border p-6 sm:p-8 ${
        inverse
          ? "border-white/10 bg-ink-soft text-white"
          : "border-line bg-white text-ink shadow-soft"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] ${
            inverse
              ? "border-signal/30 bg-signal/10 text-signal"
              : "border-mineral/15 bg-mist text-mineral"
          }`}
        >
          <ShieldCheck aria-hidden="true" className="size-3.5" />
          {item.representativeLabel}
        </span>
        <span
          className={`font-mono text-[0.65rem] font-bold tracking-[0.16em] ${
            inverse ? "text-white/55" : "text-muted"
          }`}
        >
          WORK / {sequence}
        </span>
      </div>

      <p
        className={`mt-7 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] ${
          inverse ? "text-white/50" : "text-mineral"
        }`}
      >
        {industryName} · Anonymized scenario
      </p>
      <h3 className="mt-4 max-w-xl font-display text-[2rem] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-[2.35rem]">
        {item.title}
      </h3>
      <p
        className={`mt-5 max-w-xl text-[0.97rem] leading-7 ${
          inverse ? "text-white/65" : "text-muted"
        }`}
      >
        {item.summary}
      </p>

      <div
        className={`mt-8 flex items-start gap-3 border-t pt-5 text-sm leading-6 ${
          inverse ? "border-white/10 text-white/55" : "border-line text-muted"
        }`}
      >
        <Eye aria-hidden="true" className="mt-1 size-4 shrink-0" />
        <span>No client identity or performance result is claimed.</span>
      </div>

      <Link
        href={`/work/${item.slug}`}
        className={`mt-auto flex items-center justify-between gap-4 pt-8 text-sm font-extrabold no-underline ${
          inverse ? "text-signal" : "text-mineral"
        }`}
        aria-label={`Review representative engagement: ${item.title}`}
      >
        Review the approach
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}
