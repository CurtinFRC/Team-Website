/**
 * Every static, non-data-driven public route. Consumed by app/sitemap.ts;
 * robot pages and blog posts are appended there from their data sources.
 * tests/sitemap.test.ts guards this list against the nav: adding a page to
 * data/nav.ts without listing it here (or in data/robots.ts) fails the build.
 */
export const STATIC_ROUTES = [
  '/',
  '/about',
  '/structure',
  '/seasons',
  '/recruitment',
  '/first',
  '/faq',
  '/location',
  '/contact',
  '/diversity',
  '/downloads',
  '/handbook',
  '/media',
  '/resources',
  '/roboacademy',
  '/robotdemos',
  '/support',
  '/workshops',
  '/robots',
  '/blog',
]
