import type { Metadata } from "next";
import { AlertTriangle, FileSearch, MessagesSquare, Send } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { TalentRoleCard } from "@/components/talent-role-card";
import { siteIdentity, talentRoles } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

const canonical = `${siteIdentity.url}/talent`;

export const metadata: Metadata = withSocialImage({
  title: "DevSectors Talent Network | Capability Profiles",
  description:
    "Explore capability profiles for the DevSectors talent network. These profiles are not current vacancies and do not guarantee employment or contract work.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: siteIdentity.name,
    title: "DevSectors Talent Network",
    description:
      "Future-facing capability profiles—not a live vacancy board or a promise of work.",
  },
  twitter: {
    card: "summary",
    title: "DevSectors Talent Network",
    description:
      "Future-facing capability profiles—not a live vacancy board or a promise of work.",
  },
});

export default function TalentPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "DevSectors Talent Network",
    url: canonical,
    description: metadata.description,
    hasPart: talentRoles.map((role) => ({
      "@type": "WebPage",
      name: `${role.title} talent-network capability profile`,
      url: `${siteIdentity.url}/talent/${role.slug}`,
      description: role.summary,
    })),
  };

  const steps = [
    {
      icon: Send,
      title: "Share an expression of interest",
      description:
        "Provide a concise profile, relevant work you can explain, availability context, and the capability areas that fit you best.",
    },
    {
      icon: FileSearch,
      title: "We review for future relevance",
      description:
        "A submission may be considered against future needs. It does not create an interview, response-time, or work guarantee.",
    },
    {
      icon: MessagesSquare,
      title: "Discuss a specific opportunity",
      description:
        "If a real need aligns, the scope, terms, work mode, assessment, and availability are discussed for that opportunity only.",
    },
  ] as const;

  return (
    <main id="main-content">
      <JsonLd data={collectionSchema} />
      <PageHero
        eyebrow="Talent network"
        title={
          <>
            A capability network, <span className="text-signal">not a vacancy board.</span>
          </>
        }
        description="Profiles describe disciplines DevSectors may need for future work. They are not live job postings and do not promise employment, interviews, or contracts."
        marker="DS / NETWORK"
      >
        <ButtonLink href="#capability-profiles">Explore profiles</ButtonLink>
        <ButtonLink href="/contact?topic=talent-network" variant="outline-light">
          Share an expression of interest
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="content-shell">
          <div className="grid overflow-hidden rounded-[1.5rem] border border-coral/30 bg-coral/[0.07] lg:grid-cols-[auto_1fr]">
            <div className="flex items-start p-6 pb-0 text-coral-ink lg:p-8">
              <AlertTriangle aria-hidden="true" className="size-8" />
            </div>
            <div className="p-6 lg:p-8 lg:pl-2">
              <h2 className="text-2xl font-display font-extrabold tracking-[-0.035em] text-ink-soft">
                No live-vacancy guarantee
              </h2>
              <p className="mt-3 max-w-4xl text-base leading-7 text-muted">
                Every profile below is marked talent network. Joining the network
                is only an expression of interest. A real vacancy or contract
                opportunity requires its own confirmed scope, selection process,
                schedule, compensation, location, and written terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="capability-profiles" className="section-pad bg-paper scroll-mt-24">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Capability profiles"
            title="Disciplines that support complete product delivery."
            description="These profiles explain the kind of craft and responsibility relevant to future work without presenting an opportunity that does not exist."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {talentRoles.map((role, index) => (
              <TalentRoleCard key={role.slug} role={role} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-shell">
          <SectionHeading
            eyebrow="How the network works"
            title="Interest first. Opportunity-specific terms later."
            description="A transparent sequence prevents a general capability profile from being mistaken for an active recruitment process."
          />
          <ol className="mt-12 grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.title}
                  className="rounded-[1.5rem] border border-line bg-surface p-6 shadow-soft sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-mineral">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-muted">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 text-2xl font-display font-extrabold leading-none tracking-[-0.035em] text-ink-soft">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <CtaBand
        eyebrow="Expression of interest"
        title="Share work you can explain, not a title you want to collect."
        description="Tell us the discipline, decisions, and project context behind your strongest work. We will only discuss terms if a specific future opportunity aligns."
      />
    </main>
  );
}
