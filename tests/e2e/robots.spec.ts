import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'
import { robots } from '../../data/robots'

const ROBOT_PAGES = [
  { path: '/robots', heading: 'Our Robots' },
  ...robots.map((robot) => ({ path: `/${robot.slug}`, heading: robot.name })),
]

for (const { path, heading } of ROBOT_PAGES) {
  test.describe(path, () => {
    test('loads, has exactly one matching h1, and has no serious/critical a11y violations', async ({
      page,
    }) => {
      const response = await page.goto(path)
      expect(response?.ok()).toBe(true)

      const h1s = page.locator('h1')
      await expect(h1s).toHaveCount(1)
      await expect(h1s.first()).toContainText(heading)

      // Excludes <iframe> content: the YouTube reveal-video embed is
      // third-party markup (youtube-nocookie.com) we can't fix from here.
      const results = await new AxeBuilder({ page }).exclude('iframe').analyze()
      const seriousOrCritical = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      )
      expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([])
    })
  })
}

test.describe('/robots index', () => {
  test('shows all 6 robot cards linking to their pages', async ({ page }) => {
    await page.goto('/robots')

    const cards = page.locator('main ul > li')
    await expect(cards).toHaveCount(6)

    for (const robot of robots) {
      const card = page.locator('main ul > li', { hasText: robot.name })
      await expect(card).toHaveCount(1)
      await expect(card.getByRole('link', { name: 'See this robot' })).toHaveAttribute(
        'href',
        `/${robot.slug}`,
      )
    }
  })
})
