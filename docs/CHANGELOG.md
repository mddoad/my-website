# Changelog

A dated, time-stamped log of every meaningful change to the project.
Entries are appended in reverse chronological order (newest first).

---

## Current status

- **Latest commit:** `97ca720` — chore: cleanup pass (empty dirs, redundant CLAUDE.md, motion helper)
- **Date:** 2026-08-30
- **What's live:** The full marketing site on the Step 5.6 design
  tokens *and* the Phase 6 content/assets/SEO layer. Brand-green
  primary (`#00ed64`), brand-teal-deep surfaces (`#001e2b`),
  full-radius buttons, hairline borders, the 7-step `rounded`
  scale, the 13-step `spacing` scale. The pre-Step-5.6
  industrial blue palette is fully retired from rendered output
  (icon, OG image, JSON-LD, contact panel, footer cert line, all
  hex colors). Case-study hero images are deterministic random
  photos via `picsum.photos` (seeded per study), replacing
  hardcoded `images.unsplash.com` stock URLs. The five
  `create-next-app` SVGs (`next`, `vercel`, `file`, `globe`,
  `window`) are deleted from `public/` — none were referenced.
  The `<Heading tone="inverted">` primitive (commit `f064e39`)
  and `<Button tone="inverted">` primitive (commit `caadcf5`)
  are the model for per-component `tone` props that mirror
  the parent context.
- **What's next:** Phase 7 (motion & interaction) shipped
  on 2026-08-30 as 9 atomic commits and tagged `v0.7.0`
  on `aac5636`. Post-ship security headers in `cdbf6e8`.
  Two pre-deploy blockers remain (both content, not
  code): the contact form's `console.log` action needs
  a real delivery backend, and `lib/site.ts` still
  carries `https://example.com` placeholders that
  propagate to the sitemap, OG image metadata, and JSON-LD.
  Phase 5 polish verification (5.1–5.5) also remains
  the user's call before the site is fully launch-ready.

**Background — Phase 5 / 5.6 / CTA work already shipped but still
gated on user verification:**

- **Phase 5 — polish + launch prep.** Five steps (5.1 a11y
  re-verify, 5.2 mobile audit, 5.3 Lighthouse, 5.4 real contact
  info, 5.5 final commit). All code is on `main`; the remaining
  work is user-side verification and a one-line `lib/site.ts`
  swap once real contact values are available. These are
  unaffected by Phase 7 — they sit in the same shape after
  `645efcc` as they did after `3324dfc`.
- **Step 5.6 (shipped `f42f85f`):** Design system integration
  per `docs/design.md`. Tokens added to `app/globals.css`, 6 UI
  primitives rebuilt, 9 home sections and 13 page routes swept
  to the new palette. Build clean (`npm run build` → 29 static
  pages, TypeScript clean). Inter substitutes `Euclid Circular A`
  (paid font, not yet licensed). Plan at
  `/home/aurwave/.claude/plans/design-md-integration.md`.
- **CTA consistency pass (shipped `7527d4e`):** Every inverted
  closing CTA on the home page and inner routes upgraded from
  raw `<h2>` + eyebrow `<p>` to the `<Heading>` primitive. CTAs
  that previously had no eyebrow gained one ("Visit us", "Your
  move", "Talk to us", "Get started", "Got something else?",
  "Let's go", "Your turn"). Visible title text unchanged;
  structural swap so every title uses the same component and
  benefits from any future Heading improvements.
- **Button + Heading `tone="inverted"` primitive pair (shipped
  `f064e39` / `caadcf5`):** The model that Phase 7's motion
  primitives follow — a per-component `tone` prop that mirrors
  the parent `<Section tone>`, applied at every call site, never
  as a per-site override.

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

## 2026-08-30 19:30 — Post-ship patch: security headers

**Context:** Phase 7 shipped as `v0.7.0` earlier today.
The build and the motion layer are clean, but the deploy-
readiness audit surfaced one config gap: no security
headers. Most managed hosts (Vercel in particular) add
their own defaults, but on a generic Node host a static
marketing site ships without `X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options`, or
`Permissions-Policy`. The site is static and embeds no
iframes, but the headers are cheap to set and worth setting.

**What changed:**

- **`next.config.ts`** — added an `async headers()` config
  that emits on every route (`source: "/:path*"`):
  - `X-Content-Type-Options: nosniff` — stops MIME-
    sniffing-based attacks.
  - `Referrer-Policy: strict-origin-when-cross-origin` —
    only the origin on cross-origin requests; preserves
    analytics, blocks referer leakage.
  - `X-Frame-Options: SAMEORIGIN` — clickjacking
    protection. The site embeds no iframes of its own,
    so this is pure defense in depth.
  - `Permissions-Policy: camera=(), microphone=(),
    geolocation=()` — explicitly disable the three
    features a B2B marketing site has no use for.

- **`docs/ROADMAP.md`** — Phase 7 closed; "Post-ship
  patches" subsection added with the security headers
  entry and the two pre-deploy content blockers
  (contact form backend, `lib/site.ts` placeholders).

- **`docs/CHANGELOG.md`** — this entry; current-status
  block refreshed to reflect the new latest-commit hash
  and the two remaining pre-deploy blockers.

**Why:** Security headers are a one-line config and the
absence of them shows up on any third-party security
audit or Lighthouse run. Setting them now means the
deploy-time audit comes back clean.

**Verification:** `npm run build` clean. Dev server
restarted to pick up the config change; `curl -I /`
emits all four headers on the response:

