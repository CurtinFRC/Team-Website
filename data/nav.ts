export type NavLink = {
  label: string
  href: string
}

export type NavGroup = {
  label: string
  links: NavLink[]
}

/** True for off-site hrefs, which render as plain <a target="_blank">. */
export const isExternal = (href: string) => /^https?:\/\//.test(href)

/**
 * Header nav structure, verified against the live site (mirror/home.html) by
 * loading team4788.com and opening each dropdown — the static markup only
 * ships the "closed" state, so the item lists aren't visible in the raw HTML.
 *
 * Two things worth flagging (see Phase 2 report for detail):
 * - The live site groups these under "Community", not "Outreach".
 * - "Contact Us" lives inside the "About" dropdown, not as a top-level link.
 * - "Training Course" links off-site to learn.team4788.com, not /roboacademy.
 */
export const navGroups: NavGroup[] = [
  {
    label: 'About',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Structure', href: '/structure' },
      { label: 'Season Record', href: '/seasons' },
      { label: 'Recruitment', href: '/recruitment' },
      { label: 'FIRST®', href: '/first' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Location', href: '/location' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    label: 'Robots',
    links: [
      { label: '2026', href: '/2026frcrobot' },
      { label: '2025', href: '/2025frcrobot' },
      { label: '2024', href: '/2024frcrobot' },
      { label: '2023', href: '/2023frcrobot' },
      { label: '2022', href: '/2022frcrobot' },
      { label: '2021', href: '/2021frcrobot' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { label: 'Overview', href: '/resources' },
      { label: 'Training Course', href: 'https://learn.team4788.com' },
      { label: 'Blogs', href: '/blog' },
      { label: 'Team Handbook', href: '/handbook' },
      { label: 'Downloads', href: '/downloads' },
    ],
  },
  {
    label: 'Community',
    links: [
      { label: 'Roboacademy', href: '/roboacademy' },
      { label: 'Workshops', href: '/workshops' },
      { label: 'Diversity', href: '/diversity' },
      { label: 'Robot Demos', href: '/robotdemos' },
      { label: 'Media', href: '/media' },
    ],
  },
]

/** Plain links rendered outside a dropdown, e.g. "Support Us". */
export const navTopLevelLinks: NavLink[] = [{ label: 'Support Us', href: '/support' }]

/** From the live site's header/footer social links (mirror/home.html). */
export const socialLinks: NavLink[] = [
  { label: 'GitHub', href: 'https://github.com/CurtinFRC' },
  { label: 'Facebook', href: 'https://www.facebook.com/Team4788' },
  { label: 'Instagram', href: 'https://www.instagram.com/frcteam4788/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@CurtinFRC4788CantControl' },
]
