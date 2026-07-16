import { describe, expect, it } from 'vitest'
import { buildRssFeed, type RssPost } from '../lib/rss'

const POSTS: RssPost[] = [
  { slug: 'older-post', title: 'Older Post', summary: 'The first thing we wrote.', date: new Date('2024-01-06') },
  { slug: 'newer-post', title: 'Newer Post', summary: 'The latest thing we wrote.', date: new Date('2026-01-04') },
  { slug: 'middle-post', title: 'Middle Post', summary: 'Something in between.', date: new Date('2025-12-29') },
]

describe('buildRssFeed', () => {
  it('produces a channel with "Team 4788" in the title', () => {
    const xml = buildRssFeed(POSTS)
    expect(xml).toContain('<channel>')
    const titleMatch = xml.match(/<channel>[\s\S]*?<title>(.*?)<\/title>/)
    expect(titleMatch?.[1]).toContain('Team 4788')
  })

  it('emits exactly one <item> per post', () => {
    const xml = buildRssFeed(POSTS)
    expect(xml.match(/<item>/g)?.length).toBe(POSTS.length)
  })

  it('gives every item a title, link, pubDate, and description', () => {
    const xml = buildRssFeed(POSTS)
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? []
    expect(items.length).toBe(POSTS.length)
    for (const item of items) {
      expect(item).toMatch(/<title>.*?<\/title>/)
      expect(item).toMatch(/<link>.*?<\/link>/)
      expect(item).toMatch(/<pubDate>.*?<\/pubDate>/)
      expect(item).toMatch(/<description>.*?<\/description>/)
    }
  })

  it('points every item link at https://team4788.com/blog/<slug>', () => {
    const xml = buildRssFeed(POSTS)
    for (const post of POSTS) {
      expect(xml).toContain(`<link>https://team4788.com/blog/${post.slug}</link>`)
    }
  })

  it('sorts items newest-first regardless of input order', () => {
    const xml = buildRssFeed(POSTS)
    const titles = [...xml.matchAll(/<title>(.*?)<\/title>/g)].map((match) => match[1])
    // First <title> is the channel title, so item titles start at index 1.
    expect(titles.slice(1)).toEqual(['Newer Post', 'Middle Post', 'Older Post'])
  })

  it('XML-escapes special characters in title and description', () => {
    const trickyPost: RssPost = {
      slug: 'tricky-post',
      title: 'Rio Hub & Rio <Module>',
      summary: 'CAN, 12V & DIO over RJ45 <ethernet> cabling',
      date: new Date('2026-02-01'),
    }
    const xml = buildRssFeed([trickyPost])

    expect(xml).not.toContain('Rio Hub & Rio <Module>')
    expect(xml).toContain('Rio Hub &amp; Rio &lt;Module&gt;')
    expect(xml).toContain('CAN, 12V &amp; DIO over RJ45 &lt;ethernet&gt; cabling')
  })
})
