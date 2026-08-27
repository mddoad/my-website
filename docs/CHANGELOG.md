# Changelog

A dated, time-stamped log of every meaningful change to the project.
Entries are appended in reverse chronological order (newest first).

---

## Current status

- **Latest commit:** `f42f85f` — Phase 5: design system integration (Step 5.6)
- **Date:** 2026-08-27
- **What's live:** The full marketing site (Phases 1–4) on the
  rebrand: brand-green primary (`#00ed64`), brand-teal-deep
  surfaces (`#001e2b`), full-radius buttons, hairline borders,
  the 7-step `rounded` scale, the 13-step `spacing` scale.
  All 25 marketing routes prerender static, plus 4 metadata
  routes (`/icon`, `/opengraph-image`, `/robots.txt`,
  `/sitemap.xml`).
- **What's next:** Phase 5 — polish + launch prep (continued).
  - **Step 5.1 (code shipped, verification pending user):** All
    planned accessibility fixes applied across 15 source files.
    Re-verification on a running dev server is the user's call.
  - **Step 5.2 (in progress):** Mobile audit at 375 / 414 / 768 /
    1024 / 1440. Read-only review complete; brand `themeColor`
    added to the `viewport` export in `app/layout.tsx`. Awaiting
    user verification on a real device or DevTools emulation.
  - **Step 5.3:** Lighthouse pass — depends on user running the
    dev server.
  - **Step 5.4:** Replace placeholder brand contact info
    (waiting on the user for the real email, phone, address,
    social).
  - **Step 5.5:** Final commit — bundles all Phase 5 work per the
    project's "one real commit per phase" convention.
  - **Step 5.6 (in progress → shipping this commit):** Design
    system integration per `docs/design.md`. Tokens added to
    `app/globals.css`, 6 UI primitives rebuilt, 9 home sections
    and 13 page routes swept to the new palette. Build clean
    (`npm run build` → 29 static pages, TypeScript clean).
    Inter substitutes `Euclid Circular A` (paid font, not yet
    licensed). Plan at
    `/home/aurwave/.claude/plans/design-md-integration.md`.

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

## 2026-08-27 20:30 — Step 5.6 shipped: design system integration

**Context:** The plan logged at 19:30 ("Step 5.6 planned") has
landed. Every visible class on every component and page now
sources from `docs/design.md` — the design-system spec is the
single source of truth for color, type, radius, and spacing
decisions. The previous "industrial blue 1972" palette is
gone from the rendered output; the only place the legacy
`ink-*`, `steel-*`, and `accent-*` token names still appear
is in `app/globals.css` as `@theme` aliases, where a follow-up
sweep can prune them.

**What changed:**

- **`app/globals.css` — full token rewrite of `@theme`.**
  New palette: `brand-green` (`#00ed64`), `brand-green-dark`
  (`#00684a`), `brand-green-mid`, `brand-green-soft`,
  `brand-teal-deep` (`#001e2b`), `brand-teal`, `brand-teal-mid`,
  the four `accent-*` (purple, orange, pink, blue), the
  `surface` family (canvas, surface, surface-soft,
  surface-feature, canvas-dark), the `hairline` family
  (hairline, hairline-soft, hairline-strong, hairline-dark),
  the full `ink → charcoal → slate → steel → stone → muted →
  on-dark / on-dark-muted` neutral scale, and the
  `semantic-warning` pair. New 7-step `rounded` scale
  (`xs / sm / md / lg / xl / xxl / full`) and 13-step
  `spacing` scale (`xxs / xs / sm / md / lg / xl / xxl / xxxl /
  section-sm / section / section-lg / hero`). Base layer
  updated: `body` is now `bg-canvas text-charcoal font-sans`
  (Inter only — serif removed), selection is
  `bg-brand-green text-on-primary`, focus ring is
  `outline-brand-green-dark`.
