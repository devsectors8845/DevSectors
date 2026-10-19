import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Eye, PackageCheck, ShieldCheck } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CapabilityServiceCard } from "@/components/capability-service-card";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { services, siteIdentity, workItems } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";
import {
  getIndustryBySlug,
  getServiceBySlug,
  getWorkItemBySlug,
} from "@/lib/site-utils";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);

  if (!item) {
    return {
      title: { absolute: `Representative work not found | ${siteIdentity.name}` },
    };
  }

  const canonical = `${siteIdentity.url}/work/${item.slug}`;
  const metadataTitle = `${item.seoTitle} | DevSectors`;

  return withSocialImage({
    title: { absolute: metadataTitle },
    description: item.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: metadataTitle,
      description: item.seoDescription,
      url: canonical,
      siteName: siteIdentity.name,
      locale: "en_PK",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description: item.seoDescription,
    },
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const industry = getIndustryBySlug(item.industrySlug);
  const relatedServices = item.relatedServiceSlugs
    .map((serviceSlug) => getServiceBySlug(serviceSlug))
    .filter((service) => service !== undefined);
  const canonical = `${siteIdentity.url}/work/${item.slug}`;

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
                name: "Representative work",
                item: `${siteIdentity.url}/work`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: item.title,
                item: canonical,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Representative engagement: ${item.title}`,
            description: item.seoDescription,
            url: canonical,
            isPartOf: {
              "@type": "WebSite",
              name: siteIdentity.name,
              url: siteIdentity.url,
            },
            about: {
              "@type": "Thing",
              name: "Anonymized representative software engagement scenario",
              description: item.disclosure,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Representative engagement scenario: ${item.title}`,
            serviceType: "Representative software delivery scenario",
            description: `${item.disclosure} ${item.summary}`,
            url: canonical,
            provider: {
              "@type": "Organization",
              name: siteIdentity.name,
              url: siteIdentity.url,
            },
            category: "Representative and anonymized; no achieved result is claimed",
          },
        ]}
      />

      <PageHero
        eyebrow={`${item.representativeLabel} · Anonymized`}
        title={item.title}
        description={item.summary}
        marker={`WORK / ${String(
          workItems.findIndex((candidate) => candidate.slug === item.slug) + 1,
        ).padStart(2, "0")}`}
        theme="mineral"
      >
        <ButtonLink href="/contact">Discuss a real brief</ButtonLink>
        <ButtonLink href="/work" variant="outline-light">
          All representative work
        </ButtonLink>
      </PageHero>

      <section className="content-shell pt-12 sm:pt-16">
        <div className="grid gap-5 rounded-[1.35rem] border border-coral/20 bg-coral/10 p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:p-8">
          <span className="flex size-11 items-center justify-center rounded-xl bg-coral text-ink-soft">
            <ShieldCheck aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-coral-ink">
              Representative engagement disclosure
            </p>
            <p className="mt-3 max-w-4xl text-base font-bold leading-7 text-ink-soft">{item.disclosure}</p>
          </div>
        </div>
      </section>

      <section className="content-shell section-pad">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <span className="eyebrow text-mineral">The scenario</span>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] text-ink-soft sm:text-5xl">
              Understand the operating problem before proposing the product.
            </h2>
            {industry && (
              <Link
                href={`/industries/${industry.slug}`}
                className="group mt-8 inline-flex items-center gap-3 text-sm font-extrabold text-mineral no-underline"
              >
                Sector brief: {industry.name}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
          <blockquote className="m-0 rounded-[1.35rem] border border-line bg-paper p-7 text-xl font-bold leading-9 text-ink-soft sm:p-10 sm:text-2xl sm:leading-10">
            <Eye aria-hidden="true" className="mb-8 size-6 text-mineral" />
            <p>{item.scenario}</p>
          </blockquote>
        </div>
      </section>

      <section className="wide-shell">
        <div className="sector-grid-dark overflow-hidden rounded-[1.35rem] bg-canvas text-ink-soft sm:rounded-[2rem]">
          <div className="content-shell section-pad">
            <SectionHeading
              eyebrow="Proposed approach"
              title="A sequence for making the right decisions visible."
              description="This is an illustrative approach for the scenario, not a claim that the work was delivered for an identified client."
              inverse
            />
            <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-surface/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {item.approach.map((step, index) => (
                <li key={step} className="min-h-64 bg-surface-2 p-6 sm:p-7">
                  <span className="font-mono text-[0.65rem] font-bold tracking-[0.16em] text-signal">
                    STEP / {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-16 text-lg font-extrabold leading-7 text-ink-soft">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="content-shell section-pad">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Possible deliverables"
              title="A concrete engagement shape."
              description="The final scope would depend on discovery, technical constraints, and agreed acceptance criteria."
            />
            <ul className="mt-9 divide-y divide-line border-y border-line">
              {item.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-center gap-4 py-5 text-base font-bold text-ink-soft">
                  <PackageCheck aria-hidden="true" className="size-5 shrink-0 text-mineral" />
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.35rem] bg-mist p-7 sm:p-10">
            <span className="eyebrow text-mineral">Intended value</span>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] text-ink-soft sm:text-5xl">
              Direction to validate, not results already achieved.
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted">
              These statements describe what the proposed work would aim to improve. They are not historical performance claims or guarantees.
            </p>
            <ul className="mt-8 space-y-3">
              {item.intendedValue.map((value) => (
                <li key={value} className="flex items-start gap-4 rounded-xl bg-surface/75 p-5 text-sm font-bold leading-6 text-ink-soft">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-mineral" />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="content-shell section-pad">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Connected capabilities"
              title="Services represented in this approach."
              description="Open a capability to see its broader scope, process, sector relationships, and other representative scenarios."
            />
            <ButtonLink href="/services" variant="outline" className="w-fit shrink-0">
              All capabilities
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((service) => (
              <CapabilityServiceCard
                key={service.slug}
                service={service}
                index={services.findIndex((candidate) => candidate.slug === service.slug)}
                compact
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="From representative to real"
        title="Build your brief from facts we can verify together."
        description="Share the current workflow, users, systems, and desired change. We will help define the baseline, scope, and evidence needed for a credible engagement."
      />
    </main>
  );
}
