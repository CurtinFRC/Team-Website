import type { Robot } from '@/data/robots'
import { AwardPill } from './award-pill'
import { Button } from './button'
import { Photo } from './photo'

/** One robot in the /robots grid: photo (or a year fallback), name, year, tagline, and a link to its page. */
export function RobotCard({ robot }: { robot: Robot }) {
  const photo = robot.photos[0]

  return (
    <li className="flex flex-col overflow-hidden rounded-lg bg-surface-alt text-bg">
      {photo ? (
        <Photo
          src={photo}
          alt={`${robot.name} robot`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-video items-center justify-center bg-bg/10 text-4xl font-bold italic text-brand"
        >
          {robot.year}
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-bg/60">{robot.year}</p>
        <h2 className="mt-1 text-xl font-bold italic text-brand">{robot.name}</h2>
        <p className="mt-2 flex-1 text-bg/70">{robot.tagline}</p>
        {robot.awards && robot.awards.length > 0 && (
          <p className="mt-3">
            <AwardPill size="sm">{robot.awards[0]}</AwardPill>
          </p>
        )}
        <Button href={`/${robot.slug}`} variant="primary" className="mt-4 w-fit">
          See this robot
        </Button>
      </div>
    </li>
  )
}
