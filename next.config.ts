import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Keep builds compatible with restricted hosts where spawning the tsc CLI
    // is unavailable. The same project-local TypeScript compiler API is used.
    useTypeScriptCli: false
  },
  async headers() {
    const isDevelopment = process.env.NODE_ENV === "development";
    const contentSecurityPolicy = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(isDevelopment ? [] : ["upgrade-insecure-requests"])
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()"
          },
          {
            key: "Strict-Transport-Security",
            // Do not opt every subdomain into HSTS or advertise preload until the
            // owner has verified that the entire domain estate is HTTPS-only.
            value: "max-age=31536000"
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blogs", destination: "/insights", permanent: true },
      {
        source: "/blogs/:slug",
        destination: "/insights/:slug",
        permanent: true
      },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/pricing", destination: "/engagement", permanent: true },
      { source: "/careers", destination: "/talent", permanent: true },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