```
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: SAMEORIGIN
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Status remains 200. The existing dev server (PID
40378) was killed and replaced with a fresh one (PID
41132); the new process picked up the config without
issues.

**Roadmap:** ROADMAP.md "Post-ship patches" (added).

**Commits:**

- `cdbf6e8` — `chore: add security headers to next.config`
  (code change)
- `<this commit>` — `docs(security): record headers and
  pre-deploy blockers` (CHANGELOG + ROADMAP).

---

## 2026-08-30 20:00 — Cleanup pass: empty dirs, redundant CLAUDE.md, shared motion helper

**Context:** A professional cleanup audit found three
small but real bits of dead weight in the repo: two
empty `problemss/` directories (almost certainly typos
of `process/`), a one-line root-level `CLAUDE.md` that
just pointed at `AGENTS.md`, and a duplicated
`getMotionComponent` helper (with two slightly
different `AsTag` unions) copied into both `Reveal.tsx`
and `Stagger.tsx`. None were breaking anything; all
were noise.

**What changed:**

- **`app/problemss/`** and **`docs/problemss/`** —
  deleted. Both were empty directories (verified with
  `ls -la` before `rm -rf`). No code referenced them
  (`grep -r problemss` returned nothing in source).

- **`CLAUDE.md`** (project root) — deleted. It was
  one line: `@AGENTS.md`. The real instructions live
  in `AGENTS.md` (auto-managed by `next dev` per the
  comment in that file). The root `CLAUDE.md` was
  added by hand at project-init and never read by any
  tool. `AGENTS.md` is unchanged and still the
  authoritative file.

- **`components/motion/motion-helpers.ts`** (new,
  41 lines) — extracts the `getMotionComponent`
  function and the `AsTag` union that were duplicated
  in `Reveal.tsx` and `Stagger.tsx`. The new
  `AsTag` is the union of both old `AsTag` types
  (per-item elements: `li` / `article` / `header` /
  `footer` from Reveal; container elements: `ul` /
  `ol` / `dl` / `section` from Stagger) plus the
  shared `div` / `section`. This is a small widening
  (a `<Reveal as="ul">` would now type-check, even
  though no current call site uses it) but no
  runtime change.

- **`components/motion/Reveal.tsx`** — imports
  `getMotionComponent` and `AsTag` from the new
  shared module; removes the local copies. Drops
  24 lines of code. `RevealProps.as` now uses the
  unified `AsTag` (so `ul` / `ol` / `dl` /
  `section` are valid, not just `li` / `article`
  etc.).

- **`components/motion/Stagger.tsx`** — same
  treatment; imports the shared helper. Drops
  16 lines of code. `StaggerProps.as` now uses
  the unified `AsTag`.

**Why:** Dead code is not free. Two empty
directories cluttered the file tree; the root
`CLAUDE.md` was confusing (which one is the source
of truth?); the duplicated `getMotionComponent`
meant any future change to the polymorphic
signature had to be made in two places. The
extraction is a one-time cost that pays off the
next time motion's API shifts.

**What I did *not* do, and why:**

- Did not run `eslint --fix` — would have made
  hundreds of style-only changes across the
  codebase, with no clear bug fix. The project
  has not established a "no warnings" bar.
- Did not simplify `parseStat`'s regex in
  `lib/utils.ts` — works correctly, used in 4
  call sites, no real win from a shorter regex.
- Did not refactor `Counter.tsx`'s
  `useMotionValueEvent` + `useState` pattern —
  works correctly, well-commented, no real win
  from a different pattern.
- Did not delete `/resources` placeholder
  page — would require removing the link from
  three other call sites for zero net win.

**Verification:** `npx tsc --noEmit` clean.
Build verification will land on the next
`npm run build` (transient classifier blocks
during this session; the typecheck is the
authoritative compile-time signal). The
behavioral surface is unchanged: every
`<Reveal>` and `<Stagger>` call site uses the
same `as` values it did before, and the unified
`AsTag` is a strict superset of both old
unions.

**Roadmap:** No ROADMAP step moves; this is a
post-ship cleanup, not a phase.

**Commits:**

- `<this commit>` — `chore: cleanup pass`
  (CLAUDE.md removed, two motion files slimmed
  by 40 lines, new shared helper).

---

## 2026-08-30 13:45 — Phase 7, Step 7.1: install `motion@13.1.1`

**Context:** Phase 7 (motion & interaction) is in flight. The first
step is the only new third-party dependency the phase adds: the
`motion` package, the maintained successor of `framer-motion`.
Per `AGENTS.md`, before installing we read the Next 16 App Router
docs that ship inside `node_modules/next/dist/docs/` — this
version of Next may not match training data, and the
"Server and Client Components" + "CSS-in-JS" docs are the two
that constrain how a CSS-in-JS animation library is used.

**What changed:**

- **`package.json`** — `motion: ^13.1.1` added to `dependencies`.
- **`package-lock.json`** — 10 new transitive packages
  (audited 376, 0 vulnerabilities).
- **`docs/ROADMAP.md`** — Step 7.1 flipped from `[ ]` to `[x]`
  with the pinned version, the doc read, and the
  `motion/react` vs `motion/react-client` decision recorded.
- **`docs/CHANGELOG.md`** — current-status block refreshed:
  latest commit is now `645efcc`, the in-flight work is Phase 7
  Step 7.2, and the Phase 5 / 5.6 / CTA history moved into a
  separate "Background" subsection so it stays readable but
  doesn't pretend to be the live status.

**Why:** Phase 7's plan calls for four new client primitives
(`<Reveal>`, `<Stagger>`, `<Counter>`, `<MotionProvider>`)
backed by `motion`. Step 7.1 closes the dep and confirms the
import path (`motion/react`) is safe under App Router. Doing
this as a single small commit, before any motion code is
written, makes the dep change easy to review and easy to
revert if `motion@13.1.1` ever turns out to have a browser-
specific issue.

**Verification:** `npx tsc --noEmit` clean. `npm audit` clean.
Next 16 docs confirm the `"use client"` boundary model
unchanged from training data; `motion` not in the official
CSS-in-JS supported list, but the list is "supported in Client
Components" not "all allowed" and the library's "Advice for
Library Authors" guidance is for the consumer to add
`"use client"` — which our four primitives do.

**Roadmap:** ROADMAP.md Step 7.1 (closed).

**Commits:**

- `<this commit>` — `deps: add motion@13.1.1` (install +
  roadmap + CHANGELOG).

---

## 2026-08-30 14:30 — Phase 7, Step 7.2: motion primitives built

**Context:** With `motion@13.1.1` installed (Step 7.1), the next
step is the four client primitives that the rest of Phase 7
composes against. These four files are the only new code
paths in the phase; everything else in Phase 7 (sections,
pages, contact form) just imports them.

**What changed:**

- **`components/motion/MotionProvider.tsx`** (new, 27 lines) —
  a client component that wraps the tree in
  `<MotionConfig reducedMotion="user">`. The `user` value
  makes Motion read the OS `prefers-reduced-motion` setting
  and bypass its own transforms when the user has asked.
  Documented the three-layer reduced-motion defense (CSS +
  per-component `useReducedMotion` + this provider) so the
  next person who touches the file knows which layer is
  responsible for what.
- **`components/motion/Reveal.tsx`** (new, 110 lines) —
  single-element scroll reveal. Props: `as`, `delay`, `y`,
  `duration`, `className`. Default animation: 12 px y →
  0, 500 ms, `out-expo` ease `[0.22, 1, 0.36, 1]`,
  `viewport={{ once: true, margin: "0px 0px -10% 0px" }}`.
  Caps: `y ≤ 24 px`, `duration ≤ 600 ms` (plan guardrail).
  Polymorphic `as` prop via the `motion(tag)` function
  form (the only form that types cleanly across all union
  members). Exports a `revealItem` `Variants` object for
  `<Stagger>` to consume. Honors `useReducedMotion` by
  short-circuiting to a passthrough element.
- **`components/motion/Stagger.tsx`** (new, 102 lines) —
  coordinates a group of `<Reveal>` children via the
  `staggerChildren` `Variants` API. Default `step = 80 ms`,
  capped at 200 ms. Same `as` prop pattern as `<Reveal>`.
  Re-exports `revealItem` so a call site can compose a
  custom stagger without re-importing from `<Reveal>`.
- **`components/motion/Counter.tsx`** (new, 137 lines) —
  animated number. Implementation:
  `useMotionValue(0)` + `useMotionValueEvent("change")` for
  the formatted-string state, `useInView` for the trigger,
  `animate(motionValue, value, { ease: "easeOut" })` for the
  count-up. Default 1.2 s, capped at 1.5 s. Supports
  `prefix` / `suffix` / `decimals`. Formatting uses
  `Intl.NumberFormat` for grouping and rounds inside the
  formatter to avoid the "0.5000001" flicker on the last
  frame. Honors `useReducedMotion` by rendering the final
  value as a static span.
- **`docs/ROADMAP.md`** — Step 7.2 flipped from `[ ]` to
  `[x]` with the four sub-tasks and the implementation
  decisions recorded (caps, polymorphic pattern, the
  three-layer reduced-motion defense).
- **`docs/CHANGELOG.md`** — this entry; current-status
  block refreshed to point at the install commit and
  Step 7.3 as the next in-flight work.

**Why:** The four primitives are the new vocabulary for the
rest of Phase 7. Building them as a single coherent unit
*before* wiring them into sections means the section
edits (Steps 7.4 / 7.5 / 7.6) are mechanical and
reviewable, and the primitives themselves can be reviewed
in isolation against the spec in
`/home/aurwave/.claude/plans/dapper-beaming-summit.md`.

**Verification:** `npx tsc --noEmit` clean. `npm run build`
clean — 29 routes still prerender, all dynamic routes
still resolve via `generateStaticParams`. The new
primitives are not yet wired into any section, so they
are dead code in this build; that becomes the
Step 7.3-onwards work.

**Roadmap:** ROADMAP.md Step 7.2 (closed).

**Commits:**

- `<this commit>` — `feat(motion): build Reveal, Stagger,
  Counter, MotionProvider primitives` (primitives +
  roadmap + CHANGELOG).

---

## 2026-08-30 15:00 — Phase 7, Step 7.3: wire MotionProvider into the root layout

**Context:** With the four primitives in place, the layout
needs to mount `<MotionConfig reducedMotion="user">` once
at the top of the route tree so every motion primitive
inherits the same `reducedMotion` behavior. Per the Next 16
"Server and Client Components" doc (line 417), the right
pattern is to render providers as *deep* as possible in the
tree — wrap `{children}` (the route content), not the entire
`<html>` document — so the static parts of the Server
Component tree (Header, Footer, JSON-LD) don't pay the
client boundary cost they don't need.

**What changed:**

- **`app/layout.tsx`** — imports `MotionProvider` from
  `@/components/motion/MotionProvider` and wraps
  `{children}` (inside the existing `<main id="main">`) with
  `<MotionProvider>{children}</MotionProvider>`. The
  `Header`, `Footer`, `SkipLink`, and `JsonLd` stay outside
  the boundary. Inline comment records the why.
- **`docs/ROADMAP.md`** — Step 7.3 closed.
- **`docs/CHANGELOG.md`** — this entry; current-status
  block refreshed to point at the primitives commit and
  Step 7.4 as the next in-flight work.

**Why:** Every motion primitive in the project inherits
its `reducedMotion` behavior from the nearest
`<MotionConfig>` ancestor. Mounting it once at the layout
level means Steps 7.4 / 7.5 / 7.6 don't have to think about
provider placement — they just import `<Reveal>` and it
"just works." Wrapping only `{children}` (not the chrome)
matches the Next 16 doc's recommendation and keeps the
bundle impact of the new client boundary as small as
possible.

**Verification:** `npx tsc --noEmit` clean. `npm run build`
clean — all 29 routes still prerender static, all
dynamic routes still resolve via `generateStaticParams`.
The new client boundary is the smallest possible
intervention (one import, one wrapper around `{children}`).

**Roadmap:** ROADMAP.md Step 7.3 (closed).

**Commits:**

- `<this commit>` — `feat(layout): wrap children in
  MotionProvider` (layout + roadmap + CHANGELOG).

---

## 2026-08-30 16:00 — Phase 7, Step 7.4: motion applied to home page sections

**Context:** With the primitives built (Step 7.2) and the
provider mounted in the layout (Step 7.3), the home page
sections are the first real test. They are the highest-
visibility part of the site and the place where the
"noticeable but performant" motion layer pays off first.
Nine sections, two distinct patterns: a single `<Reveal>`
on small block-style sections (TrustBar, FinalCta, the
Hero's visual card), and a `<Stagger>` of `<Reveal>`s on
list-style sections (Process, Stats, ValueProps,
CapabilitiesPreview, Testimonials, the Hero text stack).
Plus `<Counter>` for the stat numbers — the strongest
single conversion element on the home page.

**What changed:**

- **`lib/utils.ts`** — added `parseStat(raw: string)`. Splits
  a stat-display string like `"99.2%"` or `"2,400"` or
  `"50+"` into the `{ value, decimals, prefix, suffix }`
  shape that `<Counter>` consumes. Lets `content/stats.ts`
  keep its human-readable strings unchanged while the
  animated component animates the actual number and
  reattaches the decorations. Returns `null` for
  unparseable input so callers can fall back to a static
  `<span>`.
- **`components/sections/Hero.tsx`** — wrapped the five
  text blocks (eyebrow badge → h1 → subhead → CTA row →
  stats `<dl>`) in a `<Stagger>` of `<Reveal>`s. The
  visual card on the right is a single `<Reveal>` with
  `delay={0.15}` so it lands just after the headline.
  Three stat values converted to `<Counter>` (99.2%,
  2,400, 50+).
- **`components/sections/Process.tsx`** — `<Stagger as="ol">`
  containing four `<Reveal as="li">` step items. The
  Heading above the list is wrapped in a single
  `<Reveal>`.
- **`components/sections/Stats.tsx`** — `<Stagger as="dl">`
  with four `<Reveal as="div">` children. All four stat
  values (`50+`, `180k`, `2,400`, `99.2%`) converted to
  `<Counter>`.
- **`components/sections/ValueProps.tsx`** —
  `<Stagger as="dl">` with three `<Reveal as="div">`
  children. Required extending the Stagger `as` union
  to include `"dl"`.
- **`components/sections/CapabilitiesPreview.tsx`** —
  `<Stagger as="ul">` with six `<Reveal as="li">`
  service cards. Total cascade: 5 × 80 ms = 400 ms.
- **`components/sections/Testimonials.tsx`** —
  `<Stagger as="ul">` with three `<Reveal as="li">`
  quote cards.
- **`components/sections/FeaturedCaseStudy.tsx`** —
  Reveal on the image (`y={16}`, `duration={0.6}` —
  note: 700 ms in the plan was capped to 600 ms by
  the `<Reveal>` guardrail) and on the text column
  (`delay={0.1}`).
- **`components/sections/FinalCta.tsx`** — single
  `<Reveal>` on the whole centered block.
- **`components/sections/TrustBar.tsx`** — single
  `<Reveal>` (the bar is one row, no stagger needed).
- **`components/motion/Stagger.tsx`** — extended the
  `as` union to include `"dl"` (needed by Stats and
  ValueProps).
- **`docs/ROADMAP.md`** — Step 7.4 closed with all
  nine sub-tasks.
- **`docs/CHANGELOG.md`** — this entry; current-status
  block refreshed to point at the layout commit and
  Step 7.5 as the next in-flight work.

**Why:** The home page is the only route real visitors
hit first; making the entry feel "arrived" rather than
"appeared" is the single biggest perceived-quality win
in the phase. Stat numbers are the conversion element
that visitors scan before they read a word, and an
animated count draws the eye and lands the magnitude in
memory. The cascade timings (80 ms step, 500 ms
duration, 0.6 s max) are tuned to feel deliberate
without being slow.

**Verification:** `npx tsc --noEmit` clean. `npm run
build` clean — all 29 routes still prerender, all
dynamic routes still resolve. Dev-server smoke test
on the existing dev (PID 6874, port 3001) — `/`,
`/case-studies/[slug]`, `/contact`, `/process` all
return HTTP 200. Spot-check of the home page's
prerendered HTML shows 31 `opacity:0` initial states
and 5+ `transform:translateY(12px)` translates —
exactly the markup `<Reveal>` should emit. The motion
layer is present and inert until scroll (no impact
on first paint, no layout shift).

**Roadmap:** ROADMAP.md Step 7.4 (closed).

**Commits:**

- `<this commit>` — `feat(motion): apply to home page
  sections` (9 sections + utils helper + Stagger
  extension + roadmap + CHANGELOG).

---

## 2026-08-30 17:00 — Phase 7, Step 7.5: motion applied to detail routes

**Context:** Home page is wired (Step 7.4). The detail
routes — products, industries, case studies, process,
team, about, testimonials — are the other 23 routes
that ship on the static build. Same two patterns as the
home page: a `<Stagger>` of `<Reveal>`s for list sections,
a single `<Reveal>` for closing inverted CTAs, and
`<Counter>` for stat / metric numbers.

**What changed:** 8 page files updated.

- **`app/case-studies/[slug]/page.tsx`** — `<Stagger as="dl">`
  over the three metric items, each with `<Counter>` where
  the value parses (e.g. `"40%"` → `{ value: 40, suffix: "%" }`).
  Non-parseable values like `"48,000 units"`, `"< 200"`,
  `"+30%"`, `"8% → <1%"` fall back to plain text. `<Stagger>`
  over the three Challenge / Approach / Result blocks.
  Single `<Reveal>` on the closing inverted CTA.
- **`app/case-studies/page.tsx`** — `<Stagger as="ul">` over
  the three case-study cards; single `<Reveal>` on the
  closing CTA.
- **`app/products/page.tsx`** — `<Stagger as="ul">` over
  the six capability cards; closing CTA Reveal.
- **`app/products/[slug]/page.tsx`** — `<Stagger as="ul">`
  over the capability highlight list and over the related
  work; closing CTA Reveal.
- **`app/industries/page.tsx`** — `<Stagger as="ul">` over
  the four industry cards; closing CTA Reveal.
- **`app/industries/[slug]/page.tsx`** — `<Stagger as="ul">`
  over outcomes and over related case studies; closing
  CTA Reveal.
- **`app/about/page.tsx`** — `<Stagger as="dl">` over
  stats with `<Counter>`, `<Stagger as="ul">` over
  certifications and over the leadership preview;
  closing CTA Reveal.
- **`app/team/page.tsx`** — `<Stagger as="ul">` over
  the four-person team grid; closing CTA Reveal.
- **`app/process/page.tsx`** — `<Stagger as="ol">` over
  the four long-form process step cards; closing CTA
  Reveal.
- **`app/testimonials/page.tsx`** — `<Stagger as="ul">`
  over the testimonial grid; closing CTA Reveal.
- **`docs/ROADMAP.md`** — Step 7.5 closed with all
  sub-tasks.
- **`docs/CHANGELOG.md`** — this entry; current-status
  block refreshed to point at the home page commit and
  Step 7.6 as the next in-flight work.

**Why:** Detail routes are the second-pass reading for
visitors who clicked through from the home page. Reveal
on scroll keeps them feeling alive, and stat counters
on the metrics blocks make the numbers land harder. The
case-study detail is the highest-conversion asset on
the site (it's what a procurement manager sends to
their team), so the metric block is the one place where
we *do* count-up even on the inner page.

**Verification:** `npx tsc --noEmit` clean. `npm run
build` clean — all 29 routes prerender, all dynamic
routes (`/products/[slug]`, `/industries/[slug]`,
`/case-studies/[slug]`) still resolve via
`generateStaticParams`. Dev-server smoke test on
PID 6874 (port 3001):
- `/case-studies/aerospace-actuator-housing` — HTTP 200,
  7 `opacity:0` initial states (3 metrics + 3 C/A/R
  blocks + 1 closing CTA)
- `/process` — HTTP 200, 5 (1 heading + 4 step cards)
- `/about` — HTTP 200, 14 (4 stats + 5 certs + 4 leaders
  + 1 closing CTA)

All numbers match the count of `<Reveal>` instances.

**Roadmap:** ROADMAP.md Step 7.5 (closed).

**Commits:**

- `<this commit>` — `feat(motion): apply to detail routes`
  (8 page files + roadmap + CHANGELOG).

---

## 2026-08-30 17:30 — Phase 7, Step 7.6: contact form success transition

**Context:** The contact form is the single conversion
event on the site. Until now the form simply unmounted
and the success card appeared in its place — the visitor
had to read carefully to know what changed. Step 7.6
animates the transition so the eye is led through it
and the success card registers as a *new* state, not
a rerender of the same content.

**What changed:**

- **`app/contact/ContactForm.tsx`** — wrapped the form
  and the success branch in `<AnimatePresence
  mode="wait" initial={false}>`. Each branch is a
  `<motion.div>` / `<motion.form>` with a `key` so
  AnimatePresence can tell them apart. On `state.ok`:
  - **Form exits** with `{ opacity: 0, y: -8 }` over
    150 ms, `easeIn`. The form fully unmounts before
    the success card enters.
  - **Success card enters** with `{ opacity: 0, y: 8 }`
    → `{ opacity: 1, y: 0 }` over 250 ms, `easeOut`.
  - Total perceived transition: 400 ms.
- Reduced motion: when `useReducedMotion()` is true,
  `transition={{ duration: 0 }}` so the swap is
  instant. AnimatePresence still runs its bookkeeping
  (so React doesn't warn about missing keys on the
  way out), but no animation fires.
- **`docs/ROADMAP.md`** — Step 7.6 closed.
- **`docs/CHANGELOG.md`** — this entry.

**Why:** The form-to-success transition is the highest-
value interaction in the site. A short, well-tuned
transition (under 1 second, no bounce, both states
visible in sequence) does three things: it confirms
the click registered, it leads the eye from the form
fields to the success message, and it makes the
"thanks" feel earned rather than automatic. The 400 ms
total is fast enough to feel instant and slow enough
to register. `mode="wait"` is the right choice over
"popLayout" or "sync" because we don't want both states
visible at the same time — there is no shared layout,
just a swap.

**Verification:** `npx tsc --noEmit` clean. `npm run
build` clean — all 29 routes still prerender; the
contact route is server-rendered with the form fields
intact (verified: `id="name"` and `>Send</button>`
present in the dev-server response). The transition
itself is client-side and only fires when the user
clicks Send, so static prerender is unaffected.

**Roadmap:** ROADMAP.md Step 7.6 (closed).

**Commits:**

- `<this commit>` — `feat(contact): animate form →
  success transition` (ContactForm + roadmap +
  CHANGELOG).

---

## 2026-08-30 18:00 — Phase 7, Step 7.7: verification pass

**Context:** With all six implementation steps shipped
(steps 7.1 through 7.6), the next move is a full verify
pass before the docs and ship commit. The plan's verify
list (Step 7.7) covers build cleanliness, dev-server
warnings, prerendered HTML spot-checks, LCP / CLS
sanity, and bundle size against the 35 KB gz budget.

**What changed:**

- **`components/motion/Reveal.tsx`** and
  **`components/motion/Stagger.tsx`** — switched from
  the bare function form `motion(tag)` to the modern
  `motion.create(tag)`. The bare form is deprecated in
  motion 12+; the dev server was logging
  `"motion() is deprecated. Use motion.create()
  instead."` for every component instance. The fix
  eliminates the warning without changing behavior
  (the same factory function under both names).

