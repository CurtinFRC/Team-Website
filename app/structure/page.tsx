import type { Metadata } from 'next'
import { Photo } from '@/components/photo'
import { Section } from '@/components/section'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Team Structure',
  description: 'How Team 4788 is organised into subteams: design, software, electrical, outreach, and business.',
  path: '/structure',
})

const TEAM_COPY =
  "Team 4788 - Can't Control is a FRC (FIRST Robotics Competition) Team, but we are more than robots. Based out of Curtin University, Perth Western Australia, we are an eclectic community of like-minded individuals who work together to Ignite, Improve, and Innovate."

const WHAT_WE_DO_COPY =
  'Our team aims to improve our skills, technical and nontechnical, in a team environment supported by university students, staff, and industry professionals. We work as a team, similar to sports, to build and compete with robots! These robots weigh up to 60kg and can be as tall as 1.5m.'

// Team-supplied photos (2026-07). Portrait shots, so they crop to 4:5 to sit
// beside the text without towering over it.
const PORTRAIT_CLASSES = 'aspect-[4/5] w-full rounded-lg object-cover'
const TEAM_PHOTO = {
  src: '/images/original/cad-session.jpg',
  alt: 'Design subteam members working on robot CAD at Curtin',
  className: PORTRAIT_CLASSES,
}
const BUILD_PHOTO = {
  src: '/images/original/drivetrain-assembly.jpg',
  alt: "A team member assembling the robot's drivetrain and electronics",
  className: PORTRAIT_CLASSES,
}

type Subteam = {
  name: string
  description: string
}

// ponytail: confirm subteam list & descriptions with team
const SUBTEAMS: Subteam[] = [
  {
    name: 'Design',
    description: 'Designs the robot in CAD, from mechanisms to the full mechanical assembly.',
  },
  {
    name: 'Software',
    description:
      "Programs the robot's control code in C++ using our Wombat framework and Numbat logging library, and publishes it on GitHub each season.",
  },
  {
    name: 'Electrical',
    description: "Designs and builds the robot's wiring, electronics, and custom PCBs.",
  },
  {
    name: 'Outreach',
    description: 'Runs Roboacademy, school workshops, and robot demos across Western Australia.',
  },
  {
    name: 'Business',
    description: "Handles sponsorship, media, and the team's award submissions.",
  },
]

export default function StructurePage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="structure-heading">
        <h1
          id="structure-heading"
          className="text-center text-4xl font-bold italic text-brand sm:text-5xl"
        >
          Team Structure
        </h1>

        <div className="mt-16 grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="text-2xl font-bold text-bg">Design Subteam</h2>
            <p className="mt-4 text-lg leading-relaxed text-bg/75">{TEAM_COPY}</p>
          </div>
          <Photo {...TEAM_PHOTO} />
        </div>

        <div className="mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Photo {...BUILD_PHOTO} />
          <div>
            <h2 className="text-2xl font-bold text-bg">What we do!</h2>
            <p className="mt-4 text-lg leading-relaxed text-bg/75">{WHAT_WE_DO_COPY}</p>
          </div>
        </div>

        {/* Subteam overview grid. Design has real live copy; the rest are drafted
            from what their GitHub activity implies. The exact subteam list and
            descriptions are unconfirmed — see the ponytail flags below. */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold text-bg">Subteams</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUBTEAMS.map((subteam) => (
              <li
                key={subteam.name}
                className="rounded-input border border-bg/10 bg-bg/[0.03] p-6"
              >
                <h3 className="text-lg font-bold text-bg">{subteam.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bg/70">{subteam.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  )
}
