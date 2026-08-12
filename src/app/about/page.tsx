import type { Metadata } from "next";
import { Check, Compass, Layers3, Scale, Waypoints } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import {
  engagementModels,
  services,
  siteConfig,
  siteContact,
  siteIdentity,
} from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

const canonical = `${siteIdentity.url}/about`;

export const metadata: Metadata = withSocialImage({
  title: "About DevSectors | Product Thinking and Software Delivery",
  description:
    "Learn how DevSectors approaches digital products: understand the operation, make trade-offs visible, build focused releases, and prepare for ownership.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: siteIdentity.name,
    title: "About DevSectors",
    description:
      "A software and digital product studio grounded in context, clear decisions, and maintainable delivery.",
  },
  twitter: {
    card: "summary",
    title: "About DevSectors",
    description:
      "A software and digital product studio grounded in context, clear decisions, and maintainable delivery.",
  },
});

const principles = [
  {
    icon: Compass,
    title: "Context before code",
    description:
      "We begin with users, operations, constraints, and the decision the work needs to improve. Technology follows that understanding.",
  },
  {
    icon: Layers3,
    title: "Small, complete outcomes",
    description:
      "A narrow end-to-end workflow creates better evidence than a wide collection of unfinished features.",
  },
  {
    icon: Scale,
    title: "Trade-offs in the open",
    description:
      "Scope, cost, risk, speed, and maintainability are connected. We make those choices visible before they become surprises.",
  },
  {
    icon: Waypoints,
    title: "Ownership after release",
    description:
      "Documentation, environments, operational responsibilities, and next steps belong in delivery—not in an afterthought.",
  },
] as const;

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About DevSectors",
    url: canonical,
    description: metadata.description,
    mainEntity: {
      "@type": "Organization",
      name: siteIdentity.name,
      url: siteIdentity.url,
      email: siteContact.email,
      telephone: siteContact.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteContact.address.line1,
        addressLocality: siteContact.address.city,
        addressCountry: siteContact.address.country,
      },
    },
  };

  return (
    <main id="main-content">
      <JsonLd data={aboutSchema} />
      <PageHero
        eyebrow="About DevSectors"
        title={
          <>
            Useful software starts with a <span className="text-signal">clearer decision.</span>
          </>
        }
        description={siteIdentity.positioning}
        marker="DS / ABOUT"
      >
        <ButtonLink href="/services">Explore capabilities</ButtonLink>
        <ButtonLink href="/engagement" variant="outline-light">
          See how we engage
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="content-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <span className="eyebrow text-mineral">What we are building</span>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted">
              Based in {siteConfig.identity.locationLabel}, with delivery structured
              around the needs and access requirements of each engagement.
            </p>
          </div>
          <div className="space-y-7">
            <p className="text-3xl font-display font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-4xl">
              DevSectors is a product and engineering studio for teams that need
              to turn operational complexity into understandable digital work.
            </p>
            <p className="max-w-3xl text-lg leading-8 text-muted">
              Our scope spans discovery, experience design, custom applications,
              mobile products, workflow automation, and cloud reliability. The
              common thread is not a particular framework. It is the discipline
              of understanding the work, choosing a useful boundary, and building
              something the client can operate and improve.
            </p>
            <p className="max-w-3xl text-lg leading-8 text-muted">
              This website intentionally avoids unsupported headcount, client,
              award, and performance claims. Representative work is labeled as
              such, and engagement-specific contributors are introduced when the
              scope and team are confirmed.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Operating principles"
            title="A practical standard for the work."
            description="These principles shape how we frame a problem, review progress, and prepare a release for life beyond the project." 
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="card-lift rounded-[1.5rem] border border-line bg-white p-6 shadow-soft sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-mist text-mineral">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="font-mono text-xs font-bold tracking-[0.15em] text-muted">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-display font-extrabold leading-none tracking-[-0.035em] text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Capability map"
            title="One product problem. Multiple connected disciplines."
            description="Engagements use only the capabilities the problem requires. The service map keeps responsibilities explicit without forcing every project into the same shape."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li key={service.slug} className="bg-canvas p-6 sm:p-8">
                <span className="font-mono text-xs font-bold text-mineral">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-2xl font-display font-extrabold leading-none tracking-[-0.035em] text-ink">
                  {service.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {service.shortDescription}
                </p>
              </li>
            ))}
          </ol>
          <ButtonLink href="/services" variant="outline" className="mt-9">
            Review every service
          </ButtonLink>
        </div>
      </section>

      <section id="team" className="section-pad bg-ink text-white">
        <div className="content-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <SectionHeading
            eyebrow="Team composition"
            title="The right roles are confirmed with the work."
            inverse
          />
          <div>
            <p className="text-xl leading-8 text-white/75">
              We do not publish invented executive profiles or imply a fixed team
              size. Each proposal identifies the product, design, engineering,
              quality, and operational ownership the engagement requires. Named
              contributors and availability are shared when they are confirmed.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Clear delivery ownership",
                "Relevant capability for the scope",
                "Review access to decision-makers",
                "Documented handover responsibilities",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/75"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-signal"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/engagement">How engagements work</ButtonLink>
              <ButtonLink href="/talent" variant="outline-light">
                Visit the talent network
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Ways to work together"
            title="Start with the certainty you have."
            description="The engagement model changes with the clarity of the problem and the continuity of the work—not with an arbitrary package tier."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {engagementModels.map((model, index) => (
              <article
                key={model.slug}
                className="rounded-[1.5rem] border border-line bg-white p-6 shadow-soft sm:p-8"
              >
                <span className="font-mono text-xs font-bold text-mineral">
                  0{index + 1}
                </span>
                <h3 className="mt-6 text-2xl font-display font-extrabold leading-none tracking-[-0.035em] text-ink">
                  {model.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {model.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="A clearer starting point"
        title="Bring the problem before the solution is fixed."
        description="We can help map the decision, identify the smallest useful outcome, and choose an engagement shape that fits the evidence available today."
      />
    </main>
  );
}
