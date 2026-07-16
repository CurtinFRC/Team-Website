import { describe, expect, it } from 'vitest'
import { navGroups, navTopLevelLinks, type NavGroup, type NavLink } from '../data/nav'

function isValidHref(href: string): boolean {
  // Internal routes are root-relative; a couple of nav items (the external
  // training course platform) legitimately point off-site.
  return href.startsWith('/') || href.startsWith('http://') || href.startsWith('https://')
}

function allLinks(groups: NavGroup[]): NavLink[] {
  return groups.flatMap((group) => group.links)
}

describe('navGroups', () => {
  it('is a non-empty array of groups', () => {
    expect(Array.isArray(navGroups)).toBe(true)
    expect(navGroups.length).toBeGreaterThan(0)
  })

  it('gives every group a non-empty label', () => {
    for (const group of navGroups) {
      expect(group.label.trim().length).toBeGreaterThan(0)
    }
  })

  it('gives every group at least one link', () => {
    for (const group of navGroups) {
      expect(group.links.length).toBeGreaterThan(0)
    }
  })

  it('gives every link a non-empty label', () => {
    for (const link of allLinks(navGroups)) {
      expect(link.label.trim().length).toBeGreaterThan(0)
    }
  })

  it('gives every link a valid href', () => {
    for (const link of allLinks(navGroups)) {
      expect(isValidHref(link.href)).toBe(true)
    }
  })

  it('has no duplicate hrefs within a single group', () => {
    for (const group of navGroups) {
      const hrefs = group.links.map((link) => link.href)
      expect(new Set(hrefs).size).toBe(hrefs.length)
    }
  })

  it('matches the live site groups: About, Robots, Resources, Community', () => {
    expect(navGroups.map((group) => group.label)).toEqual([
      'About',
      'Robots',
      'Resources',
      'Community',
    ])
  })

  it('links the Resources group to /resources first, so the overview page is reachable from nav', () => {
    const resources = navGroups.find((group) => group.label === 'Resources')
    expect(resources?.links[0]).toEqual({ label: 'Overview', href: '/resources' })
  })

  it('lists the Robots group as the six build seasons, newest first', () => {
    const robots = navGroups.find((group) => group.label === 'Robots')
    expect(robots?.links.map((link) => link.href)).toEqual([
      '/2026frcrobot',
      '/2025frcrobot',
      '/2024frcrobot',
      '/2023frcrobot',
      '/2022frcrobot',
      '/2021frcrobot',
    ])
  })
})

describe('navTopLevelLinks', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(navTopLevelLinks)).toBe(true)
    expect(navTopLevelLinks.length).toBeGreaterThan(0)
  })

  it('gives every link a non-empty label and a valid href', () => {
    for (const link of navTopLevelLinks) {
      expect(link.label.trim().length).toBeGreaterThan(0)
      expect(isValidHref(link.href)).toBe(true)
    }
  })

  it('has no duplicate hrefs', () => {
    const hrefs = navTopLevelLinks.map((link) => link.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it('includes Support Us', () => {
    expect(navTopLevelLinks.some((link) => link.label === 'Support Us' && link.href === '/support')).toBe(true)
  })
})
