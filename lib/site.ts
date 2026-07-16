import type { Metadata } from 'next'

/** Canonical production origin, used for metadataBase, sitemap, RSS, and JSON-LD. */
export const SITE_URL = 'https://team4788.com'

/** Display name used in titles, JSON-LD, and OG defaults. */
export const SITE_NAME = 'Team 4788'

/** The live site's own og:image (mirror/home.html), reused as the default across every page. */
export const DEFAULT_OG_IMAGE = '/images/original/kRBSe89BbVzmISpd5Gvc630Es.jpg'

type PageMetadataOptions = {
  /** Plain page title, e.g. "About Us" — rendered as "About Us | Team 4788". */
  title: string
  description: string
  /** Path from the site root, e.g. "/about" — resolved to an absolute URL via metadataBase. */
  path: string
  type?: 'website' | 'article'
  /** ISO date string; set for blog posts. */
  publishedTime?: string
  /** True only for the homepage: uses `title` exactly, bypassing the "%s | Team 4788" template. */
  absoluteTitle?: boolean
}

/**
 * Metadata for one page: templated <title>, description, and a matching
 * OpenGraph/Twitter card. Next.js does not deep-merge `openGraph` between a
 * layout and a page — a page that sets its own `openGraph` replaces the root
 * layout's wholesale — so every page needs to (and, via this helper, does)
 * repeat the shared image/site-name defaults rather than relying on
 * inheritance.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  absoluteTitle,
}: PageMetadataOptions): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      types: { 'application/rss+xml': '/feed.xml' },
    },
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_OG_IMAGE }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}
