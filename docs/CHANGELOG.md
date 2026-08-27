# Changelog

A dated, time-stamped log of every meaningful change to the project.
Entries are appended in reverse chronological order (newest first).

---

## Current status

- **Latest commit:** `289a92c` — Phase 4: SEO + assets
- **Date:** 2026-08-27
- **What's live:** The full marketing site (Phases 1–3) plus the SEO
  and asset layer (Phase 4): `/robots.txt`, `/sitemap.xml` (23 URLs),
  a default Open Graph image, and a generated brand favicon. Home page
  `<head>` references the new assets. All 25 marketing routes
  prerender static, plus 4 metadata routes (`/icon`,
  `/opengraph-image`, `/robots.txt`, `/sitemap.xml`).
- **What's next:** Phase 5 — accessibility audit, mobile audit,
  Lighthouse pass, and replacing the placeholder brand contact info.

> **Note on history (2026-08-27):** During Phase 3 work the local
> `.git/objects` store had four zero-byte loose-object files that
> briefly made `git status` and other commands fail. The reflog
> confirmed the underlying commits were intact in the object store,
> so the history was not actually lost; the in-flight diagnostic
> above was updated post-Phase 3. All commit hashes referenced below
> remain resolvable on `main`.

See [`ROADMAP.md`](./ROADMAP.md) for the full plan and
[`FEATURES.md`](./FEATURES.md) for the complete feature list.

---

## Conventions

Every entry in this file follows the same shape so you can scan it
predictably.

**Entry template**

```
## YYYY-MM-DD HH:MM — short title
**Context:** Why this work is happening now.
**What changed:** Bullet list of files / behaviors, with intent.
**Why:** The reason this change solves the stated problem.
**Verification:** How we proved it works (dev server, build, checks).
**Roadmap:** ROADMAP.md step reference.
**Commits:** One or more short hashes with one-line summaries.
```

**Why "doc-only commit after a phase"?** Each phase lands as a single
real commit (`Phase N: <title>`). The next commit is intentionally a
`docs:` change that just records the phase commit hash in this
changelog. That keeps the changelog tied to the actual git history
even if the log entry is written *before* the hash exists — the hash
is back-filled in a tiny follow-up commit rather than amending the
real work. You can ignore `docs:` commits when reviewing behavior
changes; they only touch this file.

**Commit links** use the short hash (e.g. `9e4cb2a`). Run
`git show <hash>` for the full diff.

---

## 2026-08-27 17:00 — Phase 4: SEO + assets

**Context:** Phases 1–3 left the site complete from a content and
routes perspective, but the SEO and asset layer that wraps a real
production site — `robots.txt`, `sitemap.xml`, an Open Graph image,
and a brand favicon — was still the create-next-app default. Phase 4
adds those four pieces and removes the stale `favicon.ico` so the
generated icon is the single source of truth.

**What changed:**

- **`app/robots.ts`** — `MetadataRoute.Robots` with `Allow: /` for
  every user agent, plus `Sitemap` and `Host` directives pointing at
  `site.url` from `lib/site.ts`. Renders to `/robots.txt`.
- **`app/sitemap.ts`** — `MetadataRoute.Sitemap` enumerating 10
  static routes (home, about, team, products, industries,
  case-studies, process, testimonials, resources, contact) plus 13
  content-derived dynamic routes (6 capabilities, 4 industries, 3
  case studies). Priority and `changeFrequency` are set per route
  based on how often the underlying content changes in practice.
  Renders to `/sitemap.xml`.
- **`app/opengraph-image.tsx`** — `ImageResponse` from `next/og`.
  1200×630 PNG: industrial-blue background, "M" brand mark, full
  brand name, the tagline, the cert line, and the bare site URL.
  This is the fallback OG card; per-page OG overrides can be added
  later in route-specific `opengraph-image.tsx` files.
- **`app/icon.tsx`** — `ImageResponse`, 32×32 PNG. The "M" glyph on
  `ink-900` (the same brand mark as the header logo). Replaces the
  create-next-app default.
- **`app/favicon.ico`** removed. The static ICO would have
  shadowed the generated icon and carried an unrelated image.

**Why:** Crawlers need a `robots.txt` and `sitemap.xml` to know what
to crawl and at what cadence. Open Graph and Twitter meta tags drive
the social-card preview when a buyer pastes a Meridian URL into a
message; without an OG image, links render as grey boxes. The favicon
is a smaller fix, but the stock one looks unprofessional in the tab
and reinforces that the site is in scaffold mode.

