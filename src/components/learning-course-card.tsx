import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";

import type { Course } from "@/data/site";

type LearningCourseCardProps = {
  course: Course;
  index: number;
};

export function LearningCourseCard({ course, index }: LearningCourseCardProps) {
  return (
    <article className="card-lift group flex h-full flex-col rounded-[1.5rem] border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="flex items-start justify-between gap-6">
        <span className="flex size-12 items-center justify-center rounded-xl bg-mist text-mineral">
          <BookOpen aria-hidden="true" className="size-5" />
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Course / {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <span className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-bold text-ink-soft">
          {course.level}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-bold text-muted">
          <Clock3 aria-hidden="true" className="size-3.5" />
          {course.duration}
        </span>
      </div>

      <h3 className="mt-6 text-3xl font-display font-extrabold leading-none tracking-[-0.04em] text-ink-soft">
        <Link
          href={`/courses/${course.slug}`}
          className="transition-colors hover:text-mineral"
        >
          {course.title}
        </Link>
      </h3>
      <p className="mt-5 text-base leading-7 text-muted">
        {course.shortDescription}
      </p>

      <div className="mt-7 border-l-2 border-signal pl-4 text-sm leading-6 text-muted">
        {course.availabilityNotice}
      </div>

      <Link
        href={`/courses/${course.slug}`}
        className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-8 text-sm font-bold text-ink-soft transition-colors hover:text-mineral"
        aria-label={`View details for ${course.title}`}
      >
        Explore the curriculum
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </article>
  );
}
