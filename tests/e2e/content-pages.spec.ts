import { test, expect } from '@playwright/test'
import { describeContentPages } from './helpers'

describeContentPages([
  { path: '/about', heading: 'About Us' },
  { path: '/first', heading: 'FIRST' },
  { path: '/structure', heading: 'Team Structure' },
  { path: '/seasons', heading: 'Season & Awards Record' },
  { path: '/recruitment', heading: 'Join Us' },
  { path: '/faq', heading: 'Frequently Asked Questions' },
  { path: '/location', heading: 'Our Location' },
  { path: '/contact', heading: 'Contact Us' },
])

test.describe('/seasons record', () => {
  test('shows the standout years and their awards', async ({ page }) => {
    await page.goto('/seasons')

    const row2023 = page.locator('tbody tr', { hasText: '2023' })
    await expect(row2023.getByText('Regional FIRST Impact Award')).toBeVisible()
    await expect(row2023.getByText('Houston')).toBeVisible()

    const row2025 = page.locator('tbody tr', { hasText: '2025' })
    await expect(row2025.getByText('Impact Award Finalist')).toBeVisible()
    await expect(row2025.getByText("best result to date")).toBeVisible()
  })

  test('links a robot cell to its robot page', async ({ page }) => {
    await page.goto('/seasons')

    const row2025 = page.locator('tbody tr', { hasText: '2025' })
    await expect(row2025.getByRole('link', { name: 'Gup-X' })).toHaveAttribute('href', '/2025frcrobot')
  })

  test('shows an honest placeholder for years with no FIRST data', async ({ page }) => {
    await page.goto('/seasons')

    // 2014 is the only year with no FIRST data on record.
    const row2014 = page.locator('tbody tr', { hasText: '2014' })
    await expect(row2014.getByText('No FIRST data found')).toBeVisible()
  })

  test('wraps the table in its own horizontal-scroll container, with no page-level overflow at 375px', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/seasons')

    const table = page.locator('table')
    await expect(table).toBeVisible()

    const scrollContainerOverflowsX = await table.evaluate(
      (el) => getComputedStyle(el.parentElement as Element).overflowX === 'auto',
    )
    expect(scrollContainerOverflowsX).toBe(true)

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
  })
})

test.describe('/faq accordion', () => {
  test('opens via keyboard: focus summary, press Enter, answer becomes visible', async ({
    page,
  }) => {
    await page.goto('/faq')

    const firstItem = page.locator('details').first()
    const summary = firstItem.locator('summary')
    const answer = firstItem.locator('p')

    await expect(answer).toBeHidden()

    await summary.focus()
    await page.keyboard.press('Enter')

    await expect(firstItem).toHaveAttribute('open', '')
    await expect(answer).toBeVisible()
  })
})
