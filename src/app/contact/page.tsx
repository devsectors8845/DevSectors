import type { Metadata } from "next";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { courses, services, siteConfig, talentRoles } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

export const metadata: Metadata = withSocialImage({
  title: "Contact DevSectors | Discuss a Software Project",
  description:
    "Share your software, website, mobile app, automation, cloud, training, or career enquiry with DevSectors in Bahawalpur, Pakistan.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a conversation with DevSectors",
    description:
      "Tell us what needs to change and receive a practical response about scope and next steps.",
    url: "/contact",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a conversation with DevSectors",
    description: "Share a project brief with our product and engineering team."
  }
});

type ContactPageProps = {
  searchParams: Promise<{
    service?: string | string[];
    brief?: string | string[];
    topic?: string | string[];
  }>;
};

function firstQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function serviceForTopic(topic: string | undefined) {
  if (!topic) return "";

  const normalizedTopic = topic.trim().toLocaleLowerCase();
  const isCourseTopic =
    courses.some((course) => course.title.toLocaleLowerCase() === normalizedTopic) ||
    ["course", "courses", "training", "cohort"].some((term) =>
      normalizedTopic.includes(term)
    );

  if (isCourseTopic) return "courses";
  if (normalizedTopic.includes("internship")) return "internship";
  if (
    normalizedTopic.includes("talent") ||
    normalizedTopic.includes("career") ||
    talentRoles.some((role) => normalizedTopic.includes(role.title.toLocaleLowerCase()))
  ) {
    return "career";
  }
  if (normalizedTopic.includes("engagement")) return "other";

  return "";
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const requestedService = firstQueryValue(params.service);
  const requestedTopic = firstQueryValue(params.topic)?.trim().slice(0, 160);
  const requestedBrief = firstQueryValue(params.brief) ?? "";
  const allowedGeneralServices = ["courses", "internship", "career", "other"];
  const defaultService = services.some(
    (service) => service.slug === requestedService
  )
    ? requestedService
    : requestedService && allowedGeneralServices.includes(requestedService)
      ? requestedService
      : serviceForTopic(requestedTopic);
  const broadTopics = ["courses", "internship", "engagement", "talent-network"];
  const topicContext =
    requestedTopic && !broadTopics.includes(requestedTopic.toLocaleLowerCase())
      ? `I am enquiring about ${requestedTopic}.\n\n`
      : "";
  const defaultMessage = requestedBrief || topicContext;

  const contactPoints = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact.email,
      href: siteConfig.contact.emailHref,
      note: "For projects, partnerships, learning, and careers"
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.contact.phone,
      href: siteConfig.contact.phoneHref,
      note: "For a quick initial conversation"
    },
    {
      icon: MapPin,
      label: "Based in",
      value: siteConfig.contact.address.display,
      href: `https://www.openstreetmap.org/search?query=${encodeURIComponent(siteConfig.contact.mapQuery)}`,
      note: "Ask about local or remote delivery"
    }
  ];

  return (
    <main id="main-content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact DevSectors",
          url: `${siteConfig.identity.url}/contact`,
          mainEntity: {
            "@type": "ProfessionalService",
            name: siteConfig.identity.name,
            email: siteConfig.contact.email,
            telephone: siteConfig.contact.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.contact.address.line1,
              addressLocality: siteConfig.contact.address.city,
              addressCountry: "PK"
            }
          }
        }}
      />

      <PageHero
        eyebrow="Contact / Project brief"
        title={
          <>
            Start with the <span className="text-signal">problem.</span>
            <br />We&apos;ll map the next move.
          </>
        }
        description="Give us the context, constraints, and outcome you have in mind. We will review the brief and respond with useful questions or a practical next step."
        marker="DS / CONTACT"
        theme="mineral"
      />

      <section className="section-pad">
        <div className="content-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,1.25fr)] lg:gap-16">
          <div>
            <span className="eyebrow text-mineral">Direct contact</span>
            <h2 className="heading-section mt-5">A clear reply, not a sales maze.</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
              You do not need a finished specification. A useful first message can
              explain what is happening today, who experiences the problem, and
              what should become easier.
            </p>

            <div className="mt-10 space-y-3">
              {contactPoints.map(({ icon: Icon, label, value, href, note }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex min-h-28 items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:border-mineral/40 hover:shadow-soft"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper text-mineral">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-mono block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-muted">
                      {label}
                    </span>
                    <strong className="mt-1.5 block break-words text-base text-ink-soft">
                      {value}
                    </strong>
                    <span className="mt-1 block text-sm leading-5 text-muted">
                      {note}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted transition group-hover:text-mineral"
                  />
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-canvas p-6 text-ink-soft">
              <div className="flex items-center gap-3 text-signal">
                <Clock3 aria-hidden="true" className="size-5" />
                <strong className="text-sm">Response expectation</strong>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">
                We aim to reply to complete project briefs within two business
                days. Urgent production support is only available through an
                existing support agreement.
              </p>
            </div>
          </div>

          <div id="contact-form" className="scroll-mt-28">
            <ContactForm
              serviceOptions={services.map((service) => ({
                slug: service.slug,
                title: service.name
              }))}
              defaultService={defaultService}
              defaultMessage={defaultMessage.slice(0, 4000)}
            />
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <div className="content-shell grid gap-7 md:grid-cols-3">
          {[
            {
              icon: MessageCircle,
              title: "Share the real context",
              copy: "Existing tools, constraints, deadlines, and failed attempts all help us understand the work."
            },
            {
              icon: MapPin,
              title: "Remote-friendly delivery",
              copy: "We can organize discovery, reviews, and delivery around documented decisions and clear meeting rhythms."
            },
            {
              icon: Clock3,
              title: "No pressure to over-scope",
              copy: "If a smaller validation step is the responsible choice, that is the recommendation we will make."
            }
          ].map(({ icon: Icon, title, copy }) => (
            <article key={title} className="border-t border-line pt-6">
              <Icon aria-hidden="true" className="size-5 text-mineral" />
              <h2 className="mt-5 text-lg font-extrabold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
