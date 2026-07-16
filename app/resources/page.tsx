import type { Metadata } from 'next'
import { robots } from '@/data/robots'
import { LinkCard } from '@/components/link-card'
import { Section } from '@/components/section'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Resources',
  description: 'Training course, GitHub, blog, handbook, downloads, and robot code links for Team 4788.',
  path: '/resources',
})

type Resource = {
  title: string
  description: string
  href: string
}

const PRIMARY_RESOURCES: Resource[] = [
  {
    title: 'Training Course',
    description: "Our Onshape and CAD curriculum, built on Material for MkDocs.",
    href: 'https://learn.team4788.com',
  },
  {
    title: 'GitHub',
    description:
      "Our public code, including the Wombat C++ framework, the Numbat logging library, and each season's robot code.",
    href: 'https://github.com/CurtinFRC',
  },
  {
    title: 'Blog',
    description: 'Our build blog: build season updates and technical write-ups from the team.',
    href: '/blog',
  },
  {
    title: 'Team Handbook',
    description: 'How the team runs, and how to become a member.',
    href: '/handbook',
  },
  {
    title: 'Downloads',
    description: 'Sponsorship material, forms, and other files we share publicly.',
    href: '/downloads',
  },
  {
    title: 'About FIRST®',
    description: 'What FIRST® and FRC are, and how our season works.',
    href: '/first',
  },
]

export default function ResourcesPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="resources-heading">
        <h1
          id="resources-heading"
          className="text-center text-4xl font-bold italic text-brand sm:text-5xl"
        >
          Resources
        </h1>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_RESOURCES.map((resource) => (
            <LinkCard key={resource.href} {...resource} headingLevel="h2" />
          ))}
        </div>
      </Section>

      <Section tone="light" padding="tight" aria-labelledby="robot-resources-heading">
        <h2 id="robot-resources-heading" className="text-2xl font-bold text-bg">
          Robot code &amp; CAD
        </h2>
        <div className="mt-6 space-y-8">
          {robots.map((robot) => {
            const links = robot.links
            if (!links.cad && !links.code && !links.galleries) return null

            return (
              <div key={robot.slug}>
                <h3 className="text-lg font-semibold text-bg">
                  {robot.year} &mdash; {robot.name}
                </h3>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {links.code && (
                    <LinkCard
                      title="Code"
                      description="Public source code, published on GitHub."
                      href={links.code}
                      headingLevel="h4"
                    />
                  )}
                  {links.cad && (
                    <LinkCard
                      title="CAD"
                      description="Full robot CAD."
                      href={links.cad}
                      headingLevel="h4"
                    />
                  )}
                  {links.galleries?.map((gallery, index) => (
                    <LinkCard
                      key={gallery}
                      title={links.galleries!.length > 1 ? `Gallery ${index + 1}` : 'Gallery'}
                      description="Photos from testing and competition."
                      href={gallery}
                      headingLevel="h4"
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Section>
    </main>
  )
}
