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
- [ ] **Step 1.3 — `app/layout.tsx` shell**
  - [ ] HTML lang, body class, font CSS variables wired
  - [ ] Default `metadata` (title template, OG, Twitter, robots, base URL)
  - [ ] Organization JSON-LD injected
  - [ ] Renders `<Header />` / `<main id="main">` / `<Footer />` / `<SkipLink />`
- [ ] **Step 1.4 — Design tokens in `app/globals.css`**
  - [ ] `ink-*` (10 steps), `steel-*` (10 steps), `accent-*` (7 steps)
  - [ ] Surface colors (`paper`, `surface`, `surface-inverted`)
  - [ ] Font tokens (`--font-serif`, `--font-sans`)
  - [ ] Radii (`sm`, `md`, `lg`), shadows (`card`, `raised`)
  - [ ] Base layer: body, headings, `:focus-visible`, `prefers-reduced-motion`
- [ ] **Step 1.5 — `lib/site.ts`**
  - [ ] Brand, tagline, description, URL
  - [ ] Contact (email, phone, address)
  - [ ] Social links
  - [ ] Primary nav array
  - [ ] Certifications array
  - [ ] `established` year
- [ ] **Step 1.6 — `lib/utils.ts`**
  - [ ] `cn(...)` class-name combiner
- [ ] **Step 1.7 — UI primitives**
  - [ ] `components/ui/Container.tsx` (`prose` / `wide` / `full`)
  - [ ] `components/ui/Section.tsx` (`default` / `inverted` / `muted`, padding sizes)
  - [ ] `components/ui/Heading.tsx` (h1–h4, eyebrow, align)
  - [ ] `components/ui/Button.tsx` (3 variants × 3 sizes, link + button)
  - [ ] `components/ui/Card.tsx`
  - [ ] `components/ui/Badge.tsx`
- [ ] **Step 1.8 — Layout components**
  - [ ] `components/layout/SkipLink.tsx`
  - [ ] `components/layout/Header.tsx` (desktop nav + CTA)
  - [ ] `components/layout/MobileNav.tsx` (hamburger + sheet)
  - [ ] `components/layout/Footer.tsx` (4-column)
- [ ] **Step 1.9 — SEO primitives**
  - [ ] `lib/seo.ts` — `buildMetadata` helper
  - [ ] `components/seo/JsonLd.tsx` — `organizationJsonLd`, `breadcrumbJsonLd`
- [ ] **Step 1.10 — Phase 1 home stub**
  - [ ] `app/page.tsx` placeholder explaining Phase 2 work
- [ ] **Step 1.11 — Verify Phase 1**
  - [ ] `npm run dev` boots without errors
  - [ ] Home page renders header / footer / skip link
  - [ ] Mobile nav opens and closes
  - [ ] `view-source:` shows the organization JSON-LD script tag
- [ ] **Step 1.12 — Commit**
  - [ ] `git commit -m "Phase 1: foundation"`

## Phase 2 — Home page

The home page is the only route real visitors hit first. All data is
authored in `content/*.ts` and consumed via small section components.

- [ ] **Step 2.1 — `content/stats.ts`**
  - [ ] 4 KPI entries + 4 process steps
- [ ] **Step 2.2 — `content/services.ts`**
  - [ ] 6 service entries with `slug`, `name`, `short`, `description`,
        `capabilities[]`
- [ ] **Step 2.3 — `content/industries.ts`**
  - [ ] 4 industry entries
- [ ] **Step 2.4 — `content/case-studies.ts`**
  - [ ] 3 case studies with challenge / approach / result + metrics
- [ ] **Step 2.5 — `content/team.ts`**
  - [ ] 4 leadership entries
- [ ] **Step 2.6 — `content/testimonials.ts`**
  - [ ] 3 quote entries
- [ ] **Step 2.7 — Home sections**
  - [ ] `components/sections/Hero.tsx`
  - [ ] `components/sections/TrustBar.tsx`
  - [ ] `components/sections/ValueProps.tsx`
  - [ ] `components/sections/CapabilitiesPreview.tsx`
  - [ ] `components/sections/FeaturedCaseStudy.tsx`
  - [ ] `components/sections/Process.tsx`
  - [ ] `components/sections/Stats.tsx`
  - [ ] `components/sections/Testimonials.tsx`
  - [ ] `components/sections/FinalCta.tsx`
- [ ] **Step 2.8 — Compose home**
  - [ ] `app/page.tsx` renders the sections in order
- [ ] **Step 2.9 — Verify**
  - [ ] Each section renders, breakpoints behave, links resolve
- [ ] **Step 2.10 — Commit**
  - [ ] `git commit -m "Phase 2: home page"`

## Phase 3 — Detail routes

Static and dynamic routes for the rest of the site. Most data already
exists from Phase 2.

- [ ] **Step 3.1 — `/products` index + `/products/[slug]` detail**
- [ ] **Step 3.2 — `/industries` index + `/industries/[slug]` detail**
- [ ] **Step 3.3 — `/case-studies` index + `/case-studies/[slug]` detail**
- [ ] **Step 3.4 — `/process`**
- [ ] **Step 3.5 — `/about` + `/team`**
- [ ] **Step 3.6 — `/testimonials`**
- [ ] **Step 3.7 — `/resources` (placeholder)**
- [ ] **Step 3.8 — `/contact` + form**
- [ ] **Step 3.9 — `app/not-found.tsx`**
- [ ] **Step 3.10 — Per-page `generateMetadata` + breadcrumb JSON-LD**
- [ ] **Step 3.11 — Commit**
  - [ ] `git commit -m "Phase 3: detail routes"`

## Phase 4 — SEO + assets

- [ ] **Step 4.1 — `app/robots.ts`**
- [ ] **Step 4.2 — `app/sitemap.ts`** (static + content-derived)
- [ ] **Step 4.3 — `app/opengraph-image.tsx`**
- [ ] **Step 4.4 — `app/icon.tsx`**
- [ ] **Step 4.5 — Verify**
  - [ ] `/robots.txt` resolves
  - [ ] `/sitemap.xml` resolves and includes all routes
  - [ ] OG image renders
- [ ] **Step 4.6 — Commit**
  - [ ] `git commit -m "Phase 4: SEO + assets"`

## Phase 5 — Polish

- [ ] **Step 5.1 — Accessibility audit** (keyboard, contrast, landmarks)
- [ ] **Step 5.2 — Mobile audit** (375 / 414 / 768 / 1024 / 1440)
- [ ] **Step 5.3 — Lighthouse pass** (perf, a11y, SEO, best practices)
- [ ] **Step 5.4 — Real content** (replace placeholder brand contact info)
- [ ] **Step 5.5 — Final commit**
  - [ ] `git commit -m "Phase 5: polish + launch prep"`