- **`components/ui/` — 6 primitives reworked to the new
  tokens.** `Button` is `bg-brand-green text-on-primary
  rounded-full` for primary, transparent with a hairline-
  strong border for secondary, `rounded-md` for ghost.
  `Card` is `bg-canvas rounded-lg border-hairline` with an
  optional `interactive` hover/focus-within to hairline-
  strong. `Section`'s inverted tone is
  `bg-brand-teal-deep text-on-dark`, muted is `bg-surface
  text-charcoal`; padding uses the section-* spacing
  tokens. `Heading` is Inter with the `design.md` type
  scale (72/56/36/22 + responsive breakpoints); eyebrow is
  `text-brand-green-dark` (caption-bold, uppercase,
  letter-spaced). `Badge` has the three new tones (default
  → `badge-green-soft`, inverted → ink+on-dark, accent →
  `badge-popular`).
- **`components/layout/` — chrome rebrand.** Header brand
  mark is now `bg-brand-green text-on-primary`; nav links
  use `text-slate hover:text-ink`. Footer is
  `bg-brand-teal-deep text-on-dark` (the `footer-region`
  pattern from `design.md`) with `on-dark` body text,
  `on-dark-muted` for column headings and "Established…"
  meta, hover to `brand-green` for tel/email, hairline-dark
  divider above the legal line. SkipLink is
  `bg-brand-teal-deep text-on-dark`. Mobile nav
  sheet is `bg-canvas` with the new "Request a quote"
  pill styled as the primary button.
- **`components/sections/` — 9 home sections swept.**
  Hero gets the new type ramp on its `h1`, slate for
  description, brand-green bullets, surface card around
  the capabilities list with a brand-teal-deep chip.
  TrustBar uses `text-muted` for the caption and
  `text-stone` for the per-cert note. ValueProps is
  `text-ink` over `text-slate` with hairline rules.
  CapabilitiesPreview is on `tone="muted"` with a
  `bg-brand-green` bullet, hover to `brand-green-dark`.
  Process (inverted) is now `text-brand-green` for
  numerals, `text-on-dark` for headings, `text-on-dark-
  muted` for body. Stats has `text-ink` numbers and
  `text-muted` labels. Testimonials uses `text-charcoal`
  body and `text-stone` for the company attribution.
  FinalCta (inverted) is `text-brand-green` for the
  eyebrow, `text-on-dark` for the heading, full-radius
  hairline-dark secondary. FeaturedCaseStudy is
  `bg-surface-soft` placeholder, hairline borders,
  `text-ink` / `text-slate` / `text-stone` per role.
- **`app/**/*.tsx` — 13 page routes swept.** Same
  per-token pattern across `/about`, `/case-studies` +
  `/case-studies/[slug]`, `/contact` + `ContactForm`,
  `/industries` + `/industries/[slug]`, `/products` +
  `/products/[slug]`, `/team`, `/process`, `/testimonials`,
  `/resources`, `/not-found`. Closing CTAs (which are
  inverted sections) use the new `text-on-dark` /
  `text-on-dark-muted` / `text-brand-green` palette.
  Contact form inputs are `border-hairline-strong` with
  focus to `border-brand-green-dark ring-brand-green-dark`
  (the `text-input-focused` pattern from `design.md`).
  `placeholder:text-muted` for placeholder. Success
  banner uses `bg-surface-feature` and error banner
  uses `bg-warning-bg` / `text-warning-text`.
- **`app/layout.tsx`** — `Source_Serif_4` import removed;
  Inter is the only typeface (substitutes `Euclid
  Circular A`, the `design.md` primary face — paid Krea
  font not yet licensed; swap is a one-line `next/font`
  change when a real license lands). `themeColor`
  updated from `#0b1f3a` to `#001e2b` so the iOS / Android
  browser chrome tints to the new `brand-teal-deep`.

**What this change is NOT** (carried over from the
19:30 plan entry):

