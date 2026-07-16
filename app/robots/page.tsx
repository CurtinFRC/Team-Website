import type { Metadata } from 'next'
import { RobotCard } from '@/components/robot-card'
import { Section } from '@/components/section'
import { robots } from '@/data/robots'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Our Robots',
  description: "Team 4788's competition robots, from Slinger to our latest build.",
  path: '/robots',
})

export default function RobotsPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="robots-heading">
        <h1
          id="robots-heading"
          className="text-center text-4xl font-bold italic text-brand sm:text-5xl"
        >
          Our Robots
        </h1>
        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {robots.map((robot) => (
            <RobotCard key={robot.slug} robot={robot} />
          ))}
        </ul>
      </Section>
    </main>
  )
}
