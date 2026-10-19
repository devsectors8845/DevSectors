import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { ContentInsightFilter } from "@/components/content-insight-filter";
import { ContentInsightCard } from "@/components/content-insight-card";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { insights, siteIdentity } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

const canonical = `${siteIdentity.url}/insights`;

export const metadata: Metadata = withSocialImage({
  title: "Software, Product and Cloud Insights | DevSectors",
  description:
    "Read practical field notes on software planning, B2B websites, workflow automation, cloud reliability, and maintainable digital delivery.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: siteIdentity.name,
    title: "DevSectors Insights",
    description:
      "Practical field notes for teams planning, building, and operating digital products.",
  },
  twitter: {
    card: "summary",
    title: "DevSectors Insights",
    description:
      "Practical field notes for teams planning, building, and operating digital products.",
  },
});

export default function InsightsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "DevSectors Insights",
    url: canonical,
    description: metadata.description,
    hasPart: insights.map((article) => ({
      "@type": "Article",
      headline: article.title,
      url: `${siteIdentity.url}/insights/${article.slug}`,
      articleSection: article.category,
    })),
  };

  const [featured] = insights;

  return (
    <main id="main-content">
      <JsonLd data={collectionSchema} />
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Clearer thinking before the <span className="text-signal">next build decision.</span>
          </>
        }
        description="Original, practical guidance for teams shaping products, websites, automation, and reliable cloud operations."
        marker="DS / NOTES"
      >
        <ButtonLink href="#all-insights">Browse every field note</ButtonLink>
        <ButtonLink href="/contact" variant="outline-light">
          Bring us a question
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Featured field note"
            title="Start with the decision that is hardest to reverse."
            description="Our editorial approach favors useful frameworks, visible trade-offs, and steps a product or operations team can apply without buying a particular tool."
          />
          <div className="mt-12">
            <ContentInsightCard article={featured} index={0} featured />
          </div>
        </div>
      </section>

      <section id="all-insights" className="section-pad bg-paper scroll-mt-24">
        <div className="content-shell">
          <SectionHeading
            eyebrow="All insights"
            title="Four useful questions. No trend theatre."
            description="Each article is original content written around a practical decision, with enough context to act and enough uncertainty to adapt."
          />
          <div className="mt-12">
            <ContentInsightFilter articles={insights} />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="content-shell grid gap-6 md:grid-cols-3">
          {[
            ["Evidence over certainty", "Recommendations distinguish tested facts from assumptions that still need validation."],
            ["Decisions over tools", "Technology appears in context, after the workflow, risk, and operating model are understood."],
            ["Useful over frequent", "We publish when a topic deserves a complete explanation, not to manufacture an activity stream."],
          ].map(([title, description], index) => (
            <article key={title} className="border-t-2 border-line pt-6">
              <span className="font-mono text-xs font-bold text-mineral">
                0{index + 1}
              </span>
              <h2 className="mt-6 text-2xl font-display font-extrabold tracking-[-0.035em] text-ink-soft">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="A question worth investigating?"
        title="Turn uncertainty into a focused discovery brief."
        description="Share the workflow, constraint, or product decision you are working through. We will help identify the evidence needed for a responsible next step."
      />
    </main>
  );
}
