import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

// These tests assume NEXT_PUBLIC_TURNSTILE_SITE_KEY was UNSET when the
// static export was built: no Turnstile widget renders, the Submit button
// is enabled without a token, and submits go straight to /api/contact.
// With a site key baked in, the "renders enabled" and submission tests
// would stall waiting on a real challenge.

const PAGES_WITH_FORM = ['/', '/contact']

for (const path of PAGES_WITH_FORM) {
  test.describe(`contact form on ${path}`, () => {
    test('renders enabled with name, email, and message fields', async ({ page }) => {
      await page.goto(path)

      await expect(page.locator('#contact-name')).toBeEnabled()
      await expect(page.locator('#contact-email')).toBeEnabled()
      await expect(page.locator('#contact-message')).toBeEnabled()
      await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled()
    })

    test('blocks an empty submit via native HTML5 validation', async ({ page }) => {
      await page.goto(path)

      await page.getByRole('button', { name: 'Submit' }).click()

      const nameField = page.locator('#contact-name')
      await expect(nameField).toHaveJSProperty('validity.valid', false)
      const validationMessage = await nameField.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage.length).toBeGreaterThan(0)
    })
  })
}

test.describe('contact form submission (no Pages Function in the static test server)', () => {
  test('a filled submit falls back to the error state and preserves the typed message', async ({
    page,
  }) => {
    await page.goto('/contact')

    await page.locator('#contact-name').fill('Jane Smith')
    await page.locator('#contact-email').fill('jane@example.com')
    const messageText = 'Hello from the e2e test, please do not lose this.'
    await page.locator('#contact-message').fill(messageText)

    await page.getByRole('button', { name: 'Submit' }).click()

    const alert = page.locator('#contact-error')
    await expect(alert).toBeVisible()
    await expect(alert).toContainText('FIRSTRoboticsTeam@curtin.edu.au')

    await expect(page.locator('#contact-message')).toHaveValue(messageText)
  })

  test('is free of serious/critical a11y violations while showing the error state', async ({
    page,
  }) => {
    await page.goto('/contact')

    await page.locator('#contact-name').fill('Jane Smith')
    await page.locator('#contact-email').fill('jane@example.com')
    await page.locator('#contact-message').fill('Testing the error state for a11y.')
    await page.getByRole('button', { name: 'Submit' }).click()
    await expect(page.locator('#contact-error')).toBeVisible()

    const results = await new AxeBuilder({ page }).analyze()
    const seriousOrCritical = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    )
    expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([])
  })
})
