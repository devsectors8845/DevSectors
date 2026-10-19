import type { InsightSection } from "@/data/site";

type ContentArticleTocProps = {
  sections: readonly InsightSection[];
};

export function ContentArticleToc({ sections }: ContentArticleTocProps) {
  return (
    <nav
      aria-label="Article contents"
      className="rounded-[1.25rem] border border-line bg-paper p-5 lg:sticky lg:top-28"
    >
      <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-mineral">
        On this page
      </span>
      <ol className="mt-5 space-y-1 border-l border-line pl-4">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="group flex min-h-10 items-start gap-3 py-2 text-sm leading-5 text-muted transition-colors hover:text-mineral"
            >
              <span className="font-mono text-[0.65rem] font-bold text-muted group-hover:text-mineral">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{section.heading}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
