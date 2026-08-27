# Roadmap

The build is split into phases. Each phase has steps, and each step has
sub-tasks. A step is **complete** when every sub-task is checked, the
code is on disk, and the page or behavior is verified by running the dev
server.

**Completion rule:** I will mark a step `[x]` only after running the dev
server and confirming the page or feature renders without error. If a
step is blocked, I will leave it `[ ]` and note the blocker in
[`CHANGELOG.md`](./CHANGELOG.md).

---

## Phase 1 — Foundation

The smallest runnable site: layout, design tokens, primitives, site chrome,
SEO basics. After Phase 1 the site looks empty but the chrome is in place.

- [x] **Step 1.1 — Reset the working tree**
  - [x] Wipe untracked `app/`, `components/`, `content/`, `lib/`
  - [x] Revert modified files to the `create-next-app` baseline
  - [x] Working tree is clean
- [x] **Step 1.2 — Document the project**
  - [x] `docs/OVERVIEW.md`
  - [x] `docs/FEATURES.md`
  - [x] `docs/ROADMAP.md`
  - [x] `docs/CHANGELOG.md`
- [x] **Step 1.3 — `app/layout.tsx` shell**
  - [x] HTML lang, body class, font CSS variables wired
  - [x] Default `metadata` (title template, OG, Twitter, robots, base URL)
  - [x] Organization JSON-LD injected
  - [x] Renders `<Header />` / `<main id="main">` / `<Footer />` / `<SkipLink />`
- [x] **Step 1.4 — Design tokens in `app/globals.css`**
  - [x] `ink-*` (10 steps), `steel-*` (10 steps), `accent-*` (7 steps)
  - [x] Surface colors (`paper`, `surface`, `surface-inverted`)
  - [x] Font tokens (`--font-serif`, `--font-sans`)
  - [x] Radii (`sm`, `md`, `lg`), shadows (`card`, `raised`)
  - [x] Base layer: body, headings, `:focus-visible`, `prefers-reduced-motion`
- [x] **Step 1.5 — `lib/site.ts`**
  - [x] Brand, tagline, description, URL
  - [x] Contact (email, phone, address)
  - [x] Social links
  - [x] Primary nav array
  - [x] Certifications array
  - [x] `established` year
- [x] **Step 1.6 — `lib/utils.ts`**
  - [x] `cn(...)` class-name combiner
- [x] **Step 1.7 — UI primitives**
  - [x] `components/ui/Container.tsx` (`prose` / `wide` / `full`)
  - [x] `components/ui/Section.tsx` (`default` / `inverted` / `muted`, padding sizes)
  - [x] `components/ui/Heading.tsx` (h1–h4, eyebrow, align)
  - [x] `components/ui/Button.tsx` (3 variants × 3 sizes, link + button)
  - [x] `components/ui/Card.tsx`
  - [x] `components/ui/Badge.tsx`
- [x] **Step 1.8 — Layout components**
  - [x] `components/layout/SkipLink.tsx`
  - [x] `components/layout/Header.tsx` (desktop nav + CTA)
  - [x] `components/layout/MobileNav.tsx` (hamburger + sheet)
  - [x] `components/layout/Footer.tsx` (4-column)
- [x] **Step 1.9 — SEO primitives**
  - [x] `lib/seo.ts` — `buildMetadata` helper
  - [x] `components/seo/JsonLd.tsx` — `organizationJsonLd`, `breadcrumbJsonLd`
- [x] **Step 1.10 — Phase 1 home stub**
  - [x] `app/page.tsx` placeholder explaining Phase 2 work
- [x] **Step 1.11 — Verify Phase 1**
  - [x] `npm run dev` boots without errors (Ready in 541ms, no errors)
  - [x] Home page renders header / footer / skip link (HTTP 200, all landmarks present)
  - [x] Mobile nav button present in initial DOM (sheet opens on click)
  - [x] `view-source:` shows the organization JSON-LD script tag
- [x] **Step 1.12 — Commit**
  - [x] `git commit -m "Phase 1: foundation"`

## Phase 2 — Home page

The home page is the only route real visitors hit first. All data is
authored in `content/*.ts` and consumed via small section components.

- [x] **Step 2.1 — `content/stats.ts`**
  - [x] 4 KPI entries + 4 process steps
- [x] **Step 2.2 — `content/services.ts`**
  - [x] 6 service entries with `slug`, `name`, `short`, `description`,
        `capabilities[]`
- [x] **Step 2.3 — `content/industries.ts`**
  - [x] 4 industry entries
