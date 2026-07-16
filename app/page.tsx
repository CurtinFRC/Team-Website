import type { Metadata } from 'next'
import { Hero, type HeroImage } from '@/components/hero'
import { Section } from '@/components/section'
import { SponsorGrid } from '@/components/sponsor-grid'
import { Button } from '@/components/button'
import { ContactForm } from '@/components/contact-form'
import { Photo } from '@/components/photo'
import { currentSeason } from '@/data/season'
import { getOptimizedImage, toSrcSet } from '@/lib/optimized-image'
import { SITE_NAME, pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: SITE_NAME,
  description:
    "Team 4788 Can't Control is a FIRST Robotics Competition team based at Curtin University in Perth, Western Australia.",
  path: '/',
  absoluteTitle: true,
})

const FIRST_FRC_COPY =
  'Competing as Team 4788 Can’t Control, we take great pride in our robots, from their design to programming.'
const FIRST_WA_COPY =
  'As the first FIRST team in our home of Western Australia, we made it our mission to be the heart of STEM at our home of Curtin University.'

/**
 * Team photo from the 2025 Southern Cross Regional (rescued from the live
 * site). Resolved to its optimized variants here, in this server component,
 * and handed to `<Hero>` as props — Hero is `'use client'`, so it can't touch
 * the image manifest itself without dragging the whole thing into the client
 * bundle. This is the homepage LCP image.
 */
const HERO_IMAGE_SRC = '/images/original/kRBSe89BbVzmISpd5Gvc630Es.jpg'
const HERO_IMAGE_ALT =
  "Team 4788 Can't Control celebrating at the 2025 Southern Cross Regional"

function resolveHeroImage(): HeroImage {
  const optimized = getOptimizedImage(HERO_IMAGE_SRC)
  if (!optimized) {
    return { src: HERO_IMAGE_SRC, alt: HERO_IMAGE_ALT }
  }
  const hasVariants = optimized.variants.length > 0
  return {
    src: optimized.fallback,
    srcSet: hasVariants ? toSrcSet(optimized) : undefined,
    sizes: hasVariants ? '100vw' : undefined,
    width: optimized.width,
    height: optimized.height,
    alt: HERO_IMAGE_ALT,
  }
}

/**
 * Section photos, matched to the live homepage by document order in
 * mirror/home.html (the three <img> jpgs that follow the sponsor logo run) and
 * verified visually against mirror/screenshots/home-375.png.
 */
const SECTION_PHOTOS = {
  frc: {
    src: '/images/original/H7TlMx5pQDfdZDKhgaSOvyBBFOQ.jpg',
    alt: 'Robot 4788 driving across the field during a 2025 REEFSCAPE match',
  },
  wa: {
    src: '/images/original/lRnGMWMf1Zz7Q1S71FvPCN7toI.jpg',
    alt: 'Team 4788 students and mentors kneeling with their robot at a community event',
  },
  season: {
    src: '/images/original/jUtGkI5SbKNSalbB4zizyQ3cBEA.jpg',
    alt: "Team 4788's robot competing on the field",
  },
} as const

export default function Home() {
  return (
    <main>
      <Hero image={resolveHeroImage()} />

      {/* 1. Sponsor strip — dark band continuous with the hero (per live site) */}
      <Section tone="surface" padding="tight" aria-labelledby="sponsors-heading">
        <h2
          id="sponsors-heading"
          className="text-center text-2xl font-bold italic text-brand sm:text-3xl"
        >
          Thank you to our sponsors!
        </h2>
        <div className="mt-10">
          <SponsorGrid />
        </div>
      </Section>

      {/* 2. FIRST Robotics Competition — light band, photo left / text right on desktop */}
      <Section tone="light" aria-labelledby="frc-heading">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Photo {...SECTION_PHOTOS.frc} />
          <div>
            <h2
              id="frc-heading"
              className="text-3xl font-bold italic text-brand sm:text-4xl md:text-5xl"
            >
              FIRST&trade; Robotics Competition
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-bg/75">{FIRST_FRC_COPY}</p>
            <div className="mt-8">
              <Button href="/robots" variant="dark">
                See our Robots
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. FIRST in Western Australia — light band, text left / photo right on desktop */}
      <Section tone="light" aria-labelledby="wa-heading">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Photo {...SECTION_PHOTOS.wa} />
          <div className="md:order-first">
            <h2
              id="wa-heading"
              className="text-3xl font-bold italic text-brand sm:text-4xl md:text-5xl"
            >
              FIRST in Western Australia
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-bg/75">{FIRST_WA_COPY}</p>
            <div className="mt-8">
              <Button href="/about" variant="dark">
                What we do
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Season challenge — light band, photo left / text right on desktop */}
      <Section tone="light" aria-labelledby="season-heading">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Photo {...SECTION_PHOTOS.season} />
          <div>
            <p className="text-xl font-bold text-brand sm:text-2xl">
              This season&rsquo;s challenge:
            </p>
            <h2
              id="season-heading"
              className="mt-2 text-4xl font-bold uppercase italic tracking-tight text-brand sm:text-5xl md:text-6xl"
            >
              {currentSeason.game}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-bg/75">{currentSeason.copy}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={currentSeason.revealUrl} variant="dark">
                Watch on YouTube
              </Button>
              <Button href={currentSeason.blogUrl} variant="dark">
                Read our Build Blog
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Contact — light band. */}
      <Section tone="light" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="contact-heading"
            className="text-center text-3xl font-bold italic text-brand sm:text-4xl"
          >
            Contact Us
          </h2>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </Section>
    </main>
  )
}
