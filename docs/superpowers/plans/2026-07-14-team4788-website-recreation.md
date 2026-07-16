# Team 4788 Website Recreation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recreate https://team4788.com/ (FRC Team 4788 "Can't Control", Curtin University, WA) as a self-owned static site that preserves the current design, content, and URLs, while fixing its gaps: nine under-construction pages, an FAQ with no answers, a heavy Framer runtime, and assets hosted on Framer's CDN.

**Architecture:** Next.js 16 (App Router, `output: 'export'`) producing a fully static site, deployed to Cloudflare Pages. Content pages are React components; blog posts and robot pages are data-driven (MDX via content-collections, robots from a typed data file). The contact form posts to a Cloudflare Pages Function protected by Turnstile. No CMS — students edit markdown and open PRs.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion (framer-motion), content-collections (MDX), Cloudflare Pages + Pages Functions, Resend (form email), Cloudflare Turnstile, Playwright + vitest for tests.

---

## Part 1 — What exists today (research findings, 2026-07-14)

### Platform
- Built with **Framer** (`meta generator: Framer a72a541`), last published 2026-01-09. Homepage HTML alone is ~290 KB; all images/fonts served from `framerusercontent.com`. The team pays a Framer subscription for this; if it lapses, the site and its assets disappear.

### Design language
- **Dark theme:** page background `#111` / section surfaces `#222` (`rgb(34,34,34)`), off-white `#fefefa` cards, greys `#999`/`#888` for secondary text, white body text.
- **Brand accent:** magenta/hot pink `rgb(236,0,128)` → `#EC0080` (matches the team's shirts — see OG image). Secondary blue `#0099FF` used for input focus.
- **Fonts:** Inter (400/500/600/700, weights + italic) for UI/body, **Fragment Mono** for accent/mono text. Font sizes observed: 14–70 px scale.
- **Hero:** "Ignite, Improve, Innovate." + "FRC Team 4788 - Can't Control", with a **Rive animation**, "Join our team" and "About Us" CTAs.
- Rounded 8px inputs, `#f2f2f2` input backgrounds on forms.

### Page inventory (from sitemap.xml)

**Built pages (17):**
| URL | Content |
|---|---|
| `/` | Hero (Ignite/Improve/Innovate + Rive anim, CTAs) → sponsor thank-you strip → "FIRST Robotics Competition" blurb + See our Robots → "FIRST in Western Australia" + What we do → "This season's challenge: REEFSCAPE" + Season Reveal + Build Blog links → Contact form (Name/Email/Message) → footer © |
| `/about` | About Us / Who Are We? / What we do! (60 kg, 1.5 m robots) / Vision Statement / Mission Statement / "Interested in joining us?" CTA |
| `/structure` | Team Structure (itself marked under construction inside), Design Subteam, What we do! |
| `/recruitment` | "Join Us" — enrolling for 2026 Build Season; Register button → `https://payments.curtin.edu.au/CF2512080262`; Contact button |
| `/first` | What is FIRST®: mission, Dean Kamen quote, programs (FLL/FTC/FRC), Gracious Professionalism & Coopertition, resource links |
| `/faq` | 8 questions (what does 4788 mean; what are FIRST/FRC; why; how to join; opportunities; how to support; GP & coopertition; where to ask) — **answers not visible, plain heading list** |
| `/location` | Curtin Bentley campus, Building 205 (engineering dept), park at car park 211 "Big Car Park"; car-park photo, **no map embed** |
| `/contact` | Contact form (Name/Email/Message) + email `FirstRoboticsTeam@curtin.edu.au` |
| `/robots` | Grid of 4 robot cards: Gup-X (2025), Notedog Millionaire (2024), Whiplash (2023), Mercury (2022), each with one-line achievement + link |
| `/2025frcrobot` … `/2021frcrobot` | Per-robot pages: year+game, achievements, reveal video, Onshape CAD link, GitHub repo link, Google Photos galleries |
| `/blog` | "Team 4788's Blogs — Hosted, Posted, Boasted" — 5 posts, no summaries/tags/authors |
| `/blog/*` (5 posts) | 2025-cad-resources, offseason-25-electrical-can-connectors, offseason-25-robust-vision, offseason-25-carbon-fibre-shafts, 2024-build-blog-design-guidelines |
| `/404` | Custom 404 |

**Under-construction stubs (9):** `/support`, `/resources`, `/roboacademy`, `/handbook`, `/downloads`, `/workshops`, `/diversity`, `/robotdemos`, `/media` — each is just "Watch out! We are still under construction… 🚧" + go-home link.

**Nav structure (homepage header):** Robots (2025/2024/2023/2022/2021), Support Us, Outreach group (Roboacademy, Workshops, Diversity, Robot Demos, Media), Resources group (Training Course, Blogs, Team Handbook, Downloads).

### External integrations to preserve
- Registration payment link: `payments.curtin.edu.au/CF2512080262`
- Onshape CAD documents, GitHub repos, Google Photos galleries, YouTube reveal videos (per robot page)
- Contact email `FirstRoboticsTeam@curtin.edu.au`

## Part 2 — Improvements (beyond faithful recreation)

1. **Own the platform.** Static site in a Git repo, free Cloudflare Pages hosting — removes the recurring Framer cost and the asset-hosting dependency. Students contribute content via PRs.
2. **Finish the 9 stub pages.** `/support` becomes a real sponsors page (tier grid + prospectus download + bank/contact details placeholder pending team input); `/resources` becomes a real index; the five outreach stubs (`/roboacademy`, `/workshops`, `/diversity`, `/robotdemos`, `/media`) are kept as URLs but rendered from one shared "outreach" template so each has at least a paragraph, photos, and a contact CTA instead of a 🚧 emoji. `/handbook` and `/downloads` list actual files once the team supplies them; until then they present the contact CTA rather than "under construction".
3. **FAQ gets answers** and an accessible accordion (the live page shows questions with no visible answers).
4. **Location page gets an embedded map** (OpenStreetMap iframe — no API key) alongside the existing directions and car-park photo.
5. **Blog upgrades:** post summaries + dates on the index, tags, author bylines, RSS feed, and reading-time. Content stays markdown so build-season blogging is low-friction.
6. **Robot pages become data-driven** from one typed collection — adding the 2026 robot is a 10-line data entry plus photos.
7. **Performance:** static HTML instead of the Framer runtime, self-hosted subsetted fonts (Inter + Fragment Mono via `next/font`), responsive optimized images. Target Lighthouse ≥ 95 across the board (the Framer site can't get close).
8. **Accessibility:** `#EC0080` on `#111` is ~3.9:1 — keep it for large headings/accents but use a lighter pink (`#FF4DA6`) for inline links/body-size text; visible focus rings; `prefers-reduced-motion` disables hero/scroll animations; semantic landmarks; skip link.
9. **SEO:** per-page titles/descriptions/OG images, sitemap, structured data (Organization + BlogPosting), canonical URLs. Dynamic copyright year (site currently says 2025).
10. **Contact form hardening:** Cloudflare Turnstile (invisible) + Pages Function + Resend to `FirstRoboticsTeam@curtin.edu.au`, with client-side validation and success/error states. (Framer's form goes away with Framer.)
11. **Asset rescue:** mirror every image from `framerusercontent.com` into the repo before the Framer subscription lapses.

**Explicitly out of scope (YAGNI):** CMS, search, i18n, dark/light toggle (site is dark-brand only), member login, comments.

## Part 3 — File structure

```
team4788-website/
├── next.config.ts                 # output:'export', images unoptimized-for-export config
├── content-collections.ts         # blog collection schema
├── tailwind/theme via app/globals.css  (Tailwind v4 @theme tokens)
├── app/
│   ├── layout.tsx                 # fonts, metadata defaults, Header/Footer
│   ├── page.tsx                   # homepage
│   ├── about/page.tsx  structure/page.tsx  recruitment/page.tsx
│   ├── first/page.tsx  faq/page.tsx  location/page.tsx  contact/page.tsx
│   ├── robots/page.tsx            # robot index grid
│   ├── [robot year pages]/page.tsx → generated from data (routes kept: /2025frcrobot …)
│   ├── blog/page.tsx  blog/[slug]/page.tsx
│   ├── support/page.tsx  resources/page.tsx  handbook/page.tsx  downloads/page.tsx
│   ├── (outreach)/roboacademy|workshops|diversity|robotdemos|media/page.tsx
│   ├── not-found.tsx
│   └── feed.xml/route.ts          # RSS (static export route handler)
├── components/
│   ├── header.tsx (nav + dropdowns)  footer.tsx  container.tsx
│   ├── hero.tsx (Motion animation, reduced-motion fallback)
│   ├── section.tsx  button.tsx  sponsor-grid.tsx  robot-card.tsx
│   ├── faq-accordion.tsx  contact-form.tsx  outreach-page.tsx (shared template)
├── data/
│   ├── robots.ts                  # typed robot collection (5 entries + room for 2026)
│   ├── sponsors.ts  faq.ts  nav.ts
├── content/blog/*.mdx             # 5 migrated posts + future posts
├── public/images/…                # rescued Framer assets, team photos
├── functions/api/contact.ts       # Cloudflare Pages Function (form → Resend)
├── tests/ (vitest unit: data validation, rss; playwright: smoke + a11y)
└── docs/superpowers/plans/…       # this plan
```

**Testing stance:** this is a content site; TDD applies where there is logic — data validation, RSS generation, the contact function, nav config — with vitest. Pages are verified with Playwright smoke tests (every route renders, no console errors, key text present) plus axe accessibility checks, written per phase *before* the pages they cover are considered done.

---

## Part 4 — Tasks

### Phase 0 — Content & asset rescue (do this first; independent of the rebuild)

**Files:** `scripts/mirror.sh`, `mirror/` (raw HTML), `public/images/`

- [ ] **0.1 Mirror every page.** For each of the 30 sitemap URLs: `curl -s "$url" -o "mirror/$(basename $url).html"`. Commit the mirror — it is the content source of truth for migration and the fidelity reference.
- [ ] **0.2 Extract and download all `framerusercontent.com/images/*` URLs** across the mirrored HTML (`grep -ohE 'https://framerusercontent\.com/images/[^"?, )]*' mirror/*.html | sort -u`), download into `public/images/original/`, and record a `url → local path` map in `public/images/manifest.json`.
- [ ] **0.3 Extract per-page text content** into `mirror/content-notes.md` (headings + body text per page) so page-building tasks copy real copy, not paraphrases.
- [ ] **0.4 Capture reference screenshots** of the live site (desktop 1440px + mobile 375px, full-page, every built page) into `mirror/screenshots/` using Playwright (`npx playwright screenshot --full-page`). These are the acceptance reference for "faithful".
- [ ] **0.5 Commit:** `git init && git add -A && git commit -m "chore: mirror live team4788.com content and assets"`

### Phase 1 — Scaffold & design system

**Files:** project root, `app/globals.css`, `app/layout.tsx`, `next.config.ts`

- [ ] **1.1 Scaffold:** `npx create-next-app@latest . --ts --app --tailwind --no-src-dir --import-alias "@/*"`; set `next.config.ts`:
  ```ts
  import type { NextConfig } from 'next'
  export default {
    output: 'export',
    trailingSlash: false,
    images: { unoptimized: true }, // static export; use sharp pre-sizing in build step
  } satisfies NextConfig
  ```
- [ ] **1.2 Fonts:** `next/font/google` — Inter (`400..700`, variable) and Fragment Mono (400) exposed as `--font-sans` / `--font-mono`.
- [ ] **1.3 Design tokens** in `app/globals.css` (Tailwind v4 `@theme`):
  ```css
  @theme {
    --color-bg: #111111;          /* page background */
    --color-surface: #222222;     /* cards/sections */
    --color-surface-alt: #fefefa; /* light cards (sponsor strip) */
    --color-ink: #ffffff;
    --color-ink-muted: #999999;
    --color-ink-faint: #888888;
    --color-brand: #ec0080;       /* headings, accents, large text only */
    --color-brand-bright: #ff4da6;/* links & small text (contrast-safe) */
    --color-focus: #0099ff;
    --font-sans: var(--font-inter);
    --font-mono: var(--font-fragment-mono);
    --radius-input: 8px;
  }
  ```
- [ ] **1.4 Verify:** `npm run build` produces `out/`; placeholder page renders with tokens. Commit.
- [ ] **1.5 Test rigs:** add vitest + Playwright (`npm i -D vitest @playwright/test @axe-core/playwright`), a `tests/smoke.spec.ts` that asserts `/` returns 200 and contains "Ignite" (fails now — first real TDD checkpoint for Phase 3). Commit.

### Phase 2 — Layout: header, footer, primitives

**Files:** `components/header.tsx`, `components/footer.tsx`, `components/container.tsx`, `components/button.tsx`, `data/nav.ts`, `tests/nav.test.ts`

- [ ] **2.1 TDD nav config:** write `tests/nav.test.ts` asserting `data/nav.ts` exports groups exactly matching the live site: Robots→[2025…2021 robot pages], Outreach→[roboacademy, workshops, diversity, robotdemos, media], Resources→[roboacademy (training course), blog, handbook, downloads], plus top-level About, Support Us, Contact. Run (fails) → implement `data/nav.ts` → pass → commit.
- [ ] **2.2 Header:** dark sticky header, wordmark left, dropdown groups (Radix/Base-UI popover or CSS-only `details` fallback), mobile hamburger sheet. Keyboard navigable; focus-visible rings in `--color-focus`.
- [ ] **2.3 Footer:** © line with `new Date().getFullYear()`, nav links, sponsor mention, socials (from `data/nav.ts`).
- [ ] **2.4 Playwright check:** every nav link resolves (no 404 targets) at build time. Commit.

### Phase 3 — Homepage

**Files:** `app/page.tsx`, `components/hero.tsx`, `components/sponsor-grid.tsx`, `components/section.tsx`, `data/sponsors.ts`

- [ ] **3.1 Hero:** "Ignite, / Improve, / Innovate." staggered word reveal with Motion; subtitle "FRC Team 4788 - Can't Control" in Fragment Mono; CTAs "Join our team" (→ /recruitment) and "About Us". Replace the Rive dependency with a Motion-animated SVG/robot-photo composition; wrap all animation in `useReducedMotion` so it renders static instantly for reduced-motion users.
- [ ] **3.2 Sections**, copying text verbatim from `mirror/content-notes.md`: sponsor thank-you strip (light `--color-surface-alt` band, logo grid from `data/sponsors.ts`), "FIRST™ Robotics Competition" + See our Robots, "FIRST in Western Australia" + What we do, "This season's challenge: REEFSCAPE" + Season Reveal + Build Blog buttons. *(Improvement note: season section content sourced from `data/season.ts` so the 2026 game is a one-file edit.)*
- [ ] **3.3 Contact section:** embed the shared `<ContactForm/>` (built in Phase 7; render it disabled/mailto-fallback until then).
- [ ] **3.4 Verify:** smoke test from 1.5 passes; compare against `mirror/screenshots/home-1440.png` side-by-side. Commit.

### Phase 4 — Content pages (faithful + fixes)

**Files:** `app/{about,structure,recruitment,first,faq,location,contact}/page.tsx`, `components/faq-accordion.tsx`, `data/faq.ts`

- [ ] **4.1 `/about`:** sections verbatim (About Us, Who Are We?, What we do!, Vision, Mission, join CTA).
- [ ] **4.2 `/first`:** FIRST explainer with the Dean Kamen quote, programs, GP/Coopertition, resource links.
- [ ] **4.3 `/structure`:** keep current copy; add a subteam card grid (Design, plus placeholders the team fills: Software, Electrical, Outreach, Business) — flagged `<!-- ponytail: confirm subteam list with team -->`.
- [ ] **4.4 `/recruitment`:** 2026 Build Season enrolment copy + Register button (Curtin payments URL) + Contact button.
- [ ] **4.5 `/faq`:** TDD `data/faq.ts` (8 Q&A objects — write real answers from site content: 4788 meaning, FIRST/FRC, why, how to join → /recruitment, opportunities, support → /support, GP & coopertition, where to ask → /contact); accessible accordion (`<details>`-based, animated with auto-animate). **This fixes the live page's missing answers.**
- [ ] **4.6 `/location`:** directions copy + car-park photo + **OpenStreetMap embed** centred on Curtin Building 205 (`<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=…&marker=-32.006,115.894" …>` with a "view larger map" link).
- [ ] **4.7 `/contact`:** heading + email link + `<ContactForm/>`.
- [ ] **4.8 Playwright:** each page renders its H1 + axe scan passes (no serious/critical violations). Commit per page.

### Phase 5 — Robots (data-driven)

**Files:** `data/robots.ts`, `app/robots/page.tsx`, five `app/<year>frcrobot/page.tsx` wrappers, `components/robot-card.tsx`, `tests/robots.test.ts`

- [ ] **5.1 TDD schema:** `tests/robots.test.ts` validates every entry has `slug, name, year, game, tagline, achievements[], links{reveal?, cad?, code?, gallery?}, photos[]`, slugs match the live URLs (`2025frcrobot`…`2021frcrobot`), years unique. Fails → implement `data/robots.ts` with the five real robots (Gup-X/Reefscape, Notedog Millionaire/Crescendo, Whiplash/Charged Up, Mercury/Rapid React, 2021 robot from mirror) using taglines & achievements from the mirror → pass → commit.
- [ ] **5.2 Robot template:** one component renders hero (name, year, game), achievements list, embedded YouTube reveal, external-link cards (Onshape, GitHub, Google Photos), photo gallery. Year pages are thin wrappers: `export default () => <RobotPage slug="2025frcrobot"/>` — keeps live URLs without dynamic-route gymnastics under static export.
- [ ] **5.3 `/robots` index:** card grid, newest first, taglines verbatim. Commit.

### Phase 6 — Blog (MDX)

**Files:** `content-collections.ts`, `content/blog/*.mdx` (5 posts), `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/feed.xml/route.ts`, `tests/rss.test.ts`

- [ ] **6.1 content-collections setup:** schema `{title, date, summary, authors[], tags[]}`; build fails on invalid frontmatter (that's the test).
- [ ] **6.2 Migrate the 5 posts** from the mirror into MDX, preserving slugs (`/blog/2025-cad-resources` etc.), downloading any in-post images to `public/images/blog/`. Write a 1–2 sentence `summary` for each (improvement).
- [ ] **6.3 Index page:** reverse-chronological list with date, summary, tags, reading time.
- [ ] **6.4 RSS:** TDD `tests/rss.test.ts` (valid XML, 5 items, correct links) → implement `app/feed.xml/route.ts` with `export const dynamic = 'force-static'`. Commit.

### Phase 7 — Contact form (static-export compatible)

**Files:** `components/contact-form.tsx`, `functions/api/contact.ts`, `tests/contact-function.test.ts`

- [ ] **7.1 TDD the Pages Function** (vitest, mock `fetch`): rejects missing fields with 400, rejects failed Turnstile verification with 403, sends via Resend and returns 200. Then implement `functions/api/contact.ts`:
  ```ts
  export const onRequestPost: PagesFunction<{ TURNSTILE_SECRET: string; RESEND_KEY: string }> =
    async ({ request, env }) => {
      const { name, email, message, token } = await request.json() as Record<string, string>
      if (!name || !email || !message) return new Response('Missing fields', { status: 400 })
      const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ secret: env.TURNSTILE_SECRET, response: token }),
      }).then(r => r.json() as Promise<{ success: boolean }>)
      if (!v.success) return new Response('Verification failed', { status: 403 })
      const sent = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: 'website@team4788.com',
          to: 'FirstRoboticsTeam@curtin.edu.au',
          reply_to: email,
          subject: `Website contact from ${name}`,
          text: message,
        }),
      })
      return new Response(null, { status: sent.ok ? 200 : 502 })
    }
  ```
- [ ] **7.2 Client form:** Name/Email/Message (matching live site), 8px-radius inputs, `#0099ff` focus ring, invisible Turnstile widget, pending/success/error states, `mailto:` fallback link. Use the cloudflare-turnstile skill during implementation. Commit.

### Phase 8 — Formerly-stub pages

**Files:** `app/support/page.tsx`, `app/resources/page.tsx`, `app/{handbook,downloads}/page.tsx`, `components/outreach-page.tsx`, five outreach `page.tsx` wrappers

- [ ] **8.1 `/support`:** sponsor pitch (why sponsor an FRC team), tier grid (Bronze/Silver/Gold/Platinum placeholder tiers marked `ponytail: confirm tiers & amounts with team`), current-sponsor logo grid (shared `data/sponsors.ts`), contact CTA.
- [ ] **8.2 Outreach template:** `components/outreach-page.tsx` (title, intro, photo strip, "book us / get involved" CTA) + five wrappers with 1-paragraph real descriptions of each program (Roboacademy training course, school Workshops, Diversity initiatives, Robot Demos, Media appearances) drafted from the team's public blurbs — marked for team review.
- [ ] **8.3 `/resources`:** link index — Training course (→ /roboacademy), Blog, Team Handbook, Downloads, FIRST resources (→ /first), CAD/code links per robot.
- [ ] **8.4 `/handbook` + `/downloads`:** file-list template reading `data/downloads.ts`; ships with the CTA to contact the team until files are supplied (no 🚧). Commit per page.

### Phase 9 — SEO, 404, QA, deploy

**Files:** `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.txt`, `public/_redirects`, CI config

- [ ] **9.1 Metadata:** per-page `generateMetadata` (title pattern `X | Team 4788`, descriptions, OG image = team photo), `app/sitemap.ts`, Organization JSON-LD in layout, BlogPosting JSON-LD in posts.
- [ ] **9.2 404 page:** on-brand, links home + robots + blog.
- [ ] **9.3 Full QA gate:** Playwright suite green (all routes, axe, nav integrity); Lighthouse CI on `/`, `/robots`, one blog post — perf/a11y/BP/SEO ≥ 95; visual diff of every page against `mirror/screenshots/` reviewed by a human.
- [ ] **9.4 Deploy:** Cloudflare Pages project (build `npm run build`, output `out/`, functions dir auto-detected); set `TURNSTILE_SECRET`, `RESEND_KEY`; verify form delivers email end-to-end on the `*.pages.dev` preview.
- [ ] **9.5 Cutover:** point `team4788.com` DNS to Pages, keep Framer live until DNS propagates, then archive Framer. Post-cutover checks: sitemap fetchable, form works on production domain, all 30 original URLs return 200.

---

## Self-review notes
- All 30 sitemap URLs are covered: 17 built pages recreated (Phases 3–6), 9 stubs completed (Phase 8), 404 (9.2), plus `/blog/*` slugs preserved (6.2) and robot slugs preserved (5.1/5.2).
- Open items requiring **team input** (not placeholders in the plan — real content the team must supply): sponsor list/tiers, subteam list, handbook & download files, outreach paragraphs sign-off, Resend domain verification for `team4788.com`, and DNS access. These are flagged inline with `ponytail:` markers so `/ponytail-debt` can harvest them.
- Fidelity is enforced twice: content copied verbatim from the Phase-0 mirror, and per-page visual comparison against reference screenshots in 3.4/9.3.
