import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDot, GitBranch, ShieldCheck } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { IndustrySectorCard } from "@/components/industry-sector-card";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { industries, services, siteIdentity } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

const title = "Industry software solutions and digital products | DevSectors";
const description =
  "Explore DevSectors software, web, mobile, automation, and platform capabilities for SaaS, retail, logistics, healthcare, education, and professional services.";
const canonical = `${siteIdentity.url}/industries`;

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

export default function IndustriesPage() {
  return (
    <main id="main-content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Industries served by DevSectors",
          url: canonical,
          itemListElement: industries.map((industry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: industry.name,
            url: `${canonical}/${industry.slug}`,
          })),
        }}
      />

      <PageHero
        eyebrow="Industries"
        title={
          <>
            Technology makes sense only when the <span className="text-signal">operation</span> does.
          </>
        }
        description="We adapt discovery, interfaces, integrations, and release planning to the people, exceptions, and day-to-day pressures inside each operating environment."
        marker="DS / SECTORS"
      >
        <ButtonLink href="#sector-map">Explore sectors</ButtonLink>
        <ButtonLink href="/services" variant="outline-light">
          View capabilities
        </ButtonLink>
      </PageHero>

      <section id="sector-map" className="content-shell section-pad scroll-mt-24">
        <SectionHeading
          eyebrow="Sector map"
          title="Different environments. A shared standard for clear delivery."
          description="Sector understanding does not mean forcing every team into a fixed template. It means asking better questions about context before choosing the product shape."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16">
          {industries.map((industry, index) => (
            <IndustrySectorCard key={industry.slug} industry={industry} index={index} />
          ))}
        </div>
      </section>

      <section className="wide-shell">
        <div className="sector-grid overflow-hidden rounded-[1.35rem] border border-line bg-paper sm:rounded-[2rem]">
          <div className="content-shell section-pad">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <SectionHeading
                eyebrow="Context before code"
                title="What changes when the sector changes."
                description="The technology stack may overlap. The design and delivery decisions should still reflect how the organization earns trust, moves work, and handles exceptions."
              />
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[
                  {
                    icon: CircleDot,
                    title: "The critical moment",
                    copy: "Which user decision or operational hand-off cannot afford ambiguity?",
                  },
                  {
                    icon: GitBranch,
                    title: "The exception path",
                    copy: "What happens when real work does not follow the ideal workflow?",
                  },
                  {
                    icon: ShieldCheck,
                    title: "The trust boundary",
                    copy: "Who can see, approve, change, and rely on the information in the system?",
                  },
                ].map(({ icon: Icon, title: itemTitle, copy }) => (
                  <article key={itemTitle} className="rounded-[1.15rem] border border-line bg-surface p-6">
                    <Icon aria-hidden="true" className="size-5 text-mineral" />
                    <h3 className="mt-10 text-lg font-extrabold leading-6 text-ink-soft">
                      {itemTitle}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell section-pad">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Connected capabilities"
            title="A service mix shaped by the problem."
            description="Each capability connects to multiple sector briefs. Open a service to see its delivery process and representative work relationships."
          />
          <ButtonLink href="/services" variant="outline" className="w-fit shrink-0">
            All services
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.35rem] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const sectorCount = industries.filter((industry) =>
              industry.relatedServiceSlugs.some(
                (serviceSlug) => serviceSlug === service.slug,
              ),
            ).length;

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex min-h-48 flex-col justify-between bg-surface p-6 no-underline transition-colors hover:bg-mist/55 sm:p-7"
              >
                <span className="flex items-center justify-between gap-4 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-mineral">
                  CAP / {String(index + 1).padStart(2, "0")}
                  <span className="text-muted">{sectorCount} sectors</span>
                </span>
                <span className="mt-10 flex items-end justify-between gap-4">
                  <strong className="max-w-[16rem] text-lg leading-6 text-ink-soft">
                    {service.name}
                  </strong>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-mineral transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <CtaBand
        eyebrow="Your sector is not a template"
        title="Start with the operating reality your team knows best."
        description="Tell us where work slows down, where information becomes unreliable, or where customers lose confidence. We will map the technology decision from there."
      />
    </main>
  );
}
