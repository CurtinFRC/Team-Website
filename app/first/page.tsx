import type { Metadata } from 'next'
import { ExternalLinkNote } from '@/components/external-link-note'
import { Photo } from '@/components/photo'
import { Section } from '@/components/section'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'FIRST',
  description:
    'What FIRST and the FIRST Robotics Competition are, and the values of Gracious Professionalism and Coopertition.',
  path: '/first',
})

const FIRST_INSPIRES_URL = 'http://www.firstinspires.org/'
const PREVIOUS_GAMES_URL = 'http://www.firstinspires.org/resource-library/frc/archived-game-documentation'

const INTRO_COPY =
  'FIRST® (For Inspiration and Recognition of Science and Technology) is a non-profit, international organization founded in 1989. Its goal is to inspire and educate young people in the fields of science, technology, engineering, and math (STEM) through a mentor-based teaching system.'

// Verbatim from the live site — "FIRST Tech Challenge (FRC)" appears to be a
// source typo (FTC is the usual abbreviation for Tech Challenge; FRC is the
// flagship Robotics Competition named correctly later in the same sentence),
// but per the brief this is reproduced as published rather than silently fixed.
const PROGRAMS_COPY =
  "FIRST® is comprised of multiple robotics programs, all aimed at different age groups. This includes the Lego® League Explore, FIRST Lego® League (FLL), FIRST Tech Challenge (FRC), and the flagship FIRST® Robotics Competition (FRC), in which 4788 Can't Control competes in. Each year, FIRST® releases a new game for each program. This game poses an enormous challenge composed of various tasks, and teams must strategize, design, prototype, build, program, and test their robot during build season, which lasts for six weeks. After build season, teams compete in numerous regional tournaments to qualify for world championships, held annually in Houston."

const GRACIOUS_PROFESSIONALISM_COPY =
  "In FIRST® robotics, we value Gracious Professionalism® and Coopertition®. Gracious Professionalism, a term coined by FIRST® advisor Woodie Flowers, is the backbone of FIRST®, motivating innovation and respect for team members and competitors alike. With Gracious Professionalism, teams compete honorably but still treat one another with mutual kindness. Coopertition adds on to this by encouraging the notion that in the heat of competition, teams can help and learn from each other and other teams."

export default function FirstPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="first-heading">
        <div className="mx-auto max-w-3xl">
          <h1
            id="first-heading"
            className="text-center text-6xl font-bold italic text-brand sm:text-7xl"
          >
            FIRST
          </h1>

          <p className="mt-10 text-lg leading-relaxed text-bg/75">{INTRO_COPY}</p>

          <p className="mt-10 text-lg leading-relaxed text-bg/75">{PROGRAMS_COPY}</p>

          <p className="mt-6 text-lg leading-relaxed text-bg/75">
            {GRACIOUS_PROFESSIONALISM_COPY}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Photo
              src="/images/original/outreach-first-dive.png"
              alt="Team members assembling swerve-drive modules at a FIRST event"
              className="aspect-[4/5] w-full rounded-lg object-cover"
              sizes="(min-width: 640px) 370px, 100vw"
            />
            <Photo
              src="/images/original/high-fives.png"
              alt="Team members high-fiving competing teams after a match"
              className="aspect-[4/5] w-full rounded-lg object-cover"
              sizes="(min-width: 640px) 370px, 100vw"
            />
          </div>

          <p className="mt-6 text-lg leading-relaxed text-bg/75">
            More information about can be found at the{' '}
            <a
              href={FIRST_INSPIRES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-bg underline underline-offset-2"
            >
              FIRST®
              <ExternalLinkNote />
            </a>{' '}
            website, including details about{' '}
            <a
              href={PREVIOUS_GAMES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-bg underline underline-offset-2"
            >
              Previous FRC Games
              <ExternalLinkNote />
            </a>
            .
          </p>
        </div>
      </Section>
    </main>
  )
}