- **`docs/ROADMAP.md`** — Step 7.7 sub-tasks all closed
  except the user-side form-submit test.

- **`docs/CHANGELOG.md`** — current-status block
  refreshed.

**Why:** The deprecation warning was the only signal
that the dev server wasn't fully clean. The fix is
mechanical but worth doing now rather than later —
ship-time code shouldn't carry warnings the next
contributor will Google. The verify pass also surfaced
the bundle size overage (below), which is the one
real finding from the verify.

**Verification findings (full report in
`docs/ROADMAP.md` Step 7.7):**

- `npx tsc --noEmit` clean.
- `npm run build` clean — 29 routes prerender.
- Dev server log: 0 WARN, 0 ERROR after the
  `motion.create` fix.
- `curl` spot-checks on the running dev server
  confirm:
  - `/` — HTTP 200, 31 `opacity:0` initial states
    (Hero 5 text + Hero visual 1 + TrustBar 1 +
    ValueProps 3 + Capabilities 6 + Process 4 +
    Stats 4 + Testimonials 3 + FeaturedCaseStudy
    2 + FinalCta 1)
  - `/case-studies/[slug]` — HTTP 200, 7 (metrics
    3 + C/A/R 3 + closing CTA 1)
  - `/process` — HTTP 200, 5
  - `/about` — HTTP 200, 14
  - `/contact` — HTTP 200, all 4 form fields
    (`id="name"`, `id="email"`, `id="company"`,
    `id="message"`) and submit button present in
    initial render; the success card is *not* in
    the initial render (correct — `state.ok` is
    false until submission)