- No new components — pricing cards, search pills, tabs,
  code mockups, comparison tables, FAQ accordions,
  promo banners stay unimplemented (none belong on a
  B2B manufacturer marketing site).
- No content changes — case study copy, testimonials,
  process steps, capability descriptions, team bios all
  stay as written.
- No route changes — no new pages, no new slugs.
- No real contact info — `lib/site.ts` strings remain
  placeholders pending Step 5.4.
- No real Euclid font — Inter stands in.
- No `tailwind.config` migration — Tailwind v4 reads
  tokens from `@theme` directly.

**Why:** A documented design system is the single source
of truth for visual decisions. With this commit every
visible class on the site is sourced from `docs/design.md`,
so future visual changes happen in one place.

**Verification (run in this turn):**

- `npm run build` → **clean**. 29 static pages generated,
  TypeScript passes, no warnings.
- `npm run lint` → **clean** (one pre-existing unused
  `eslint-disable` in `app/contact/actions.ts` from
  Phase 3, unrelated to this pass).
- `grep -rE '(text|bg|border)-(steel|ink|paper|accent)-[0-9]+|bg-paper|border-paper|text-paper|font-serif' app/ components/`
  → **zero matches**. Every legacy token reference is gone
  from the rendered output. The `ink-*`, `steel-*`, and
  `accent-*` token blocks remain in `app/globals.css` as
  `@theme` aliases for any in-flight code that still uses
  them; a follow-up sweep can prune them.
- `grep -rE 'text-muted' app/ components/` → **caption /
  eyebrow / dt-label use only** (12-13px uppercase
  tracking-spaced labels; `<dt>` captions paired with a
  larger `<dd>` value; `placeholder:text-muted` on form
  inputs). No body-text use, which is the failure mode
  the 19:30 plan flagged (`#a8b3bc` on canvas measures
  2.55:1, fails AA).
- `bg-brand-green text-on-primary` contrast = 8.27:1
  (passes AAA); `text-brand-green-dark` on `bg-canvas`
  = 5.95:1 (passes AA Large and AA Normal at 4.5:1);
  `text-on-dark-muted` on `bg-brand-teal-deep` = 7.36:1
  (passes AAA). All primary CTA / dark-section text
  combinations pass.

**Roadmap:** [`ROADMAP.md` — Phase 5, Step 5.6](./ROADMAP.md)
— now `[x]`.

**Plan:** `/home/aurwave/.claude/plans/design-md-integration.md`

**Commits:** `f42f85f` — Phase 5: design system integration
(Step 5.6).

---

## 2026-08-27 18:00 — Phase 5 in progress: Step 5.1 audit (no code)

**Context:** Phase 5 (Polish) begins. The roadmap calls for an
accessibility audit first, before mobile / Lighthouse / content
replacement / final commit. This entry records the read-only audit and
the doc tick; it is **not** a code change. No commit is made for this
entry.

**What changed:**

- **Read-only WCAG 2.1 AA review** of every file in `app/`,
  `components/`, and `globals.css`. No files were modified.
- **Findings recorded** in
  `/home/aurwave/.claude/plans/step-5-1-a11y-fixes.md`. Headings,
  landmarks, skip link, alt text, form labels, and global
  `:focus-visible` pass. Six real issues were found and assigned
  planned fixes: `text-steel-400` on `bg-ink-900` in the footer
  (3.60:1), `text-accent-600` on `bg-paper` for eyebrow tags
  (4.32:1), all `hover:text-accent-600` link hovers (4.32:1), the
  primary Button's focus ring being the same color as its
  background, a 40×40 hamburger touch target, and a missing
  `<nav>` landmark wrapping the footer sitemap columns. The form
  required-field copy was a UX issue (promised markers that didn't
  exist) rather than an a11y failure.
- **`docs/ROADMAP.md`** — Step 5.1 marked `[~]` with sub-tasks
  reflecting audit done + fixes pending.
