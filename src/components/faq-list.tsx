import { ChevronDown } from "lucide-react";

import type { FaqItem } from "@/data/site";

type FaqListProps = {
  items: readonly FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <details key={item.id} className="group">
          <summary className="flex min-h-20 list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="flex items-start gap-4 sm:gap-6">
              <span className="mt-1 font-mono text-[0.68rem] font-bold tracking-[0.14em] text-mineral">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-bold leading-7 text-ink sm:text-xl">
                {item.question}
              </span>
            </span>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors group-open:bg-ink group-open:text-white">
              <ChevronDown
                aria-hidden="true"
                className="size-4 transition-transform duration-200 motion-reduce:transition-none group-open:rotate-180"
              />
            </span>
          </summary>
          <div className="pb-7 pl-10 pr-14 sm:pl-[4.25rem] sm:pr-20">
            <p className="max-w-3xl text-base leading-7 text-muted">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
