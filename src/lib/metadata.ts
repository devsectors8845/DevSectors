import type { Metadata } from "next";

export const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "DevSectors — thoughtful software for real-world operations",
} as const;

const twitterImage = {
  url: socialImage.url,
  alt: socialImage.alt,
} as const;

/**
 * Add the shared DevSectors social image without replacing route-specific
 * Open Graph or X/Twitter metadata. Next.js shallowly merges nested metadata
 * objects, so every route that defines either object must include the image.
 */
export function withSocialImage(metadata: Metadata): Metadata {
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [socialImage],
    },
    twitter: {
      ...metadata.twitter,
      card: "summary_large_image",
      images: [twitterImage],
    },
  };
}
