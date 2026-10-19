import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Bot,
  CloudCog,
  Code2,
  Compass,
  PanelsTopLeft,
  Smartphone,
} from "lucide-react";

import type { Service, ServiceSlug } from "@/data/site";

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "custom-software-development": Code2,
  "web-experience-design": PanelsTopLeft,
  "mobile-app-development": Smartphone,
  "ai-workflow-automation": Bot,
  "cloud-devops-reliability": CloudCog,
  "product-technology-consulting": Compass,
};

type CapabilityServiceCardProps = {
  service: Service;
  index: number;
  compact?: boolean;
};

export function CapabilityServiceCard({
  service,
  index,
  compact = false,
}: CapabilityServiceCardProps) {
  const Icon = serviceIcons[service.slug];
  const sequence = String(index + 1).padStart(2, "0");

  return (
    <article className="glass-card gradient-border group relative flex h-full flex-col overflow-hidden rounded-[1.35rem]">
      <Link
        href={`/services/${service.slug}`}
        className="flex h-full flex-col p-6 no-underline sm:p-8"
        aria-label={`Explore ${service.name}`}
      >
        <div className="flex items-start justify-between gap-5">
          <span className="flex size-12 items-center justify-center rounded-xl bg-mist text-mineral transition-colors group-hover:bg-mineral group-hover:text-ink-soft">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <span className="font-mono text-[0.68rem] font-bold tracking-[0.18em] text-muted">
            CAP / {sequence}
          </span>
        </div>

        <h3 className="mt-8 max-w-md font-display text-[1.85rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink-soft sm:text-[2.15rem]">
          {service.name}
        </h3>
        <p className="mt-4 max-w-xl text-[0.97rem] leading-7 text-muted">
          {service.shortDescription}
        </p>

        {!compact && (
          <ul className="mt-7 space-y-3 border-t border-line pt-6" aria-label="Selected capabilities">
            {service.capabilities.slice(0, 3).map((capability) => (
              <li key={capability} className="flex items-start gap-3 text-sm leading-6 text-ink-soft">
                <span
                  aria-hidden="true"
                  className="mt-[0.55rem] size-1.5 shrink-0 rounded-[2px] bg-mineral"
                />
                {capability}
              </li>
            ))}
          </ul>
        )}

        <span className="mt-auto flex items-center justify-between gap-4 pt-8 text-sm font-extrabold text-mineral">
          View capability
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </article>
  );
}
