import type { Metadata } from "next";
import { Boxes, FileSearch, Route } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { WorkFilter } from "@/components/work-filter";
import { industries, siteIdentity, workItems } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

const title = "Representative software and digital product work | DevSectors";
const description =
  "Explore clearly labeled, anonymized DevSectors engagement scenarios for SaaS, field operations, eCommerce, and learning platforms—with no fabricated results.";
const canonical = `${siteIdentity.url}/work`;

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

export default function WorkPage() {
  return (
    <main id="main-content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Representative DevSectors engagement scenarios",
          description:
            "Anonymized representative scenarios that illustrate an approach and do not claim client identities or achieved results.",
          url: canonical,
          itemListElement: workItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `Representative engagement: ${item.title}`,
            url: `${canonical}/${item.slug}`,
          })),
        }}
      />

      <PageHero
        eyebrow="Representative work"
        title={
          <>
            See the <span className="text-signal">thinking</span>, without invented proof.
          </>
        }
        description="These clearly labeled, anonymized scenarios show how DevSectors can approach complex product and operational problems. They are not named client case studies and make no performance claims."
        marker="DS / WORK"
        theme="ink"
      >
        <ButtonLink href="#representative-work">Review the scenarios</ButtonLink>
        <ButtonLink href="/contact" variant="outline-light">
          Share your challenge
        </ButtonLink>
      </PageHero>

      <section className="content-shell pt-16 sm:pt-20">
        <div className="grid gap-6 rounded-[1.35rem] border border-mineral/15 bg-mist/65 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-8">
          <span className="inline-flex w-fit rounded-full bg-mineral px-4 py-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.13em] text-ink-soft">
            Disclosure
          </span>
          <div>
            <h2 className="text-xl font-extrabold leading-7 text-ink-soft">
              Representative and anonymized by design.
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted">
              Every item in this section illustrates a plausible engagement structure using generalized context. No client name, testimonial, commercial relationship, delivery history, or achieved metric should be inferred.
            </p>
          </div>
        </div>
      </section>

      <section id="representative-work" className="content-shell section-pad scroll-mt-24">
        <SectionHeading
          eyebrow="Scenario library"
          title="Problems, decisions, and delivery shapes."
          description="Filter by sector, then open a scenario to review the context, proposed approach, possible deliverables, and intended value—never a fabricated result."
        />
        <div className="mt-10 lg:mt-14">
          <WorkFilter items={workItems} industries={industries} />
        </div>
      </section>

      <section className="wide-shell">
        <div className="sector-grid-dark overflow-hidden rounded-[1.35rem] bg-canvas text-ink-soft sm:rounded-[2rem]">
          <div className="content-shell section-pad">
            <SectionHeading
              eyebrow="How to read the work"
              title="Evidence of method, not a substitute for discovery."
              description="A useful work example should help you assess how a partner thinks. Your requirements, baseline, constraints, and definition of success still need to be established together."
              inverse
            />
            <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
              {[
                {
                  icon: FileSearch,
                  label: "01 / Context",
                  title: "The operating situation",
                  copy: "A generalized problem frame, including the people and hand-offs a product may need to support.",
                },
                {
                  icon: Route,
                  label: "02 / Method",
                  title: "The proposed approach",
                  copy: "A transparent sequence for reducing ambiguity, testing decisions, and shaping a complete workflow.",
                },
                {
                  icon: Boxes,
                  label: "03 / Shape",
                  title: "Possible deliverables",
                  copy: "A concrete view of what the engagement might produce, separated from any unverified outcome claim.",
                },
              ].map(({ icon: Icon, label, title: itemTitle, copy }) => (
                <article key={label} className="rounded-[1.2rem] border border-line bg-surface/5 p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Icon aria-hidden="true" className="size-5 text-signal" />
                    <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-muted">
                      {label}
                    </span>
                  </div>
                  <h3 className="mt-12 text-xl font-extrabold leading-7 text-ink-soft">{itemTitle}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20">
          <SectionHeading
            eyebrow="Your evidence plan"
            title="Real results begin with a real baseline."
            description="For a live engagement, we define what should improve, how it can be observed, and which trade-offs matter before claiming success."
          />
          <div className="rounded-[1.35rem] border border-line bg-paper p-7 sm:p-10">
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-mineral">
              A credible starting brief includes
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                "The current workflow and its owner",
                "A baseline the team can verify",
                "The behavior or outcome worth changing",
                "The constraints that cannot be ignored",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-bold leading-6 text-ink-soft">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-[2px] bg-mineral" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Build the real brief"
        title="Tell us what is happening in your operation today."
        description="We will help turn the current state, constraints, and desired change into a scoped product conversation—without promising a result before the evidence exists."
      />
    </main>
  );
}
