# Features

The complete feature set for the Meridian Manufacturing site. Each feature
has a status that maps to a step in [`ROADMAP.md`](./ROADMAP.md).

Legend: `[ ]` not started · `[~]` in progress · `[x]` shipped

---

## 1. Site foundation

- [x] **App router shell** — `app/layout.tsx` with html/body, font wiring,
      global metadata, JSON-LD org block
- [x] **Design tokens** — `ink-*`, `steel-*`, `accent-*` palettes, radii,
      shadows, font tokens in `globals.css`
- [x] **Typography** — Inter (body) + Source Serif 4 (display) via
      `next/font/google`, with system fallbacks
- [x] **Reduced-motion + focus-visible** — accessibility baseline

## 2. Layout primitives

- [x] `Container` — `prose` / `wide` / `full` sizes, consistent horizontal
      padding
- [x] `Section` — `default` / `inverted` / `muted` tones, `sm` / `md` / `lg`
      vertical padding
- [x] `Heading` — levels 1–4, optional eyebrow, optional center alignment
- [x] `Button` — 3 variants × 3 sizes, renders as `<a>` / `<Link>` / `<button>`
      with the same API
- [x] `Card` — content surface, optional `interactive` state
- [x] `Badge` — small label, 3 tones

## 3. Site chrome

- [x] `Header` — sticky, primary nav, brand mark, "Request a quote" CTA,
      mobile hamburger
- [x] `MobileNav` — full-screen mobile menu, focus management, close on
      link click
- [x] `Footer` — 4-column site map, address block, contact, legal line
- [x] `SkipLink` — keyboard skip-to-main

## 4. SEO

- [x] Site-wide `metadata` in root layout (title template, OG, Twitter,
      robots, `metadataBase`)
- [x] `buildMetadata` helper for per-page overrides
- [x] `JsonLd` component — `organizationJsonLd`, `breadcrumbJsonLd`
- [ ] `app/robots.ts`
- [ ] `app/sitemap.ts` (static + content-derived routes)
- [ ] `app/opengraph-image.tsx` for default OG card
- [ ] `app/icon.tsx` (replace stock favicon with brand mark)

## 5. Content model

- [x] `content/services.ts` — capabilities with slugs
- [x] `content/industries.ts` — verticals with slugs
- [x] `content/case-studies.ts` — case studies with metrics
- [x] `content/stats.ts` — at-a-glance numbers + process steps
- [x] `content/team.ts` — leadership
- [x] `content/testimonials.ts` — quotes
- [x] `content/site.ts` — single source of truth for brand, nav, contact

## 6. Home page sections

- [x] **Hero** — headline, subhead, dual CTA, supporting image / pattern
- [x] **Trust bar** — certification logos / labels (AS9100, ISO 9001, ITAR,
      ISO 14001, OSHA VPP)
- [x] **Value props** — 3–4 differentiators with icon + headline + body
- [x] **Capabilities preview** — 3–6 services with "see all" link
- [x] **Featured case study** — single high-impact story with metrics
- [x] **Process** — 4 numbered steps (Discover / Engineer / Produce /
      Deliver)
- [x] **Stats** — 4 KPIs from `content/stats.ts`
- [x] **Testimonials** — 2–3 quotes
- [x] **Final CTA** — quote / contact push before footer

## 7. Routes

- [x] `/` — home (composes the sections above)
- [x] `/about` — company history, leadership grid, certifications, facility
- [x] `/products` — capabilities index
- [x] `/products/[slug]` — service detail (6 routes)
- [x] `/industries` — verticals index
- [x] `/industries/[slug]` — industry detail (4 routes)
- [x] `/case-studies` — work index
- [x] `/case-studies/[slug]` — case study detail (3 routes)
- [x] `/process` — long-form process page
- [x] `/testimonials` — full testimonials list
- [x] `/team` — leadership grid
- [x] `/resources` — placeholder for insights / articles
- [x] `/contact` — contact form, address, phone, email
- [x] `app/not-found.tsx` — 404

## 8. Per-page metadata

- [x] Each static route exports `generateMetadata`
- [x] Each dynamic route exports `generateMetadata` and `generateStaticParams`
- [x] Breadcrumb JSON-LD on detail pages

## 9. Imagery

- [x] `next.config.ts` whitelists remote image hosts (`images.unsplash.com`)
- [x] Case study hero images via `next/image` (or local if replaced later)
- [x] Consistent `sizes` attribute for responsive loading

## 10. Accessibility

- [x] All interactive elements reachable by keyboard
- [x] Visible `:focus-visible` ring
- [x] `aria-label` on icon-only buttons
- [x] `prefers-reduced-motion` honored globally
- [x] Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`)
- [ ] Color contrast meets WCAG AA on all text tokens

## 11. Performance

- [x] Static rendering for all marketing routes
- [x] No client components in the layout chrome (mobile nav is the
      exception)
- [x] Fonts loaded via `next/font` (no FOUT)
- [x] No render-blocking third-party scripts

## 12. Documentation

- [x] `docs/OVERVIEW.md` — what and why
- [x] `docs/FEATURES.md` — feature list (this file)
- [x] `docs/ROADMAP.md` — step-by-step build plan with checkboxes
- [x] `docs/CHANGELOG.md` — dated log of every change
