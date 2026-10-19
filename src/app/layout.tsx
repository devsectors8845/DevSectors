import type { Metadata } from "next";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/site";
import { withSocialImage } from "@/lib/metadata";

import "./globals.css";

const { identity, contact } = siteConfig;

export const metadata: Metadata = withSocialImage({
  metadataBase: new URL(identity.url),
  title: identity.seoTitle,
  description: identity.seoDescription,
  applicationName: identity.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: identity.name,
    title: identity.seoTitle,
    description: identity.seoDescription,
    locale: identity.locale.replace("-", "_"),
  },
  twitter: {
    card: "summary_large_image",
    title: identity.seoTitle,
    description: identity.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
  themeColor: "#00151C",
  colorScheme: "dark",
});

const organizationId = `${identity.url}/#organization`;

const globalStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: identity.name,
    url: identity.url,
    logo: `${identity.url}/favicon.svg`,
    description: identity.positioning,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.line1,
      addressLocality: contact.address.city,
      addressCountry: contact.address.country,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${identity.url}/#website`,
    url: identity.url,
    name: identity.name,
    description: identity.seoDescription,
    inLanguage: identity.locale,
    publisher: {
      "@id": organizationId,
    },
  },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={identity.locale}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:not-sr-only focus:rounded-full focus:bg-signal focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-[#062833] focus:shadow-xl"
        >
          Skip to main content
        </a>
        <JsonLd data={globalStructuredData} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
