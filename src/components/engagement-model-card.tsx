import { Check, MoveRight } from "lucide-react";

import type { EngagementModel } from "@/data/site";

type EngagementModelCardProps = {
  model: EngagementModel;
  index: number;
};

export function EngagementModelCard({
  model,
  index,
}: EngagementModelCardProps) {
  return (
    <article className="glass-card grid overflow-hidden rounded-[1.5rem] lg:grid-cols-[0.34fr_0.66fr]">
      <div className="sector-grid flex flex-col justify-between border-r border-line/70 bg-white/[0.03] p-6 sm:p-8">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-mineral">
          Model / {String(index + 1).padStart(2, "0")}
        </span>
        <div className="mt-16">
          <span className="font-display text-7xl font-black leading-none text-mineral/15">
            0{index + 1}
          </span>
          <h3 className="mt-3 text-3xl font-display font-extrabold leading-none tracking-[-0.04em] text-ink-soft">
            {model.name}
          </h3>
        </div>
      </div>
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="max-w-2xl text-lg leading-8 text-ink-soft">{model.summary}</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.15em] text-mineral">
              Best fit
            </h4>
            <p className="mt-3 text-sm leading-6 text-muted">{model.bestFor}</p>
          </div>
          <div>
            <h4 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.15em] text-mineral">
              How it works
            </h4>
            <p className="mt-3 text-sm leading-6 text-muted">
              {model.howItWorks}
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-bold text-ink-soft">Included focus</h4>
            <ul className="mt-4 space-y-3">
              {model.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-mineral"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink-soft">Commercial approach</h4>
            <p className="mt-4 text-sm leading-6 text-muted">
              {model.commercialApproach}
            </p>
            <a
              href="#engagement-principles"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-mineral hover:text-mineral-dark"
            >
              Review engagement principles
              <MoveRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
