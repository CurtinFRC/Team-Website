# Team 4788 Website — Finish With Real Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: subagent-driven-development. Facts source of truth: `docs/research/2026-07-15-public-footprint.md` (READ IT FIRST). Copy is written as the team's own authoritative voice (owner approved), EXCEPT items in that file's "HOLD FOR TEAM CONFIRMATION" list, which render as `{/* ponytail: ... */}` flags, never as asserted live claims.

**Goal:** Replace every drafted placeholder with real, researched content, bring the site forward to the 2026 "Rebuilt" season, add a Season & Awards record page, and optimize images — turning the scaffolded recreation into a finished, current site.

**Architecture:** Data-first. The site already renders from `data/*.ts`; most work is enriching that data from the research file and letting existing components render it. New: `data/seasons.ts` + a `/seasons` page; a build-time image-optimization step. Same phase → spec-review → quality-review loop as the original build.

**Tech stack:** unchanged (Next 16 static export, Tailwind v4, content-collections, Cloudflare Pages). Performance phase adds `sharp` as a devDependency for build-time image resizing only.

**Prose discipline:** invoke `stop-slop` before writing any page copy. Plain, concrete, no marketing filler. `senior-frontend` for component work.

---

## Phase A — Data enrichment (backbone)

**Files:** `data/robots.ts`, `data/season.ts`, `data/sponsors.ts`, new `data/seasons.ts`; tests.

- Extend the `Robot` type with `results?: string` and `awards?: string[]`; populate all entries from the research table (real awards per year). Add real `code` GitHub URL to every robot (2021→2026 repos). Add real `reveal` YouTube URLs (2022–2025). Add the **2026 Rebuilt** entry (game, code repo, Creativity Award, results; name/tagline/photos/reveal flagged HOLD). Enrich **Slinger 2021** (WARP tagline, Chairman's-video year context, code repo).
- `data/season.ts` → current season = **2026 Rebuilt** (game, blog link; reveal flagged until published).
- `data/sponsors.ts` → confirmed legal names; Artifactory flagged.
- New `data/seasons.ts`: typed palmarès 2013–2026 (year, game, robot?, events, result, awards[]) from the research table, for the /seasons page.
- **TDD:** extend `tests/robots.test.ts` (new fields valid; every `code`/`reveal` is a well-formed URL; 2021 & 2026 present) and add `tests/seasons.test.ts` (chronological, every award-bearing year has awards, no invented years). Add a dead-link check (or a documented offline URL-shape check) for the new external URLs.

## Phase B — Richer robot pages + 2026 currency

**Files:** `components/robot-page.tsx`, `components/robot-card.tsx`, `app/robots/page.tsx`, new `app/2026frcrobot/page.tsx`, `app/page.tsx`, `data/season.ts` consumers.

- Robot template renders the new **awards** and **results** blocks; keeps reveal embed + code link (now populated for all).
- `/robots` index: add **Slinger (2021)** and **Rebuilt (2026)** cards; newest-first ordering puts Rebuilt first.
- New thin wrapper `app/2026frcrobot/page.tsx` (RobotPage slug="2026frcrobot"); add slug to nav Robots group.
- Homepage "this season" section → **Rebuilt**; Reefscape framed as most recent past season.
- Extend e2e (robots spec + a 2026 route check).

## Phase C — Real content for all info/outreach pages

**Files:** `app/{about,recruitment,structure,support,roboacademy,workshops,robotdemos,diversity,media,resources}/page.tsx`; possibly `data/outreach.ts`.

Write authoritative copy from the research file (invoke stop-slop). Highlights:
- **roboacademy**: the real Curtin STEM program — LEGO Spike Prime + Micro:bit, ages 8–15, university-student mentors, how to book. (Specific future dates flagged.)
- **recruitment**: $620, Pre-season Design Program → Jan–Mar build season, competes Perth + Sydney, payment link.
- **resources**: Training Course (learn.team4788.com, accurately described), GitHub org + key repos, Chief Delphi build blog, blog, CAD best-practices.
- **support**: real sponsor descriptions on the dark band; tier grid stays structural with prospectus CTA (amounts flagged).
- **about**: light history line (founded 2013, first FIRST team in WA, decade of growth) + existing mission/vision.
- **workshops, robotdemos, diversity, media**: drafted-as-ours from research (media: press contact, socials, YouTube, photo assets; robotdemos: DemoBot/outreach-kit context; diversity: vision grounding). Thinner-evidence claims kept general; specifics flagged.
- **structure**: subteam grid drafted from typical FRC + their GitHub/roles evidence; exact list flagged HOLD.
- Keep every page on the established Section/Container/Button/Photo idiom. Extend axe/e2e coverage; no page should regress.

## Phase D — Season & Awards record page

**Files:** new `app/seasons/page.tsx`, `data/nav.ts` (link it under About or top-level), `tests/e2e`.

- Render `data/seasons.ts` as a browsable timeline/table: per year — game, robot (link to its page where one exists), key result, awards (highlight the 2023 Impact→Houston and 2025 Einstein-field first). Single h1, light-band idiom, responsive table with horizontal-scroll wrapper.
- Add to sitemap (via `lib/routes.ts`) and nav; metadata + JSON-LD.

## Phase E — Image performance pass

**Files:** `scripts/optimize-images.mjs` (new), `components/photo.tsx`, `next.config.ts`/build script, `package.json` (+`sharp` dev).

- Build-time script: for each large source image in `public/images/original/`, emit resized WebP variants (e.g. 480/960/1440 w) into `public/images/opt/` + capture intrinsic dimensions.
- `Photo` component: render `<img>` with explicit width/height + `srcset`/`sizes` pointing at the optimized variants (static-export-safe; no runtime optimizer). Hero uses the responsive set.
- Wire the script into `build` before `next build` (or as a committed one-shot with cached outputs). Re-run Lighthouse on `/`, `/robots`, a blog post; report mobile scores; target ≥90 mobile / ≥95 desktop. Keep `images.unoptimized` (we optimize ourselves).

## Phase F — QA gate, docs, follow-ups

- Full `npm run test` + `npm run test:e2e` + `npm run build` green; dead-link check on all new external URLs passes; `out/robots.txt`/sitemap still correct (now includes /seasons + /2026frcrobot).
- Update `README.md` outstanding-items to the trimmed HOLD list from the research file.
- Final whole-diff review.

---

## Coverage vs the research file
Every CONFIDENT fact lands on a page (identity/history → about + seasons; records/awards → robot pages + seasons; repos → robots + resources; reveals → robot pages; Roboacademy → roboacademy; recruitment specifics → recruitment; sponsors → support). Every HOLD item becomes a `ponytail:` flag, listed in README. No fact is asserted without a source in `docs/research/2026-07-15-public-footprint.md`.
