import { isExternal } from '@/data/nav'
import { getRobot } from '@/data/robots'
import { AwardPill } from './award-pill'
import { ExternalLinkNote } from './external-link-note'
import { LinkCard } from './link-card'
import { Photo } from './photo'
import { Section } from './section'

/** Pulls an 11-char YouTube video id out of a watch/embed/youtu.be URL. */
function youtubeVideoId(url: string): string | null {
  const match = url.match(/(?:embed\/|v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

/** Renders one season's robot page. Looked up by slug so year pages stay thin wrappers. */
export function RobotPage({ slug }: { slug: string }) {
  const robot = getRobot(slug)
  if (!robot) {
    throw new Error(`No robot found for slug "${slug}" in data/robots.ts`)
  }

  const headingId = `${slug}-heading`
  const [heroPhoto, ...galleryPhotos] = robot.photos
  const videoId = robot.links.reveal ? youtubeVideoId(robot.links.reveal) : null
  const hasResults = Boolean(robot.results)
  const awards = robot.awards ?? []
  const hasAwards = awards.length > 0

  return (
    <main>
      <Section tone="light" aria-labelledby={headingId}>
        <div className={`grid items-center gap-10 md:gap-14 ${heroPhoto ? 'md:grid-cols-2' : ''}`}>
          {heroPhoto && <Photo src={heroPhoto} alt={`${robot.name} robot`} />}
          <div className={heroPhoto ? '' : 'text-center'}>
            <h1
              id={headingId}
              className="text-4xl font-bold italic text-brand sm:text-5xl"
            >
              {robot.name}
            </h1>
            <p className="mt-2 text-lg font-semibold text-bg/60">
              {robot.year}: {robot.game}
            </p>
            <ul className="mt-6 space-y-1 text-bg/75">
              {robot.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {(hasResults || hasAwards) && (
        <Section tone="light" padding="tight" aria-labelledby={`${slug}-record-heading`}>
          <h2 id={`${slug}-record-heading`} className="text-2xl font-bold text-bg">
            Season Record
          </h2>
          {hasResults && <p className="mt-4 text-bg/75">{robot.results}</p>}
          {hasAwards && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-bg/60">Awards</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {awards.map((award) => (
                  <li key={award}>
                    <AwardPill size="md">{award}</AwardPill>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      )}

      {robot.links.reveal && (
        <Section tone="light" padding="tight" aria-labelledby={`${slug}-reveal-heading`}>
          <h2 id={`${slug}-reveal-heading`} className="text-2xl font-bold text-bg">
            Reveal Video
          </h2>
          <p className="mt-2 text-bg/70">
            Highlight reel of {robot.name}, released to show off our creation.
          </p>
          <div className="mt-6 aspect-video overflow-hidden rounded-lg">
            {videoId ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title={`${robot.name} reveal video`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <a
                href={robot.links.reveal}
                target={isExternal(robot.links.reveal) ? '_blank' : undefined}
                rel={isExternal(robot.links.reveal) ? 'noopener noreferrer' : undefined}
                className="flex h-full w-full items-center justify-center rounded-lg bg-bg text-lg font-medium text-ink underline decoration-brand decoration-2 underline-offset-4"
              >
                Watch on YouTube
                {isExternal(robot.links.reveal) && <ExternalLinkNote />}
              </a>
            )}
          </div>
        </Section>
      )}

      {(robot.links.cad || robot.links.code || robot.links.galleries) && (
        <Section tone="light" padding="tight" aria-labelledby={`${slug}-links-heading`}>
          <h2 id={`${slug}-links-heading`} className="sr-only">
            Robot links
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {robot.links.cad && (
              <LinkCard
                title="Onshape"
                description={`View our full robot CAD. Developed in the ${robot.year} season.`}
                href={robot.links.cad}
                headingLevel="h3"
              />
            )}
            {robot.links.code && (
              <LinkCard
                title="Code"
                description="Access our public code. Published on Github."
                href={robot.links.code}
                headingLevel="h3"
              />
            )}
            {robot.links.galleries?.map((gallery, index) => (
              <LinkCard
                key={gallery}
                title={robot.links.galleries!.length > 1 ? `Gallery ${index + 1}` : 'Gallery'}
                description="See our testing & production in action."
                href={gallery}
                headingLevel="h3"
              />
            ))}
          </div>
        </Section>
      )}

      {galleryPhotos.length > 0 && (
        <Section tone="light" padding="tight" aria-labelledby={`${slug}-photos-heading`}>
          <h2 id={`${slug}-photos-heading`} className="text-2xl font-bold text-bg">
            Photos
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPhotos.map((photo) => (
              <Photo
                key={photo}
                src={photo}
                alt={`${robot.name} robot`}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </Section>
      )}
    </main>
  )
}
