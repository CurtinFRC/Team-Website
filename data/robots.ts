import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export type Robot = {
  slug: string
  name: string
  year: number
  game: string
  tagline: string
  achievements: string[]
  /** One-line season result summary (docs/research/2026-07-15-public-footprint.md competition table). */
  results?: string
  /** Official FIRST award names (distinct from `achievements`, which also covers WARP/ranking lines). */
  awards?: string[]
  links: {
    reveal?: string
    cad?: string
    code?: string
    galleries?: string[]
  }
  photos: string[]
}

/**
 * One entry per season robot, verbatim facts from mirror/content-notes.md
 * (§ /<year>frcrobot and § /robots) plus real hrefs pulled from the raw
 * mirror/<year>frcrobot.html (see Phase 5 report for the extraction method).
 *
 * Link fields are omitted rather than guessed when the mirror has no real
 * href for them:
 * - `cad`: no robot page has an actual onshape.com link in its static HTML —
 *   the "Onshape" card heading exists on 2023/2025 but Framer renders it
 *   without a wrapping <a href>. Omitted for all six entries.
 * - `reveal`: 2021 has no "Reveal Video" section at all (no iframe in the
 *   mirror; it was a virtual-only season), and 2026's reveal isn't published
 *   yet, so both are omitted; 2022-2025 have a real youtube.com/embed/<id>
 *   iframe (URLs re-confirmed against docs/research/2026-07-15-public-footprint.md).
 * - `galleries`: only 2024 and 2025 have a Gallery section with real
 *   photos.app.goo.gl links; omitted for 2021-2023 and 2026.
 *
 * 2021's `tagline` has no source text: the live /robots index only features
 * 2022-2025 (Slinger isn't in that carousel/list), and 2021frcrobot.html
 * itself has no descriptive sentence beyond its headings. The tagline below
 * is built only from verified facts (the WARP Winner achievement + game
 * name), not invented detail — docs/research/2026-07-15-public-footprint.md
 * now independently confirms Slinger as the 2021 robot's real name plus its
 * results (no official FIRST awards, though the team made a Chairman's
 * video), so the tagline stays as-is rather than being rewritten.
 *
 * `results` and `awards` are populated from that research file's competition
 * table for every robot. 2026 ("Rebuilt") is a real entry with real results
 * and its Creativity Award, but its robot name/tagline/photos/reveal are not
 * yet published — those fields are flagged `ponytail` rather than invented.
 */
