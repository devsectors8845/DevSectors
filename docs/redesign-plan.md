# DevSectors Redesign Plan — Devappics-Inspired Dark Theme

## Status: Implemented

All sections below are complete. Verified with `npm run lint`, `npm run typecheck`, `npm run build`,
and `node scripts/browser-smoke.mjs` (0 failures) against a production build on port 3100.

## Goal
Redesign DevSectors (Next.js 16 App Router site) to mirror devappics.com: dark, modern, black+green palette with gradient feel, section-first layout, conversion-focused MVP/agency messaging. Keep existing content/data model in `src/data/site.ts` and routes, but replace visual system and page composition.

## Source Reference
- https://devappics.com/ — MVP development for founders, 6–8 weeks, dark theme, green accent, gradient overlays, founder-direct, weekly demos, fixed pricing.
- `/home/workspace/Downloads/DevSectors_Homepage_Exact_Redesign_KiloCode.md` — authoritative page/section spec.
- `/home/workspace/Downloads/DevSectors Complete_Page_By_Page_Visual_Design_Guide.md` — visual direction.

## Design System (implemented)
- Background: `#00151C` (canvas), deep `#000F15`, surface `#062833`, surface-2 `#082F3B`, surface-3 `#0B3845`.
- White: `#F3F7FA`; secondary text `#A9BEC6`; muted `#6F8D97`.
- Lime `#8EEB4D`, Cyan `#19D7C5`, Blue `#00AEEF`.
- Gradient: `linear-gradient(135deg,#8EEB4D 0%,#19D7C5 48%,#00AEEF 100%)` exposed as `--ds-gradient`
  with `.ds-gradient-text` (background-clip: text) and `.ds-gradient-bg` utilities.
- Max width 1200px, Inter/Manrope system sans, mono for labels.
- Motion: 180–350ms opacity/translate/border-glow only, `prefers-reduced-motion` respected.

### Token mapping
`src/app/globals.css` `@theme` remap: `ink` → `#E8F0F3`, `ink-soft` → `#F3F7FA`, `paper` → `#031E27`,
`canvas` → `#00151C`, `surface` → `#062833`, `surface-2` → `#082F3B`, `surface-3` → `#0B3845`,
`mineral` → `#00AEEF`, `signal` → `#8EEB4D`, `coral` → `#19D7C5`, `line` → `#0A5B70`.
Buttons: `.button-primary` = gradient, `.button-dark` = canvas, `.button-outline` = line border,
`.button-outline-light` = translucent white border.

## Pages (map current → new)

### Glass system (implemented)
- `.glass-card` — frosted surface: 158° gradient (cyan 12% → deep surface 66% → blue 10%), 1px cyan-tinted
  border, `backdrop-filter: blur(20px) saturate(150%)`, layered shadow, hover lift + cyan glow.
- `.glass-panel` — larger frosted container: dual radial glows (lime/blue) over a deep gradient,
  `backdrop-filter: blur(26px) saturate(150%)`.
- `.glass-inset` — nested frosted surface for summary tiles and chips.
- `.gradient-border` — gradient hairline border driven by `data-selected="true"` or `:hover`, drawn
  with a masked `::after` pseudo-element so it follows any border radius.
- Note: never hand-write `-webkit-backdrop-filter` alongside `backdrop-filter` — Lightning CSS dedupes
  the alias and drops the standard property, silently disabling the blur.

### Home `/` — 13 sections
1. Navbar — floating centered pill: sticky header with page padding, inner `max-w-[1200px]` container
   with `rounded-[1.5rem]`, `border-line`, `bg-canvas/85` + backdrop blur. Grid `1fr auto 1fr` so
   the logo sits left, the link list is viewport-centred, and the gradient pill CTA sits right.
   Dropdown menus open below the pill; the CTA is `xl`+ only and the mobile sheet matches the pill.
2. Hero — "Software that keeps real work moving." with gradient headline, `HeroMockup` dashboard
   (delivery board, On track / Scope Aligned / Build Sprint 03, quality review, release queued,
   build velocity chart, mobile release card). No stock photography.