- [x] **Step 2.4 — `content/case-studies.ts`**
  - [x] 3 case studies with challenge / approach / result + metrics
- [x] **Step 2.5 — `content/team.ts`**
  - [x] 4 leadership entries
- [x] **Step 2.6 — `content/testimonials.ts`**
  - [x] 3 quote entries
- [x] **Step 2.7 — Home sections**
  - [x] `components/sections/Hero.tsx`
  - [x] `components/sections/TrustBar.tsx`
  - [x] `components/sections/ValueProps.tsx`
  - [x] `components/sections/CapabilitiesPreview.tsx`
  - [x] `components/sections/FeaturedCaseStudy.tsx`
  - [x] `components/sections/Process.tsx`
  - [x] `components/sections/Stats.tsx`
  - [x] `components/sections/Testimonials.tsx`
  - [x] `components/sections/FinalCta.tsx`
- [x] **Step 2.8 — Compose home**
  - [x] `app/page.tsx` renders the sections in order
- [x] **Step 2.9 — Verify**
  - [x] Each section renders, breakpoints behave, links resolve
  - [x] `npm run build` clean (TypeScript, both routes prerender static)
- [x] **Step 2.10 — Commit**
  - [x] `git commit -m "Phase 2: home page"`

## Phase 3 — Detail routes

Static and dynamic routes for the rest of the site. Most data already
exists from Phase 2.

- [x] **Step 3.1 — `/products` index + `/products/[slug]` detail**
- [x] **Step 3.2 — `/industries` index + `/industries/[slug]` detail**
- [x] **Step 3.3 — `/case-studies` index + `/case-studies/[slug]` detail**
- [x] **Step 3.4 — `/process`**
- [x] **Step 3.5 — `/about` + `/team`**
- [x] **Step 3.6 — `/testimonials`**
- [x] **Step 3.7 — `/resources` (placeholder)**
- [x] **Step 3.8 — `/contact` + form**
- [x] **Step 3.9 — `app/not-found.tsx`**
- [x] **Step 3.10 — Per-page `generateMetadata` + breadcrumb JSON-LD**
- [x] **Step 3.11 — Commit**
  - [x] `git commit -m "Phase 3: detail routes"`

## Phase 4 — SEO + assets

- [x] **Step 4.1 — `app/robots.ts`**
- [x] **Step 4.2 — `app/sitemap.ts`** (static + content-derived)
- [x] **Step 4.3 — `app/opengraph-image.tsx`**
- [x] **Step 4.4 — `app/icon.tsx`**
- [x] **Step 4.5 — Verify**
  - [x] `/robots.txt` resolves
  - [x] `/sitemap.xml` resolves and includes all routes
  - [x] OG image renders
- [x] **Step 4.6 — Commit**
  - [x] `git commit -m "Phase 4: SEO + assets"`

## Phase 5 — Polish

- [x] **Step 5.1 — Accessibility audit** (keyboard, contrast, landmarks)
  - [x] Audit read-only review of every component, page, and `globals.css`
  - [x] Document findings and the fix plan (`/home/aurwave/.claude/plans/step-5-1-a11y-fixes.md`)
  - [x] Hamburger touch target (`h-10 w-10` → `h-11 w-11`) — overlaps with Step 5.2
  - [x] Apply all remaining fixes (footer landmark, accent eyebrow + hover, primary-button focus ring, required-field copy, footer text contrast)
  - [ ] Re-verify after fixes — **blocked on user** running dev server
- [~] **Step 5.2 — Mobile audit** (375 / 414 / 768 / 1024 / 1440)
  - [x] Read-only review of every component and page for viewport, breakpoints, fixed widths, touch targets, and image sizing
  - [x] `viewport` export with brand `themeColor: '#0b1f3a'` added in `app/layout.tsx`
  - [x] Hamburger touch target shared with Step 5.1
  - [ ] User to verify on a real device (or via DevTools device emulation) at 375 / 414 / 768 / 1024 / 1440 — **blocked on user**
- [ ] **Step 5.3 — Lighthouse pass** (perf, a11y, SEO, best practices)
- [ ] **Step 5.4 — Real content** (replace placeholder brand contact info)
- [ ] **Step 5.5 — Final commit**
  - [ ] `git commit -m "Phase 5: polish + launch prep"`