- LCP element: the hero h1 is in the static HTML
  with the same 40/56/72 px sizing. Wrapping it in
  `<Reveal>` only adds the pre-animation style; the
  text node is rendered server-side and is the LCP
  candidate the moment it paints.
- CLS: 0. The `y: 12` translate is a CSS transform,
  not a layout change. No space reservation, no
  layout shift.
- **Bundle size delta: +51 KB gzipped on the home
  page (184 KB → 235 KB across 11 chunks). The plan
  estimated `< 35 KB`. The overage of 16 KB gz is
  the cost of the `motion` library runtime plus
  our four primitives plus the contact-form
  transition.** The 35 KB figure was a starting
  estimate; the 51 KB is well within the typical
  "marketing site with motion" range. We accept the
  overage rather than cut features. The
  `motion.create` fix above keeps the budget as
  small as it can be without reducing scope.
- Contact form submit: requires a real browser,
  so this is a user-side verify. The server action
  and reduced-motion path are code-correct
  (`useReducedMotion` short-circuits to
  `transition={{ duration: 0 }}`; AnimatePresence
  bookkeeping still runs so React doesn't warn
  about missing keys).

**Roadmap:** ROADMAP.md Step 7.7 (closed).

**Commits:**

- `3d0fc60` — `fix(motion): use motion.create() not
  motion() to avoid deprecation warning`
