# team4788.com

Source for Team 4788 "Can't Control"'s website: a static Next.js site recreating the
team's Framer-built site, so the team can edit content in git instead of a
proprietary page builder. Content pages are React components, blog posts are
MDX, and robot pages read from a typed data file. The one dynamic piece is the
contact form, which posts to a Cloudflare Pages Function.

Repo layout:

- `app/` — routes (App Router). One folder per page, plus `blog/[slug]` for posts.
- `components/` — shared UI (header, footer, buttons, cards, the blog MDX renderer).
- `data/` — typed content: nav links, robots, sponsors, FAQ, downloads, contact email.
- `content/blog/*.mdx` — blog post source, one file per post.
- `lib/` — small pure helpers (RSS feed generation, site constants, blog sorting).
- `functions/api/contact.ts` — the Cloudflare Pages Function backing the contact form. See `functions/README.md`.
- `scripts/` — build helpers. `optimize-images.mjs` generates the WebP variants referenced pages use (see "Image optimization" below); `postbuild.mjs` writes the real `robots.txt` after `next build` (see the RSC-payload note below).
- `tests/` — vitest unit tests. `tests/e2e/` — Playwright end-to-end tests, including axe accessibility checks on every route (blog posts via one representative post) and an opt-in live check of external links.
- `mirror/` — a rescued copy of the original live site (HTML, screenshots, extracted copy), kept as a reference for anyone checking a page against the source.
- `docs/research/2026-07-15-public-footprint.md` — the sourced facts behind the site's copy. Every claim on the site either traces back to a CONFIDENT line in that file or is flagged `ponytail:` inline as unconfirmed (see "Outstanding items" below).

## Local development

```sh
npm install
npm run dev
```

Opens at `http://localhost:3000`. Blog posts come from `content-collections`,
which watches `content/blog/*.mdx` and regenerates its types automatically
while `next dev` is running. Two things to know:

- On a fresh clone, the first `npm run dev` (or `npm run build`) generates
  `.content-collections/generated`. Until then, editors may show a "Cannot
  find module 'content-collections'" error — it clears once the dev server
  has started once.
- If a post's frontmatter fails schema validation (see `content-collections.ts`),
  the error shows up in the terminal running `next dev`, not as a browser overlay.

Other commands:

```sh
npm run build            # optimize-images.mjs, then next build, then postbuild.mjs writes out/robots.txt
npm run optimize-images  # regenerate WebP variants on their own, without a full build
npm test                 # vitest — unit tests for data, lib, and the contact function
npm run test:e2e         # playwright — builds the site, serves out/, runs axe on every route
```

`npm run test:e2e` builds and serves the site itself, so you don't need `npm run build` first.

### Image optimization

Next's static export has no server to run an image optimizer at request time, so `scripts/optimize-images.mjs` does it at build time instead: it scans `app/`, `components/`, `data/`, and `content/` for `/images/original/...` references, and for each one runs `sharp` to emit resized WebP variants (480/960/1440px) into `public/images/opt/`, plus a `manifest.json` mapping each original to its variants and intrinsic dimensions. `components/photo.tsx` reads that manifest to render a sized `<img>` with `srcset`/`sizes`, falling back to the original for anything the script skipped (SVGs) or that didn't shrink under WebP. The generated files are committed, so a fresh checkout is deployable without re-running the script; `npm run build` regenerates only what's stale.

### External link check

`tests/e2e/external-links.spec.ts` collects every external `href`/`src` (GitHub repos, YouTube reveal embeds, the Chief Delphi build blog, `learn.team4788.com`, the Curtin registration link, socials) from the robot pages, `/resources`, `/support`, and `/recruitment`, and checks each one for a dead-link status. It's skipped by default — `npm run test:e2e` shouldn't depend on the outside network being up — so run it on demand or from a periodic CI job:

```sh
CHECK_EXTERNAL_LINKS=1 npx playwright test tests/e2e/external-links.spec.ts
```

It treats 404/410/5xx responses and network/DNS errors as failures, and 200/301/302/403 as healthy (GitHub and YouTube sometimes 403 automated clients). If this environment has no outbound network access at all, it skips gracefully instead of failing every URL.

## Deploying to Cloudflare Pages

The site has never been deployed — this is a first-deploy runbook, not a
record of what's live.

1. **Create the Pages project.** In the Cloudflare dashboard, connect this
   repo (or skip the dashboard and run `npx wrangler pages deploy out` after
   a local build — either works, but connecting the repo gets you
   deploys-on-push and preview URLs for PRs).
2. **Build settings**, if connecting the repo:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variable `NODE_VERSION` = `22` (matches `engines.node` in `package.json`; Pages defaults to an older Node otherwise).
   - Cloudflare Pages auto-detects `functions/api/contact.ts` — no separate configuration needed.
3. **Environment variables.** Set these under Pages project → Settings →
   Environment variables. Full detail, including what happens with each one
   unset, is in `functions/README.md`.
   - `RESEND_KEY` — required for the contact form to send mail. Without it,
     `/api/contact` returns a 503 and the form shows an error, but the rest
     of the site works fine.
   - `TURNSTILE_SECRET` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — optional bot
     protection for the form. Set both together or neither; see
     `functions/README.md` for why a mismatched pair breaks the form.
