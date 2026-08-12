"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { ContentInsightCard } from "@/components/content-insight-card";
import type { InsightArticle } from "@/data/site";

type ContentInsightFilterProps = {
  articles: readonly InsightArticle[];
};

export function ContentInsightFilter({ articles }: ContentInsightFilterProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...new Set(articles.map((article) => article.category))],
    [articles],
  );
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = category === "All" || article.category === category;
    const searchableText = [
      article.title,
      article.excerpt,
      article.category,
      ...article.keyTakeaways,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return matchesCategory && searchableText.includes(normalizedQuery);
  });

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div>
      <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-soft sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(16rem,0.7fr)_1.3fr] lg:items-end">
          <div>
            <label htmlFor="insight-search" className="text-sm font-bold text-ink">
              Search insights
            </label>
            <div className="relative mt-2">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              />
              <input
                id="insight-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a topic or decision"
                aria-controls="insight-results"
                className="min-h-12 w-full rounded-full border border-muted bg-canvas py-3 pl-11 pr-11 text-sm text-ink placeholder:text-muted focus:border-mineral"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink"
                >
                  <X aria-hidden="true" className="size-4" />
                  <span className="sr-only">Clear insight search</span>
                </button>
              )}
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-bold text-ink">Filter by category</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((item) => {
                const isActive = item === category;

                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setCategory(item)}
                    className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                      isActive
                        ? "border-ink bg-ink text-white"
                        : "border-muted bg-canvas text-muted hover:border-mineral hover:text-mineral"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-muted">
          Showing <strong className="text-ink">{filteredArticles.length}</strong>{" "}
          {filteredArticles.length === 1 ? "insight" : "insights"}
        </p>
        {(query || category !== "All") && (
          <button
            type="button"
            onClick={resetFilters}
            className="min-h-11 text-sm font-bold text-mineral hover:text-mineral-dark"
          >
            Reset filters
          </button>
        )}
      </div>

      {filteredArticles.length > 0 ? (
        <div
          id="insight-results"
          className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredArticles.map((article) => (
            <ContentInsightCard
              key={article.slug}
              article={article}
              index={articles.findIndex((candidate) => candidate.slug === article.slug)}
            />
          ))}
        </div>
      ) : (
        <div
          id="insight-results"
          className="mt-6 rounded-[1.5rem] border border-dashed border-line bg-canvas px-6 py-16 text-center"
        >
          <h3 className="text-2xl font-display font-extrabold tracking-[-0.035em] text-ink">
            No insight matches those filters.
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">
            Try a broader search or reset the category to view the complete field-note library.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="button-base button-dark mt-6"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
