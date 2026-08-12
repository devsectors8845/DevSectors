import type { Metadata } from "next";
import { Braces, MessageSquareText, PanelsTopLeft } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { LearningCourseCard } from "@/components/learning-course-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { courses, siteIdentity } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

const canonical = `${siteIdentity.url}/courses`;

export const metadata: Metadata = withSocialImage({
  title: "Practical Software and Digital Product Courses | DevSectors",
  description:
    "Explore planned instructor-led courses in frontend development, full-stack applications, UI/UX design, and cloud and DevOps fundamentals.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: siteIdentity.name,
    title: "DevSectors Courses",
    description:
      "Practical course outlines for software, product design, and cloud operations. Confirm every cohort before enrolling.",
  },
  twitter: {
    card: "summary",
    title: "DevSectors Courses",
    description:
      "Practical course outlines for software, product design, and cloud operations. Confirm every cohort before enrolling.",
  },
});

const learningPrinciples = [
  {
    icon: Braces,
    title: "Build to understand",
    description:
      "Exercises connect concepts to a complete project rather than treating syntax as the finish line.",
  },
  {
    icon: MessageSquareText,
    title: "Explain the decision",
    description:
      "Reviews focus on why an approach was chosen, where it can fail, and how another contributor can maintain it.",
  },
  {
    icon: PanelsTopLeft,
    title: "Practice the whole workflow",
    description:
      "Each outline includes planning, implementation, quality, feedback, and a clear account of the final work.",
  },
] as const;

export default function CoursesPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "DevSectors Courses",
    url: canonical,
    description: metadata.description,
    hasPart: courses.map((course) => ({
      "@type": "Course",
      name: course.title,
      description: course.shortDescription,
      url: `${siteIdentity.url}/courses/${course.slug}`,
      provider: {
        "@type": "Organization",
        name: siteIdentity.name,
        url: siteIdentity.url,
      },
    })),
  };

  return (
    <main id="main-content">
      <JsonLd data={collectionSchema} />
      <PageHero
        eyebrow="Learning"
        title={
          <>
            Learn the workflow, not only the <span className="text-signal">tool.</span>
          </>
        }
        description="Structured course outlines for people who want to build, explain, review, and improve real digital work. Cohort details are confirmed before enrollment."
        marker="DS / LEARN"
      >
        <ButtonLink href="#course-catalogue">Explore course outlines</ButtonLink>
        <ButtonLink href="/contact?topic=courses" variant="outline-light">
          Ask about a future cohort
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="content-shell grid gap-6 md:grid-cols-3">
          {learningPrinciples.map((principle) => {
            const Icon = principle.icon;

            return (
              <article key={principle.title} className="border-t-2 border-ink pt-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-mineral">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-6 text-2xl font-display font-extrabold tracking-[-0.035em] text-ink">
                  {principle.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {principle.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="course-catalogue" className="section-pad bg-paper scroll-mt-24">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Course catalogue"
            title="Four foundations for practical digital delivery."
            description="The curriculum describes intended learning. Dates, fees, seats, instructors, and delivery arrangements are confirmed separately for each active cohort."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {courses.map((course, index) => (
              <LearningCourseCard key={course.slug} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-shell">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-coral/30 bg-coral/[0.07] p-6 sm:p-10 lg:grid lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <span className="eyebrow h-fit text-coral-ink">Before you enroll</span>
            <div>
              <h2 className="text-3xl font-display font-extrabold leading-none tracking-[-0.04em] text-ink sm:text-4xl">
                A course page is not a live enrollment offer.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
                The outlines explain intended curriculum and format. Confirm the
                active cohort, schedule, instructor, fee, seat, delivery mode,
                and any certificate terms directly with DevSectors before making
                a commitment. An enquiry does not reserve a place.
              </p>
              <ButtonLink href="/contact?topic=courses" variant="dark" className="mt-7">
                Request confirmed course details
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Not sure where to begin?"
        title="Choose the learning path that matches your next practical step."
        description="Tell us what you already know and what you want to be able to build. We can explain which planned course outline is the closest fit."
      />
    </main>
  );
}