export const robots: Robot[] = [
  {
    slug: '2026frcrobot',
    // Robot name, tagline, photos, and reveal video are not yet published
    // (docs/research/2026-07-15-public-footprint.md HOLD #6). The name and
    // tagline below use only CONFIDENT facts (the game name and the
    // Creativity Award), same approach as the 2021 Slinger tagline.
    // ponytail: confirm 2026 robot name, tagline, photos, reveal
    name: 'Rebuilt',
    year: 2026,
    game: 'Rebuilt',
    tagline: 'Creativity Award winner in the Rebuilt season.',
    achievements: [
      'Quals 5-5, ranked 17/42 - Southern Cross Regional',
      'Round 2 pick, Alliance 6',
    ],
    results: 'Quals 5-5, ranked 17/42; round-2 pick, Alliance 6.',
    awards: ['Creativity Award'],
    links: {
      code: 'https://github.com/CurtinFRC/2026-Rebuilt',
      // ponytail: add 2026 reveal video when published
    },
    photos: [],
  },
  {
    slug: '2025frcrobot',
    name: 'Gup-X',
    year: 2025,
    game: 'Reefscape',
    tagline: 'Small, light and fast - our most successful robot yet.',
    achievements: [
      '3rd Ranked Alliance - Southern Cross Regional',
      'Division Winner - Archimedies Division',
      '7th ranked Alliance - Championship',
    ],
    results:
      'Southern Cross Regional to FIRST Championship (Archimedes Division) to WARP; Archimedes Division Winners, advancing to Einstein — a first for the team.',
    awards: [
      'Impact Award (Southern Cross Regional)',
      'Impact Award Finalist (FIRST Championship)',
      "Dean's List Finalist (x2)",
    ],
    links: {
      reveal: 'https://www.youtube.com/embed/ZXojtVOLL8c',
      code: 'https://github.com/CurtinFRC/2025-Reefscape',
      galleries: ['https://photos.app.goo.gl/r6yHAkzHVUgmEXos9', 'https://photos.app.goo.gl/ebveYG3g67g3y3iK9'],
    },
    photos: ['/images/original/xaLmtgRqwOUeE6jMb8vIFBmgE.png'],
  },
  {
    slug: '2024frcrobot',
    name: 'Notedog Millionaire',
    year: 2024,
    game: 'Crescendo',
    // The /robots index tagline claims "undefeated at WARP," but
    // 2024frcrobot.html (and its § in content-notes.md) never lists a WARP
    // achievement line — only the SCR result below. Left as-is verbatim
    // from each respective source page rather than inventing one.
    tagline: 'Third placed alliance at SCR, undefeated at WARP.',
    achievements: ['7th Ranked Alliance - Southern Cross Regional'],
    results: 'Southern Cross Regional: Alliance 7 captain, quarterfinal exit, ranked 12/47.',
    awards: ['Excellence in Engineering Award'],
    links: {
      reveal: 'https://www.youtube.com/embed/0yjWc-IrOJA',
      code: 'https://github.com/CurtinFRC/2024-Crescendo',
      galleries: ['https://photos.app.goo.gl/UKvsVkmMKZXpXCPM8'],
    },
    photos: [
      '/images/original/zjeHPdlewcis4h13jJWTJmXdxyQ.png',
      '/images/original/e3woKCxN9xwEu9iVDu9qpsB0cI.png',
      '/images/original/fxJFoNtgncIB31Ph8aLBjW6JBg.png',
      '/images/original/wUKZaeOhvgKSx6n55xrgJuoWI.png',
    ],
  },
  {
    slug: '2023frcrobot',
    name: 'Whiplash',
    year: 2023,
    game: 'Charged Up',
    tagline: 'Tipped our way to a WARP win with our first swerve drive.',
    achievements: ['6th Ranked Alliance - Southern Cross Regional', 'WARP Winner'],
    results:
      'Southern Cross Regional: 2nd pick for Alliance 6, advancing to the FIRST Championship (Curie Division) in Houston.',
    awards: ['Regional FIRST Impact Award'],
    links: {
      reveal: 'https://www.youtube.com/embed/yIm9_B4ZfY0',
      code: 'https://github.com/CurtinFRC/2023-ChargedUp',
    },
    photos: [
      '/images/original/46HdFSIQLN09D7aWGGWIIwgc.png',
      '/images/original/7TDVDIOZtRKlp5Ybum0AcqdAr4.png',
      '/images/original/jnUImQrXshEHUVFI8un8sfwU.png',
    ],
  },
  {
    slug: '2022frcrobot',
    name: 'Mercury',
    year: 2022,
    game: 'Rapid React',
    tagline: 'A shoe that could shoot, with a post-match climb.',
    achievements: ['WARP Finalist'],
    results: 'Advanced from Southern Cross Regional to the FIRST Championship (Carver Division) in Houston.',
    awards: ['Regional Engineering Inspiration Award'],
    links: {
      reveal: 'https://www.youtube.com/embed/4lhUvuCwx9k',
      code: 'https://github.com/CurtinFRC/2022-RapidReact',
    },
    // JgX5knY1KOKVzsnwDStF5rdD0Rk.png is the page's hero CAD render; it leads
    // the photo order in the mirror, so it's the hero photo here too.
    photos: [
      '/images/original/JgX5knY1KOKVzsnwDStF5rdD0Rk.png',
      '/images/original/ZnmuFHjxVlbF0gFkA1Tjp2KcQ.png',
      '/images/original/gUEmQgRZM4z157pj8YctJjAqms.png',
    ],
  },
  {
    slug: '2021frcrobot',
    name: 'Slinger',
    year: 2021,
    game: 'Infinite Recharge',
    tagline: 'WARP Winner in the Infinite Recharge season.',
    achievements: ['WARP Winner'],
    // Infinite Recharge (At-Home) was a virtual-challenges-only season — no
    // official FIRST awards, so `awards` is omitted rather than empty.
    results: "Virtual at-home challenges only; no official awards, though the team produced a Chairman's video.",
    links: {
      code: 'https://github.com/CurtinFRC/2021-GameChangers',
      // No traditional reveal video (virtual year). The team's Chairman's
      // video from that season is https://www.youtube.com/watch?v=3KD_KQ93rOo
      // but isn't a robot reveal, so it's not set as `reveal`.
    },
    photos: ['/images/original/bbf4cJL28lQUubLH0THjZuijybc.png'],
  },
]

export function getRobot(slug: string): Robot | undefined {
  return robots.find((robot) => robot.slug === slug)
}

/** Title/description for a robot's page, e.g. "Gup-X — 2025 Reefscape | Team 4788". */
export function robotMetadata(slug: string): Metadata {
  const robot = getRobot(slug)
  if (!robot) {
    throw new Error(`No robot found for slug "${slug}" in data/robots.ts`)
  }
  return pageMetadata({
    title: `${robot.name} — ${robot.year} ${robot.game}`,
    description: robot.tagline,
    path: `/${robot.slug}`,
  })
}
