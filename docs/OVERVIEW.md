# Project Overview

## What we are building

**Meridian Manufacturing** — a B2B industrial manufacturer marketing website.

The site is a marketing surface for an OEM supplier that delivers precision
components, assemblies, and engineered solutions to other businesses. The
primary audience is procurement, manufacturing engineering, and supply chain
decision-makers at OEM customers in aerospace, automotive, energy, and medical
industries. The site exists to convert that audience into qualified RFQs.

The build is a **Next.js 16 (App Router)** project with **React 19**,
**TypeScript**, and **Tailwind CSS v4**. Content is authored as TypeScript
modules under `content/` so the marketing copy, case studies, and team
information live alongside the code that renders them.

## Purpose

Three jobs, in order of priority:

1. **Generate qualified RFQs.** Every marketing surface ultimately routes a
   serious buyer to a contact / quote form. Trust signals (certifications,
   case studies, process) earn the right to be contacted.
2. **Establish credibility with technical buyers.** Procurement and
   engineering audiences at OEMs are skeptical of marketing copy. The site
   has to demonstrate real capability — certifications, real process,
   real outcomes — without resorting to generic stock language.
3. **Rank for the queries that matter.** B2B manufacturing search terms are
   specific and high-intent. Site structure, metadata, and content have to
   align with how a buyer actually searches (capability + industry + outcome).

## Audience

| Audience | What they want from the site |
|---|---|
| Procurement / sourcing | Capabilities, capacity, certifications, lead time, RFQ path |
| Manufacturing engineering | Process, tolerances, materials, quality system, DFM support |
| Supply chain / program management | On-time delivery track record, case studies, volume scaling |
| Executive sponsor | Company history, leadership, financial stability, references |

## Brand

- **Name:** Meridian Manufacturing
- **Tagline:** *Precision components. Engineered to spec.*
- **Positioning:** Established (1972), multi-industry, certification-heavy
  (AS9100D, ISO 9001:2015, ITAR). Modern, confident, not flashy.
- **Voice:** Direct, technical, evidence-based. No "synergy", no
  "best-in-class", no "industry-leading" without a number attached.

## Visual system

- **Palette:** Industrial blue (`ink-*`) primary, steel neutral, single
  warm accent (`accent-*`) used sparingly.
- **Type:** Inter for body, Source Serif 4 for headlines. The serif is a
  quiet nod to engineering drawing sets without leaning into "heritage".
- **Density:** Marketing density, not dashboard density. Generous vertical
  rhythm. Subtle elevation only.

## Out of scope

- E-commerce / transactional checkout
- Customer login / authenticated areas
- CMS integration (content lives in `content/*.ts` for v1)
- Multi-language support (English only for v1)
- Analytics integration (deferred until launch)

## Related documents

- [`FEATURES.md`](./FEATURES.md) — what the site will do
- [`ROADMAP.md`](./ROADMAP.md) — how we build it, step by step
- [`CHANGELOG.md`](./CHANGELOG.md) — what changed, when
