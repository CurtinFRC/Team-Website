import type { Metadata } from 'next'
import { Button } from '@/components/button'
import { Photo } from '@/components/photo'
import { Section } from '@/components/section'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description: "Who Team 4788 is, what we do, and our vision and mission as an FRC team at Curtin University.",
  path: '/about',
})

const WHO_WE_ARE_COPY =
  "Team 4788 - Can't Control is a FRC (FIRST Robotics Competition) Team, but we are more than robots. Based out of Curtin University, Perth Western Australia, we are an eclectic community of like-minded individuals who work together to Ignite, Improve, and Innovate."

// ponytail: confirm the team's early-history origin story before publishing it
const HISTORY_COPY =
  "We were founded in 2013 as the first FIRST Robotics Competition team in Western Australia, and we've been based at Curtin University for more than a decade since."

const WHAT_WE_DO_COPY =
  'Our team aims to improve our skills, technical and nontechnical, in a team environment supported by university students, staff, and industry professionals. We work as a team, similar to sports, to build and compete with robots! These robots weigh up to 60kg and can be as tall as 1.5m.'

const VISION_COPY =
  'We envision a Western Australia where every student, regardless of geography, identity, or socioeconomic background, has the opportunity to engage in meaningful STEM experiences. Through sustainable outreach, strong community, and student-led innovation, Team 4788 aims to grow a diverse and resilient robotics environment that inspires the next generation of problem-solvers and changemakers.'

const MISSION_COPY =
  'Our mission is to inspire students across Western Australia through world-class robotics, hands-on engineering, and inclusive STEM outreach. Team 4788 empowers young people, especially those in under-served communities, to build exceptional robots, grow as leaders, and pursue excellence.'

// Team photo rescued from the live site; judging photo team-supplied (2026-07).
const TEAM_PHOTO = {
  src: '/images/original/3wjz2ZxRoMwvs9IuEVOAFuE4UTk.jpg',
  alt: 'Team 4788 students and mentors in pink team shirts at a competition',
}
const BUILD_PHOTO = {
  src: '/images/original/pits-judging.jpg',
  alt: 'Team members presenting our robot to judges in the pits',
  className: 'aspect-[4/5] w-full rounded-lg object-cover',
}

export default function AboutPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="about-heading">
        <h1
          id="about-heading"
          className="text-center text-4xl font-bold italic text-brand sm:text-5xl"
        >
          About Us
        </h1>

        <div className="mt-16 grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="text-2xl font-bold text-bg">Who Are We?</h2>
            <p className="mt-4 text-lg leading-relaxed text-bg/75">{WHO_WE_ARE_COPY}</p>
            <p className="mt-4 text-lg leading-relaxed text-bg/75">{HISTORY_COPY}</p>
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

        <div className="mx-auto mt-20 max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-bg/60">
            Vision Statement
          </h2>
          <p className="mt-4 text-xl font-bold leading-relaxed text-bg">{VISION_COPY}</p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-bg/60">
            Mission Statement
          </h2>
          <p className="mt-4 text-xl font-bold leading-relaxed text-bg">{MISSION_COPY}</p>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold italic text-brand sm:text-4xl">
            Interested in joining us?
          </h2>
          <p className="mt-2 text-2xl font-bold text-bg/60">Find out how:</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/recruitment" variant="dark">
              Registration
            </Button>
            <Button href="/contact" variant="dark">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
