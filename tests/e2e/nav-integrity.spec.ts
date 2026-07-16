import { test, expect } from '@playwright/test'

/** Site-relative hrefs only — excludes external URLs, mailto:, and tel:. */
function isInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}

test.describe('nav integrity', () => {
  test('every internal header + footer link (desktop DOM) resolves', async ({ page, request }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')

    const headerHrefs = await page
      .locator('header a[href]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''))
    const footerHrefs = await page
      .locator('footer a[href]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''))

    const internalHrefs = [...new Set([...headerHrefs, ...footerHrefs])].filter(isInternalHref)

    // Sanity check that this actually collected the nav, not an empty page.
    expect(internalHrefs.length).toBeGreaterThan(10)

    for (const href of internalHrefs) {
      const response = await request.get(href)
      expect(response.ok(), `${href} should resolve (status ${response.status()})`).toBe(true)
    }
  })

  // Deferred from Phase 2: these two FAQ answer links (data/faq.ts
  // linkablePhrases) used to point at stub pages that 404'd.
  test('the two formerly-dead FAQ answer links resolve', async ({ request }) => {
    for (const href of ['/handbook', '/support']) {
      const response = await request.get(href)
      expect(response.ok(), `${href} should resolve (status ${response.status()})`).toBe(true)
    }
  })

  // Deferred from Phase 5: every target="_blank" link gets an sr-only
  // "(opens in new tab)" note (components/external-link-note.tsx).
  test('an external footer link carries the "(opens in new tab)" affordance', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')

    const githubLink = page.locator('footer a[href="https://github.com/CurtinFRC"]')
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(githubLink.locator('.sr-only')).toHaveText('(opens in new tab)')
  })
})