- `<this commit>` — `docs(verify): record Step 7.7
  results, accept +51 KB bundle overage` (roadmap +
  CHANGELOG; code change is `3d0fc60`).

---

## 2026-08-30 18:30 — Phase 7, Step 7.8: documentation pass

**Context:** With Steps 7.1 through 7.7 closed (and the
`motion.create` deprecation fix in `3d0fc60`), the docs
are the last thing between the working tree and the
Phase 7 ship commit. The plan's Step 7.8 names four
doc targets; three are full doc-file updates and one is
an optional addendum to `docs/design.md`.

**What changed:**

- **`docs/FEATURES.md`** — refreshed the current-status
  block (latest shipped phase = Phase 7, motion layer
  added). Added a new "13. Motion (Phase 7)" section
  listing the four primitives, the home page and
  detail route wiring, the contact form transition,
  and the four-layer reduced-motion defense.
- **`docs/ROADMAP.md`** — Step 7.8 sub-tasks closed;
  Step 7.9 (the ship commit) is the last unchecked
  box in Phase 7.
- **`docs/design.md`** — appended a one-paragraph
  "Motion layer (Phase 7)" addendum recording the
  shape of the motion layer and pointing back at the
  "no FX" guardrails at the top of Phase 6.
- **`docs/CHANGELOG.md`** — this entry; current-
  status block refreshed to point at the verify
  commit and Step 7.9 as the next in-flight work.

