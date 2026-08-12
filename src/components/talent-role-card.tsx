import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

import type { TalentNetworkRole } from "@/data/site";

type TalentRoleCardProps = {
  role: TalentNetworkRole;
  index: number;
};

export function TalentRoleCard({ role, index }: TalentRoleCardProps) {
  return (
    <article className="card-lift group flex h-full flex-col rounded-[1.5rem] border border-line bg-white p-6 shadow-soft sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-paper text-mineral">
          <BriefcaseBusiness aria-hidden="true" className="size-5" />
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Network / {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-7 text-xs font-bold uppercase tracking-[0.12em] text-mineral">
        {role.discipline}
      </p>
      <h3 className="mt-3 text-3xl font-display font-extrabold leading-none tracking-[-0.04em] text-ink">
        <Link
          href={`/talent/${role.slug}`}
          className="transition-colors hover:text-mineral"
        >
          {role.title}
        </Link>
      </h3>
      <p className="mt-5 text-base leading-7 text-muted">{role.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {role.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-semibold text-muted"
          >
            {skill}
          </span>
        ))}
      </div>
      <p className="mt-7 border-l-2 border-coral pl-4 text-xs leading-5 text-muted">
        Not a current vacancy or guarantee of work.
      </p>
      <Link
        href={`/talent/${role.slug}`}
        className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-7 text-sm font-bold text-ink transition-colors hover:text-mineral"
        aria-label={`View the ${role.title} talent-network profile`}
      >
        View capability profile
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </article>
  );
}