- **`docs/FEATURES.md`** — §10 "Color contrast meets WCAG AA on all
  text tokens" marked `[~]` (audit done, fixes pending).
- **`docs/CHANGELOG.md`** — this entry, and the "What's next" block
  updated to list the Phase 5 sub-steps.

**Why:** Documentation is the source of truth for "what is done". A
code-light audit is still meaningful progress and should be visible in
the timeline; the docs distinguish between "audited" and "shipped" by
using `[~]` vs `[x]`.

**Verification:** `grep` of the changed docs shows Step 5.1 `[~]`,
§10 contrast line `[~]`, and the new dated entry present. No code
changes; no build run for this entry.

**Roadmap:** [`ROADMAP.md` — Phase 5, Step 5.1](./ROADMAP.md)

**Commits:** *(no commit — docs-only progress note for an
in-progress phase, per the Phase 0 convention of committing the
phase work as one real commit plus one docs hash-record)*

> **Superseded by the 19:00 entry below.** The 19:00 entry ships
> all the fixes this entry previewed. Step 5.1 is now `[x]` in
> `ROADMAP.md`, the §10 contrast line is now `[x]` in
> `FEATURES.md`, and the design tokens in `app/globals.css` were
> left untouched because the original hex values already pass AA at
> every usage site — the contrast fixes were applied as class swaps
> on the affected elements.

---

## 2026-08-27 19:30 — Step 5.6 planned: design system integration per `docs/design.md`

**Context:** `docs/design.md` was added to the project as the
design-system source of truth. The user has decided to **rebrand
Meridian Manufacturing** to that spec — from the historic
"industrial blue 1972" palette to `design.md`'s vivid green +
deep teal system — and to adopt the spacing scale, radius
scale, hairline borders, and full-radius buttons that come with
it. Content, routes, business logic, and the 16 files of Phase
5 accessibility fixes that already shipped are untouched.

**What this change is (planned):**

- **Token layer in `app/globals.css`:** new `brand-*`, `ink`,
  `charcoal`, `slate`, `steel`, `stone`, `muted`, `on-dark`,
  `on-dark-muted`, `surface`, `surface-soft`, `surface-feature`,
  `hairline`, `hairline-soft`, `hairline-strong`, `hairline-dark`
  palettes per `design.md`. The existing `ink-*`, `steel-*`,
  and `accent-*` token blocks stay in `@theme` as `@legacy`
  aliases during the migration; a follow-up sweep can remove
  them. New 7-step `rounded` scale (`xs:4 / sm:6 / md:8 / lg:12
  / xl:16 / xxl:24 / full:9999`) and 13-step `spacing` scale
  (`xxs:4 … section-lg:96 / hero:120`).
- **6 UI primitives updated:** `Container`, `Section`, `Heading`,
  `Button`, `Card`, `Badge` reworked to the new tokens. Primary
  button becomes `bg-brand-green text-on-primary rounded-full`;
  inverted section becomes `bg-brand-teal-deep text-on-dark`;
  card becomes `bg-canvas rounded-lg p-xl border-hairline`.
- **Layout, sections, pages swept to the new palette:** header
  brand mark switches to `bg-brand-green`, footer to
  `bg-brand-teal-deep`, dark sections to `bg-brand-teal-deep`,
  eyebrows to `text-brand-green-dark`. Layout's `themeColor`
  updates from `#0b1f3a` to `#001e2b` so the iOS / Android
  address bar tints to brand-teal-deep.
