import { test, expect } from '@playwright/test'

const SAMPLE_PAGES = [
  { path: '/', titleSuffix: null },
  { path: '/2025frcrobot', titleSuffix: ' | Team 4788' },
  { path: '/blog/2025-cad-resources', titleSuffix: ' | Team 4788' },
  { path: '/support', titleSuffix: ' | Team 4788' },
]

test.describe('SEO metadata', () => {
  test('each sampled route has a unique title matching the template, plus a meta description', async ({
    page,
  }) => {
    const titles: string[] = []

    for (const { path, titleSuffix } of SAMPLE_PAGES) {
      const response = await page.goto(path)
      expect(response?.ok()).toBe(true)

      const title = await page.title()
      expect(title.length).toBeGreaterThan(0)
      if (titleSuffix) {
        expect(title.endsWith(titleSuffix), `${path} title "${title}" should end with "${titleSuffix}"`).toBe(
          true,
        )
      } else {
        // Homepage keeps the bare site name, bypassing the template.
        expect(title).toBe('Team 4788')
      }
      titles.push(title)

      const description = await page.locator('meta[name="description"]').getAttribute('content')
      expect(description, `${path} should have a non-empty meta description`).toBeTruthy()
    }

    expect(new Set(titles).size, `titles should be unique: ${JSON.stringify(titles)}`).toBe(titles.length)
  })

  test('each sampled route has an og:url resolved from metadataBase, plus a matching og:image', async ({
    page,
    baseURL,
  }) => {
    for (const { path } of SAMPLE_PAGES) {
      await page.goto(path)

      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content')
      expect(ogUrl, `${path} should have an og:url`).toBe(`https://team4788.com${path === '/' ? '' : path}`)

      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
      expect(ogImage, `${path} should have an absolute og:image`).toMatch(/^https:\/\/team4788\.com\//)
    }
  })

  test('/ and a blog post each render valid JSON-LD', async ({ page }) => {
    for (const path of ['/', '/blog/2025-cad-resources']) {
      await page.goto(path)

      const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
      expect(scripts.length, `${path} should render at least one JSON-LD script`).toBeGreaterThan(0)

      for (const script of scripts) {
        expect(() => JSON.parse(script), `${path} JSON-LD should parse: ${script}`).not.toThrow()
        const data = JSON.parse(script)
        expect(data['@context']).toBe('https://schema.org')
        expect(typeof data['@type']).toBe('string')
      }
    }
  })
})
