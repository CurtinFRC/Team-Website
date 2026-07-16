import { test, expect } from '@playwright/test'

/**
 * Sponsor logos are a small, brand-critical row. They must load EAGERLY, not
 * lazily: on /support the sponsor band sits below the tier grid (offscreen at
 * load), and with loading="lazy" the images stayed blank until scrolled — they
 * read as broken. This guards against a regression to lazy loading.
 */
test.describe('sponsor logos load eagerly', () => {
  for (const path of ['/', '/support']) {
    test(`render without needing a scroll on ${path}`, async ({ page }) => {
      await page.goto(path)

      const logo = page.locator('img[alt="Curtin University"]').first()
      await expect(logo).toHaveCount(1)

      // Not lazy: with the attribute omitted the DOM `loading` reflects the
      // eager default ("eager"/"auto" depending on engine); a regression to
      // loading="lazy" would report "lazy" and fail here.
      const loadingProp = await logo.evaluate((img: HTMLImageElement) => img.loading)
      expect(loadingProp).not.toBe('lazy')

      // And it actually decodes without any scrolling.
      await expect
        .poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth), { timeout: 10_000 })
        .toBeGreaterThan(0)
    })
  }
})
