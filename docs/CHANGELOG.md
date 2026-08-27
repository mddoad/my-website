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
