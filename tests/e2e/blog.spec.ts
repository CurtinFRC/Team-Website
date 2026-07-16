import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

const POST_SLUGS = [
  '2025-cad-resources',
  'offseason-25-electrical-can-connectors',
  'offseason-25-robust-vision',
  'offseason-25-carbon-fibre-shafts',
  '2024-build-blog-design-guidelines',
]

test.describe('/blog', () => {
  test('loads, has exactly one h1, no serious/critical a11y violations, and links to all 5 posts', async ({
    page,
  }) => {
    const response = await page.goto('/blog')
    expect(response?.ok()).toBe(true)

    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)
    await expect(h1s.first()).toContainText("Team 4788's Blogs")

    for (const slug of POST_SLUGS) {
      await expect(page.locator(`main a[href="/blog/${slug}"]`)).toHaveCount(1)
    }

    const results = await new AxeBuilder({ page }).analyze()
    const seriousOrCritical = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    )
    expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([])
  })
})

test.describe('/blog/[slug]', () => {
  test('renders the post title as the only h1, no serious/critical a11y violations', async ({
    page,
  }) => {
    const response = await page.goto('/blog/2025-cad-resources')
    expect(response?.ok()).toBe(true)

    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)
    await expect(h1s.first()).toContainText('2025 CAD Resources')

    const results = await new AxeBuilder({ page }).analyze()
    const seriousOrCritical = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    )
    expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([])
  })
})
