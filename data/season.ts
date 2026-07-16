export type CurrentSeason = {
  /** Game name for the current FRC season, e.g. "REEFSCAPE". */
  game: string
  /** Body copy shown in the season section (verbatim from the live homepage). */
  copy: string
  /** "Watch on YouTube" target (the team channel until a 2026 reveal exists). */
  revealUrl: string
  /** "Read our Build Blog" target. */
  blogUrl: string
}

/**
 * Current-season block on the homepage. Kept in one file so rolling the site to
 * the next season is a single edit.
 *
 * Rolled forward to 2026 "Rebuilt" per docs/research/2026-07-15-public-footprint.md.
 * The live "See the Season Reveal" / "Read our Build Blog" buttons are rendered
 * by Framer client-side and carry no href in the static mirror, so these targets
 * are best-effort using verified team destinations:
 *   - revealUrl -> no 2026 reveal video is published yet (research file HOLD
 *     #6), so this points at the team's YouTube channel as a placeholder.
 *     ponytail: swap in the real 2026 reveal video URL once it's published.
 *   - blogUrl -> the on-site blog index (matches the "Blogs" nav item).
 *
 * `copy` describes the 2026 Rebuilt season as it stands per the research
 * file: Southern Cross Regional result (Creativity Award) plus the upcoming
 * WARP playoffs. It doesn't name a robot — the 2026 robot's name isn't
 * published yet (HOLD #6).
 */
export const currentSeason: CurrentSeason = {
  game: 'REBUILT',
  copy: "This season we're competing in Rebuilt. At Southern Cross Regional in March we won the Creativity Award, and we're back on the field for the WA Robotics Playoffs in August.",
  revealUrl: 'https://www.youtube.com/@CurtinFRC4788CantControl',
  blogUrl: '/blog',
}
