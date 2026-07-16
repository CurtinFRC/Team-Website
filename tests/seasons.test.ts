import { describe, expect, it } from 'vitest'
import { robots } from '../data/robots'
import { seasons } from '../data/seasons'

describe('seasons', () => {
  it('is chronological with unique years', () => {
    const years = seasons.map((season) => season.year)
    expect(new Set(years).size, 'duplicate year found').toBe(years.length)
    expect(years).toEqual([...years].sort((a, b) => a - b))
  })

  it('covers 2013 through 2026 with no gaps', () => {
    const years = seasons.map((season) => season.year)
    expect(years[0]).toBe(2013)
    expect(years[years.length - 1]).toBe(2026)
    for (let i = 1; i < years.length; i++) {
      expect(years[i], `gap before ${years[i]}`).toBe(years[i - 1] + 1)
    }
  })

  it('invents no years beyond 2026', () => {
    for (const season of seasons) {
      expect(season.year, `${season.year} is beyond 2026`).toBeLessThanOrEqual(2026)
    }
  })

  it('gives every entry a non-empty game, events, and result', () => {
    for (const season of seasons) {
      expect(season.game.trim().length, `${season.year} game`).toBeGreaterThan(0)
      expect(season.events.trim().length, `${season.year} events`).toBeGreaterThan(0)
      expect(season.result.trim().length, `${season.year} result`).toBeGreaterThan(0)
    }
  })

  it('gives every entry an awards array of non-empty strings', () => {
    for (const season of seasons) {
      expect(Array.isArray(season.awards), `${season.year} awards`).toBe(true)
      for (const award of season.awards) {
        expect(award.trim().length, `${season.year} award text`).toBeGreaterThan(0)
      }
    }
  })

  it('links robotSlug (when set) to a real slug in data/robots.ts', () => {
    const robotSlugs = new Set(robots.map((robot) => robot.slug))
    for (const season of seasons) {
      if (season.robotSlug !== undefined) {
        expect(
          robotSlugs.has(season.robotSlug),
          `${season.year} robotSlug "${season.robotSlug}" has no matching robot`,
        ).toBe(true)
      }
    }
  })
})
