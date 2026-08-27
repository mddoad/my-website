# Changelog

A dated, time-stamped log of every change to the project. Entries are
appended in reverse chronological order (newest first). Each entry lists
what changed, the reason, and links to any related roadmap step.

Format:

```
## YYYY-MM-DD HH:MM — short title
- What changed
- Why
- Roadmap: ROADMAP.md#step
```

---

## 2026-08-27 — Project reset and documentation set

**Time:** 14:50 (local)

**Context:** The previous Phase 1 work (layout, primitives, content,
SEO basics) was structurally fine but had drifted — parts of it were
incomplete, the home page was a stub, and the documentation lived only
in scattered comments. We decided to start over and build it like a
professional project: small phases, tracked steps, dated log.

**What changed:**
- Wiped the working tree to the `create-next-app` baseline:
  - Removed `components/`, `content/`, `lib/`
  - Removed `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts`
  - Reverted `app/globals.css`, `app/layout.tsx`, `app/page.tsx`,
    `next.config.ts` to HEAD
  - Left `package.json`, `tsconfig.json`, `eslint.config.mjs`,
    `postcss.config.mjs`, `public/`, `node_modules/`, `.next/` untouched
  - Left `AGENTS.md` and `CLAUDE.md` untouched
- Created the documentation set under `docs/`:
  - `OVERVIEW.md` — what the project is and why it exists
  - `FEATURES.md` — the complete feature list with status checkboxes
  - `ROADMAP.md` — phased build plan, each step with sub-tasks
  - `CHANGELOG.md` — this file

**Why:** A documented reset point makes the next phase of work
recoverable. Every change from here on will be logged here, and every
roadmap step will be ticked when verified.

**Roadmap:** [`ROADMAP.md` — Step 1.1, 1.2](./ROADMAP.md)

**Committed:** `fcc83fc — Phase 0: reset working tree and add documentation set`

---

## 2026-08-27 — Phase 1: foundation

**Time:** 15:10 (local)

**Context:** After the reset, the next block of work is everything required
to render a complete (but content-empty) home page with the brand chrome in
place. This is the smallest runnable site: tokens, primitives, layout
components, SEO basics, and a placeholder home page.

**What changed:**

- **`app/globals.css`** — replaced the create-next-app default with the
  design-token system (`@theme` block for Tailwind v4):
  - `ink-*` (industrial blue, 10 steps)
  - `steel-*` (neutral, 10 steps)
  - `accent-*` (single warm accent, 7 steps)
  - Surface tokens (`paper`, `surface`, `surface-inverted`)
  - Font tokens (`--font-serif` → display, `--font-sans` → body)
  - Radii (`sm` 4px, `md` 8px, `lg` 16px) and shadows (`card`, `raised`)
  - Base layer: body, headings, `::selection`, `:focus-visible` ring,
    `prefers-reduced-motion` honored
- **`lib/site.ts`** — single source of truth for the brand. Brand, tagline,
  description, URL, contact (email, phone, address), social links, primary
  nav (7 routes), 5 certifications, `established: 1972`. `as const` so the
  `Site` type is narrow.
- **`lib/utils.ts`** — `cn(...)` class-name combiner (zero-dependency).
- **`lib/seo.ts`** — `buildMetadata(overrides)` helper. Sets title template,
  description, `metadataBase`, OG, Twitter, robots, and lets per-page routes
  spread overrides.
- **`components/ui/`** — six primitives:
  - `Container` (`prose` / `wide` / `full` sizes)
  - `Section` (3 tones, 3 padding sizes, polymorphic `as`)
  - `Heading` (h1–h4, optional eyebrow, optional center alignment)
  - `Button` (3 variants × 3 sizes, polymorphic: renders as `<a>`,
    `<Link>`, or `<button>` with the same API; detects external links)
  - `Card` (content surface, optional `interactive` state)
  - `Badge` (small label, 3 tones)
- **`components/layout/`** — site chrome:
  - `SkipLink` (keyboard skip to `#main`)
  - `Header` (sticky, brand mark, 7-item primary nav, "Request a quote"
    CTA, hamburger on `<lg`)
  - `MobileNav` (client component, hamburger toggles a top-anchored sheet)
  - `Footer` (4-column, address, phone/email, legal line with year)
- **`components/seo/JsonLd.tsx`** — `organizationJsonLd()` (with address +
  sameAs), `breadcrumbJsonLd(items)`, and a `JsonLd` component that
  serializes one or more payloads.
- **`app/layout.tsx`** — replaced the create-next-app default with the
  real root layout: Inter (body) + Source Serif 4 (display) via
  `next/font/google`, default `metadata` (title template, OG, robots,
  metadataBase), `organizationJsonLd()` injected, `<SkipLink />` /
  `<Header />` / `<main id="main">` / `<Footer />` wired.
- **`app/page.tsx`** — replaced the create-next-app welcome screen with a
  Phase 1 home stub explaining that the marketing site lands in Phase 2.

**Verification:** Dev server boots in 541 ms (Turbopack, Next.js 16.3.2).
`GET /` returns 200 and the rendered HTML contains:

