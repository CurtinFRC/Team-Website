import type { Metadata } from 'next'
import Link from 'next/link'
import { AwardPill } from '@/components/award-pill'
import { Photo } from '@/components/photo'
import { Section } from '@/components/section'
import { seasons, type SeasonRecord } from '@/data/seasons'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Season & Awards Record',
  description: 'Every Team 4788 season since 2013: games, robots, results, and awards.',
  path: '/seasons',
})

// Notes for the two seasons the record should call out: the 2023 Impact
// Award win that sent the team to Houston, and 2025's Archimedes Division
// win at the Championship. Rendered as bold dark text (not
// brand pink) plus a subtle row tint - text-brand is only contrast-safe at
// large/heading sizes (see globals.css), so small colored text here would
// fail axe's color-contrast check.
const STANDOUT_NOTES: Partial<Record<number, string>> = {
  2023: 'Won the Impact Award and advanced to the FIRST Championship in Houston.',
  2025: "The team's best result to date.",
}

const isUnrecorded = (season: SeasonRecord) => season.events === 'No FIRST data found'

function RobotCell({ season }: { season: SeasonRecord }) {
  if (!season.robot) {
    return <span className="text-bg/60">—</span>
  }
  if (season.robotSlug) {
    return (
      <Link
        href={`/${season.robotSlug}`}
        className="font-medium text-bg underline decoration-brand decoration-2 underline-offset-4"
      >
        {season.robot}
      </Link>
    )
  }
  return <span className="text-bg">{season.robot}</span>
}

export default function SeasonsPage() {
  // data/seasons.ts is authored chronologically (oldest first, for easy
  // upkeep); this page reads newest-first, so the reversal happens only here.
  const newestFirst = [...seasons].reverse()

  return (
    <main>
      <Section tone="light" aria-labelledby="seasons-heading">
        <h1
          id="seasons-heading"
          className="text-center text-4xl font-bold italic text-brand sm:text-5xl"
        >
          Season & Awards Record
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-bg/75">
          Team 4788 has competed in FIRST Robotics Competition since our rookie year in 2013.
          Below is every season since then: the game, our robot, the result, and any awards we
          won.
        </p>

        <div className="mx-auto mt-10 max-w-md">
          <Photo
            src="/images/original/award-banners.jpg"
            alt="Our 2025 Archimedes Division Winner and 2018 South Pacific Regional Winner banners hanging at Curtin"
            sizes="(min-width: 768px) 448px, 100vw"
          />
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Team 4788 competition results and awards, 2013 through 2026, newest first.
            </caption>
            <thead className="border-b border-bg/20 text-bg">
              <tr>
                <th scope="col" className="px-3 py-2 font-bold">
                  Year
                </th>
                <th scope="col" className="px-3 py-2 font-bold">
                  Game
                </th>
                <th scope="col" className="px-3 py-2 font-bold">
                  Robot
                </th>
                <th scope="col" className="px-3 py-2 font-bold">
                  Result
                </th>
                <th scope="col" className="px-3 py-2 font-bold">
                  Awards
                </th>
              </tr>
            </thead>
            <tbody>
              {newestFirst.map((season) => {
                const muted = isUnrecorded(season)
                const standoutNote = STANDOUT_NOTES[season.year]
                return (
                  <tr
                    key={season.year}
                    className={`border-b border-bg/10 align-top ${standoutNote ? 'bg-brand/5' : ''}`}
                  >
                    <th scope="row" className="px-3 py-3 font-semibold text-bg">
                      {season.year}
                    </th>
                    <td className={`px-3 py-3 ${muted ? 'text-bg/60' : 'text-bg/75'}`}>
                      {season.game}
                    </td>
                    <td className="px-3 py-3">
                      <RobotCell season={season} />
                    </td>
                    <td className="px-3 py-3">
                      <p className={muted ? 'text-bg/60' : 'text-bg/75'}>{season.result}</p>
                      <p className="mt-1 text-xs text-bg/60">{season.events}</p>
                      {standoutNote && (
                        <p className="mt-1 text-xs font-semibold text-bg">{standoutNote}</p>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      {season.awards.length > 0 ? (
                        <ul className="flex flex-wrap gap-1.5">
                          {season.awards.map((award) => (
                            <li key={award}>
                              <AwardPill size="sm">{award}</AwardPill>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-bg/60">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Section>
    </main>
  )
}
