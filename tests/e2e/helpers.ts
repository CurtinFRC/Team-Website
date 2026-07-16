import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

export type PageCheck = { path: string; heading: string }

/**
 * Registers the standard per-page check shared by content-pages.spec.ts and
 * formerly-stub-pages.spec.ts: the route responds ok, has exactly one h1
 * containing the expected heading, and axe reports no serious/critical
 * violations.
 */
export function describeContentPages(pages: PageCheck[]) {
  for (const { path, heading } of pages) {
    test.describe(path, () => {
      test('loads, has exactly one matching h1, and has no serious/critical a11y violations', async ({
        page,
      }) => {
        const response = await page.goto(path)
        expect(response?.ok()).toBe(true)

        const h1s = page.locator('h1')
        await expect(h1s).toHaveCount(1)
        await expect(h1s.first()).toContainText(heading)

        const results = await new AxeBuilder({ page }).analyze()
        const seriousOrCritical = results.violations.filter(
          (violation) => violation.impact === 'serious' || violation.impact === 'critical',
        )
        expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([])
      })
    })
  }
}
