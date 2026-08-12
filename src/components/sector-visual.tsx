import { Check, Code2, Gauge, Layers3 } from "lucide-react";

export function SectorVisual() {
  return (
    <div
      className="sector-grid-dark relative min-h-[31rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink-soft p-4 shadow-2xl sm:p-7"
      role="img"
      aria-label="A visual model of DevSectors' structured product delivery process"
    >
      <div className="absolute -right-14 -top-14 size-48 rounded-full bg-mineral/50 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 size-48 rounded-full bg-signal/15 blur-3xl" />

      <div className="relative flex items-center justify-between font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/55">
        <span>Delivery map / live</span>
        <span className="inline-flex items-center gap-2 text-signal">
          <span className="size-2 rounded-full bg-signal animate-pulse-soft" />
          In motion
        </span>
      </div>

      <div className="relative mx-auto mt-14 max-w-md animate-sector-float rounded-2xl border border-white/15 bg-white p-5 text-ink shadow-2xl sm:p-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-mineral">
              Sector 04
            </span>
            <p className="mt-1 text-sm font-extrabold">Product delivery board</p>
          </div>
          <span className="rounded-full bg-signal px-3 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-wider">
            On track
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { icon: Layers3, label: "Scope", value: "Aligned", color: "bg-mist" },
            { icon: Code2, label: "Build", value: "Sprint 03", color: "bg-signal/50" },
            { icon: Gauge, label: "Quality", value: "Review", color: "bg-paper" },
            { icon: Check, label: "Release", value: "Queued", color: "bg-coral/20" }
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className={`rounded-xl p-3.5 ${color}`}>
              <Icon aria-hidden="true" className="size-4 text-mineral" />
              <span className="mt-5 block font-mono text-[0.58rem] font-bold uppercase tracking-wider text-muted">
                {label}
              </span>
              <strong className="mt-1 block text-sm">{value}</strong>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between rounded-xl bg-ink p-4 text-white">
          <div>
            <span className="font-mono text-[0.58rem] uppercase tracking-wider text-white/55">
              Shared visibility
            </span>
            <p className="mt-1 text-sm font-bold">One clear next step</p>
          </div>
          <div className="flex h-9 items-end gap-1" aria-hidden="true">
            {[35, 55, 43, 74, 66, 92].map((height, index) => (
              <span
                key={index}
                className={index === 5 ? "w-2 bg-signal" : "w-2 bg-white/25"}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/55 sm:bottom-7 sm:left-7 sm:right-7">
        <span>Discovery → delivery</span>
        <span>31.37° N / 73.05° E</span>
      </div>
    </div>
  );
}
