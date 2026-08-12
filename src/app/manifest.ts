import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevSectors",
    short_name: "DevSectors",
    description:
      "Thoughtful custom software, digital products, automation, and cloud delivery.",
    start_url: "/",
    display: "standalone",
    background_color: "#FCFCF8",
    theme_color: "#0B1220",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
