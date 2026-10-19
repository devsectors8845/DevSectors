import { ArrowUpRight } from "lucide-react";

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-mineral/20 via-coral/10 to-signal/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-b from-surface-2 to-surface p-4 shadow-soft">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-surface/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-signal" />
            <span className="font-mono text-xs font-bold text-ink-soft">
              Product delivery board
            </span>
          </div>
          <span className="font-mono text-[0.62rem] font-bold uppercase tracking-wider text-muted">
            Live sync
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "On track", value: "08", tone: "text-signal" },
            { label: "Scope", value: "Aligned", tone: "text-coral" },
            { label: "Build", value: "Sprint 03", tone: "text-mineral" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-line bg-surface/60 p-3">
              <div className={`font-display text-xl font-black ${stat.tone}`}>{stat.value}</div>
              <div className="mt-1 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-line bg-surface/60 p-3">
            <div className="font-mono text-[0.6rem] font-bold uppercase tracking-wider text-muted">
              Quality review
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-signal to-coral" />
            </div>
            <div className="mt-2 font-mono text-[0.62rem] font-bold text-ink-soft">
              78% complete
            </div>
          </div>
          <div className="rounded-xl border border-line bg-surface/60 p-3">
            <div className="font-mono text-[0.6rem] font-bold uppercase tracking-wider text-muted">
              Release queued
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="size-2 rounded-full bg-mineral animate-pulse-soft" />
              <span className="font-mono text-[0.62rem] font-bold text-ink-soft">
                Staging ready
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-line bg-surface/60 p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.6rem] font-bold uppercase tracking-wider text-muted">
              Build velocity
            </span>
            <span className="font-mono text-[0.62rem] font-bold text-mineral">
              +12% WoW
            </span>
          </div>
          <div className="mt-3 flex h-16 items-end gap-2">
            {[40, 55, 48, 72, 64, 88, 80].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-mineral/60 to-coral/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-line bg-surface/60 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="size-9 rounded-lg bg-gradient-to-br from-signal to-coral" />
            <div>
              <div className="text-sm font-bold text-ink-soft">
                Mobile release
              </div>
              <div className="font-mono text-[0.6rem] font-bold uppercase tracking-wider text-muted">
                iOS / Android
              </div>
            </div>
          </div>
          <ArrowUpRight aria-hidden="true" className="size-4 text-mineral" />
        </div>
      </div>
    </div>
  );
}