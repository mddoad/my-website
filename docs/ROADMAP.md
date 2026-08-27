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

- [ ] **Step 1.1 — Reset the working tree**
  - [x] Wipe untracked `app/`, `components/`, `content/`, `lib/`
  - [x] Revert modified files to the `create-next-app` baseline
  - [x] Working tree is clean
- [ ] **Step 1.2 — Document the project**
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

- [ ] **Step 5.1 — Accessibility audit** (keyboard, contrast, landmarks)
- [ ] **Step 5.2 — Mobile audit** (375 / 414 / 768 / 1024 / 1440)
- [ ] **Step 5.3 — Lighthouse pass** (perf, a11y, SEO, best practices)
- [ ] **Step 5.4 — Real content** (replace placeholder brand contact info)
- [ ] **Step 5.5 — Final commit**
  - [ ] `git commit -m "Phase 5: polish + launch prep"`
