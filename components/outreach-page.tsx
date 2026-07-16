import type { ReactNode } from 'react'
import { Button } from './button'
import { Photo } from './photo'
import { Section } from './section'

type OutreachPhoto = { src: string; alt: string }

type OutreachPageProps = {
  title: string
  intro: ReactNode
  photo?: OutreachPhoto
  children?: ReactNode
}

/**
 * Shared layout for the five Community outreach pages (Roboacademy,
 * Workshops, Diversity, Robot Demos, Media). A light band with the intro
 * (optionally next to one team photo), any page-specific content, and a
 * closing "Get involved" CTA to /contact.
 */
export function OutreachPage({ title, intro, photo, children }: OutreachPageProps) {
  const headingId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-heading`

  return (
    <main>
      <Section tone="light" aria-labelledby={headingId}>
        <div className={`grid items-center gap-10 md:gap-14 ${photo ? 'md:grid-cols-2' : ''}`}>
          {photo && <Photo src={photo.src} alt={photo.alt} />}
          <div className={photo ? '' : 'mx-auto max-w-2xl text-center'}>
            <h1
              id={headingId}
              className="text-4xl font-bold italic text-brand sm:text-5xl"
            >
              {title}
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-bg/75">{intro}</div>
          </div>
        </div>

        {children && <div className="mt-14">{children}</div>}
      </Section>

      <Section tone="light" padding="tight" aria-labelledby={`${headingId}-cta`}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={`${headingId}-cta`} className="text-2xl font-bold text-bg">
            Get involved
          </h2>
          <p className="mt-3 text-bg/70">Reach out with questions, or to work with us on this.</p>
          <div className="mt-6">
            <Button href="/contact" variant="dark">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