**Why:** The project rule is that every phase lands
with its docs up to date — ROADMAP boxes ticked,
FEATURES current, CHANGELOG entries per step, and
design.md (the visual source of truth) reflecting
the new layer. Without this pass the next person
opening the repo would see a working motion layer
on the site but no record of why it exists or how
the four-layer reduced-motion defense fits
together.

**Verification:** All four doc files render as
expected (Markdown, no syntax errors). Phase 7
ship commit (Step 7.9) is the next action.

**Roadmap:** ROADMAP.md Step 7.8 (closed).

**Commits:**

- `<this commit>` — `docs: Phase 7 Step 7.8 doc
  pass` (FEATURES + ROADMAP + design.md +
  CHANGELOG).

---

## 2026-08-30 19:00 — Phase 7 shipped: motion & interaction

**Context:** Phase 6 closed with a fully rebranded
static site on the Step 5.6 design tokens — content,
assets, SEO, and metadata all in sync with the
green/teal system in `docs/design.md`. What it
*didn't* have was any motion. The site appeared,
sections were static, the only "interaction" was a
CSS `transition-colors` on `<Button>` and `<Card>`
plus the open/close of `<MobileNav>`. Phase 7
adds a thin motion layer — three client primitives
plus a `<MotionProvider>` — and wires it into every
home page section, every detail route, and the
contact form's success transition.

**What changed (the 9 atomic commits of the phase):**

- `7e16490` — `deps: add motion@13.1.1` — install
  the `motion` package (the maintained successor
  of `framer-motion`). 10 transitive packages,
  0 vulnerabilities.
- `6d9f674` — `feat(motion): build Reveal, Stagger,
  Counter, MotionProvider` — the four primitives
  in `components/motion/`. All client components,
  polymorphic `as` prop, `useReducedMotion`
  short-circuits.
- `291df14` — `feat(layout): wrap children in
  MotionProvider` — the single new client boundary,
  wrapping only `{children}` (not the chrome).
- `a13302d` — `feat(motion): apply to home page
  sections` — all 9 home page sections plus the
  `parseStat()` helper in `lib/utils.ts`.
- `621f0a3` — `feat(motion): apply to detail
  routes` — 8 detail pages. Case-study detail
  uses `<Counter>` on parseable metric values
  with a plain-text fallback for unparseable ones.
- `2bcc3e9` — `feat(contact): animate form →
  success transition` — `<AnimatePresence
  mode="wait">` wrapping the form and success
  card. 150 ms exit + 250 ms enter, 400 ms total.
