import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { faqs, siteIdentity, type FaqCategory } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";
import { getFaqsByCategory } from "@/lib/site-utils";

const canonical = `${siteIdentity.url}/faq`;

export const metadata: Metadata = withSocialImage({
  title: "Frequently Asked Questions | DevSectors",
  description:
    "Find clear answers about DevSectors services, delivery, security, course availability, internships, representative work, and the talent network.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    siteName: siteIdentity.name,
    title: "DevSectors Frequently Asked Questions",
    description:
      "Straight answers about how projects, learning opportunities, and capability-network expressions of interest work.",
  },
  twitter: {
    card: "summary",
    title: "DevSectors Frequently Asked Questions",
    description:
      "Straight answers about how projects, learning opportunities, and capability-network expressions of interest work.",
  },
});

const categories: readonly FaqCategory[] = [
  "Services",
  "Delivery",
  "Learning",
  "Company",
];

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main id="main-content">
      <JsonLd data={faqSchema} />
      <PageHero
        eyebrow="Frequently asked questions"
        title={
          <>
            Straight answers before the <span className="text-signal">next conversation.</span>
          </>
        }
        description="How scope, delivery, ownership, learning cohorts, representative work, and talent-network profiles are handled."
        marker="DS / FAQ"
      >
        <ButtonLink href="#questions">Browse questions</ButtonLink>
        <ButtonLink href="/contact" variant="outline-light">
          Ask something specific
        </ButtonLink>
      </PageHero>

      <section className="section-pad pb-0">
        <div className="content-shell">
          <nav aria-label="FAQ categories" className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <a
                key={category}
                href={`#faq-${category.toLocaleLowerCase()}`}
                className="inline-flex min-h-11 items-center rounded-full border border-muted bg-surface px-4 text-sm font-bold text-muted transition-colors hover:border-mineral hover:text-mineral"
              >
                {category}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div id="questions" className="section-pad scroll-mt-24">
        <div className="content-shell space-y-20">
          {categories.map((category) => {
            const categoryFaqs = getFaqsByCategory(category);

            return (
              <section
                key={category}
                id={`faq-${category.toLocaleLowerCase()}`}
                aria-labelledby={`faq-${category.toLocaleLowerCase()}-heading`}
                className="scroll-mt-28"
              >
                <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
                  <div>
                    <span className="eyebrow text-mineral">Question group</span>
                    <h2
                      id={`faq-${category.toLocaleLowerCase()}-heading`}
                      className="mt-5 text-4xl font-display font-extrabold tracking-[-0.04em] text-ink-soft"
                    >
                      {category}
                    </h2>
                  </div>
                  <FaqList items={categoryFaqs} />
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <section className="section-pad bg-paper">
        <div className="content-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Still uncertain?"
            title="A useful question includes the context around it."
          />
          <div>
            <p className="text-lg leading-8 text-muted">
              Share the current workflow, the people affected, what has already
              been tried, and the decision you need to make. That context lets us
              respond more responsibly than a generic request for a price or
              technology recommendation.
            </p>
            <ButtonLink href="/contact" variant="dark" className="mt-7">
              Send a contextual enquiry
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="A question specific to your work?"
        title="Share enough context to make the first response useful."
        description="Tell us the goal, current system, constraints, and timing. We will respond with the next question or a sensible starting point."
      />
    </main>
  );
}
