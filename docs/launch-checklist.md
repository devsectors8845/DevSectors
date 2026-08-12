# DevSectors production launch checklist

## Owner verification

- [ ] Confirm `devsectors@gmail.com` is the preferred public inbox.
- [ ] Confirm `+92 344 4625292` is the preferred public phone/WhatsApp number.
- [ ] Confirm “Housing Society, Bahawalpur, Pakistan” is accurate and specific
      enough for the business.
- [ ] Confirm the public two-business-day enquiry response target can be staffed,
      or update the contact-page and confirmation-message wording.
- [ ] Confirm every advertised capability is actively offered.
- [ ] Confirm course and internship availability before announcing dates, fees,
      applications, or placement outcomes.
- [ ] Publish real people, client names, testimonials, and outcome metrics only
      with evidence and permission.

## Enquiry delivery

- [ ] Configure a verified sender and `RESEND_API_KEY`, or replace local storage
      with a durable production database.
- [ ] Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`
      together; confirm none of them use the `NEXT_PUBLIC_` prefix.
- [ ] If file storage is intentionally used, deploy one Node instance with a
      persistent backed-up volume and verify the file remains mode `0600`.
- [ ] Send valid, invalid, honeypot, and repeated submissions in staging.
- [ ] Confirm the recipient can reply directly to the enquirer.
- [ ] Establish an enquiry retention and deletion routine.
- [ ] Restrict access to stored enquiry files and production environment values.
- [ ] Add platform-level rate limiting and alerting; the in-process limiter is a
      bounded first layer, not a shared control across serverless instances.

## Domain and search

- [ ] Point `devsectors.site` to the production Next.js deployment.
- [ ] Enforce HTTPS and a single canonical host.
- [ ] Before adding `includeSubDomains` or `preload` to HSTS, confirm every
      current and future subdomain is HTTPS-only and review the preload impact.
- [ ] Verify `/robots.txt`, `/sitemap.xml`, and a made-up URL returning HTTP 404.
- [ ] Submit the sitemap in Google Search Console and inspect representative URLs.
- [ ] Confirm redirects from `/portfolio`, `/blog`, `/blogs/*`, `/team`,
      `/pricing`, `/careers`, `/privacy-policy`, and `/terms-of-service`.
- [ ] Add real analytics only with an appropriate consent/privacy decision.

## Quality

- [ ] Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- [ ] Test at 320, 640, 768, 1024, 1280, and 1440 pixels.
- [ ] Complete every primary journey using only a keyboard.
- [ ] Test at 200% zoom and with reduced motion enabled.
- [ ] Run Lighthouse or equivalent checks for accessibility and Core Web Vitals.
- [ ] Check forms and navigation in current Chrome, Safari, Firefox, and Edge.
