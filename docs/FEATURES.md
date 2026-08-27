# Features

The complete feature set for the Meridian Manufacturing site. Each feature
has a status that maps to a step in [`ROADMAP.md`](./ROADMAP.md).

Legend: `[ ]` not started · `[~]` in progress · `[x]` shipped

---

## 1. Site foundation

- [ ] **App router shell** — `app/layout.tsx` with html/body, font wiring,
      global metadata, JSON-LD org block
- [ ] **Design tokens** — `ink-*`, `steel-*`, `accent-*` palettes, radii,
      shadows, font tokens in `globals.css`
- [ ] **Typography** — Inter (body) + Source Serif 4 (display) via
      `next/font/google`, with system fallbacks
- [ ] **Reduced-motion + focus-visible** — accessibility baseline

## 2. Layout primitives

- [ ] `Container` — `prose` / `wide` / `full` sizes, consistent horizontal
      padding
- [ ] `Section` — `default` / `inverted` / `muted` tones, `sm` / `md` / `lg`
      vertical padding
- [ ] `Heading` — levels 1–4, optional eyebrow, optional center alignment
- [ ] `Button` — 3 variants × 3 sizes, renders as `<a>` / `<Link>` / `<button>`
      with the same API
- [ ] `Card` — content surface, optional `interactive` state
- [ ] `Badge` — small label, 3 tones

## 3. Site chrome

- [ ] `Header` — sticky, primary nav, brand mark, "Request a quote" CTA,
      mobile hamburger
- [ ] `MobileNav` — full-screen mobile menu, focus management, close on
      link click
- [ ] `Footer` — 4-column site map, address block, contact, legal line
- [ ] `SkipLink` — keyboard skip-to-main

## 4. SEO

- [ ] Site-wide `metadata` in root layout (title template, OG, Twitter,
      robots, `metadataBase`)
- [ ] `buildMetadata` helper for per-page overrides
- [ ] `JsonLd` component — `organizationJsonLd`, `breadcrumbJsonLd`
- [ ] `app/robots.ts`
- [ ] `app/sitemap.ts` (static + content-derived routes)
- [ ] `app/opengraph-image.tsx` for default OG card
- [ ] `app/icon.tsx` (replace stock favicon with brand mark)

## 5. Content model

- [ ] `content/services.ts` — capabilities with slugs
- [ ] `content/industries.ts` — verticals with slugs
- [ ] `content/case-studies.ts` — case studies with metrics
- [ ] `content/stats.ts` — at-a-glance numbers + process steps
- [ ] `content/team.ts` — leadership
- [ ] `content/testimonials.ts` — quotes
- [ ] `content/site.ts` — single source of truth for brand, nav, contact

## 6. Home page sections

- [ ] **Hero** — headline, subhead, dual CTA, supporting image / pattern
- [ ] **Trust bar** — certification logos / labels (AS9100, ISO 9001, ITAR,
      ISO 14001, OSHA VPP)
- [ ] **Value props** — 3–4 differentiators with icon + headline + body
- [ ] **Capabilities preview** — 3–6 services with "see all" link
- [ ] **Featured case study** — single high-impact story with metrics
- [ ] **Process** — 4 numbered steps (Discover / Engineer / Produce /
      Deliver)
- [ ] **Stats** — 4 KPIs from `content/stats.ts`
- [ ] **Testimonials** — 2–3 quotes
- [ ] **Final CTA** — quote / contact push before footer

## 7. Routes

- [ ] `/` — home (composes the sections above)
- [ ] `/about` — company history, leadership grid, certifications, facility
- [ ] `/products` — capabilities index
- [ ] `/products/[slug]` — service detail (6 routes)
- [ ] `/industries` — verticals index
- [ ] `/industries/[slug]` — industry detail (4 routes)
- [ ] `/case-studies` — work index
- [ ] `/case-studies/[slug]` — case study detail (3 routes)
- [ ] `/process` — long-form process page
- [ ] `/testimonials` — full testimonials list
- [ ] `/team` — leadership grid
- [ ] `/resources` — placeholder for insights / articles
- [ ] `/contact` — contact form, address, phone, email
- [ ] `app/not-found.tsx` — 404

## 8. Per-page metadata

- [ ] Each static route exports `generateMetadata`
- [ ] Each dynamic route exports `generateMetadata` and `generateStaticParams`
- [ ] Breadcrumb JSON-LD on detail pages

## 9. Imagery

- [ ] `next.config.ts` whitelists remote image hosts (`images.unsplash.com`)
- [ ] Case study hero images via `next/image` (or local if replaced later)
- [ ] Consistent `sizes` attribute for responsive loading

## 10. Accessibility

- [ ] All interactive elements reachable by keyboard
- [ ] Visible `:focus-visible` ring
- [ ] `aria-label` on icon-only buttons
- [ ] `prefers-reduced-motion` honored globally
- [ ] Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`)
- [ ] Color contrast meets WCAG AA on all text tokens

## 11. Performance

- [ ] Static rendering for all marketing routes
- [ ] No client components in the layout chrome (mobile nav is the
      exception)
- [ ] Fonts loaded via `next/font` (no FOUT)
- [ ] No render-blocking third-party scripts

## 12. Documentation

- [x] `docs/OVERVIEW.md` — what and why
- [x] `docs/FEATURES.md` — feature list (this file)
- [x] `docs/ROADMAP.md` — step-by-step build plan with checkboxes
- [x] `docs/CHANGELOG.md` — dated log of every change
