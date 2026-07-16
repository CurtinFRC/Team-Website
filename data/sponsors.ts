export type Sponsor = {
  name: string
  /** Path under /public. Logos are white-on-transparent PNGs rescued from the live site. */
  logo: string
}

/**
 * Homepage sponsor wall. Order and identities verified against the live site:
 * the reference screenshot (mirror/screenshots/home-1440.png) shows these seven
 * logos in this order, and the image sequence in mirror/home.html (the run of
 * <img> tags after the "Thank you to our sponsors!" heading) matches it.
 *
 * The rescued logos are white artwork on a transparent background, rendered
 * as-is on the dark sponsor band (matching the live site) — see
 * components/sponsor-grid.tsx.
 *
 * URLs aren't recoverable: the live logos are unlinked (or wrapped by Framer
 * client-side), so no outbound href is asserted here.
 *
 * Names updated to full confirmed legal names per FIRST 2026 registration
 * (docs/research/2026-07-15-public-footprint.md). Artifactory has no
 * independent confirmation as a current sponsor — kept (it's on the live
 * site) but flagged.
 */
export const sponsors: Sponsor[] = [
  { name: 'Curtin University', logo: '/images/original/ZGcawMVpDAc5AuRWouP6Fc4ipLE.png' },
  { name: 'DNA Racing', logo: '/images/original/8S9ifvl8suPkERIV0ysp09RryZQ.png' },
  {
    name: 'West Australian Robotics Education Specialists (WARES)',
    logo: '/images/original/mOTrGj7jbAv5B4pLGzOYjV5gc.png',
  },
  { name: 'Paradigm Machine Tool', logo: '/images/original/jKyr7DDxDhvk7JEuQL9MDUJ7LS4.png' },
  { name: 'DSM Consulting Engineers', logo: '/images/original/ftgHJakPPpCIV5pneRHY76eew.png' },
  { name: 'Packaging Perth', logo: '/images/original/8w1FlEqOqcQXnQrGQQQ8L6juqE.png' },
  {
    // ponytail: confirm Artifactory is a current sponsor (no independent source found)
    name: "Artifactory - Perth's Maker Space",
    logo: '/images/original/OzPDvTFyi9bYE0iVrfHAZm2A4.png',
  },
]