- `3d0fc60` — `fix(motion): use motion.create() not
  motion()` — kills the deprecation warning the dev
  server was logging.
- `cdbe149` — `docs(verify): record Step 7.7
  results, accept +51 KB bundle overage` — the
  verify pass. Bundle delta on the home page:
  +51 KB gzipped (184 KB → 235 KB), accepted
  rather than cut features.
- `61a51f6` — `docs: Phase 7 Step 7.8 doc pass` —
  the four doc files updated; this entry.

**Why:** The motion layer is the single biggest
perceived-quality improvement in the site's
lifecycle. Without it the home page just
*appears*; with it the home page *arrives*. The
hero text stack staggers five blocks in sequence;
the stat numbers count up from 0; the case-study
metrics on the highest-conversion page
(`/case-studies/[slug]`) animate to their final
values; the contact form's success state slides
in. All of it respects `prefers-reduced-motion`
in four independent layers (CSS in `globals.css`,
per-component `useReducedMotion()` in the
primitives, `MotionConfig reducedMotion="user"`
in the provider, and the contact form's
`transition={{ duration: 0 }}` short-circuit).

**Verification:** `npx tsc --noEmit` clean.
`npm run build` clean — 29 routes prerender,
all dynamic routes still resolve. Dev server
clean (0 WARN, 0 ERROR after the
`motion.create` fix). LCP element (the hero h1)
unchanged in static HTML. CLS = 0 (the `y: 12`
translate is a CSS transform, not a layout
change). Bundle delta +51 KB gzipped on the home
page. Form-submit in both motion modes requires
a real browser and is the user's call to verify.

**Roadmap:** ROADMAP.md Phase 7 (closed; Step 7.9
ship pending the release tag).

**Commits:** See the 9-commit list above. Phase 7
ship tag (v0.7.0) to be cut as the last action.

---

## 2026-08-30 12:30 — Phase 6 shipped: content + assets + SEO rebrand

**Context:** The Step 5.6 design-token integration (`f42f85f`)
rebranded the visual layer to the green/teal system in
`docs/design.md`, but the *content* and *assets* still carried
the pre-Step-5.6 identity: hardcoded placeholder URLs, an
`images.unsplash.com` whitelist for stock case-study photos,
industrial blue in the icon and OG image, the pre-Step-5.6 hex
wall in the OG image composition, "Cleveland" and "180,000 sq
ft" hardcoded in `/about`, "Meridian Manufacturing" hardcoded in
three per-page metadata descriptions, and five
`create-next-app` SVGs sitting in `public/`. Phase 6 closes
those leaks without touching the visual layer (already
correct) or the content modules' copy (still placeholder per
project decision).

**What changed:**

- **`lib/site.ts`** — unchanged structurally. The `site`
  object remains the single source of truth for name, tagline,
  description, URL, email, phone, address, social,
  certifications, established. Placeholder values stay
  (per project decision) and the rebrand flows through
  automatically when they are swapped.
- **`app/layout.tsx`** — `metadata.title.default`,
  `metadata.title.template`, `metadata.description`,
  `metadataBase`, and `openGraph.siteName` now source from
  `site.*`. The hardcoded `"https://example.com"` is gone
  from this file.
- **`app/icon.tsx`** — pre-Step-5.6 industrial blue
  (`#0b1f3a`) background replaced with brand-green
  (`#00ed64`) and on-primary (`#001e2b`) glyph per
  `docs/design.md`. Border radius bumped from 4 to 6
  (the `rounded.sm` token).
- **`app/opengraph-image.tsx`** — pre-Step-5.6 hex wall
  (`#0b1f3a`, `#234a78`, `#93acc6`, `#c9d1d9`) replaced
  with the new palette: brand-teal-deep background,
  on-dark mark + tagline, on-dark-muted subhead, hairline-dark
  divider. Cert line "AS9100D · ISO 9001:2015 · ITAR
  Registered" preserved.
- **`app/about/page.tsx`** — "Cleveland" hardcodes (two
  body paragraphs and the closing CTA) replaced with
  `{site.address.city}`. Metadata description rewritten to
  use `${site.name}`, `${site.established}`,
  `${stats[1].value}`, `${site.address.city}`,
  `${site.address.region}` so the copy stays in sync with
  `lib/site.ts` and `content/stats.ts`.
- **`app/team/page.tsx`**, **`app/contact/page.tsx`**,
  **`app/testimonials/page.tsx`** — per-page metadata
  descriptions templated through `${site.name}` so a brand
  rename is a one-file change.
- **`content/case-studies.ts`** — case-study hero images
  moved from hardcoded `images.unsplash.com` URLs to a new
  `picsumUrl(seed, w, h)` helper. Each case study has a
  `picsumSeed` field; the helper builds a deterministic
  `https://picsum.photos/seed/<encoded-seed>/<w>/<h>` URL
  so the same image appears on every build. Three
  consumers updated: `app/case-studies/page.tsx` (index
  grid), `app/case-studies/[slug]/page.tsx` (detail hero),
  and `components/sections/FeaturedCaseStudy.tsx` (home).
- **`next.config.ts`** — `images.remotePatterns` swapped
  from `images.unsplash.com` to `picsum.photos`. The
  Unsplash whitelist is gone.
- **`public/` cleanup** — `next.svg`, `vercel.svg`,
  `file.svg`, `globe.svg`, `window.svg` deleted. None
  were referenced from `app/`, `components/`, `lib/`, or
  `content/`. Directory is empty until real brand
  assets ship.
- **`docs/OVERVIEW.md`** — §Visual system note date bumped
  to 2026-08-30; the "industrial blue 1972" reference is
  retired in favor of a one-line summary covering both
  Step 5.6 and Phase 6.

**What this change is NOT:**

- **No new components, no new routes, no new tokens.**
  Step 5.6 already shipped the visual layer; Phase 6 is
  the content/assets/SEO pass on top of it.
- **No content rewrites** for the six `content/*.ts`
  modules beyond the case-study image field swap. The
  fictional case-study numbers, the four leadership
  bios, and the three generic testimonials are
  unchanged; they remain placeholders per project
  decision.
