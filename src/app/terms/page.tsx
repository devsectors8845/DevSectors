import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

export const metadata: Metadata = withSocialImage({
  title: "Website Terms of Use | DevSectors",
  description:
    "Terms for using the DevSectors website, its general information, enquiry tools, and published learning content.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Website Terms of Use | DevSectors",
    description: "Terms that apply when using the DevSectors website.",
    url: "/terms",
    type: "website"
  }
});

export default function TermsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Legal / Terms"
        title="Straightforward terms for using this site."
        description="These terms cover the public website. Project work, training, or other paid services require a separate written agreement."
        marker="DS / LEGAL 02"
        theme="paper"
      />

      <section className="section-pad">
        <article className="prose-devsectors content-shell max-w-3xl">
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted">
            Last updated / 12 August 2026
          </p>
          <p className="mt-8 text-xl leading-9 text-ink-soft">
            By using this website, you agree to use it lawfully and understand
            that its public content is general information, not a promise of a
            particular project outcome.
          </p>

          <h2>1. Website purpose</h2>
          <p>
            This site explains DevSectors&apos; capabilities, engagement approaches,
            learning concepts, and ways to make contact. It does not create a
            client, employment, partnership, or training relationship merely
            because you browse a page or send an enquiry.
          </p>

          <h2>2. No automatic service agreement</h2>
          <p>
            A project begins only after both parties agree in writing to scope,
            responsibilities, commercial terms, intellectual-property treatment,
            timelines, and any other applicable conditions. Website descriptions
            are illustrative and may not fit every situation.
          </p>

          <h2>3. Representative work</h2>
          <p>
            Items explicitly labeled “Representative engagement” are anonymized
            scenarios used to explain how DevSectors may approach a type of
            problem. They are not named client case studies, testimonials, or
            claims that a stated commercial result has already been achieved.
          </p>

          <h2>4. Courses, internships, and talent network</h2>
          <p>
            Course and internship pages describe programme concepts and expected
            structure. Dates, places, fees, selection criteria, and availability
            must be confirmed directly before you rely on them. Joining the talent
            network does not guarantee an interview, role, placement, or paid work.
          </p>

          <h2>5. Acceptable use</h2>
          <p>You must not use the site to:</p>
          <ul>
            <li>Break applicable law or infringe another person&apos;s rights.</li>
            <li>Probe, overload, bypass, or disrupt security and availability.</li>
            <li>Send malware, automated spam, deceptive enquiries, or harmful content.</li>
            <li>Misrepresent your identity, authority, or relationship to another party.</li>
          </ul>

          <h2>6. Intellectual property</h2>
          <p>
            Unless stated otherwise, the site&apos;s original design, brand elements,
            written content, and code are owned by or licensed to DevSectors.
            You may link to public pages and quote brief portions with fair
            attribution, but you may not republish substantial content or present
            it as your own.
          </p>

          <h2>7. Third-party links</h2>
          <p>
            External links are provided for convenience. DevSectors does not
            control third-party availability, security, content, or privacy
            practices and does not endorse a third party merely by linking to it.
          </p>

          <h2>8. Accuracy and availability</h2>
          <p>
            We aim to keep the website useful and current, but do not warrant that
            every page will always be uninterrupted, error-free, or suitable for a
            specific decision. Verify important commercial, technical, legal, or
            career information directly before acting on it.
          </p>

          <h2>9. Liability</h2>
          <p>
            To the extent permitted by applicable law, DevSectors is not liable
            for indirect loss arising solely from use of, or inability to use,
            this public website. Nothing in these terms excludes responsibility
            that cannot lawfully be excluded.
          </p>

          <h2>10. Privacy and changes</h2>
          <p>
            Information submitted through the website is addressed in the{" "}
            <Link href="/privacy">privacy policy</Link>. These terms may be updated
            as the site or its services change; the date above identifies the
            current version.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={siteConfig.contact.emailHref}>{siteConfig.contact.email}</a>.
          </p>
        </article>
      </section>
    </main>
  );
}
