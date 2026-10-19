import type { Metadata } from "next";
import { Check, CircleDollarSign, FileCheck2, GitCompareArrows, UsersRound } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { EngagementModelCard } from "@/components/engagement-model-card";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { engagementModels, siteIdentity } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

const canonical = `${siteIdentity.url}/engagement`;

export const metadata: Metadata = withSocialImage({
  title: "Software Engagement Models | DevSectors",
  description:
    "Compare discovery, focused product delivery, and continuous product partnership models without misleading fixed-price packages.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: siteIdentity.name,
    title: "How DevSectors Engages",
    description:
      "Engagement models based on problem clarity and delivery continuity—not artificial package tiers.",
  },
  twitter: {
    card: "summary",
    title: "How DevSectors Engages",
    description:
      "Engagement models based on problem clarity and delivery continuity—not artificial package tiers.",
  },
});

const principles = [
  {
    icon: FileCheck2,
    title: "Scope follows evidence",
    description:
      "When important questions remain open, we define them before pretending the build is estimable.",
  },
  {
    icon: CircleDollarSign,
    title: "Commercial terms are specific",
    description:
      "Fees follow the confirmed scope, capacity, dependencies, and responsibilities. The website does not invent universal prices.",
  },
  {
    icon: GitCompareArrows,
    title: "Change is evaluated openly",
    description:
      "Material additions are assessed for value, sequence, and impact before they quietly alter delivery expectations.",
  },
  {
    icon: UsersRound,
    title: "Ownership is named",
    description:
      "The proposal identifies decision-makers, required access, review rhythm, and handover responsibilities on both sides.",
  },
] as const;

export default function EngagementPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How DevSectors Engages",
    url: canonical,
    description: metadata.description,
    mainEntity: {
      "@type": "Service",
      provider: {
        "@type": "Organization",
        name: siteIdentity.name,
        url: siteIdentity.url,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engagement models",
        itemListElement: engagementModels.map((model) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: model.name,
            description: model.summary,
          },
        })),
      },
    },
  };

  return (
    <main id="main-content">
      <JsonLd data={pageSchema} />
      <PageHero
        eyebrow="How we engage"
        title={
          <>
            Choose the level of certainty the <span className="text-signal">work needs.</span>
          </>
        }
        description="Discovery, focused delivery, and continuous partnership serve different kinds of uncertainty. None is a fake fixed-price package."
        marker="DS / ENGAGE"
      >
        <ButtonLink href="#models">Compare models</ButtonLink>
        <ButtonLink href="/contact?topic=engagement" variant="outline-light">
          Discuss the right starting point
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="content-shell grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <SectionHeading
            eyebrow="A commercial principle"
            title="Custom work cannot be priced honestly from a card title."
          />
          <div>
            <p className="text-xl leading-8 text-muted">
              A price becomes meaningful only when the outcome, scope boundary,
              integrations, quality expectations, client inputs, risks, and
              handover responsibilities are understood. We publish the model and
              decision process here. A proposal supplies the actual commercial
              terms for a confirmed engagement.
            </p>
            <div className="mt-8 rounded-[1.25rem] border border-signal-dark/30 bg-signal/20 p-5">
              <p className="flex gap-3 text-sm font-semibold leading-6 text-ink-soft">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0" />
                No invented monthly plan, hidden checkout, or universal project
                price is presented as a substitute for scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="models" className="section-pad bg-paper scroll-mt-24">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Engagement models"
            title="Three shapes for three levels of clarity."
            description="The appropriate model depends on what is known, what still needs evidence, and whether the work has a bounded release or an ongoing product rhythm."
          />
          <div className="mt-12 space-y-6">
            {engagementModels.map((model, index) => (
              <EngagementModelCard key={model.slug} model={model} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="engagement-principles" className="section-pad scroll-mt-24">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Engagement principles"
            title="What stays consistent across every model."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
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
                  <h3 className="mt-7 text-2xl font-display font-extrabold tracking-[-0.035em] text-ink-soft">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact?topic=engagement">
              Request an engagement conversation
            </ButtonLink>
            <ButtonLink href="/faq" variant="outline">
              Read delivery FAQs
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Start at the right altitude"
        title="If the scope is uncertain, make the uncertainty the first deliverable."
        description="Share the current workflow, the decision you need to make, and what evidence already exists. We will recommend a responsible starting model."
      />
    </main>
  );
}