3. Trust principles — Clarity before code / Reviewable increments / Maintainable handover (no invented stats).
4. Outcome — "Move from scattered requirements to one useful outcome." (Define the decision /
   Deliver a complete path / Prepare for ownership) as stacked workflow cards.
5. Services — six cards, 3x2 desktop, 1 column mobile.
6. Delivery process — cyan/blue gradient panel with technical grid, four stages.
7. Representative work — anonymized scenario cards with disclosure banner.
8. Industries — six sectors.
9. Insights — lighter editorial cards (`#F3F7FA`) for contrast.
10. Project planner — light cool-gray section (`#E8EDF0`) with large white card, logic preserved.
11. FAQ — `FaqAccordion` with `aria-expanded` / `aria-controls` / `aria-hidden`, Escape-to-close, first item open on home.
12. Final CTA — gradient panel, "Start a conversation" + "View our capabilities".
13. Footer — "Plan clearly. Design intentionally. Build reliably. Keep improving." with gradient hairline.

### Inner pages
`/services`, `/industries`, `/work`, `/insights`, `/talent`, `/courses`, `/engagement`, `/about`,
`/contact`, `/faq`, `/internship`, `/privacy`, `/terms` and all `[slug]` routes restyled to the same
dark system via `PageHero` themes, card components, dark form inputs (`#031E27`, cyan focus), and
dark prose. Routes, content, forms, planner logic, filter logic and SEO are unchanged.

## New / changed components
- `src/components/hero-mockup.tsx` (new) — pure CSS/SVG dark dashboard mockup.
- `src/components/faq-accordion.tsx` (new) — controlled accessible accordion; `faq-list.tsx` delegates to it.
- `src/components/site-logo.tsx` — gradient SVG mark, gradient wordmark.
- `src/components/section-heading.tsx`, `page-hero.tsx`, `cta-band.tsx`, `button-link.tsx` — dark variants.
- `src/components/nav-menu.tsx`, `site-header.tsx`, `site-footer.tsx` — dark nav, dropdowns, mobile menu.
- `src/app/page.tsx` — rebuilt homepage (13 sections).
- `public/favicon.svg` — gradient brand mark; `layout.tsx` — `themeColor: "#00151C"`, `colorScheme: "dark"`.

## Content Adjustments
- Homepage hero, headings, and CTA copy follow the redesign guide verbatim; existing `site.ts` data
  (services, industries, work, insights, FAQs) is unchanged so no content or disclosure is invented.
- Footer statement replaced with the guide's four-part statement; contact details and nav links kept.

## Implementation Steps
1. ✅ Update `globals.css`: dark base, CSS variables, gradient utilities, dark buttons/cards.
2. ✅ Tailwind v4 `@theme` token remap.
3. ✅ Restyle primitives: button-link, section-heading, page-hero, site-header/footer, nav-menu.
4. ✅ Rebuild home page sections in new composition + `HeroMockup`.
5. ✅ Restyle all route pages + components (cards, filters, forms, planner).
6. ✅ Update metadata (theme-color dark, color-scheme) and favicon.
7. ✅ Accessible accordion (aria-expanded/controls, Escape, keyboard focus), reduced motion.
8. ✅ `npm run lint`, `npm run typecheck`, `npm run build` all pass.
9. ✅ `scripts/browser-smoke.mjs` passes with zero failures on a production build.

## Acceptance Criteria — met
- Dark theme throughout, black/teal base with lime-cyan-blue gradient feel.
- All 20 routes return 200; data-driven content preserved.
- Lint & typecheck pass; build succeeds; no hydration or console errors.
- Responsive verified at 1440/1280/1024/768/640/390/375px — no horizontal overflow.
- Contact form, project planner, insight search and work filter all verified functional.
- SEO metadata, sitemap, and structured data unchanged.

## Risks — none outstanding
- Data contracts were kept stable; only presentation changed.
- No client names, statistics, or performance metrics were invented.

