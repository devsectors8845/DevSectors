import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, CornerDownRight } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { WorkRepresentativeCard } from "@/components/work-representative-card";
import { services, siteIdentity } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";
import {
  getIndustriesForService,
  getServiceBySlug,
  getWorkItemsForService,
} from "@/lib/site-utils";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: { absolute: `Service not found | ${siteIdentity.name}` },
    };
  }

  const canonical = `${siteIdentity.url}/services/${service.slug}`;

  return withSocialImage({
    title: { absolute: service.seoTitle },
    description: service.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: canonical,
      siteName: siteIdentity.name,
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
    },
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const canonical = `${siteIdentity.url}/services/${service.slug}`;
  const relatedIndustries = getIndustriesForService(service.slug);
  const relatedWork = getWorkItemsForService(service.slug);

  return (
    <main id="main-content">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteIdentity.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: `${siteIdentity.url}/services`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: service.name,
                item: canonical,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            serviceType: service.name,
            description: service.seoDescription,
            url: canonical,
            provider: {
              "@type": "Organization",
              name: siteIdentity.name,
              url: siteIdentity.url,
            },
            audience: relatedIndustries.map((industry) => ({
              "@type": "Audience",
              audienceType: industry.name,
            })),
          },
        ]}
      />

      <PageHero
        eyebrow="Service capability"
        title={service.name}
        description={service.shortDescription}
        marker={`CAP / ${String(
          services.findIndex((candidate) => candidate.slug === service.slug) + 1,
        ).padStart(2, "0")}`}
        theme="mineral"
      >
        <ButtonLink href="/contact">Plan this capability</ButtonLink>
        <ButtonLink href="/work" variant="outline-light">
          See representative work
        </ButtonLink>
      </PageHero>

      <section className="content-shell section-pad">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div>
            <span className="eyebrow text-mineral">Capability brief</span>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] text-ink-soft sm:text-5xl">
              Built around the work, not a feature checklist.
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-xl leading-9 text-ink-soft sm:text-2xl sm:leading-10">
              {service.overview}
            </p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Service capabilities">
              {service.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex min-h-24 items-start gap-4 rounded-xl border border-line bg-paper/55 p-5"
                >
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-mineral" />
                  <span className="text-sm font-bold leading-6 text-ink-soft">{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wide-shell">
        <div className="sector-grid-dark overflow-hidden rounded-[1.35rem] bg-canvas text-ink-soft sm:rounded-[2rem]">
          <div className="content-shell section-pad grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading
              eyebrow="Useful outcomes"
              title="What the engagement is designed to make possible."
              description="Outcomes are direction, not invented guarantees. We agree measurable acceptance criteria once the operating context and baseline are understood."
              inverse
            />
            <ul className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-surface/10 sm:grid-cols-2">
              {service.outcomes.map((outcome, index) => (
                <li key={outcome} className="min-h-48 bg-surface-2 p-6 sm:p-7">
                  <span className="font-mono text-[0.65rem] font-bold tracking-[0.16em] text-signal">
                    OUT / {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-10 text-lg font-bold leading-7 text-ink-soft">{outcome}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="content-shell section-pad">
        <SectionHeading
          eyebrow="Delivery path"
          title="Decisions stay visible from first question to release."
          description="A staged process keeps scope, feedback, quality, and operational readiness connected as the product takes shape."
        />

        <ol className="relative mt-12 grid gap-4 lg:mt-16 lg:grid-cols-4">
          {service.process.map((processStep, index) => (
            <li
              key={processStep.step}
              className="relative rounded-[1.2rem] border border-line bg-surface p-6 shadow-soft sm:p-7"
            >
              <span className="font-mono text-xs font-bold tracking-[0.18em] text-mineral">
                STEP / {String(processStep.step).padStart(2, "0")}
              </span>
              <h3 className="mt-10 text-xl font-extrabold leading-6 text-ink-soft">
                {processStep.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">{processStep.description}</p>
              {index < service.process.length - 1 && (
                <CornerDownRight
                  aria-hidden="true"
                  className="absolute -bottom-3 right-6 z-10 size-6 rounded-full bg-signal p-1 text-ink-soft lg:-right-3 lg:bottom-auto lg:top-7"
                />
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="content-shell section-pad">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <SectionHeading
              eyebrow="Sector fit"
              title="Related operating environments."
              description="These sectors commonly benefit from this capability. Each sector brief shows the challenges and solution priorities that change the shape of delivery."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group flex min-h-44 flex-col justify-between rounded-[1.15rem] border border-line bg-surface p-6 no-underline transition-colors hover:border-mineral/30 hover:bg-mist/50"
                >
                  <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-mineral">
                    Related sector
                  </span>
                  <span className="mt-8 flex items-end justify-between gap-4">
                    <strong className="max-w-[14rem] text-lg leading-6 text-ink-soft">
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
        </div>
      </section>

      {relatedWork.length > 0 && (
        <section className="content-shell section-pad">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Representative work"
              title="See the thinking in context."
              description="These anonymized scenarios illustrate how this capability could be applied. They are not named client case studies and contain no claimed results."
            />
            <ButtonLink href="/work" variant="outline" className="w-fit shrink-0">
              View all work
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {relatedWork.slice(0, 2).map((item, index) => {
              const industry = relatedIndustries.find(
                (candidate) => candidate.slug === item.industrySlug,
              );

              return (
                <WorkRepresentativeCard
                  key={item.slug}
                  item={item}
                  industryName={industry?.name ?? "Cross-sector"}
                  index={index}
                />
              );
            })}
          </div>
        </section>
      )}

      <CtaBand
        eyebrow={`${service.name} / next step`}
        title="Start with the workflow that needs to become clearer."
        description="Share the users, constraints, existing tools, and decision in front of you. We will help shape a focused next step before discussing a larger build."
      />
    </main>
  );
}
