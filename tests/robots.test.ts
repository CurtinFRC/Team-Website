import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { robots } from '../data/robots'

/** Slugs in newest-first page order, matching the nav's Robots dropdown. */
const EXPECTED_SLUGS = [
  '2026frcrobot',
  '2025frcrobot',
  '2024frcrobot',
  '2023frcrobot',
  '2022frcrobot',
  '2021frcrobot',
]

const isValidLinkUrl = (value: string) => /^https?:\/\//.test(value) || value.startsWith('/')

const isValidHttpsUrl = (value: string) => /^https:\/\//.test(value)

/** Matches a youtube.com/(embed|watch?v=) or youtu.be URL carrying an 11-char video id. */
const isValidYoutubeUrl = (value: string) =>
  /^https:\/\/(www\.)?(youtube(-nocookie)?\.com\/(embed\/|watch\?v=)|youtu\.be\/)[A-Za-z0-9_-]{11}/.test(
    value,
  )

describe('robots', () => {
  it('has exactly 6 entries', () => {
    expect(robots.length).toBe(6)
  })

  it('has the exact slugs, in newest-first order', () => {
    expect(robots.map((robot) => robot.slug)).toEqual(EXPECTED_SLUGS)
  })

  it('has unique years covering 2021-2026', () => {
    const years = robots.map((robot) => robot.year)
    expect(new Set(years).size).toBe(6)
    expect([...years].sort()).toEqual([2021, 2022, 2023, 2024, 2025, 2026])
  })

  it('gives every entry a non-empty name, year, game, and tagline', () => {
    for (const robot of robots) {
      expect(robot.name.trim().length, `${robot.slug} name`).toBeGreaterThan(0)
      expect(robot.year, `${robot.slug} year`).toBeGreaterThan(0)
      expect(robot.game.trim().length, `${robot.slug} game`).toBeGreaterThan(0)
      expect(robot.tagline.trim().length, `${robot.slug} tagline`).toBeGreaterThan(0)
    }
  })

  it('gives every entry a non-empty achievements array', () => {
    for (const robot of robots) {
      expect(Array.isArray(robot.achievements), `${robot.slug} achievements`).toBe(true)
      expect(robot.achievements.length, `${robot.slug} achievements`).toBeGreaterThan(0)
      for (const achievement of robot.achievements) {
        expect(achievement.trim().length, `${robot.slug} achievement text`).toBeGreaterThan(0)
      }
    }
  })

  it('gives every entry a non-empty results string when present', () => {
    for (const robot of robots) {
      if (robot.results !== undefined) {
        expect(robot.results.trim().length, `${robot.slug} results`).toBeGreaterThan(0)
      }
    }
  })

  it('gives every entry a non-empty awards array of non-empty strings when present', () => {
    for (const robot of robots) {
      if (robot.awards !== undefined) {
        expect(Array.isArray(robot.awards), `${robot.slug} awards`).toBe(true)
        expect(robot.awards.length, `${robot.slug} awards`).toBeGreaterThan(0)
        for (const award of robot.awards) {
          expect(award.trim().length, `${robot.slug} award text`).toBeGreaterThan(0)
        }
      }
    }
  })

  it('gives every entry a real https code repo URL', () => {
    for (const robot of robots) {
      expect(robot.links.code, `${robot.slug} code`).toBeDefined()
      expect(isValidHttpsUrl(robot.links.code!), `${robot.slug} code "${robot.links.code}"`).toBe(true)
    }
  })

  it('gives every present reveal a valid YouTube URL', () => {
    for (const robot of robots) {
      if (robot.links.reveal !== undefined) {
        expect(
          isValidYoutubeUrl(robot.links.reveal),
          `${robot.slug} reveal "${robot.links.reveal}"`,
        ).toBe(true)
      }
    }
  })

  it('gives every link value a valid absolute URL or root-relative path', () => {
    for (const robot of robots) {
      const { reveal, cad, code, galleries } = robot.links
      for (const value of [reveal, cad, code]) {
        if (value !== undefined) {
          expect(isValidLinkUrl(value), `${robot.slug} link "${value}"`).toBe(true)
        }
      }
      if (galleries !== undefined) {
        expect(Array.isArray(galleries), `${robot.slug} galleries`).toBe(true)
        for (const gallery of galleries) {
          expect(isValidLinkUrl(gallery), `${robot.slug} gallery "${gallery}"`).toBe(true)
        }
      }
    }
  })

  it('has an app/<slug>/page.tsx route file for every robot', () => {
    for (const robot of robots) {
      const routeFile = join(process.cwd(), 'app', robot.slug, 'page.tsx')
      expect(existsSync(routeFile), `${robot.slug} route file missing: ${routeFile}`).toBe(true)
    }
  })

  it('points every photos[] entry at a file that exists under public/ (tolerating empty arrays)', () => {
    for (const robot of robots) {
      expect(Array.isArray(robot.photos), `${robot.slug} photos`).toBe(true)
      for (const photo of robot.photos) {
        expect(photo.startsWith('/'), `${robot.slug} photo "${photo}" should be root-relative`).toBe(
          true,
        )
        const filePath = join(process.cwd(), 'public', photo)
        expect(existsSync(filePath), `${robot.slug} photo file missing: ${filePath}`).toBe(true)
      }
    }
  })
})