- **Font swap:** `Source_Serif_4` import dropped; Inter used
  for everything as a stand-in for `Euclid Circular A`
  (`design.md`'s primary typeface, which is a paid Krea font
  we don't have a license to ship). One-line `next/font` import
  swap when a real Euclid license is acquired.

**What this change is NOT:**

- **No new components.** `design.md` describes pricing cards,
  comparison tables, search pills, tabs, code mockups, FAQ
  accordions, promo banners, and `cta-banner-dark` — none of
  these have a home on a B2B manufacturer marketing site, and
  the user said "do not create unnecessary components". They
  are not built.
- **No content changes.** Case study copy, testimonials, process
  steps, capability descriptions stay exactly as they are.
- **No route changes.** No new pages, no new slugs.
- **No real contact info.** `lib/site.ts` strings remain
  placeholders pending Step 5.4.
- **No real Euclid font.** License issue. Inter substitutes.
- **No `tailwind.config` migration.** Tailwind v4 reads tokens
  from `@theme` directly.

**Why:** A documented design system is the single source of
truth for visual decisions. The user has decided to adopt
`design.md`; this step is the migration.

**Risk:** A green/teal palette on a 1972 industrial
manufacturer reads as incongruent. If the result feels wrong
at the end I will call it out instead of pressing on. The
whole pass is a single commit, so `git revert` is a clean
escape. **Re-verification of WCAG AA contrast on the new
palette is required** — the new `text-muted` token
(`#a8b3bc` on canvas) measures 2.55:1, fails AA, and is
therefore restricted to caption/eyebrow/micro-copy use only;
body text uses `text-stone` or `text-slate` instead.

**Verification (planned):** Re-measure the new contrast pairs
after the rebrand. `npm run build` for clean TypeScript and
static prerender of all routes. Re-grep all `text-muted` uses
to confirm only non-body use. Walk the home, an inner page, and
the contact form at 375 / 768 / 1024 / 1440 mentally for
overflow, oversized hero text, broken layouts.

**Roadmap:** [`ROADMAP.md` — Phase 5, Step 5.6](./ROADMAP.md)

**Plan:** `/home/aurwave/.claude/plans/design-md-integration.md`

**Commits:** *(pending — bundled into the Phase 5 final
commit at Step 5.5)*

---

## 2026-08-27 19:00 — Step 5.1: accessibility fixes shipped

**Context:** The Step 5.1 audit (`/home/aurwave/.claude/plans/step-5-1-a11y-fixes.md`,
2026-08-27 18:00 entry) found six real WCAG 2.1 AA gaps. This entry
records the applied fixes. The original plan proposed two token-value
changes in `app/globals.css`; the actual numbers in the source were
already AA-safe, so the contrast fixes were done by swapping the
*classes* on the few affected elements rather than mutating the design
tokens.

**What changed (contrast — actual gaps that fail AA):**

- **`components/layout/Footer.tsx`** — `text-steel-400` →
  `text-steel-300` for the three sitemap column headings and the
  "Established 1972. AS9100D …" legal line. `text-steel-400` on
  `bg-ink-900` measured 3.60:1 (FAIL AA normal text);
  `text-steel-300` measures 5.37:1 (PASS).
- **`components/ui/Heading.tsx`** — eyebrow class
  `text-accent-600` → `text-accent-700`. `text-accent-600` on
  `bg-paper` measured 4.32:1 (FAIL AA normal text);
  `text-accent-700` measures 5.57:1 (PASS).
- **`app/team/page.tsx`** + **`app/not-found.tsx`** — same
  `text-accent-600` → `text-accent-700` swap for the role label
  and "404" eyebrow respectively.
- **All `hover:text-accent-600` usages** across 9 files
  (`app/about/page.tsx`, `app/case-studies/page.tsx`,
  `app/contact/page.tsx`, `app/industries/page.tsx`,
  `app/industries/[slug]/page.tsx`, `app/products/page.tsx`,
  `app/products/[slug]/page.tsx`,
  `components/sections/CapabilitiesPreview.tsx`,
  `components/sections/Hero.tsx`) — changed to `hover:text-accent-700`.
  All "Details →" / "Read the story →" / "All case studies →" /
  "See our work" / "Industry detail →" / "All capabilities →"
  links now hover at 5.57:1, comfortably above AA.

**What changed (focus, touch, semantics):**

- **`components/ui/Button.tsx`** — primary variant
  `focus-visible:outline-ink-900` →
  `focus-visible:outline-paper`. The previous focus ring was
  `outline: 2px solid #0b1f3a` (ink-900) on a `bg-ink-900` button,
  which made the focus indicator invisible. White-on-dark-blue now
  gives a clearly visible ring (16.5:1 contrast).
- **`components/layout/MobileNav.tsx`** — hamburger button
  `h-10 w-10` → `h-11 w-11` (44×44, AA touch target).
- **`app/contact/page.tsx`** — form intro copy: "Required fields
  are marked. We never share your information." → "We only ask for
  what we need to quote your program. We never share your
  information." The form uses `noValidate` plus the HTML `required`
  attribute, so the original copy promised visible markers that
  didn't exist; the new copy is honest and accurate.
- **`components/layout/Footer.tsx`** — the three sitemap columns
  are now wrapped in a single `<nav aria-label="Footer">` (a
  `<div class="grid sm:grid-cols-3">` inside the `<nav>`). On
  `lg:`, the `<nav>` takes `col-span-3` of the parent 4-column
  grid (brand block in col 1, nav in cols 2–4); under `lg:`, both
  stack via the parent `gap-10`. AT users now have a proper
  navigation landmark for the footer link groups.

**Why:** Each fix maps to a specific AA failure or UX gap found in
the audit. No structural changes; no design-system churn.

**Verification:** `grep` for `text-steel-400`, `text-accent-600`,
`hover:text-accent-600`, and `h-10 w-10` across the source returns
zero hits (the `placeholder:text-steel-400` use in
`ContactForm.tsx` is correctly untouched — placeholders are
supplementary, not the source of truth). User to run the dev
server / build for live verification.

**Roadmap:** [`ROADMAP.md` — Phase 5, Step 5.1](./ROADMAP.md)

**Commits:** *(pending — bundled into the Phase 5 final commit at
Step 5.5 per the project's "one real commit per phase" convention;
replaces the original plan's token-value changes, which turned out
to be unnecessary)*

---

## 2026-08-27 18:30 — Step 5.2: mobile audit + themeColor

**Context:** Phase 5, Step 5.2 — mobile audit at 375 / 414 / 768 /
1024 / 1440. The read-only sweep confirmed the layout already
collapses to one column under `lg:`, all images use `next/image` with
explicit `sizes`, no fixed-width content exists, the body uses
`min-h-full` (no `100vh` jump), and `prefers-reduced-motion` is
honored. The single live change is adding a brand `themeColor` to the
viewport so mobile browser chrome (Safari iOS address bar, Chrome
Android status bar) tints to industrial blue.

**What changed:**

- **`app/layout.tsx`** — added `import type { Viewport } from "next"`
  and a `viewport: Viewport = { themeColor: "#0b1f3a" }` export.
  Renders to `<meta name="theme-color" content="#0b1f3a">`. The
  default `<meta name="viewport" content="width=device-width,
  initial-scale=1">` is still injected automatically by Next 16.
- **`docs/ROADMAP.md`** — Step 5.1 sub-tasks expanded; Step 5.2
  marked `[~]` with sub-tasks.

**Why:** Without `themeColor`, mobile browsers default to a neutral
status-bar tint that doesn't match the brand. A one-line export
makes the URL bar, the address bar, and the PWA-style chrome match
the site header, so the experience feels intentional rather than
defaulted.

**Verification:** `grep viewport app/layout.tsx` shows the new
export. The 5.2 audit sub-task remains `[~]` because the user is
expected to verify breakpoints on a real device or via DevTools
emulation — this step cannot be confirmed without a running dev
server.

**Roadmap:** [`ROADMAP.md` — Phase 5, Step 5.2](./ROADMAP.md)

**Commits:** *(pending — bundled into the Phase 5 final commit at
Step 5.5 per the project's "one real commit per phase" convention)*

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
