import { Check } from "lucide-react";

import type { InternshipTimelineItem } from "@/data/site";

type LearningTimelineProps = {
  timeline: readonly InternshipTimelineItem[];
};

export function LearningTimeline({ timeline }: LearningTimelineProps) {
  return (
    <ol className="grid gap-5 lg:grid-cols-3">
      {timeline.map((item) => (
        <li
          key={item.month}
          className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[0.06] p-6 sm:p-8"
        >
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 font-display text-[7rem] font-black leading-none text-white/[0.04]"
          >
            {item.month}
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-signal">
            {item.label}
          </span>
          <h3 className="relative mt-6 text-3xl font-display font-extrabold leading-none tracking-[-0.035em] text-white">
            {item.title}
          </h3>
          <p className="mt-5 text-sm leading-6 text-white/65">{item.focus}</p>
          <ul className="mt-7 space-y-3 text-sm leading-6 text-white/75">
            {item.activities.map((activity) => (
              <li key={activity} className="flex gap-3">
                <Check
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-signal"
                />
                <span>{activity}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-white/15 pt-6">
            <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/55">
              Month milestone
            </span>
            <p className="mt-3 text-sm leading-6 text-white/80">
              {item.milestone}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
