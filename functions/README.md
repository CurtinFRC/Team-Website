# Pages Functions

`api/contact.ts` is a [Cloudflare Pages Function](https://developers.cloudflare.com/pages/functions/), the one server endpoint the statically-exported site gets. It backs the contact form in `components/contact-form.tsx`. Cloudflare Pages picks up anything under this directory automatically at deploy time; the Next app doesn't build or bundle it.

## Environment variables

Set these as Pages secrets/vars in the Cloudflare dashboard (Pages project → Settings → Environment variables), or in `.dev.vars` for local `wrangler` runs. None of them are committed to the repo.

| Variable | Required | Where | Purpose |
| --- | --- | --- | --- |
| `RESEND_KEY` | Yes, to send mail | Pages Function (server) | API key from [Resend](https://resend.com). The `team4788.com` domain must be verified in Resend so `from: website@team4788.com` is allowed to send. |
| `TURNSTILE_SECRET` | No | Pages Function (server) | Secret key for the Turnstile widget, from the Cloudflare Turnstile dashboard. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Next build (client) | Public site key for the same Turnstile widget. Set it at **build time**: the static export inlines it. |

### The rollout is incremental

- `RESEND_KEY` unset: `/api/contact` returns `503` and does nothing else. The team can deploy the site before Resend is configured; the form reports an error until the key is added.
- `TURNSTILE_SECRET` unset: the function skips bot-check verification and sends mail directly. The team can ship a working form before creating Turnstile keys. **The endpoint is fully open during this window**: any direct POST sends mail. Mitigate with a [rate-limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) on `/api/contact` in the Cloudflare dashboard (one rule, e.g. 5 requests per minute per IP) until the Turnstile keys exist.
- `TURNSTILE_SECRET` set but `NEXT_PUBLIC_TURNSTILE_SITE_KEY` unset at build: the client never renders a widget or sends a token, so the function's missing-token check rejects every submission with 403. The form is broken for everyone.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` set but `TURNSTILE_SECRET` unset: users solve a challenge whose token the function then ignores, and submissions send unverified. Friction with no protection.

Set both Turnstile variables together.

## Local testing

The Playwright and vitest suites don't exercise this function against a running server. `tests/contact-function.test.ts` unit-tests it in isolation with a stubbed `fetch`. The Playwright `webServer` serves the static `out/` export, which has no Pages Functions runtime.

To test the function itself, build the site and run it under `wrangler` (not a project dependency, install it on demand):

```sh
npm run build
npx wrangler pages dev out
```

Copy `.dev.vars.example` to `.dev.vars` (gitignored) at the repo root and fill in the variables above to exercise the live paths locally.
