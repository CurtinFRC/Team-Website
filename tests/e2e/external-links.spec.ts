import { test, expect } from '@playwright/test'
import { robots } from '../../data/robots'

/**
 * Live-network guard against dead/typo'd external links: GitHub repos per
 * robot, YouTube reveal embeds, learn.team4788.com, photo galleries, the
 * Curtin payments registration link, and the social links in the footer
 * (rendered on every page).
 *
 * Opt-in and network-gated on purpose. `npm run test:e2e` runs against a
 * static `out/` build with no guarantee of outbound network access, and a
 * live-link check that fails the whole suite on a transient GitHub/YouTube
 * hiccup would make the normal suite flaky. Enable explicitly:
 *
 *   CHECK_EXTERNAL_LINKS=1 npx playwright test external-links.spec.ts
 *
 * A preliminary connectivity probe skips the test gracefully (not a failure)
 * when this environment has no outbound network access at all. Only
 * 404/410/5xx responses and network/DNS errors count as failures — 403 is
 * common from GitHub/YouTube when they suspect an automated client, and
 * redirects (301/302) are followed and judged on their final status.
 */

const RUN = process.env.CHECK_EXTERNAL_LINKS === '1'
const REQUEST_TIMEOUT_MS = 10_000

const PAGES_TO_SCAN = ['/resources', '/support', '/recruitment', ...robots.map((robot) => `/${robot.slug}`)]

const isDeadStatus = (status: number) => status === 404 || status === 410 || status >= 500

/** Pulls attribute values (e.g. every <a href> or <iframe src>) out of static HTML. */
function extractAttrValues(html: string, tag: string, attr: string): string[] {
  const values: string[] = []
  const tagPattern = new RegExp(`<${tag}\\b[^>]*>`, 'g')
  const attrPattern = new RegExp(`${attr}="(https?://[^"]+)"`)
  for (const tagMatch of html.matchAll(tagPattern)) {
    const attrMatch = tagMatch[0].match(attrPattern)
    if (attrMatch) values.push(attrMatch[1])
  }
  return values
}

test.describe('external link health (opt-in, live network)', () => {
  test.skip(
    !RUN,
    'Network-dependent dead-link check, skipped by default. Run with CHECK_EXTERNAL_LINKS=1 to enable.',
  )

  test('every external link on robot pages, /resources, /support, and /recruitment resolves', async ({
    request,
  }) => {
    const found = new Set<string>()
    for (const path of PAGES_TO_SCAN) {
      const response = await request.get(path)
      const html = await response.text()
      for (const url of extractAttrValues(html, 'a', 'href')) found.add(url)
      for (const url of extractAttrValues(html, 'iframe', 'src')) found.add(url)
    }

    expect(found.size, 'expected to find a non-trivial set of external links to check').toBeGreaterThan(5)

    // Connectivity probe: skip gracefully rather than failing every URL when
    // this environment can't reach the outside network at all.
    let online = true
    try {
      await request.get('https://github.com', { timeout: REQUEST_TIMEOUT_MS })
    } catch {
      online = false
    }
    test.skip(!online, 'No outbound network access from this environment; skipping live external-link check.')

    const failures: string[] = []
    for (const url of found) {
      try {
        const response = await request.get(url, { timeout: REQUEST_TIMEOUT_MS })
        const status = response.status()
        if (isDeadStatus(status)) failures.push(`${url} -> HTTP ${status}`)
      } catch (error) {
        failures.push(`${url} -> ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    expect(failures, failures.join('\n')).toEqual([])
  })
})
