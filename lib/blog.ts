/**
 * Live-site index order (mirror/blog.html, confirmed by each post's prev/next
 * links). Used only to break ties between posts sharing a date — the three
 * Offseason '25 posts are all dated 29 Dec 2025.
 */
const LIVE_ORDER = [
  '2025-cad-resources',
  'offseason-25-electrical-can-connectors',
  'offseason-25-robust-vision',
  'offseason-25-carbon-fibre-shafts',
  '2024-build-blog-design-guidelines',
]

/** Curated order for a slug, or +Infinity if it isn't in LIVE_ORDER (sorts last). */
function liveOrderRank(slug: string): number {
  const index = LIVE_ORDER.indexOf(slug)
  return index === -1 ? Infinity : index
}

/** Sorts posts newest-first, breaking same-date ties by the live site's order. */
export function sortPostsNewestFirst<T extends { slug: string; date: Date }>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => b.date.getTime() - a.date.getTime() || liveOrderRank(a.slug) - liveOrderRank(b.slug),
  )
}

/** Renders a post date the way the live site does, e.g. "4 Jan 2026". */
export function formatPostDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
