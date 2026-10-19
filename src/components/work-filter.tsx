"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

import { WorkRepresentativeCard } from "@/components/work-representative-card";
import type {
  Industry,
  IndustrySlug,
  RepresentativeWorkItem,
} from "@/data/site";

type WorkFilterProps = {
  items: readonly RepresentativeWorkItem[];
  industries: readonly Industry[];
};

type ActiveSector = "all" | IndustrySlug;

export function WorkFilter({ items, industries }: WorkFilterProps) {
  const [activeSector, setActiveSector] = useState<ActiveSector>("all");
  const visibleItems =
    activeSector === "all"
      ? items
      : items.filter((item) => item.industrySlug === activeSector);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-extrabold text-ink-soft">
          <Filter aria-hidden="true" className="size-4 text-mineral" />
          Filter by sector
        </div>
        <div
          className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-end sm:overflow-visible sm:pb-0"
          role="group"
          aria-label="Filter representative work by industry"
        >
          <button
            type="button"
            onClick={() => setActiveSector("all")}
            aria-pressed={activeSector === "all"}
            className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold transition-colors ${
              activeSector === "all"
                ? "border-line bg-canvas text-ink-soft"
                : "border-muted bg-surface text-muted hover:border-mineral hover:text-mineral"
            }`}
          >
            All work
          </button>
          {industries.map((industry) => (
            <button
              key={industry.slug}
              type="button"
              onClick={() => setActiveSector(industry.slug)}
              aria-pressed={activeSector === industry.slug}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold transition-colors ${
                activeSector === industry.slug
                  ? "border-line bg-canvas text-ink-soft"
                  : "border-muted bg-surface text-muted hover:border-mineral hover:text-mineral"
              }`}
            >
              {industry.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted" aria-live="polite">
        Showing {visibleItems.length} representative {visibleItems.length === 1 ? "scenario" : "scenarios"}
      </p>

      {visibleItems.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {visibleItems.map((item) => {
            const industry = industries.find(
              (candidate) => candidate.slug === item.industrySlug,
            );
            const originalIndex = items.findIndex((candidate) => candidate.slug === item.slug);

            return (
              <WorkRepresentativeCard
                key={item.slug}
                item={item}
                industryName={industry?.name ?? "Cross-sector"}
                index={originalIndex}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-[1.2rem] border border-dashed border-line bg-paper p-8 text-center sm:p-12">
          <p className="text-lg font-extrabold text-ink-soft">
            No representative scenario is published for this sector yet.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted">
            We do not invent client stories to fill a category. Explore the sector brief for relevant challenges and capabilities instead.
          </p>
        </div>
      )}
    </div>
  );
}
