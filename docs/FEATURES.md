# Features

The complete feature set for the Meridian Manufacturing site. Each feature
has a status that maps to a step in [`ROADMAP.md`](./ROADMAP.md).

Legend: `[ ]` not started · `[~]` in progress · `[x]` shipped

---

## Current status

- **Latest shipped phase:** Phase 7 (motion & interaction),
  tagged `v0.7.0` on `aac5636`. Post-ship patch
  `cdbf6e8` added security headers. Current latest
  is `79bd904` (this docs commit).
- **What's live:** All 13 feature sections below are
  shipped, plus the four security headers
  (`X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`, `Permissions-Policy`) emitted
  on every route by `next.config.ts` `headers()`.
  The Step 5.6 design-token integration retired
  the industrial blue palette from rendered output;
  Phase 6 finished the rebrand by moving the contact
  info, the assets, the per-page metadata, the
  case-study hero images, the about-page city/sqft
  hardcodes, and the `public/` leftovers to the same
  single source of truth. **Phase 7 added a thin
  motion layer** — three client primitives
  (`<Reveal>`, `<Stagger>`, `<Counter>`) plus a
  `<MotionProvider>` — and wired it into every home
  page section, every detail route, and the contact
  form. `prefers-reduced-motion: reduce` is honored
  in four layers (CSS, per-component
  `useReducedMotion()`, `MotionConfig reducedMotion="user"`,
  and the contact form's `transition={{ duration: 0 }}`).
  Bundle delta on the home page: +51 KB gzipped
  (184 KB → 235 KB), accepted as the cost of the
  motion runtime and primitives.
- **Pre-deploy blockers** (content, not code): the
  contact form's `console.log` action needs a real
  delivery backend, and `lib/site.ts` still carries
  `https://example.com` placeholders that propagate
  to the sitemap, OG image metadata, and JSON-LD.
- **Phase 5 polish still in flight** (user-side verification, no
  code): Step 5.1 a11y re-verify, Step 5.2 mobile audit, Step 5.3
  Lighthouse, Step 5.4 real contact info, Step 5.5 final commit.
  These don't touch this file — every line below is already
  shipped.

---

## 1. Site foundation

- [x] **App router shell** — `app/layout.tsx` with html/body, font wiring,
      global metadata, JSON-LD org block
- [x] **Design tokens** — `brand-*` (green primary + teal-deep surfaces),
      `ink`, `charcoal`, `slate`, `steel`, `stone`, `muted`, `on-dark`,
      `on-dark-muted`, `surface`, `surface-soft`, `surface-feature`,
      `hairline`, `hairline-soft`, `hairline-strong`, `hairline-dark`
      palettes per `docs/design.md`; 7-step `rounded` scale (xs → full);
      13-step `spacing` scale (xxs → hero); font tokens in `globals.css`
- [x] **Typography** — Inter (substitutes `Euclid Circular A` from
      `docs/design.md` — paid Krea font not yet licensed) via
      `next/font/google`, with system fallbacks. Source Serif 4 was
      dropped during the Step 5.6 rebrand in favor of a single
      geometric sans.
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
- [x] `app/robots.ts`
- [x] `app/sitemap.ts` (static + content-derived routes)
- [x] `app/opengraph-image.tsx` for default OG card
- [x] `app/icon.tsx` (replace stock favicon with brand mark)

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

- [x] `next.config.ts` whitelists remote image hosts (`picsum.photos`).
  Phase 6 moved case-study heroes from hardcoded
  `images.unsplash.com` URLs to a `picsumUrl(seed, w, h)`
  helper that builds a deterministic `picsum.photos` URL per
  study — the same image on every build, no remote stock
  whitelist.
- [x] Case study hero images via `next/image` (or local if replaced later)
- [x] Consistent `sizes` attribute for responsive loading

## 10. Accessibility

- [x] All interactive elements reachable by keyboard
- [x] Visible `:focus-visible` ring
- [x] `aria-label` on icon-only buttons
- [x] `prefers-reduced-motion` honored globally
- [x] Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`)
- [x] Color contrast meets WCAG AA on all text tokens
  *(re-verified in Phase 6: the new `text-muted` token fails AA on
  canvas, so it is limited to caption/eyebrow/dt-label/placeholder
  use only — 19 hits in the grep audit, all in those roles.
  `text-on-dark-muted` on `bg-brand-teal-deep` measures 7.36:1,
  passes AAA.)*

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

## 13. Motion (Phase 7)

- [x] **`<Reveal>` primitive** (`components/motion/Reveal.tsx`)
      — single-element scroll reveal. 12 px y → 0, 500 ms,
      `out-expo` ease `[0.22, 1, 0.36, 1]`,
      `viewport={{ once: true, margin: "0px 0px -10% 0px" }}`.
      Polymorphic `as` prop (div / section / li / article /
      header / footer). Caps: `y ≤ 24 px`, `duration ≤ 600 ms`.
      Honors `useReducedMotion` by short-circuiting to a
      passthrough element.
- [x] **`<Stagger>` primitive** (`components/motion/Stagger.tsx`)
      — coordinates a group of `<Reveal>` children via the
      `staggerChildren` `Variants` API. 80 ms step, capped at
      200 ms. Polymorphic `as` prop (div / ul / ol / dl /
      section). Re-exports `revealItem` for ergonomic
      composition.
- [x] **`<Counter>` primitive** (`components/motion/Counter.tsx`)
      — animated number. `useMotionValue(0)` +
      `useMotionValueEvent` + `useInView` + `animate()`.
      1.2 s `easeOut` default, capped at 1.5 s. Supports
      `prefix` / `suffix` / `decimals`. Uses
      `Intl.NumberFormat` for grouping; rounds inside
      the formatter to avoid "0.5000001" flicker.
      Renders the final value as a static span when
      `useReducedMotion` is true.
- [x] **`<MotionProvider>`** (`components/motion/MotionProvider.tsx`)
      — client component that wraps the route tree in
      `<MotionConfig reducedMotion="user">`. Mounted
      once at the root layout; covers the entire route
      content with one client boundary.
- [x] **Home page sections** — all 9 sections (`Hero`,
      `TrustBar`, `ValueProps`, `CapabilitiesPreview`,
      `FeaturedCaseStudy`, `Process`, `Stats`,
      `Testimonials`, `FinalCta`) wire `<Reveal>` and /
      or `<Stagger>`. Hero text stack staggers 5 blocks;
      Stats, Process, ValueProps, CapabilitiesPreview,
      and Testimonials use `<Stagger as="dl|ul|ol">`
      with `<Counter>` on the stat values.
- [x] **Detail routes** — all 8 detail pages (case-studies
      index + slug, products index + slug, industries
      index + slug, about, team, process, testimonials)
      wire `<Stagger>` and `<Reveal>`. Case-study
      detail uses `<Counter>` on parseable metric values
      (`"40%"`, `"99.2%"`, `"22%"`, `"+35%"`, etc.) and
      falls back to plain text for unparseable values
      (`"48,000 units"`, `"< 200"`, `"8% → <1%"`).
- [x] **Contact form transition** — `AnimatePresence
      mode="wait"` wraps the form and success card. On
      `state.ok`: form exits (150 ms easeIn), success
      card enters (250 ms easeOut). Total 400 ms.
      `useReducedMotion` short-circuits to
      `duration: 0` for instant swap.
- [x] **Layered reduced-motion defense** — four
      independent layers, all required for the
      reduced-motion guarantee to hold:
      1. CSS `@media (prefers-reduced-motion: reduce)`
         in `app/globals.css` shortens every animation
         and transition to 0.01ms.
      2. Per-component `useReducedMotion()` checks in
         `<Reveal>`, `<Stagger>`, `<Counter>`, and
         `ContactForm` return a passthrough element /
         zero-duration transition.
      3. `<MotionConfig reducedMotion="user">` in
         `<MotionProvider>` instructs Motion to read
         the OS preference and bypass its own
         transforms.
      4. (Same as #2) Per-component checks in
         `ContactForm` keep `<AnimatePresence>`
         bookkeeping but disable the visual transition.
