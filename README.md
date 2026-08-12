# DevSectors website

An original, server-rendered DevSectors website built with Next.js App Router,
React, TypeScript, Tailwind CSS, and a small number of focused client-side
interactions.

## What is included

- Original “Structured Momentum” visual system (navy, mineral blue, signal lime)
- Responsive global navigation and mobile menu
- Data-driven service, industry, work, insight, course, and talent detail routes
- Truthful representative-work disclosures instead of invented client results
- Interactive project-fit planner
- Real server-side project enquiry endpoint with validation, bounded request-body
  handling, honeypot protection, accessible pending/error/success states, and
  basic per-instance rate limiting
- Local durable-file storage for a traditional Node host, with optional Resend
  email delivery through environment variables
- Unique page metadata, canonical URLs, Open Graph/Twitter data, JSON-LD,
  `robots.txt`, `sitemap.xml`, web manifest, redirects, and a real HTTP 404 page
- Privacy policy, website terms, engagement models, FAQ, learning, internship,
  and talent-network pages
- Security headers, reduced-motion support, visible focus states, and semantic
  HTML

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Contact form delivery

With no email-delivery environment variables, valid enquiries are appended to
`.data/inquiries.ndjson`. That fallback keeps the form functional during local
development and can be used on a single Node.js instance with a persistent,
backed-up volume. It is not suitable for ephemeral, read-only, or horizontally
scaled hosting.

For production email delivery, copy `.env.example` to `.env.local` and configure:

```dotenv
RESEND_API_KEY=
CONTACT_TO_EMAIL=devsectors@gmail.com
CONTACT_FROM_EMAIL=DevSectors Website <website@your-verified-domain.com>
```

The `CONTACT_FROM_EMAIL` domain must be verified with the configured provider.
Configure all three email values together; partial configuration is treated as a
delivery error rather than silently falling back to disk. On ephemeral/serverless
or multi-instance hosting, configure email delivery or replace the local file
fallback with a durable database such as Firestore or Postgres.

The built-in limiter is deliberately small and per process. For a public launch,
also configure platform-level request throttling and monitor form abuse; add a
privacy-appropriate challenge only if actual spam volume requires it.

This application needs a Next.js-compatible Node.js or serverless runtime for the
contact endpoint. A static export alone cannot process enquiries.

## Content management

Public content is centralized in [`src/data/site.ts`](src/data/site.ts). Adding a
service, industry, article, course, or representative engagement there creates
the corresponding static detail route and sitemap entry automatically.

The current work examples are intentionally marked as representative scenarios.
Replace them with approved case studies only when the client, claims, metrics,
assets, and publication permission can be verified.

## Before production launch

Review [`docs/launch-checklist.md`](docs/launch-checklist.md), especially the
contact identity, email delivery, hosting persistence, Search Console, and
case-study evidence checks.