**Verification:**

- `npm run build`: TypeScript clean, 29 routes prerender (25
  marketing + 4 metadata: `/icon`, `/opengraph-image`, `/robots.txt`,
  `/sitemap.xml`).
- `GET /robots.txt` → 200. Body: `User-Agent: *`, `Allow: /`,
  `Host: https://example.com`, `Sitemap: https://example.com/sitemap.xml`.
- `GET /sitemap.xml` → 200. 23 `<url>` entries, valid
  `sitemaps.org/schemas/sitemap/0.9` XML.
- `GET /opengraph-image` → 200, 62 KB PNG, valid signature, sized
  1200×630.
- `GET /icon` → 200, 590 B PNG, valid signature, sized 32×32.
- Home page `<head>` references both: `<link rel="icon"
  href="/icon?…" type="image/png" sizes="32x32">` and
  `<meta property="og:image" content="…/opengraph-image?…">`.
- All Phase 1–3 routes still return 200; the 404 still works.

**Roadmap:** [`ROADMAP.md` — Phase 4, Steps 4.1–4.6](./ROADMAP.md)

**Commits:**

- [`289a92c`](https://github.com/mddoad/my-website/commit/289a92c) — Phase 4: SEO + assets
- [`ae737e9`](https://github.com/mddoad/my-website/commit/ae737e9) — docs: tick Phase 4 in FEATURES and ROADMAP, add Phase 4 changelog entry

---

## 2026-08-27 16:30 — Phase 3: detail routes

**Context:** Phase 1 stood up the chrome and Phase 2 composed the home
page from data in `content/*.ts`. Phase 3 is the rest of the marketing
site — every other route a real visitor would click into, plus the
404 page and the per-page metadata + breadcrumb JSON-LD that
discoverability needs.

**What changed:**

- **9 static routes + 13 dynamic routes**:
  - `/products` + `/products/[slug]` (6 capability pages)
  - `/industries` + `/industries/[slug]` (4 industry pages)
  - `/case-studies` + `/case-studies/[slug]` (3 case study pages)
  - `/process` (long-form expansion of the 4-step process from
    `content/stats.ts`)
  - `/about` (history, stats, certifications, leadership preview) and
    `/team` (full leadership grid)
  - `/testimonials` (full quote list, beyond the 3 shown on home)
  - `/resources` (placeholder index for upcoming insights / articles)
  - `/contact` (sales contact details, facility address, hours, and a
    working request-a-quote form)
  - `app/not-found.tsx` (branded 404)
- **Contact form**: `app/contact/ContactForm.tsx` (client component
  using `useActionState`) + `app/contact/actions.ts` (server action
  validating required fields and email shape; v1 just logs the
  submission).
- **Per-page metadata**: every static route exports a `metadata`
  constant; every dynamic route exports `generateMetadata` and
  `generateStaticParams`. Title template (`%s | Meridian
  Manufacturing`) and OG defaults come from `lib/seo.ts` /
  `app/layout.tsx`.
- **Breadcrumb JSON-LD** on every detail page (Home → Section → Item)
  via the existing `breadcrumbJsonLd()` helper.

**Why:** The home page is the only route a serious buyer has been able
to land on through Phases 1 and 2. With Phase 3 every capability,
industry, and case study has its own discoverable URL with proper
metadata — the marketing site is now a full funnel, not a single
landing page.

**Verification:**

- All 24 in-app routes return 200; `/this-does-not-exist` returns
  404 with the branded not-found page.
- Page titles use the template: e.g. `Precision Machining | Meridian
  Manufacturing`.
- Breadcrumb JSON-LD on detail pages contains the expected
  `BreadcrumbList` → `ListItem` chain (Home → Capabilities →
  Precision Machining).
- `npm run build`: TypeScript clean, all 26 routes prerender static.

**Roadmap:** [`ROADMAP.md` — Phase 3, Steps 3.1–3.11](./ROADMAP.md)

**Commits:**

- [`d30624b`](https://github.com/mddoad/my-website/commit/d30624b) — Phase 3: detail routes
- [`75dc0e7`](https://github.com/mddoad/my-website/commit/75dc0e7) — docs: record Phase 3 commit hash and history note in changelog

---

## 2026-08-27 15:50 — Phase 2: home page

**Context:** The home page is the route every visitor lands on first.
Phase 2 composes the full marketing surface from data in `content/*.ts`
and small Server Components under `components/sections/`.

**What changed:**

- **6 content modules** under `content/`: `stats` (4 KPIs + 4 process
  steps), `services` (6 entries with capabilities), `industries`
  (4 entries with outcomes), `case-studies` (3 with metrics and
  Unsplash hero), `team` (4 leadership entries), `testimonials` (3
  quotes).
- **9 home sections** under `components/sections/`: `Hero`,
  `TrustBar`, `ValueProps`, `CapabilitiesPreview`,
  `FeaturedCaseStudy`, `Process`, `Stats`, `Testimonials`, `FinalCta`.
  All Server Components, no client state.
- **`app/page.tsx`** now composes the 9 sections in order.
- **`next.config.ts`** whitelists `images.unsplash.com` so `next/image`
  can proxy the case-study hero.

**Why:** The home page is the only route every first-time visitor
sees. With Phase 1's chrome already in place, Phase 2 makes the
marketing surface real — capabilities, proof, process, and a path to
contact.

**Verification:**

- Dev server: 472 ms boot, `GET /` returns 200, 95 KB rendered HTML.
- 50/50 content checks pass on the rendered page (every section,
  every CTA, every key data point).
- `/_next/image` serves the Unsplash case-study photo (200, 142 KB JPEG).
- `npm run build`: TypeScript clean, both routes (`/`, `/_not-found`)
  prerender as static.

**Roadmap:** [`ROADMAP.md` — Phase 2, Steps 2.1–2.10](./ROADMAP.md)

**Commits:**

- [`d697d77`](https://github.com/mddoad/my-website/commit/d697d77) — Phase 2: home page
- [`9cf8b60`](https://github.com/mddoad/my-website/commit/9cf8b60) — docs: record Phase 2 commit hash in changelog

---

## 2026-08-27 15:10 — Phase 1: foundation

**Context:** The smallest runnable site — design tokens, primitives,
layout chrome, SEO basics, and a placeholder home page. After Phase
1 the site looks empty but the chrome is real and verified.

**What changed:**

- **`app/globals.css`** — replaced the create-next-app default with
  the design-token system in a Tailwind v4 `@theme` block:
  `ink-*` (10-step industrial blue), `steel-*` (10-step neutral),
  `accent-*` (7-step warm accent), surface tokens, font tokens,
  radii, shadows, and a base layer (body, headings, `::selection`,
  `:focus-visible`, `prefers-reduced-motion`).
- **`lib/site.ts`** — single source of truth for the brand: name,
  tagline, description, URL, contact (email/phone/address), social
  links, primary nav (7 routes), 5 certifications, `established:
  1972`. Exported `as const` for a narrow `Site` type.
- **`lib/utils.ts`** — `cn(...)` class-name combiner (zero dependency).
- **`lib/seo.ts`** — `buildMetadata(overrides)` helper. Sets title
  template, description, `metadataBase`, OG, Twitter, robots, and
  accepts per-page overrides via spread.
- **`components/ui/`** — six primitives: `Container`
  (`prose` / `wide` / `full` sizes), `Section` (3 tones, 3 padding
  sizes, polymorphic `as`), `Heading` (h1–h4, optional eyebrow, optional
  center alignment), `Button` (3 variants × 3 sizes, polymorphic
  `<a>` / `<Link>` / `<button>`, detects external links), `Card`
  (content surface, optional `interactive` state), `Badge` (small
  label, 3 tones).
- **`components/layout/`** — site chrome: `SkipLink` (keyboard skip
  to `#main`), `Header` (sticky, brand mark, 7-item primary nav,
  "Request a quote" CTA, hamburger on `<lg`), `MobileNav` (client
  component, hamburger toggles a top-anchored sheet), `Footer`
  (4-column, address, phone/email, legal line with year).
- **`components/seo/JsonLd.tsx`** — `organizationJsonLd()` (with
  address + sameAs), `breadcrumbJsonLd(items)`, and a `JsonLd`
  component that serializes one or more payloads.
- **`app/layout.tsx`** — replaced the create-next-app default with
  the real root layout: Inter (body) + Source Serif 4 (display) via
  `next/font/google`, default `metadata` (title template, OG,
  `metadataBase`, robots), `organizationJsonLd()` injected,
  `<SkipLink />` / `<Header />` / `<main id="main">` / `<Footer />`
  wired.
- **`app/page.tsx`** — replaced the create-next-app welcome screen
  with a Phase 1 home stub explaining that the marketing site lands
  in Phase 2.

**Why:** A runnable foundation is required before any real page work
is meaningful. Primitives and tokens define the design system; layout
chrome defines what every page shares; SEO primitives and the root
metadata set the discoverability baseline.

**Verification:** Dev server boots in 541 ms (Turbopack, Next.js
16.3.2). `GET /` returns 200 and the rendered HTML contains:

- `<html lang="en">` with both font CSS variables attached
- `<title>` and `<meta name="description">` from root metadata
- `<a>Skip to main content</a>` and `<main id="main">` (skip-link
  target valid)
- The seven primary nav routes under `<nav aria-label="Primary">`
- "Request a quote" appears twice (desktop + mobile trigger)
- `<button aria-label="Open menu">` for the mobile sheet
- Footer with `1200 Industrial Way`, phone/email, and the
  `AS9100D · ISO 9001:2015 · ITAR Registered` legal line
- `<script type="application/ld+json">` containing `"@type":"Organization"`
- No errors or warnings in the dev log

**Roadmap:** [`ROADMAP.md` — Phase 1, Steps 1.3–1.11](./ROADMAP.md)

**Commits:**

- [`0e9e618`](https://github.com/mddoad/my-website/commit/0e9e618) — Phase 1: foundation
- [`308823d`](https://github.com/mddoad/my-website/commit/308823d) — docs: record Phase 1 commit hash in changelog

---

## 2026-08-27 14:50 — Phase 0: reset and documentation set

**Context:** The previous Phase 1 work (layout, primitives, content,
SEO basics) was structurally fine but had drifted — parts were
incomplete, the home page was a stub, and the documentation lived
only in scattered comments. We decided to start over and build it
like a professional project: small phases, tracked steps, dated log.

**What changed:**

- Wiped the working tree back to the `create-next-app` baseline:
  - Removed `components/`, `content/`, `lib/`
  - Removed `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts`
  - Reverted `app/globals.css`, `app/layout.tsx`, `app/page.tsx`,
    `next.config.ts` to HEAD
  - Left `package.json`, `tsconfig.json`, `eslint.config.mjs`,
    `postcss.config.mjs`, `public/`, `node_modules/`, `.next/`
    untouched
  - Left `AGENTS.md` and `CLAUDE.md` untouched
- Authored the documentation set under `docs/`:
  - `OVERVIEW.md` — what the project is and why it exists
  - `FEATURES.md` — the complete feature list with status checkboxes
  - `ROADMAP.md` — phased build plan, each step with sub-tasks
  - `CHANGELOG.md` — this file

**Why:** A documented reset point makes the next phase of work
recoverable. Every change from here on is logged here; every roadmap
step is ticked only when verified.

**Roadmap:** [`ROADMAP.md` — Step 1.1, 1.2](./ROADMAP.md)

**Commits:**

- [`fcc83fc`](https://github.com/mddoad/my-website/commit/fcc83fc) — Phase 0: reset working tree and add documentation set
- [`fa88836`](https://github.com/mddoad/my-website/commit/fa88836) — docs: record Phase 0 commit hash in changelog

---

## 2025-XX-XX — Baseline: Initial commit from Create Next App

**Context:** The repository starts here — the standard
`create-next-app` scaffold, unmodified. We mention it explicitly so
the changelog has a complete timeline from `git init` to the live
site.

**What is in this baseline (left untouched through Phase 0):**

- `package.json` — Next.js 16.3.2, React 19.2.8, Tailwind v4, ESLint,
  TypeScript.
- `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.
- `app/layout.tsx` (default Next scaffold), `app/page.tsx` (default
  Next welcome screen), `app/globals.css` (default theme).
- `next.config.ts` (empty config).
- `public/` — stock `next.svg`, `vercel.svg`, etc.
- `node_modules/`, `.next/` (not committed but present on disk).
- `AGENTS.md` — project rules, written by `next dev`. `CLAUDE.md`
  references it.

**Commits:**

- [`9e4cb2a`](https://github.com/mddoad/my-website/commit/9e4cb2a) — Initial commit from Create Next App
