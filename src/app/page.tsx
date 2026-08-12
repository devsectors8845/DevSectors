import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Compass,
  Layers3,
  Smartphone,
  Workflow,
} from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { ProjectPlanner } from "@/components/project-planner";
import { SectionHeading } from "@/components/section-heading";
import { SectorVisual } from "@/components/sector-visual";
import {
  faqs,
  industries,
  insights,
  services,
  siteConfig,
  workItems,
} from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

const { identity } = siteConfig;

export const metadata: Metadata = withSocialImage({
  title: {
    absolute: identity.seoTitle,
  },
  description: identity.seoDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: identity.seoTitle,
    description: identity.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: identity.seoTitle,
    description: identity.seoDescription,
  },
});

const serviceIcons = [Code2, Layers3, Smartphone, Workflow, Cloud, Compass];
const homeFaqs = faqs.slice(0, 6);

function getIndustryName(slug: (typeof industries)[number]["slug"]) {
  return industries.find((industry) => industry.slug === slug)?.name ?? "Digital product";
}

const homepageStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${identity.url}/#webpage`,
    url: identity.url,
    name: identity.seoTitle,
    description: identity.seoDescription,
    inLanguage: identity.locale,
    isPartOf: {
      "@id": `${identity.url}/#website`,
    },
    about: {
      "@id": `${identity.url}/#organization`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function HomePage() {
  return (
    <main id="main-content">
      <JsonLd data={homepageStructuredData} />

      <section className="wide-shell pt-2 sm:pt-4" aria-labelledby="home-heading">
        <div className="sector-grid-dark relative overflow-hidden rounded-[1.35rem] bg-ink text-white sm:rounded-[2rem]">
          <div
            className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-mineral/35 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-20 top-0 size-64 rounded-full border-[42px] border-signal/10"
            aria-hidden="true"
          />

          <div className="content-shell relative grid items-center gap-14 py-16 lg:grid-cols-[1.06fr_0.94fr] lg:py-24 xl:gap-20">
            <div>
              <span className="eyebrow text-signal">
                Product strategy · design · engineering
              </span>
              <h1 id="home-heading" className="display-hero mt-8 max-w-4xl">
                Software that keeps
                <span className="block text-signal">real work moving.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
                DevSectors plans, designs, and builds dependable custom
                software, web platforms, mobile apps, automation, and cloud
                systems for growing teams.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="primary">
                  Plan your project
                </ButtonLink>
                <ButtonLink href="/work" variant="outline-light">
                  Explore representative work
                </ButtonLink>
              </div>

              <ul
                className="mt-12 grid gap-3 border-t border-white/10 pt-7 sm:grid-cols-3"
                aria-label="DevSectors delivery principles"
              >
                {["Clarity before code", "Reviewable increments", "Maintainable handover"].map(
                  (principle, index) => (
                    <li key={principle} className="flex items-start gap-2.5">
                      <span className="font-mono text-[0.62rem] font-bold text-signal">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-bold text-white/70">
                        {principle}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <SectorVisual />
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="positioning-heading">
        <div className="content-shell grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <SectionHeading
            eyebrow="Built around the operation"
            title={
              <span id="positioning-heading">
                Move from scattered requirements to one useful outcome.
              </span>
            }
            description="A digital product creates value when the user journey, business workflow, technology, and release plan work as one system."
          />

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              {
                number: "01",
                title: "Define the decision",
                text: "Clarify the problem, users, constraints, and evidence needed before committing to a build direction.",
              },
              {
                number: "02",
                title: "Deliver a complete path",
                text: "Build usable workflow slices—including permissions, exceptions, and the operational work behind the interface.",
              },
              {
                number: "03",
                title: "Prepare for ownership",
                text: "Keep architecture, release steps, and known limitations visible so the product can evolve after launch.",
              },
            ].map((outcome) => (
              <article
                key={outcome.number}
                className="grid gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft sm:block lg:grid lg:grid-cols-[3.5rem_1fr] lg:p-7"
              >
                <span className="font-mono text-xs font-bold text-mineral">
                  {outcome.number}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold">{outcome.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {outcome.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper section-pad" aria-labelledby="capabilities-heading">
        <div className="content-shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Capabilities"
              title={
                <span id="capabilities-heading">
                  The right delivery shape for the problem in front of you.
                </span>
              }
              description="Start with focused advice, a complete product build, or a practical improvement to software already in use."
            />
            <ButtonLink href="/services" variant="outline" className="w-fit">
              View all services
            </ButtonLink>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = serviceIcons[index] ?? Code2;

              return (
                <article
                  key={service.slug}
                  className="card-lift group flex min-h-[24rem] flex-col rounded-[1.5rem] border border-line bg-canvas p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-mist text-mineral transition group-hover:bg-mineral group-hover:text-white">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="font-mono text-[0.65rem] font-bold text-muted">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-display mt-8 text-3xl font-black leading-none tracking-[-0.04em]">
                    {service.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    {service.shortDescription}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.capabilities.slice(0, 2).map((capability) => (
                      <li
                        key={capability}
                        className="flex items-start gap-2 text-xs font-bold leading-5 text-ink/70"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-3.5 shrink-0 text-mineral"
                        />
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${service.slug}`}
                    aria-label={`Explore ${service.name}`}
                    className="mt-auto inline-flex min-h-11 items-end gap-2 pt-7 text-sm font-extrabold text-mineral transition hover:text-mineral-dark"
                  >
                    Explore capability
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="wide-shell py-2 sm:py-4" aria-labelledby="process-heading">
        <div className="sector-grid-dark rounded-[1.35rem] bg-mineral py-16 text-white sm:rounded-[2rem] lg:py-24">
          <div className="content-shell">
            <SectionHeading
              eyebrow="A visible delivery rhythm"
              inverse
              title={
                <span id="process-heading">
                  Learn early. Build deliberately. Leave a clear path forward.
                </span>
              }
              description="Every engagement is shaped to its context, but the work follows a transparent sequence with useful review points."
            />

            <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/15 md:grid-cols-2 xl:grid-cols-4">
              {services[0].process.map((step) => (
                <li key={step.step} className="bg-mineral-dark/90 p-6 sm:p-8">
                  <span className="flex size-10 items-center justify-center rounded-full border border-signal/50 font-mono text-xs font-bold text-signal">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-14 text-2xl font-black leading-none tracking-[-0.035em]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="work-heading">
        <div className="content-shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <SectionHeading
              eyebrow="Representative work"
              title={
                <span id="work-heading">
                  See how we would shape complex product work.
                </span>
              }
              description="These anonymized scenarios show the problems, decisions, and deliverables our team is equipped to address."
            />
            <div className="rounded-2xl border border-coral/30 bg-coral/10 p-5 text-sm leading-6 text-ink/75">
              <strong className="block text-ink">Clear disclosure</strong>
              <span className="mt-1 block">{workItems[0].disclosure}</span>
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {workItems.slice(0, 3).map((work, index) => (
              <article
                key={work.slug}
                className={`card-lift group flex min-h-[31rem] flex-col overflow-hidden rounded-[1.5rem] border border-line ${
                  index === 1 ? "bg-ink text-white" : "bg-white text-ink"
                }`}
              >
                <div
                  className={`sector-grid flex h-44 items-end p-6 ${
                    index === 0
                      ? "bg-mist"
                      : index === 1
                        ? "bg-signal text-ink"
                        : "bg-paper"
                  }`}
                >
                  <span className="font-display text-6xl font-black tracking-[-0.07em] opacity-20">
                    S{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-wider">
                    <span className={index === 1 ? "text-signal" : "text-mineral"}>
                      {work.representativeLabel}
                    </span>
                    <span className={index === 1 ? "text-white/55" : "text-muted"}>
                      / {getIndustryName(work.industrySlug)}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-3xl font-black leading-none tracking-[-0.04em]">
                    {work.title}
                  </h3>
                  <p
                    className={`mt-4 text-sm leading-6 ${
                      index === 1 ? "text-white/60" : "text-muted"
                    }`}
                  >
                    {work.summary}
                  </p>
                  <Link
                    href={`/work/${work.slug}`}
                    aria-label={`Read representative engagement: ${work.title}`}
                    className={`mt-auto inline-flex min-h-11 items-end gap-2 pt-7 text-sm font-extrabold ${
                      index === 1 ? "text-signal" : "text-mineral"
                    }`}
                  >
                    Review the scenario
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <ButtonLink href="/work" variant="outline">
              View all representative work
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-paper section-pad" aria-labelledby="industries-heading">
        <div className="content-shell grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Industries"
              title={
                <span id="industries-heading">
                  Domain context changes the product decision.
                </span>
              }
              description="We adapt discovery and delivery to the users, constraints, and operating realities of each environment."
            />
            <ButtonLink href="/industries" variant="outline" className="mt-8 w-fit">
              Explore industries
            </ButtonLink>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry, index) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex min-h-52 flex-col rounded-2xl border border-line bg-canvas p-6 transition hover:-translate-y-1 hover:border-mineral/40 hover:shadow-soft"
              >
                <span className="font-mono text-[0.62rem] font-bold text-mineral">
                  {String(index + 1).padStart(2, "0")} / sector
                </span>
                <h3 className="font-display mt-7 text-2xl font-black leading-none tracking-[-0.035em]">
                  {industry.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {industry.shortDescription}
                </p>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-auto size-4 self-end text-mineral transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="insights-heading">
        <div className="content-shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Practical insights"
              title={
                <span id="insights-heading">
                  Better questions before the expensive decisions.
                </span>
              }
              description="Field notes for product owners and operating teams planning software, websites, automation, and reliable releases."
            />
            <ButtonLink href="/insights" variant="outline" className="w-fit">
              Read all insights
            </ButtonLink>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {insights.slice(0, 3).map((insight) => (
              <article
                key={insight.slug}
                className="card-lift group flex min-h-[25rem] flex-col rounded-[1.5rem] border border-line bg-white p-6 sm:p-8"
              >
                <div className="flex items-center justify-between gap-4 font-mono text-[0.62rem] font-bold uppercase tracking-wider text-muted">
                  <span className="text-mineral">{insight.category}</span>
                  <span>{insight.readingMinutes} min read</span>
                </div>
                <h3 className="font-display mt-10 text-3xl font-black leading-[0.98] tracking-[-0.04em]">
                  {insight.title}
                </h3>
                <p className="mt-5 text-sm leading-6 text-muted">
                  {insight.excerpt}
                </p>
                <Link
                  href={`/insights/${insight.slug}`}
                  aria-label={`Read: ${insight.title}`}
                  className="mt-auto inline-flex min-h-11 items-end gap-2 pt-7 text-sm font-extrabold text-mineral"
                >
                  Read the article
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink section-pad text-white" aria-labelledby="planner-heading">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Interactive project planner"
            inverse
            title={
              <span id="planner-heading">
                Turn an open idea into a useful first conversation.
              </span>
            }
            description="Choose the outcome, starting point, and delivery pace. The planner will prepare a concise brief you can carry into the contact form."
          />
          <div className="mt-12">
            <ProjectPlanner />
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="faq-heading">
        <div className="content-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Frequently asked"
              title={<span id="faq-heading">A clear start needs honest answers.</span>}
              description="Understand how scope, pricing, technology, ownership, and delivery are approached before you get in touch."
            />
            <ButtonLink href="/faq" variant="outline" className="mt-8 w-fit">
              Browse every answer
            </ButtonLink>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {homeFaqs.map((faq, index) => (
              <details key={faq.id} className="group" open={index === 0}>
                <summary className="flex min-h-20 list-none items-center justify-between gap-5 py-5 font-extrabold [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-mineral">
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 transition-transform group-open:rotate-180"
                    />
                  </span>
                </summary>
                <p className="max-w-3xl pb-7 pr-12 text-sm leading-7 text-muted sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Ready for a clearer next step?"
        title="Shape the product before complexity shapes it for you."
        description="Share the workflow, product idea, or system that needs to improve. We will help define a grounded starting point and the decisions needed to move forward."
      />
    </main>
  );
}
