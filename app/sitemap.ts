import type { MetadataRoute } from 'next'
import { allBlogs } from 'content-collections'
import { robots } from '@/data/robots'
import { STATIC_ROUTES } from '@/lib/routes'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }))

  const robotEntries = robots.map((robot) => ({
    url: `${SITE_URL}/${robot.slug}`,
  }))

  const blogEntries = allBlogs.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
  }))

  return [...staticEntries, ...robotEntries, ...blogEntries]
}