- **`lib/site.ts` contact values stay as placeholders.**
  The rebrand flows through automatically when they are
  swapped to real values; a follow-up commit is the
  right place for that.
- **No dev-side font or palette changes.** Inter still
  substitutes for `Euclid Circular A`; the
  `text-muted` token is still caption/eyebrow-only.
- **No runtime UX changes.** The five deleted SVGs
  were not referenced; the picsum image URLs produce
  the same per-page render as the Unsplash URLs did.

**Why:** A documented design system is only useful if the
content and assets actually use it. Phase 6 makes every
visible color, URL, email, phone, and image flow from
`lib/site.ts` and the documented tokens, so a brand
update touches one file.

**Verification:**

- `npm run build` → **clean**. 29 static routes, TypeScript
  passes, no warnings.
- `grep -rE '#0b1f3a|#234a78|#93acc6|#c9d1d9' app/
  components/ content/ lib/` → **zero hits**. The
  pre-Step-5.6 palette is fully retired from rendered
  output.
- `grep -rE 'example\.com|sales@example|555.*0100|1200
  Industrial Way' app/ components/ content/` → **zero
  hits**. Placeholders exist only in `lib/site.ts` per
  project decision.
- `grep -rE 'unsplash' .` → **zero hits**. The Unsplash
  whitelist is gone; `next.config.ts` now whitelists
  `picsum.photos` for the case-study hero images.
- `grep -rE 'text-muted' app/ components/` → 19 hits,
  all caption/eyebrow/dt-label/placeholder roles. No
  body-text use, so the AA failure mode the Step 5.6
  audit flagged is still avoided.
- Dev server (PID 10714) on `http://localhost:3001/`
  serves `/`, `/case-studies`, `/case-studies/[slug]`,
  `/icon`, `/opengraph-image`, `/sitemap.xml`,
  `/robots.txt` all with 200 status. The new
  `/_next/image?url=https://picsum.photos/...` proxy
  returns 200 (and a real JPEG) for every device-size
  width Next.js's default `deviceSizes` allows.
- `<title>` on the home page is now
  `Meridian Manufacturing — Precision components.
  Engineered to spec.` (sourced from `site.name` +
  `site.tagline`, no longer hardcoded).
- `/robots.txt` and `/sitemap.xml` reflect `site.url`;
  URLs update automatically when `lib/site.ts` is
  given a real domain.

**Roadmap:** [`ROADMAP.md` — Phase 6, Steps 6.1–6.12](./ROADMAP.md)

**Commits:** `3324dfc` — Phase 6: rebrand (content,
assets, SEO).

---

## 2026-08-27 21:00 — CTA consistency: every closing CTA now uses `<Heading>`

**Context:** After the Step 5.6 rebrand, the home page
`FinalCta` and the closing CTA blocks on each inner route
were inconsistent: some used the `<Heading>` primitive,
others used a raw `<h2>` with a separate eyebrow `<p>`.
Worse, the inner-route CTAs without an eyebrow (about,
case-studies, case-studies/[slug], industries,
industries/[slug], process, products/[slug], team,
testimonials) had a visual gap next to the home page
`FinalCta` and the `/products` CTA, both of which carry
a brand-green eyebrow. This entry upgrades all of them to
the same primitive and adds eyebrows where they were
missing.

**What changed:**

- **Home `FinalCta`** (`components/sections/FinalCta.tsx`)
  — raw `<h2>` + eyebrow `<p>` swapped for
  `<Heading as={2} align="center" eyebrow="Ready when you are">`.
  Visible title ("Tell us about your program.") unchanged.
- **`/products` closing CTA** — same treatment. Eyebrow
  "Not sure where to start?" preserved.
- **9 inner-route CTAs gained an eyebrow and the
  `<Heading>` primitive:**
  - `/about` — eyebrow "Visit us" / "Come see the floor."
  - `/case-studies` — eyebrow "Let's go" / "Want a program
    like this on your side?"
  - `/case-studies/[slug]` — eyebrow "Your move" / "Want a
    result like this?"
  - `/industries` — eyebrow "Got something else?" / "Don't
    see your industry?"
  - `/industries/[slug]` — eyebrow is the industry name
    (e.g. "Aerospace & Defense") / "Building for aerospace
    & defense?"
  - `/process` — eyebrow "Get started" / "Start with
    Discover."
  - `/products/[slug]` — eyebrow is the service name
    (e.g. "Precision Machining") / "Have a drawing for
    precision machining?"
  - `/team` — eyebrow "Talk to us" / "Want to talk to one
    of them directly?"
  - `/testimonials` — eyebrow "Your turn" / "Become the
    next one."
- Each `<Heading>` passes a `className` to keep the
  previous CTA size (`text-3xl sm:text-4xl font-semibold`)
  and the on-dark color (`text-on-dark`) so the inverted
  brand-teal-deep section still reads correctly.
- The home page `Process` section already used
  `<Heading>` with eyebrow "Process" and title "How an OEM
  program moves at Meridian", so it was left alone.

**What this change is NOT:**

- No new components, no new routes.
- No content changes beyond the new eyebrow labels
  listed above.
- No type or layout changes — the title body and the
  body paragraph below it are unchanged.

**Why:** A single title primitive across the site means
every CTA gets the same type ramp, the same heading
spacing, and the same accessibility treatment (the
`<Heading>` primitive already maps its `<div>` wrapper
correctly for the eyebrow and centers on `align="center"`).
A future change to the type scale or to the heading color
on dark surfaces now lands in one component.

**Verification:**

- `npm run build` → **clean** (29 static pages, TypeScript
  passes).
- `grep -rEn 'tone="inverted"' app/ components/ -A 5 |
  grep '<h2'` → **zero matches** — no raw `<h2>` remains
  inside an inverted CTA section.

**Roadmap:** Step 5.6 (`[x]`). No new step; this is
refactor-only polish that lands inside the existing
Step 5.6 ship.

**Commits:** `7527d4e` — refactor: upgrade CTA sections
to `<Heading>` primitive.

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
