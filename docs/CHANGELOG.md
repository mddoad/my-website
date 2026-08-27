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

**Not yet committed.** The reset + docs will be committed in a single
"Phase 0: reset and documentation" commit as the next step, before any
new code lands.
