import Link from "next/link";

type SiteLogoProps = {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
};

export function SectorMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
    >
      <defs>
        <linearGradient id="ds-mark-gradient" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#8EEB4D" />
          <stop offset="48%" stopColor="#19D7C5" />
          <stop offset="100%" stopColor="#00AEEF" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#ds-mark-gradient)" />
      <path
        d="M11 12h13.2C32 12 37 16.5 37 24s-5 12-12.8 12H11V12Zm8.2 7.2v9.6h5c3 0 4.7-1.6 4.7-4.8s-1.7-4.8-4.7-4.8h-5Z"
        fill="#00151C"
      />
      <path d="M34 8h3v7h-3zM31.8 10.2h7v3h-7z" fill="#00151C" />
    </svg>
  );
}

export function SiteLogo({
  inverse = false,
  compact = false,
  className = "",
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label="DevSectors home"
      className={`inline-flex min-h-11 items-center gap-3 rounded-md ${className}`}
    >
      <SectorMark className="size-10 shrink-0" />
      {!compact && (
        <span className="font-display text-[1.45rem] font-black tracking-[-0.055em] text-ink-soft">
          Dev
          <span className={inverse ? "text-signal" : "ds-gradient-text"}>
            Sectors
          </span>
        </span>
      )}
    </Link>
  );
}