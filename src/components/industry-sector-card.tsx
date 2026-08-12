import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Rocket,
  ShoppingBag,
  Truck,
} from "lucide-react";

import type { Industry, IndustrySlug } from "@/data/site";

const industryIcons: Record<IndustrySlug, LucideIcon> = {
  "startups-saas": Rocket,
  "retail-ecommerce": ShoppingBag,
  "logistics-operations": Truck,
  "healthcare-wellness": HeartPulse,
  "education-training": GraduationCap,
  "professional-services": BriefcaseBusiness,
};

type IndustrySectorCardProps = {
  industry: Industry;
  index: number;
};

export function IndustrySectorCard({ industry, index }: IndustrySectorCardProps) {
  const Icon = industryIcons[industry.slug];
  const sequence = String(index + 1).padStart(2, "0");

  return (
    <article className="focus-frame group relative min-h-[24rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-ink text-white shadow-soft">
      <div className="sector-grid-dark absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -right-8 -top-8 size-36 rounded-full border-[28px] border-signal/10 transition-transform duration-500 group-hover:scale-110"
        aria-hidden="true"
      />
      <Link
        href={`/industries/${industry.slug}`}
        className="relative flex h-full min-h-[24rem] flex-col p-6 no-underline sm:p-8"
        aria-label={`Explore digital solutions for ${industry.name}`}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-signal">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <span className="font-mono text-[0.68rem] font-bold tracking-[0.18em] text-white/55">
            SECTOR / {sequence}
          </span>
        </div>

        <div className="mt-auto pt-14">
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-signal">
            {industry.solutionFocus.length} solution priorities
          </p>
          <h3 className="mt-4 max-w-md font-display text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-[2.6rem]">
            {industry.name}
          </h3>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-7 text-white/65">
            {industry.shortDescription}
          </p>
          <span className="mt-7 inline-flex items-center gap-3 text-sm font-extrabold text-signal">
            Open sector brief
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1.5"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
