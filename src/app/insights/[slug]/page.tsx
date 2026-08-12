import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock3 } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { ContentArticleToc } from "@/components/content-article-toc";
import { ContentInsightCard } from "@/components/content-insight-card";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { insights, siteIdentity } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";
import { getInsightBySlug } from "@/lib/site-utils";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return { title: "Insight not found | DevSectors" };
  }

  const canonical = `${siteIdentity.url}/insights/${article.slug}`;

  return withSocialImage({
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: siteIdentity.name,
      title: article.title,
      description: article.seoDescription,
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.seoDescription,
    },
  });
}

export default async function InsightArticlePage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const canonical = `${siteIdentity.url}/insights/${article.slug}`;
  const relatedArticles = insights
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription,
    url: canonical,
    mainEntityOfPage: canonical,
    articleSection: article.category,
    timeRequired: `PT${article.readingMinutes}M`,
    author: {
      "@type": "Organization",
      name: siteIdentity.name,
      url: siteIdentity.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteIdentity.name,
      url: siteIdentity.url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteIdentity.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${siteIdentity.url}/insights`,
      },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        marker={`READ / ${article.readingMinutes}M`}
      >
        <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 text-sm font-bold text-white/75">
          <Clock3 aria-hidden="true" className="size-4 text-signal" />
          {article.readingMinutes} minute read
        </span>
        <ButtonLink href="/insights" variant="outline-light">
          All insights
        </ButtonLink>
      </PageHero>

      <div className="content-shell pt-8">
        <Link
          href="/insights"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-mineral"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to insights
        </Link>
      </div>

      <article className="section-pad pt-12">
        <div className="content-shell grid items-start gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-20">
          <ContentArticleToc sections={article.sections} />
          <div className="min-w-0">
            <aside
              className="rounded-[1.5rem] border border-line bg-paper p-6 sm:p-8"
              aria-labelledby="key-takeaways-heading"
            >
              <h2 id="key-takeaways-heading" className="eyebrow text-mineral">
                Key takeaways
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {article.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-3 text-sm leading-6 text-muted">
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-mineral"
                    />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="prose-devsectors mt-12 max-w-3xl">
              {article.sections.map((section) => (
                <section key={section.id} aria-labelledby={`${section.id}-heading`}>
                  <h2 id={`${section.id}-heading`} className="scroll-mt-28">
                    <span id={section.id} className="scroll-mt-28">
                      {section.heading}
                    </span>
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-16 border-y border-line py-8">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-mineral">
                Editorial note
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
                This article provides general product and engineering guidance.
                The appropriate decision depends on your users, systems, risk,
                evidence, and operating context.
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className="section-pad bg-paper">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Continue reading"
            title="Related decisions, seen from another angle."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedArticles.map((related, index) => (
              <ContentInsightCard
                key={related.slug}
                article={related}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Apply the framework"
        title="Bring the real workflow, constraints, and unanswered questions."
        description="A focused discovery engagement can turn broad uncertainty into a decision brief your product and engineering team can use."
      />
    </main>
  );
}