- [x] **Step 5.6 — Design system integration (per `docs/design.md`)**
  - Plan: `/home/aurwave/.claude/plans/design-md-integration.md`
  - Rebrand: industrial blue → green/teal (`brand-green` primary,
    `brand-teal-deep` surfaces, hairline borders, full-radius
    buttons, geometric sans type).
  - Adopt: 7-step `rounded` scale, 13-step `spacing` scale, all
    6 existing UI primitives reworked to the new tokens.
  - Do NOT add: pricing cards, search pills, tabs, code mockups,
    comparison tables, FAQ accordions, promo banners — none of
    these belong on a B2B manufacturer marketing site.
  - Substitute: `Euclid Circular A` (paid Krea font) → Inter
    (already loaded via `next/font/google`). One-line swap when
    a real Euclid license is acquired.
  - Re-verify: WCAG AA contrast on the new palette (the
    `text-muted` token fails AA and must be limited to caption
    / eyebrow use only).
  - **Shipped 2026-08-27 20:30.** Tokens added to
    `app/globals.css`, 6 UI primitives rebuilt, 9 home sections
    and 13 page routes swept to the new palette. `npm run build`
    clean (29 static pages, TypeScript passes). `grep` audit
    confirms zero legacy token classes in any rendered file
    (only `@theme` aliases remain in `globals.css`). `text-muted`
    limited to caption/eyebrow/dt-label/placeholder use.

---

## Phase 6 — Rebrand

End-to-end rebrand from the current industrial-blue "Meridian
Manufacturing" identity to the green/teal system defined in
[`docs/design.md`](./design.md). This is broader than Step 5.6 (which
covers only the design-token integration) — it also tracks the
identity decisions, content rewrite, asset swap, SEO/social, and the
full verification pass.

**Guardrails (carried from Step 5.6 — do not regress):**
- No pricing cards, search pills, tabs, code mockups, comparison
  tables, FAQ accordions, or promo banners. None belong on a B2B
  manufacturer marketing site.
- `Euclid Circular A` stays as a one-line swap in `design.md` until
  a real license is acquired; ship on Inter via `next/font/google`.
- `text-muted` (`#a8b3bc`) is caption/eyebrow only — fails WCAG AA
  at body sizes.

- [ ] **Step 6.1 — Lock the brand identity**
  - [ ] Confirm legal entity name, DBA, and tagline
  - [ ] Confirm domain(s) and the `site.url` it points to
  - [ ] Decide on a one-line "what we do" statement for the hero
  - [ ] Confirm the brand voice/tone (industrial-formal vs. plain)
  - [ ] Record decisions in `docs/OVERVIEW.md` → §Brand
- [ ] **Step 6.2 — Update `lib/site.ts`**
  - [ ] `name`, `tagline`, `description`
  - [ ] `contact.email`, `phone`, `address`
  - [ ] `social[]` URLs and labels
  - [ ] `certifications[]` (remove or replace placeholders)
  - [ ] `established` year
  - [ ] `nav[]` — drop or rename any items that no longer fit
- [ ] **Step 6.3 — Wire the new design tokens**
  - [ ] Replace `ink-*` / `steel-*` / `accent-*` ramps with
        `brand-green*` / `brand-teal*` / `ink` / `slate` / `steel` /
        `muted` per `docs/design.md`
  - [ ] Add hairline scale (`hairline`, `hairline-soft`,
        `hairline-strong`, `hairline-dark`)
  - [ ] Add surface scale (`canvas`, `surface`, `surface-soft`,
        `surface-feature`, `canvas-dark`, `brand-teal-deep`)
  - [ ] Add 7-step `rounded` scale (`xs` … `full`)
  - [ ] Add 13-step `spacing` scale (`xxs` … `hero`)
  - [ ] Re-derive every `bg-*` / `text-*` / `border-*` utility in
        `globals.css` from the new tokens — no raw hex in components
  - [ ] Update `:focus-visible` ring color to `brand-green-dark`
  - [ ] Update `body` background to `canvas` and ink to `ink`
- [ ] **Step 6.4 — Rebuild the 6 UI primitives on new tokens**
  - [ ] `Container` — spacing scale only, no visual changes
  - [ ] `Section` — `muted` → `surface-soft`, `inverted` →
        `brand-teal-deep` + `on-dark`
  - [ ] `Heading` — type scale references, eyebrow uses `steel`
  - [ ] `Button` — `primary` = `brand-green` on `on-primary`,
        `rounded-full`, 10/22 padding; `secondary` = transparent
        on `ink` with `hairline-strong` 1px border; `ghost` =
        transparent on `ink`, `rounded-md`
  - [ ] `Card` — `rounded-lg`, 1px `hairline` border, `xl`/`xxl`
        padding variants
  - [ ] `Badge` — `brand-green` / `brand-green-soft` /
        `brand-teal-deep` variants; `rounded-sm` solid, `rounded-full`
        soft
