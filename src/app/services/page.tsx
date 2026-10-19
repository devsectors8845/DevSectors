import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers3, ScanSearch, Waypoints } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CapabilityServiceCard } from "@/components/capability-service-card";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { industries, services, siteIdentity } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

const title = "Software development and digital product services | DevSectors";
const description =
  "Explore DevSectors services for custom software, web experiences, mobile apps, workflow automation, cloud reliability, and product technology consulting.";
const canonical = `${siteIdentity.url}/services`;

export function generateMetadata(): Metadata {
  return withSocialImage({
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteIdentity.name,
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  });
}

export default function ServicesPage() {
  return (
    <main id="main-content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "DevSectors software and digital product services",
          url: canonical,
          itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.name,
            url: `${canonical}/${service.slug}`,
          })),
        }}
      />

      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            One partner from <span className="text-signal">decision</span> to
            dependable delivery.
          </>
        }
        description="Choose a focused capability or bring us a problem that crosses product, design, engineering, automation, and operations. We will help find the right starting point."
        marker="DS / CAP"
      >
        <ButtonLink href="#capabilities">Explore capabilities</ButtonLink>
        <ButtonLink href="/contact" variant="outline-light">
          Discuss your project
        </ButtonLink>
      </PageHero>

      <section id="capabilities" className="content-shell section-pad scroll-mt-24">
        <SectionHeading
          eyebrow="Capability map"
          title="Specialists where it matters. One connected delivery system."
          description="Each service can stand alone, but the real advantage comes from keeping product choices, user experience, engineering, and operations aligned."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16">
          {services.map((service, index) => (
            <CapabilityServiceCard
              key={service.slug}
              service={service}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="wide-shell">
        <div className="sector-grid overflow-hidden rounded-[1.35rem] border border-line bg-paper sm:rounded-[2rem]">
          <div className="content-shell section-pad">
            <SectionHeading
              eyebrow="How work connects"
              title="A practical route from uncertainty to a system your team can run."
              description="The exact sequence changes with the problem. The operating pattern stays clear: reduce ambiguity, deliver a complete workflow, then make ownership and improvement visible."
            />

            <ol className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
              {[
                {
                  icon: ScanSearch,
                  step: "01",
                  title: "Frame",
                  copy: "Clarify the users, operating constraints, business decision, and smallest useful boundary.",
                },
                {
                  icon: Layers3,
                  step: "02",
                  title: "Build",
                  copy: "Design and engineer a complete, reviewable workflow in increments that invite useful feedback.",
                },
                {
                  icon: Waypoints,
                  step: "03",
                  title: "Operate",
                  copy: "Prepare releases, monitoring, documentation, and the next set of evidence-led improvements.",
                },
              ].map(({ icon: Icon, step, title: stepTitle, copy }) => (
                <li
                  key={step}
                  className="rounded-[1.2rem] border border-line bg-surface/80 p-6 backdrop-blur sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <Icon aria-hidden="true" className="size-6 text-mineral" />
                    <span className="font-mono text-xs font-bold tracking-[0.18em] text-muted">
                      {step}
                    </span>
                  </div>
                  <h3 className="mt-12 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink-soft">
                    {stepTitle}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="content-shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <SectionHeading
            eyebrow="Sector relationships"
            title="Capabilities shaped around operating context."
            description="A logistics workflow and a learning platform may use similar technology, but their users, exceptions, and evidence needs are different. Explore the sector perspective behind each build."
          />

          <div className="grid gap-px overflow-hidden rounded-[1.35rem] border border-line bg-line sm:grid-cols-2">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex min-h-44 flex-col justify-between bg-surface p-6 no-underline transition-colors hover:bg-mist/60 sm:p-7"
              >
                <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-mineral">
                  {industry.relatedServiceSlugs.length} connected capabilities
                </span>
                <span className="mt-8 flex items-end justify-between gap-4">
                  <strong className="max-w-[15rem] text-lg leading-6 text-ink-soft">
                    {industry.name}
                  </strong>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-mineral transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Need a useful starting point?"
        title="Bring the workflow, bottleneck, or product question."
        description="We will help identify which capability should lead, what can wait, and what a credible first release needs to prove."
      />
    </main>
  );
}
