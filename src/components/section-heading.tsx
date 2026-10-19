import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto items-center text-center" : "items-start"} flex max-w-3xl flex-col ${className}`}
    >
      <span
        className={`eyebrow ${inverse ? "text-signal" : "text-mineral"}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`heading-section mt-5 ${inverse ? "text-ink-soft" : "text-ink-soft"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg ${
            inverse ? "text-muted" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}