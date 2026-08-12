import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock3, GraduationCap, MonitorPlay } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { LearningCourseCard } from "@/components/learning-course-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { courses, siteIdentity } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";
import { getCourseBySlug } from "@/lib/site-utils";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return { title: "Course not found | DevSectors" };
  }

  const canonical = `${siteIdentity.url}/courses/${course.slug}`;

  return withSocialImage({
    title: course.seoTitle,
    description: course.seoDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteIdentity.name,
      title: course.title,
      description: course.seoDescription,
    },
    twitter: {
      card: "summary",
      title: course.title,
      description: course.seoDescription,
    },
  });
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const canonical = `${siteIdentity.url}/courses/${course.slug}`;
  const enquiryHref = `/contact?topic=${encodeURIComponent(course.title)}`;
  const relatedCourses = courses
    .filter((candidate) => candidate.slug !== course.slug)
    .slice(0, 3);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.seoDescription,
    url: canonical,
    provider: {
      "@type": "Organization",
      name: siteIdentity.name,
      url: siteIdentity.url,
    },
    educationalLevel: course.level,
    courseMode: course.delivery,
    coursePrerequisites: course.prerequisites.join("; "),
    teaches: course.learningOutcomes,
    about: course.modules,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteIdentity.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${siteIdentity.url}/courses`,
      },
      { "@type": "ListItem", position: 3, name: course.title, item: canonical },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={[courseSchema, breadcrumbSchema]} />
      <PageHero
        eyebrow="Course outline"
        title={course.title}
        description={course.shortDescription}
        marker="DS / COURSE"
      >
        <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 text-sm font-bold text-white/75">
          <Clock3 aria-hidden="true" className="size-4 text-signal" />
          {course.duration}
        </span>
        <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 text-sm font-bold text-white/75">
          <GraduationCap aria-hidden="true" className="size-4 text-signal" />
          {course.level}
        </span>
      </PageHero>

      <div className="content-shell pt-8">
        <Link
          href="/courses"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-mineral"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to all courses
        </Link>
      </div>

      <section className="section-pad pt-12">
        <div className="content-shell grid items-start gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow text-mineral">Course at a glance</span>
            <dl className="mt-7 divide-y divide-line border-y border-line">
              {[
                ["Audience", course.audience],
                ["Level", course.level],
                ["Intended duration", course.duration],
                ["Delivery", course.delivery],
              ].map(([term, value]) => (
                <div key={term} className="py-5">
                  <dt className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-mineral">
                    {term}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-muted">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 rounded-[1.25rem] border border-coral/25 bg-coral/[0.07] p-5">
              <p className="text-sm font-bold text-ink">Availability must be confirmed.</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {course.availabilityNotice} No seat, fee, instructor, or schedule
                is promised by this page.
              </p>
              <ButtonLink href={enquiryHref} variant="dark" className="mt-5 w-full">
                Request confirmed details
              </ButtonLink>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Curriculum"
              title="A guided path from concepts to reviewed work."
              description="The module sequence is an intended outline and may be adjusted when a specific cohort, instructor, and schedule are confirmed."
            />
            <ol className="mt-10 space-y-3">
              {course.modules.map((module, index) => (
                <li
                  key={module}
                  className="grid min-h-20 grid-cols-[3rem_1fr] items-center gap-4 rounded-xl border border-line bg-white p-4 shadow-soft sm:grid-cols-[4rem_1fr] sm:p-5"
                >
                  <span className="font-mono text-xs font-bold text-mineral">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-bold leading-6 text-ink">{module}</span>
                </li>
              ))}
            </ol>

            <div className="mt-16 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-3xl font-display font-extrabold tracking-[-0.04em] text-ink">
                  Intended learning outcomes
                </h3>
                <ul className="mt-6 space-y-4">
                  {course.learningOutcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3 text-sm leading-6 text-muted">
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-mineral"
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-3xl font-display font-extrabold tracking-[-0.04em] text-ink">
                  Prerequisites
                </h3>
                <ul className="mt-6 space-y-4">
                  {course.prerequisites.map((prerequisite) => (
                    <li
                      key={prerequisite}
                      className="flex gap-3 text-sm leading-6 text-muted"
                    >
                      <MonitorPlay
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-mineral"
                      />
                      {prerequisite}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Other learning paths"
            title="Compare the adjacent foundations."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedCourses.map((related, index) => (
              <LearningCourseCard key={related.slug} course={related} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Ask before enrolling"
        title="Confirm the cohort, then decide if the commitment fits."
        description="We will share current dates, delivery details, fees, and availability when a cohort is actually planned. An enquiry is not a checkout or reservation."
      />
    </main>
  );
}
