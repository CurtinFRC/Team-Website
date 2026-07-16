import { allBlogs } from 'content-collections'
import { buildRssFeed } from '@/lib/rss'

export const dynamic = 'force-static'

export function GET() {
  const feed = buildRssFeed(allBlogs)

  return new Response(feed, {
    headers: {
      'content-type': 'application/rss+xml',
    },
  })
}
