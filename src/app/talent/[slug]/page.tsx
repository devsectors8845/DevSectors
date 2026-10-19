import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, Check, MapPin, ShieldCheck } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { TalentRoleCard } from "@/components/talent-role-card";
import { siteIdentity, talentRoles } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";
import { getTalentRoleBySlug } from "@/lib/site-utils";

type TalentRolePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return talentRoles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: TalentRolePageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getTalentRoleBySlug(slug);

  if (!role) {
    return { title: "Talent profile not found | DevSectors" };
  }

  const canonical = `${siteIdentity.url}/talent/${role.slug}`;
  const title = `${role.title} Talent Network Profile | DevSectors`;
  const description = `${role.summary} This is a talent-network profile, not a current vacancy or guarantee of work.`;

  return withSocialImage({
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteIdentity.name,
      title,
      description,
    },
    twitter: { card: "summary", title, description },
  });
}

export default async function TalentRolePage({ params }: TalentRolePageProps) {
  const { slug } = await params;
  const role = getTalentRoleBySlug(slug);

  if (!role) {
    notFound();
  }

  const canonical = `${siteIdentity.url}/talent/${role.slug}`;
  const enquiryHref = `/contact?topic=${encodeURIComponent(`Talent network: ${role.title}`)}`;
  const relatedRoles = talentRoles
    .filter((candidate) => candidate.slug !== role.slug)
    .slice(0, 3);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteIdentity.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Talent Network",
        item: `${siteIdentity.url}/talent`,
      },
      { "@type": "ListItem", position: 3, name: role.title, item: canonical },
    ],
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Talent-network profile"
        title={role.title}
        description={role.summary}
        marker="NOT / VACANCY"
      >
        <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-4 text-sm font-bold text-signal">
          <AlertTriangle aria-hidden="true" className="size-4" />
          Not a current vacancy
        </span>
        <ButtonLink href={enquiryHref} variant="outline-light">
          Express future interest
        </ButtonLink>
      </PageHero>

      <div className="content-shell pt-8">
        <Link
          href="/talent"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-mineral"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to the talent network
        </Link>
      </div>

      <section className="section-pad pt-12">
        <div className="content-shell grid items-start gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <aside
            className="rounded-[1.5rem] border border-line bg-paper p-6 lg:sticky lg:top-28"
            aria-labelledby="profile-context-heading"
          >
            <h2 id="profile-context-heading" className="eyebrow text-mineral">
              Profile context
            </h2>
            <dl className="mt-7 divide-y divide-line border-y border-line">
              {[
                ["Discipline", role.discipline],
                ["Typical level", role.seniority],
                ["Work arrangement", role.location],
                ["Status", "Talent network only"],
              ].map(([term, value]) => (
                <div key={term} className="py-5">
                  <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-mineral">
                    {term}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-muted">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs leading-5 text-muted">{role.notice}</p>
          </aside>

          <div>
            <SectionHeading
              eyebrow="Capability profile"
              title="The contribution this discipline can make."
              description="Responsibilities describe a future capability need. They are not duties attached to an open job."
            />
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-display font-extrabold tracking-[-0.035em] text-ink-soft">
                  Relevant responsibilities
                </h3>
                <ul className="mt-6 space-y-4">
                  {role.responsibilities.map((responsibility) => (
                    <li
                      key={responsibility}
                      className="flex gap-3 text-sm leading-6 text-muted"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-mineral"
                      />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-display font-extrabold tracking-[-0.035em] text-ink-soft">
                  Useful skills
                </h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink-soft shadow-soft"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="mt-7 flex gap-3 text-sm leading-6 text-muted">
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-mineral"
                  />
                  Location and working arrangement are discussed only if a
                  specific opportunity exists.
                </p>
              </div>
            </div>

            <div className="mt-14 rounded-[1.5rem] border border-coral/30 bg-coral/[0.07] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-1 size-6 shrink-0 text-coral-ink"
                />
                <div>
                  <h3 className="text-2xl font-display font-extrabold tracking-[-0.035em] text-ink-soft">
                    What an expression of interest means
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    It gives DevSectors permission to consider the profile for
                    relevant future needs. It does not create a recruitment
                    process, response deadline, interview, employment
                    relationship, exclusivity, or promise of paid work.
                  </p>
                  <ButtonLink href={enquiryHref} variant="dark" className="mt-6">
                    Share a capability profile
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="content-shell">
          <SectionHeading
            eyebrow="Adjacent profiles"
            title="Other disciplines in the capability network."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedRoles.map((related, index) => (
              <TalentRoleCard key={related.slug} role={related} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Future-fit capability"
        title="Show the decisions behind the work you are proud of."
        description="A concise profile with explainable project context is more useful than a long list of tools. Any opportunity-specific process and terms come later."
      />
    </main>
  );
}
