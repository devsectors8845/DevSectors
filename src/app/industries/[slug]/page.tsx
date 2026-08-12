import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowRight, Check } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CapabilityServiceCard } from "@/components/capability-service-card";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { WorkRepresentativeCard } from "@/components/work-representative-card";
import { industries, services, siteIdentity } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";
import {
  getIndustryBySlug,
  getServicesForIndustry,
  getWorkItemsForIndustry,
} from "@/lib/site-utils";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return {
      title: { absolute: `Industry not found | ${siteIdentity.name}` },
    };
  }

  const canonical = `${siteIdentity.url}/industries/${industry.slug}`;

  return withSocialImage({
    title: { absolute: industry.seoTitle },
    description: industry.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: industry.seoTitle,
      description: industry.seoDescription,
      url: canonical,
      siteName: siteIdentity.name,
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: industry.seoTitle,
      description: industry.seoDescription,
    },
  });
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const canonical = `${siteIdentity.url}/industries/${industry.slug}`;
  const relatedServices = getServicesForIndustry(industry.slug);
  const relatedWork = getWorkItemsForIndustry(industry.slug);

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
                name: "Industries",
                item: `${siteIdentity.url}/industries`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: industry.name,
                item: canonical,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${industry.name} digital product services`,
            serviceType: `Software and digital product services for ${industry.name}`,
            description: industry.seoDescription,
            url: canonical,
            provider: {
              "@type": "Organization",
              name: siteIdentity.name,
              url: siteIdentity.url,
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `Capabilities for ${industry.name}`,
              itemListElement: relatedServices.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.name,
                  url: `${siteIdentity.url}/services/${service.slug}`,
                },
              })),
            },
          },
        ]}
      />

      <PageHero
        eyebrow="Industry focus"
        title={industry.name}
        description={industry.shortDescription}
        marker={`SECTOR / ${String(
          industries.findIndex((candidate) => candidate.slug === industry.slug) + 1,
        ).padStart(2, "0")}`}
        theme="ink"
      >
        <ButtonLink href="/contact">Discuss your operation</ButtonLink>
        <ButtonLink href="/services" variant="outline-light">
          Browse services
        </ButtonLink>
      </PageHero>

      <section className="content-shell section-pad">
        <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
          <SectionHeading
            eyebrow="Operating pressure"
            title="Start with what makes the work difficult."
            description="These recurring challenge patterns help focus discovery. The real brief is built from your users, tools, constraints, and exception paths."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {industry.commonChallenges.map((challenge, index) => (
              <li
                key={challenge}
                className="flex min-h-48 flex-col rounded-[1.2rem] border border-line bg-white p-6 shadow-soft sm:p-7"
              >
                <span className="flex items-center justify-between gap-4">
                  <AlertCircle aria-hidden="true" className="size-5 text-coral-ink" />
                  <span className="font-mono text-[0.65rem] font-bold tracking-[0.16em] text-muted">
                    PRESSURE / {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <p className="mt-auto pt-10 text-base font-bold leading-7 text-ink">{challenge}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wide-shell">
        <div className="sector-grid-dark overflow-hidden rounded-[1.35rem] bg-mineral text-white sm:rounded-[2rem]">
          <div className="content-shell section-pad">
            <SectionHeading
              eyebrow="Solution focus"
              title="Where a focused digital product can create clarity."
              description="These are useful starting points for investigation, not a pre-sold feature package. We test the priority and scope with your team before recommending a build."
              inverse
            />
            <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/15 bg-white/15 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {industry.solutionFocus.map((focus, index) => (
                <li key={focus} className="min-h-56 bg-mineral-dark p-6 sm:p-7">
                  <span className="font-mono text-[0.65rem] font-bold tracking-[0.16em] text-signal">
                    FOCUS / {String(index + 1).padStart(2, "0")}
                  </span>
                  <Check aria-hidden="true" className="mt-12 size-5 text-signal" />
                  <p className="mt-5 text-lg font-extrabold leading-7 text-white">{focus}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="content-shell section-pad">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Related services"
            title="Capabilities matched to this sector."
            description="Open any capability to review its scope, intended outcomes, delivery process, and connected representative work."
          />
          <ButtonLink href="/services" variant="outline" className="w-fit shrink-0">
            Service overview
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((service) => (
            <CapabilityServiceCard
              key={service.slug}
              service={service}
              index={services.findIndex((candidate) => candidate.slug === service.slug)}
              compact
            />
          ))}
        </div>
      </section>

      {relatedWork.length > 0 ? (
        <section className="border-y border-line bg-paper">
          <div className="content-shell section-pad">
            <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="Representative work"
                  title="A scenario grounded in this operating context."
                  description="This material is visibly anonymized and representative. It explains an approach without implying a named client relationship or achieved performance result."
                />
                <ButtonLink href="/work" variant="outline" className="mt-8 w-fit">
                  All representative work
                </ButtonLink>
              </div>
              <div className="grid gap-5">
                {relatedWork.map((item, index) => (
                  <WorkRepresentativeCard
                    key={item.slug}
                    item={item}
                    industryName={industry.name}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="content-shell pb-20 sm:pb-28">
          <div className="flex flex-col gap-8 rounded-[1.35rem] border border-line bg-paper p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="max-w-2xl">
              <span className="eyebrow text-mineral">Your context first</span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-4xl">
                No generic case study stands in for your operation.
              </h2>
              <p className="mt-4 leading-7 text-muted">
                We would rather understand your workflow than invent a result. Share the challenge and we will outline a credible discovery path.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-13 shrink-0 items-center gap-3 rounded-full bg-ink px-6 text-sm font-extrabold text-white no-underline transition-colors hover:bg-mineral"
            >
              Share your context
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow={`${industry.name} / next step`}
        title="Map one important workflow before choosing the technology."
        description="A focused working session can turn scattered requirements into a clear problem statement, delivery boundary, and evidence plan."
      />
    </main>
  );
}
