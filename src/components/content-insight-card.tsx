import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

import type { InsightArticle } from "@/data/site";

type ContentInsightCardProps = {
  article: InsightArticle;
  index: number;
  featured?: boolean;
};

export function ContentInsightCard({
  article,
  index,
  featured = false,
}: ContentInsightCardProps) {
  return (
    <article
      className={`glass-card gradient-border group flex h-full flex-col overflow-hidden rounded-[1.5rem] ${
        featured ? "lg:grid lg:grid-cols-[0.72fr_1.28fr]" : ""
      }`}
    >
      <div
        className={`sector-grid relative flex min-h-48 flex-col justify-between overflow-hidden border-b border-line/70 bg-white/[0.02] p-6 sm:p-8 ${
          featured ? "lg:min-h-full" : ""
        }`}
      >
        <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-coral">
          Field note / {String(index + 1).padStart(2, "0")}
        </span>
        <div aria-hidden="true" className="mt-12 grid grid-cols-5 gap-2">
          {Array.from({ length: 15 }).map((_, markerIndex) => (
            <span
              key={markerIndex}
              className={`aspect-square rounded-[3px] border border-line ${
                markerIndex === (index * 3 + 4) % 15
                  ? "bg-coral"
                  : markerIndex % 4 === 0
                    ? "bg-mineral"
                    : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          <span className="text-mineral">{article.category}</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="size-3.5" />
            {article.readingMinutes} min read
          </span>
        </div>

        <h3
          className={`${featured ? "text-3xl sm:text-4xl" : "text-2xl"} mt-6 font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-ink-soft`}
        >
          <Link
            href={`/insights/${article.slug}`}
            className="transition-colors hover:text-mineral"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-5 text-base leading-7 text-muted">{article.excerpt}</p>

        <Link
          href={`/insights/${article.slug}`}
          className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 border-b border-line pb-1 text-sm font-bold text-ink-soft transition-colors hover:border-coral hover:text-coral"
          aria-label={`Read ${article.title}`}
        >
          Read the field note
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