- `<html lang="en">` with both font CSS variables attached
- `<title>` and `<meta name="description">` from root metadata
- `<a>Skip to main content</a>` and `<main id="main">` (skip-link target
  valid)
- The seven primary nav routes under `<nav aria-label="Primary">`
- "Request a quote" appears twice (desktop + mobile trigger)
- `<button aria-label="Open menu">` for the mobile sheet
- Footer with `1200 Industrial Way`, phone/email, and the
  `AS9100D · ISO 9001:2015 · ITAR Registered` legal line
- `<script type="application/ld+json">` containing `"@type":"Organization"`
- No errors or warnings in the dev log

**Roadmap:** [`ROADMAP.md` — Phase 1, Steps 1.3–1.11](./ROADMAP.md)

**Committed:** `0e9e618 — Phase 1: foundation`

---

## 2026-08-27 — Phase 2: home page

**Time:** 15:50 (local)

**Context:** The home page is the route every visitor lands on first. Phase
2 composes the full marketing surface — hero, trust bar, value props,
capabilities preview, featured case study, process, stats, testimonials,
final CTA — from data authored in `content/*.ts` and small Server
Components under `components/sections/`.

**What changed:**

- **`content/stats.ts`** — 4 KPIs (50+ years, 180k sq ft, 2,400 active
  part numbers, 99.2% on-time delivery) + 4 process steps (Discover →
  Engineer → Produce → Deliver).
- **`content/services.ts`** — 6 services: precision machining, sheet metal
  fabrication, mechanical assembly, design & engineering, finishing &
  surface treatment, quality & metrology. Each has `slug`, `name`,
  `short`, `description`, `capabilities[]`.
- **`content/industries.ts`** — 4 industries: aerospace & defense,
  automotive & mobility, energy & industrial, medical & life sciences.
  Each has `slug`, `name`, `short`, `description`, `outcomes[]`.
- **`content/case-studies.ts`** — 3 case studies (aerospace actuator
  housing, EV battery enclosure, wind turbine hub casting conversion).
  Each has `slug`, `title`, `client`, `industry`, `year`, `summary`,
  `challenge`, `approach`, `result`, `metrics[]`, `image` (Unsplash).
- **`content/team.ts`** — 4 leadership entries (CEO, VP Engineering, VP
  Operations, Director of Quality) with `initials` for avatar fallback.
- **`content/testimonials.ts`** — 3 quotes from named-role authors at
  different OEM customer types.
- **`components/sections/Hero.tsx`** — split layout. Left: eyebrow badge
  (1972), H1, sub, dual CTA (Request a quote / See our work), a 3-stat
  inline dl. Right: a "Capabilities" card listing the 5 capability lines
  with a footer link to `/products`. Decorative CSS grid backdrop with a
  fade-out mask.
- **`components/sections/TrustBar.tsx`** — muted band with the 5
  certifications from `site.certifications`. Border-divided columns,
  `aria-label="Certifications"` on the section.
- **`components/sections/ValueProps.tsx`** — 12-col grid. Left: heading
  with "Why Meridian" eyebrow. Right: 3 top-bordered props (Engineering
  before tooling / Quality built in / Capacity that scales).
- **`components/sections/CapabilitiesPreview.tsx`** — heading row with
  "All capabilities →" link. 3-col grid of `Card` components showing the
  6 services with 3 capability bullets and a detail link.
- **`components/sections/FeaturedCaseStudy.tsx`** — 2-col layout. Image
  (Unsplash via `next/image` with responsive `sizes`) on the left,
  badge + title + summary + 3-metric `dl` + dual CTA on the right.
  Shows `caseStudies[0]` (the aerospace actuator program).
- **`components/sections/Process.tsx`** — inverted (ink-900) background.
  Centered heading, then a 4-step `ol` with the giant step number in
  accent color, title in paper, body in steel-300.
- **`components/sections/Stats.tsx`** — paper band with a 4-col `dl` of
  the KPIs from `content/stats.ts`.
- **`components/sections/Testimonials.tsx`** — 3-col `Card` grid of
  quotes with `role` / `company` in a top-bordered figcaption.
- **`components/sections/FinalCta.tsx`** — inverted background, centered
  prose-width block: "Tell us about your program" heading, supporting
  copy, primary CTA, secondary "About Meridian" link.
- **`app/page.tsx`** — now composes all 9 sections in order. No client
  state.
- **`next.config.ts`** — added `images.remotePatterns` for
  `images.unsplash.com` so `next/image` can proxy the case-study
  imagery.

**Verification:** Dev server boots in 472 ms (Turbopack). `GET /`
returns 200, 95 KB of rendered HTML, and 50/50 content checks pass on
the page (every section, every CTA, every key data point). The
optimized Unsplash image resolves through `/_next/image` with a 200
(142 KB JPEG). `npm run build` completes cleanly: TypeScript passes,
both routes (`/`, `/_not-found`) prerender as static.

**Roadmap:** [`ROADMAP.md` — Phase 2, Steps 2.1–2.10](./ROADMAP.md)

**Committed:** `d697d77 — Phase 2: home page`
