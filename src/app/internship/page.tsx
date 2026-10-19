import type { Metadata } from "next";
import { AlertCircle, Check, MessageSquareText } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { LearningTimeline } from "@/components/learning-timeline";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { internshipTimeline, siteIdentity } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

const canonical = `${siteIdentity.url}/internship`;

export const metadata: Metadata = withSocialImage({
  title: "Three-Month Software Internship Structure | DevSectors",
  description:
    "Review the intended three-month DevSectors internship timeline for foundations, guided contribution, ownership, and portfolio reflection when a cohort is active.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: siteIdentity.name,
    title: "DevSectors Internship Structure",
    description:
      "A truthful look at the intended three-month learning timeline. Cohort availability and terms must be confirmed separately.",
  },
  twitter: {
    card: "summary",
    title: "DevSectors Internship Structure",
    description:
      "A truthful look at the intended three-month learning timeline. Cohort availability and terms must be confirmed separately.",
  },
});

export default function InternshipPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "DevSectors Three-Month Internship Structure",
    url: canonical,
    description: metadata.description,
    about: {
      "@type": "EducationalOccupationalProgram",
      name: "DevSectors Three-Month Internship Structure",
      description:
        "An intended internship learning structure used only when a confirmed cohort is active.",
      provider: {
        "@type": "Organization",
        name: siteIdentity.name,
        url: siteIdentity.url,
      },
      timeToComplete: "P3M",
    },
  };

  return (
    <main id="main-content">
      <JsonLd data={pageSchema} />
      <PageHero
        eyebrow="Internship structure"
        title={
          <>
            Three months of guided practice—<span className="text-signal">when a cohort is active.</span>
          </>
        }
        description="An intended learning journey from foundations to a reviewed contribution and an honest portfolio reflection. This page does not announce an open cohort."
        marker="DS / PRACTICE"
      >
        <ButtonLink href="#timeline">Review the timeline</ButtonLink>
        <ButtonLink href="/contact?topic=internship" variant="outline-light">
          Ask about future availability
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="content-shell">
          <div className="grid overflow-hidden rounded-[1.5rem] border border-coral/30 bg-coral/[0.07] lg:grid-cols-[auto_1fr]">
            <div className="flex items-start p-6 pb-0 text-coral-ink lg:p-8">
              <AlertCircle aria-hidden="true" className="size-8" />
            </div>
            <div className="p-6 lg:p-8 lg:pl-2">
              <h2 className="text-2xl font-display font-extrabold tracking-[-0.035em] text-ink-soft">
                Structure is not availability.
              </h2>
              <p className="mt-3 max-w-4xl text-base leading-7 text-muted">
                The timeline below describes how a three-month cohort is intended
                to work. Application dates, capacity, selection, schedule,
                location, compensation if any, certificates, and potential future
                opportunities must be confirmed for each cohort. Participation
                does not guarantee employment, placement, or paid work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="section-pad scroll-mt-24 bg-canvas text-ink-soft">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Intended timeline"
            title="Foundations. Contribution. Ownership."
            description="Each month ends with visible evidence of learning rather than a vague attendance milestone."
            inverse
          />
          <div className="mt-12">
            <LearningTimeline timeline={internshipTimeline} />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-shell grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionHeading
            eyebrow="A responsible application"
            title="Ask for confirmed terms before committing."
          />
          <div>
            <p className="text-lg leading-8 text-muted">
              When an application window exists, the cohort notice should state
              the discipline, schedule, working arrangement, selection process,
              capacity, and any compensation or fee. Until those details are
              published or confirmed directly, this page is informational only.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Share your current learning level honestly",
                "Link only to work you can explain and discuss",
                "Confirm the time and equipment expectations",
                "Ask how feedback and supervision will work",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-sm leading-6 text-muted shadow-soft"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-mineral"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact?topic=internship">
                Ask about a future cohort
              </ButtonLink>
              <ButtonLink href="/courses" variant="outline">
                Explore course outlines
              </ButtonLink>
            </div>
            <p className="mt-6 flex items-start gap-3 text-sm leading-6 text-muted">
              <MessageSquareText
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-mineral"
              />
              An enquiry starts a conversation. It is not an application acceptance
              or a reservation.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Future cohort enquiry"
        title="Ask what is confirmed before planning around the opportunity."
        description="We will share current availability and terms if a cohort is planned. If nothing is open, your enquiry remains only an expression of interest."
      />
    </main>
  );
}