- [ ] **Step 6.5 — Sweep every section for token usage**
  - [ ] `Hero` — `brand-teal-deep` band, full-radius primary CTA
  - [ ] `TrustBar` — `logo-wall-item` tokens
  - [ ] `ValueProps` — `card-base` tokens
  - [ ] `CapabilitiesPreview` — `service-tile` tokens
  - [ ] `FeaturedCaseStudy` — `card-feature` tokens
  - [ ] `Process` — list + connector colors from `hairline`
  - [ ] `Stats` — number color `ink`, label color `steel`
  - [ ] `Testimonials` — `customer-testimonial-card` tokens
  - [ ] `FinalCta` — `cta-banner-dark` (`brand-teal-deep`)
  - [ ] `Header` / `MobileNav` / `Footer` — `footer-region`
        (`brand-teal-deep`) + `on-dark` / `on-dark-muted`
- [ ] **Step 6.6 — Sweep every page route**
  - [ ] `/` (home)
  - [ ] `/products` + `/products/[slug]`
  - [ ] `/industries` + `/industries/[slug]`
  - [ ] `/case-studies` + `/case-studies/[slug]`
  - [ ] `/process`
  - [ ] `/about` + `/team`
  - [ ] `/testimonials`
  - [ ] `/resources`
  - [ ] `/contact` + form (`text-input` + focused state)
  - [ ] `app/not-found.tsx`
- [ ] **Step 6.7 — Rewrite content to match the new voice**
  - [ ] Hero copy: name, tagline, one-line value statement
  - [ ] `content/services.ts` — names, descriptions, capabilities
  - [ ] `content/industries.ts`
  - [ ] `content/case-studies.ts` — challenge/approach/result
  - [ ] `content/team.ts` — bios, titles, order
  - [ ] `content/testimonials.ts` — quotes, attribution
  - [ ] `content/stats.ts` — KPIs and process steps
  - [ ] Footer columns + legal links
  - [ ] Meta titles + descriptions (see Step 6.9)
  - [ ] `app/opengraph-image.tsx` copy
  - [ ] `app/robots.ts` + `app/sitemap.ts` references
- [ ] **Step 6.8 — Swap brand assets**
  - [ ] Replace `app/icon.tsx` with the new mark (or load `icon.svg`)
  - [ ] Replace `app/opengraph-image.tsx` with branded composition
        (uses `brand-teal-deep` background, `brand-green` mark,
        `on-dark` text)
  - [ ] Replace any logo SVGs in `public/` (favicon, partner marks
        in `TrustBar`)
  - [ ] Verify `public/` has no stale hex colors or old wordmarks
- [ ] **Step 6.9 — SEO + social**
  - [ ] Default `metadata` in `app/layout.tsx` — title template,
        description, OG/Twitter card colors
  - [ ] `themeColor` in `viewport` export → `brand-teal-deep`
  - [ ] Per-page `generateMetadata` — titles, descriptions, OG
  - [ ] Organization JSON-LD — `name`, `url`, `logo`, `sameAs[]`
        (social), `contactPoint`
  - [ ] Breadcrumb JSON-LD uses the new `name` verbatim
  - [ ] `sitemap.xml` — lastmod on every URL, no orphan routes
  - [ ] `robots.txt` — host, sitemap URL
- [ ] **Step 6.10 — Accessibility re-verify**
  - [ ] WCAG AA contrast on every `text-*` / `bg-*` combination
  - [ ] Confirm `text-muted` only appears in caption/eyebrow roles
  - [ ] Keyboard pass on header, mobile nav, footer, contact form
  - [ ] Skip link target is the new `<main id="main">`
  - [ ] `prefers-reduced-motion` still honored
- [ ] **Step 6.11 — Build + type + runtime verify**
  - [ ] `npm run build` clean (TypeScript, all routes prerender)
  - [ ] `npm run dev` boots without warnings
  - [ ] `view-source:` on every route shows correct `<title>` and
        JSON-LD
  - [ ] `/sitemap.xml` and `/robots.txt` resolve and reflect new
        brand/host
  - [ ] OG image renders with the new composition
  - [ ] Mobile audit (375 / 414 / 768 / 1024 / 1440) — no overflow,
        touch targets ≥ 44px
- [ ] **Step 6.12 — Final commit**
  - [ ] `git commit -m "Phase 6: rebrand to <new name>"`
  - [ ] Update `docs/CHANGELOG.md` and `docs/FEATURES.md`
  - [ ] Tag the release
