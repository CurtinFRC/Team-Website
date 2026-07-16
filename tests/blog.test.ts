import { describe, expect, it } from 'vitest'
import { sortPostsNewestFirst } from '../lib/blog'

type Post = { slug: string; date: Date }

describe('sortPostsNewestFirst', () => {
  it('breaks same-date ties using the live site order', () => {
    const posts: Post[] = [
      { slug: 'offseason-25-carbon-fibre-shafts', date: new Date('2025-12-29') },
      { slug: 'offseason-25-robust-vision', date: new Date('2025-12-29') },
      { slug: 'offseason-25-electrical-can-connectors', date: new Date('2025-12-29') },
      { slug: '2025-cad-resources', date: new Date('2026-01-04') },
    ]

    const sorted = sortPostsNewestFirst(posts).map((post) => post.slug)

    expect(sorted).toEqual([
      '2025-cad-resources',
      'offseason-25-electrical-can-connectors',
      'offseason-25-robust-vision',
      'offseason-25-carbon-fibre-shafts',
    ])
  })

  it('sorts a post not in LIVE_ORDER after curated same-date posts', () => {
    const posts: Post[] = [
      { slug: 'offseason-25-robust-vision', date: new Date('2025-12-29') },
      { slug: 'unlisted-guest-post', date: new Date('2025-12-29') },
      { slug: 'offseason-25-electrical-can-connectors', date: new Date('2025-12-29') },
    ]

    const sorted = sortPostsNewestFirst(posts).map((post) => post.slug)

    expect(sorted).toEqual([
      'offseason-25-electrical-can-connectors',
      'offseason-25-robust-vision',
      'unlisted-guest-post',
    ])
  })
})
