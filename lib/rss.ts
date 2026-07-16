import { sortPostsNewestFirst } from './blog'
import { SITE_URL } from './site'

export type RssPost = {
  slug: string
  title: string
  summary: string
  date: Date
}

/** Escapes text for safe placement inside XML element content. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildItem(post: RssPost): string {
  const link = `${SITE_URL}/blog/${post.slug}`
  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`
}

/** Builds the site's RSS 2.0 feed XML for the blog, newest post first. */
export function buildRssFeed(posts: RssPost[]): string {
  const sorted = sortPostsNewestFirst(posts)
  const items = sorted.map(buildItem).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Team 4788 Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Hosted, Posted, Boasted content by Team 4788 Can't Control!</description>
${items}
  </channel>
</rss>
`
}
