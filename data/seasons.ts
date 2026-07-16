export type SeasonRecord = {
  year: number
  game: string
  /** Robot name, when publicly named — omitted (not "—") for years with no named robot. */
  robot?: string
  /** Links to an existing /<slug> robot page, when one exists (2021frcrobot…2026frcrobot). */
  robotSlug?: string
  events: string
  result: string
  awards: string[]
}

/**
 * Full competition record, 2013 (rookie year) through 2026, for the
 * /seasons page. Populated from FIRST's official event record
 * (frc-events.firstinspires.org) — nothing here is invented. 2014 has no
 * FIRST data on record and gets an honest minimal entry rather than a guess.
 *
 * Sorted chronologically (ascending) — this is the display order for the
 * /seasons page's timeline.
 *
 * Award labels here are intentionally terser than the same awards in
 * data/robots.ts (which append the venue, e.g. "Impact Award (Southern Cross
 * Regional)"). The record page wants compact, scannable labels; the venue is
 * already implied by the `events` column. This is deliberate, not drift.
 */
export const seasons: SeasonRecord[] = [
  {
    year: 2013,
    game: '—',
    events: 'Rookie year',
    result: 'Team founded',
    awards: [],
  },
  {
    year: 2014,
    game: '—',
    events: 'No FIRST data found',
    result: '—',
    awards: [],
  },
  {
    year: 2015,
    game: 'Recycle Rush',
    events: 'Australia Regional',
    result: 'Regional Finalists',
    awards: [],
  },
  {
    year: 2016,
    game: 'Stronghold',
    events: 'Australia Regional to FIRST Championship (Carver Division)',
    result: 'Regional Finalists; reached the FIRST Championship',
    awards: ['Regional Engineering Inspiration Award', 'Industrial Design Award'],
  },
  {
    year: 2017,
    game: 'Steamworks',
    events: 'South Pacific Regional to FIRST Championship',
    result: 'Reached the FIRST Championship',
    awards: ['Regional Engineering Inspiration Award'],
  },
  {
    year: 2018,
    game: 'Power Up',
    events: 'South Pacific Regional to FIRST Championship',
    result: 'Regional Winners; reached the FIRST Championship',
    awards: ['Regional Engineering Inspiration Award'],
  },
  {
    year: 2019,
    game: 'Destination: Deep Space',
    events: 'South Pacific Regional',
    result: 'Competed at the South Pacific Regional',
    awards: ['Woodie Flowers Finalist Award'],
  },
  {
    year: 2020,
    game: 'Infinite Recharge',
    events: 'Southern Cross Regional & South Pacific',
    result: 'Both events cancelled (COVID-19)',
    awards: [],
  },
  {
    year: 2021,
    game: 'Infinite Recharge (At-Home)',
    robot: 'Slinger',
    robotSlug: '2021frcrobot',
    events: 'Virtual challenges only',
    result: "No official awards; produced a Chairman's video",
    awards: [],
  },
  {
    year: 2022,
    game: 'Rapid React',
    robot: 'Mercury',
    robotSlug: '2022frcrobot',
    events: 'Southern Cross Regional to FIRST Championship (Carver Division)',
    result: 'Qualified for Houston',
    awards: ['Regional Engineering Inspiration Award'],
  },
  {
    year: 2023,
    game: 'Charged Up',
    robot: 'Whiplash',
    robotSlug: '2023frcrobot',
    events: 'Southern Cross Regional to FIRST Championship (Curie Division)',
    result: 'Southern Cross Regional: 2nd pick for Alliance 6',
    awards: ['Regional FIRST Impact Award'],
  },
  {
    year: 2024,
    game: 'Crescendo',
    robot: 'Notedog Millionaire',
    robotSlug: '2024frcrobot',
    events: 'Southern Cross Regional',
    result: 'Alliance 7 captain, quarterfinal exit, ranked 12/47',
    awards: ['Excellence in Engineering Award'],
  },
  {
    year: 2025,
    game: 'Reefscape',
    robot: 'Gup-X',
    robotSlug: '2025frcrobot',
    events: 'Southern Cross Regional to FIRST Championship (Archimedes Division) to WARP',
    result: 'Archimedes Division Winners at the FIRST Championship, advancing to Einstein',
    awards: ['Impact Award', 'Impact Award Finalist', "Dean's List Finalist (x2)"],
  },
  {
    year: 2026,
    game: 'Rebuilt',
    // Robot name not yet published (research file HOLD #6).
    // ponytail: confirm 2026 robot name for this row once published.
    robotSlug: '2026frcrobot',
    events: 'Southern Cross Regional (March 2026); WARP (14-16 August 2026)',
    result: 'Qualification 5-5, ranked 17/42; round-2 pick, Alliance 6',
    awards: ['Creativity Award'],
  },
]
