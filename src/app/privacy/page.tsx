import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

export const metadata: Metadata = withSocialImage({
  title: "Privacy Policy | DevSectors",
  description:
    "How DevSectors handles information submitted through this website, including project enquiries and technical logs.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | DevSectors",
    description: "How DevSectors handles information submitted on this website.",
    url: "/privacy",
    type: "website"
  }
});

const sections = [
  { id: "information", label: "Information we collect" },
  { id: "use", label: "How we use it" },
  { id: "storage", label: "Storage and providers" },
  { id: "retention", label: "Retention" },
  { id: "rights", label: "Your choices" },
  { id: "security", label: "Security" },
  { id: "changes", label: "Policy changes" },
  { id: "contact", label: "Contact" }
];

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Legal / Privacy"
        title="Privacy, explained in plain language."
        description="This policy describes the information this website collects, why it is used, and how you can ask about it."
        marker="DS / LEGAL 01"
        theme="paper"
      />

      <section className="section-pad">
        <div className="content-shell grid gap-12 lg:grid-cols-[15rem_minmax(0,48rem)] lg:justify-between">
          <aside
            className="lg:sticky lg:top-28 lg:self-start"
            aria-label="Privacy policy navigation"
          >
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted">
              Last updated / 12 August 2026
            </p>
            <nav aria-label="Privacy policy sections" className="mt-6">
              <ol className="space-y-2">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-muted hover:bg-paper hover:text-mineral"
                    >
                      <span className="font-mono text-[0.62rem] text-mineral">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="prose-devsectors">
            <p className="text-xl leading-9 text-ink-soft">
              DevSectors collects only the information needed to respond to an
              enquiry, operate this website, and protect it from misuse. We do
              not sell personal information or add project enquirers to a
              marketing list without a separate choice.
            </p>

            <h2 id="information">Information we collect</h2>
            <p>
              When you submit the project form, we may receive your name, email,
              phone number, company, service interest, approximate budget,
              timeline, current website or product URL, and the message you
              provide. The form also records a unique reference and submission
              time. Standard hosting logs may contain technical information such
              as an IP address, browser type, requested URL, and error details.
            </p>

            <h2 id="use">How we use information</h2>
            <p>Information is used to:</p>
            <ul>
              <li>Review and respond to your request.</li>
              <li>Prepare relevant questions, proposals, or next-step guidance.</li>
              <li>Maintain security, diagnose faults, and prevent spam or abuse.</li>
              <li>Meet applicable legal and record-keeping obligations.</li>
            </ul>

            <h2 id="storage">Storage and service providers</h2>
            <p>
              Enquiries are processed on the server. Depending on deployment
              configuration, they may be stored in a protected application file
              or delivered to the DevSectors contact inbox through a configured
              email provider. Hosting and email providers process information on
              our behalf to deliver those services. Production operators should
              configure appropriate access controls, backups, and provider terms
              before accepting public enquiries.
            </p>

            <h2 id="retention">Retention</h2>
            <p>
              Enquiry information should be retained only while it remains useful
              for the conversation, delivery relationship, legitimate business
              records, or legal obligations. If an enquiry does not progress,
              DevSectors may remove it when there is no longer a reasonable need
              to keep it.
            </p>

            <h2 id="rights">Your choices</h2>
            <p>
              You can ask whether DevSectors holds information about you and
              request correction or deletion where applicable. Some records may
              need to be retained when required for legal, security, or contractual
              reasons. This website currently does not operate advertising cookies
              or a newsletter signup.
            </p>

            <h2 id="security">Security</h2>
            <p>
              Reasonable technical and organizational safeguards are used to
              reduce unauthorized access or disclosure. No internet transmission
              or storage system can be guaranteed completely secure, so please do
              not submit passwords, payment-card data, medical records, or other
              highly sensitive material through the general project form.
            </p>

            <h2 id="changes">Changes to this policy</h2>
            <p>
              This page may be revised when the website, providers, or applicable
              practices change. The updated date at the top identifies the latest
              published version.
            </p>

            <h2 id="contact">Contact</h2>
            <p>
              Privacy questions can be sent to{" "}
              <a href={siteConfig.contact.emailHref}>{siteConfig.contact.email}</a>
              . For general project requests, use the{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
