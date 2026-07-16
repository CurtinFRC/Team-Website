import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

test('homepage responds and contains Ignite', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.ok()).toBe(true)
  await expect(page.getByText('Ignite')).toBeVisible()
})

test('skip link is the first focusable element and moves focus to main content', async ({ page }) => {
  await page.goto('/')

  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Skip to content' })
  await expect(skipLink).toBeFocused()

  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('homepage has exactly one h1 and no serious/critical a11y violations', async ({ page }) => {
  await page.goto('/')

  const h1s = page.locator('h1')
  await expect(h1s).toHaveCount(1)
  await expect(h1s.first()).toContainText('Ignite')

  const results = await new AxeBuilder({ page }).analyze()
  const seriousOrCritical = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  )
  expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([])
})
