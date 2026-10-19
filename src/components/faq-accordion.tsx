"use client";

import { useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";

import type { FaqItem } from "@/data/site";

type FaqAccordionProps = {
  items: readonly FaqItem[];
  idPrefix?: string;
  tone?: "dark" | "light";
  showIndex?: boolean;
  defaultOpenFirst?: boolean;
};

export function FaqAccordion({
  items,
  idPrefix = "faq",
  tone = "dark",
  showIndex = true,
  defaultOpenFirst = false,
}: FaqAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    defaultOpenFirst && items[0] ? [items[0].id] : [],
  );

  function toggle(id: string) {
    setOpenIds((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDetailsElement>, id: string) {
    if (event.key !== "Escape" || !openIds.includes(id)) return;
    event.preventDefault();
    toggle(id);
    const trigger = event.currentTarget.querySelector<HTMLElement>("summary");
    trigger?.focus();
  }

  const isDark = tone === "dark";

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const panelId = `${idPrefix}-panel-${item.id}`;
        const triggerId = `${idPrefix}-trigger-${item.id}`;

        return (
          <details
            key={item.id}
            open={isOpen}
            onToggle={(event) => {
              const element = event.currentTarget;
              if (element.open !== openIds.includes(item.id)) {
                toggle(item.id);
              }
            }}
            onKeyDown={(event) => handleKeyDown(event, item.id)}
            className="group"
          >
            <summary
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={`flex min-h-20 list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden ${
                isDark ? "text-ink-soft" : "text-[#062833]"
              }`}
            >
              <span className="flex items-start gap-4 sm:gap-6">
                {showIndex && (
                  <span className="mt-1 font-mono text-[0.68rem] font-bold tracking-[0.14em] text-coral">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                <span className="text-lg font-bold leading-7 sm:text-xl">
                  {item.question}
                </span>
              </span>
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors ${
                  isDark
                    ? "glass-inset text-ink-soft group-open:bg-surface-3"
                    : "bg-[#e8edf0] text-[#062833] group-open:bg-white"
                }`}
              >
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 motion-reduce:transition-none group-open:rotate-180"
                />
              </span>
            </summary>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              hidden={!isOpen}
              className="pb-7 pl-10 pr-14 sm:pl-[4.25rem] sm:pr-20"
            >
              <p className="max-w-3xl text-base leading-7 text-muted">
                {item.answer}
              </p>
            </div>
          </details>
        );
      })}
    </div>
  );
}