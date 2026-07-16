import { describe, expect, it } from 'vitest'
import { isExternal, navGroups, navTopLevelLinks } from '../data/nav'
import { robots } from '../data/robots'
import { STATIC_ROUTES } from '../lib/routes'

/**
 * The sitemap route list in app/sitemap.ts = STATIC_ROUTES plus one entry per
 * robot and blog post, appended from their data sources. Blog posts can't
 * drop out silently (they're enumerated from content), but a page added to
 * the nav without a matching STATIC_ROUTES entry would — this is the guard.
 */
const SITEMAP_ROUTES = new Set([...STATIC_ROUTES, ...robots.map((robot) => `/${robot.slug}`)])

const internalNavHrefs = [...navGroups.flatMap((group) => group.links), ...navTopLevelLinks]
  .map((link) => link.href)
  .filter((href) => !isExternal(href))

describe('sitemap route list', () => {
  it('covers every internal nav href (header groups + top-level links)', () => {
    for (const href of internalNavHrefs) {
      expect(SITEMAP_ROUTES.has(href), `nav href ${href} is missing from the sitemap route list`).toBe(
        true,
      )
    }
  })

  it('has no duplicate static routes', () => {
    expect(new Set(STATIC_ROUTES).size).toBe(STATIC_ROUTES.length)
  })

  it('lists only root-relative paths', () => {
    for (const route of STATIC_ROUTES) {
      expect(route.startsWith('/'), `${route} should start with /`).toBe(true)
      expect(route.endsWith('/') && route !== '/', `${route} should not have a trailing slash`).toBe(
        false,
      )
    }
  })
})