4. **Deploy.** Push to the connected branch, or run the `wrangler` command
   above. Check the deploy log for the postbuild step — it should print
   `postbuild: wrote crawler robots.txt to .../out/robots.txt`.

### Custom domain cutover

The domain currently points at the Framer site.

1. In the Pages project, add `team4788.com` (and `www.team4788.com` if the
   live site uses it) under Custom domains.
2. Update DNS at the registrar to point at Cloudflare Pages, following the
   records Cloudflare shows you. This needs whoever holds DNS access for the
   domain.
3. Leave the Framer site running until DNS has propagated and the Pages
   deploy is confirmed working end to end (see checklist below). Don't tear
   down Framer as part of the DNS change — treat it as a rollback path until
   you're sure.
4. Once the new site is live and stable, cancel or downgrade the Framer plan.

### Post-cutover checklist

Run through this after DNS points at Cloudflare Pages:

- [ ] `https://team4788.com/sitemap.xml` returns XML with all 31 URLs (not a 404 or the RSC-payload landmine described below).
- [ ] `https://team4788.com/robots.txt` starts with `User-agent:`, not JSON or an RSC payload.
- [ ] Submit the contact form for real and confirm the email arrives.
- [ ] Spot-check a sample of the 31 public URLs (nav pages, all 6 robot pages, a couple of blog posts) load with the right title and no broken images.
- [ ] Check `/404` renders on an unknown path instead of Cloudflare's default error page.

**On that RSC-payload landmine:** Next's static export writes a prefetch
payload file to `out/robots.txt` for the `/robots` page route (its segment
is literally named "robots"), which silently overwrites any real
`robots.txt` placed there during the build. `scripts/postbuild.mjs` runs
after `next build` and writes the real one back. If `out/robots.txt` ever
looks wrong again, check that this script still runs as part of `npm run build`
and hasn't been split out of the Cloudflare build command.

## Outstanding items for the team

These are the places where the site publishes a placeholder, an unconfirmed
fact, or an empty state instead of a real answer. Every content item below is
flagged inline — search the codebase for `ponytail:` to find each one — and
is sourced in `docs/research/2026-07-15-public-footprint.md`.

**Facts that need team confirmation before publishing:**

- **Early-history origin story** (`app/about/page.tsx`) — the team's early-history origin story is unconfirmed. Confirm it before the page states it as fact; right now the page states only the founding year and Curtin University base.
- **Artifactory as a sponsor** (`data/sponsors.ts`) — its logo is on the live `/support` page, but no source outside the live site confirms it as a current sponsor.
- **Sponsor tier amounts** (`app/support/page.tsx`) — the tier grid (Bronze/Silver/Gold/Platinum) is structural only; no dollar amounts or benefits are public. Confirm real tiers and benefits with the team.
- **Subteam list** (`app/structure/page.tsx`) — only Design has copy sourced from the live site. Software, Electrical, Outreach, and Business descriptions are drafted from GitHub activity, not confirmed. Confirm the list and get a paragraph for each.
- **Handbook and Downloads files** (`app/handbook/page.tsx`, `app/downloads/page.tsx`, `data/downloads.ts`) — both pages render an empty state because the live site never shipped files behind either route. Add real files to `data/downloads.ts` when the team has them.
- **2026 "Rebuilt" robot** (`data/robots.ts`, `data/season.ts`, `data/seasons.ts`) — the robot page, homepage, and `/seasons` row show the game, results, and Creativity Award, but the robot's name, tagline, photos, and reveal video aren't published yet. Update all four fields once the team names and reveals the robot.
- **Historical sponsors** — WA Dept. of Education and the "School Pathways Program" appear in 2016/2022-era records but aren't on the current sponsor wall. Confirm whether either is still active before adding it back.
- **Roboacademy dates** (`app/roboacademy/page.tsx`) — the page describes the program and past sessions but has no upcoming dates or a booking link.

**Page specifics not yet supplied:**

- **Diversity initiatives** (`app/diversity/page.tsx`) — states the team's vision but names no concrete initiatives or partnerships.
- **Media press kit** (`app/media/page.tsx`) — no downloadable press kit (logos, team one-pager, high-res photos) exists yet.
- **Robot Demos format** (`app/robotdemos/page.tsx`) — explains what a demo is, not the typical format, event types, or how much lead time booking needs.
- **Workshops details** (`app/workshops/page.tsx`) — points to Roboacademy but doesn't describe other workshop topics, audience/year level, or how a school books one.

**Engineering follow-ups, unrelated to content research:**

- **Resend domain verification** — sending mail from `website@team4788.com` requires verifying that domain in Resend before `RESEND_KEY` works in production.
- **Author bylines** — blog posts don't display an author. Add byline data to `content-collections.ts` and the blog templates once the team supplies it.
- **CI** — no GitHub Actions workflow yet. Recommended: run `npm run test && npm run build && npm run test:e2e` on PRs before Pages deploys, plus a separate scheduled job for the external-link check (`CHECK_EXTERNAL_LINKS=1 npx playwright test tests/e2e/external-links.spec.ts` — network-dependent, so it doesn't belong in the PR gate).
