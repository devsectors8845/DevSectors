import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  marker?: string;
  theme?: "ink" | "paper" | "mineral";
};

const themes = {
  ink: {
    section: "bg-canvas text-ink-soft sector-grid-dark",
    eyebrow: "text-signal",
    copy: "text-muted",
    marker: "border-line text-muted"
  },
  paper: {
    section: "bg-surface text-ink-soft sector-grid-dark",
    eyebrow: "text-coral",
    copy: "text-muted",
    marker: "border-line text-muted"
  },
  mineral: {
    section: "bg-gradient-to-br from-surface-2 via-surface to-canvas text-ink-soft sector-grid-dark",
    eyebrow: "text-signal",
    copy: "text-muted",
    marker: "border-line text-muted"
  }
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  marker = "DS / 01",
  theme = "ink"
}: PageHeroProps) {
  const styles = themes[theme];

  return (
    <section className="wide-shell pt-2 sm:pt-4">
      <div
        className={`relative overflow-hidden rounded-[1.35rem] sm:rounded-[2rem] ${styles.section}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
        <div className="content-shell relative grid min-h-[32rem] items-end gap-10 py-20 sm:py-24 lg:min-h-[39rem] lg:grid-cols-[1fr_18rem] lg:py-28">
          <div className="max-w-5xl">
            <span className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</span>
            <h1 className="display-page mt-6">{title}</h1>
            <p
              className={`mt-7 max-w-2xl text-lg leading-8 sm:text-xl ${styles.copy}`}
            >
              {description}
            </p>
            {children && (
              <div className="mt-9 flex flex-wrap gap-3">{children}</div>
            )}
          </div>

          <div className="hidden self-stretch border-l border-current/15 pl-8 lg:flex lg:flex-col lg:justify-between">
            <span
              className={`font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] ${styles.copy}`}
            >
              Position / capability
            </span>
            <div className={`border-t pt-5 ${styles.marker}`}>
              <span className="font-mono text-xs uppercase tracking-[0.2em]">
                {marker}
              </span>
              <div className="mt-5 grid grid-cols-4 gap-1" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    key={index}
                    className={`aspect-square rounded-[2px] ${
                      index === 5 || index === 10
                        ? "bg-signal"
                        : "bg-current opacity-20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
