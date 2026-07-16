import type { Metadata } from 'next'
import { Button } from '@/components/button'
import { CONTACT_EMAIL } from '@/data/contact'
import { Photo } from '@/components/photo'
import { Section } from '@/components/section'
import { SponsorGrid } from '@/components/sponsor-grid'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Support Us',
  description: 'Sponsor Team 4788 or support the team in other ways.',
  path: '/support',
})

const INTRO_COPY =
  "Team 4788 was the first FIRST Robotics Competition team in Western Australia, founded in 2013. We're based at Curtin University, where we've spent more than a decade building a competition robot each year and running STEM outreach across the state. We've also competed at the FIRST Championship in Houston. Sponsorship pays for parts, travel to competitions, and the workshops and demonstrations we run for schools."

const OTHER_WAYS_COPY =
  'Sponsorship is not the only way to support the team. If you have experience in engineering, mechanics, programming, or media and want to mentor high school students, get in touch. We are also glad to hear from anyone interested in volunteering or building a partnership with the team.'

type Tier = {
  name: string
  amount: string
  benefits: string[]
}

// ponytail: these tiers, amounts (AUD, per season) and benefits are proposed
// starting points — confirm/adjust them, and how sponsorships are invoiced
// through Curtin, before treating them as final.
const TIERS: Tier[] = [
  {
    name: 'Bronze',
    amount: 'A$250',
    benefits: ['Your logo on our robot, team uniform, and website'],
  },
  {
    name: 'Silver',
    amount: 'A$500',
    benefits: [
      'Everything in Bronze, with more prominent logo placement',
      'A shout-out on our social media',
    ],
  },
  {
    name: 'Gold',
    amount: 'A$1,500',
    benefits: [
      'Everything in Silver, with priority logo placement',
      'Regular features across our social media',
      'A robot demonstration or team visit at your workplace or event',
    ],
  },
  {
    name: 'Platinum',
    amount: 'A$5,000+',
    benefits: [
      'Everything in Gold, with our largest, top-billed logo placement',
      'Named as a major sponsor and featured across all our channels',
      'An invitation to meet the team and see the robot at Curtin',
    ],
  },
]

export default function SupportPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="support-heading">
        <h1
          id="support-heading"
          className="text-center text-4xl font-bold italic text-brand sm:text-5xl"
        >
          Support Us
        </h1>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <p className="text-lg leading-relaxed text-bg/75">{INTRO_COPY}</p>
          <Photo
            src="/images/original/drive-team.jpg"
            alt="Our drive team at the driver station, sponsor logos on their team shirts"
            className="aspect-[4/5] w-full rounded-lg object-cover"
          />
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-bg">Sponsorship tiers</h2>
          <p className="mt-2 text-bg/70">
            Every sponsor&rsquo;s logo goes on our robot, team uniform, and website. The more you
            contribute, the more prominent your placement, and higher tiers gain a growing presence
            on our social media. Amounts below are in Australian dollars per season and are a guide
            &mdash; contact us for the full prospectus or to discuss another arrangement.
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <div key={tier.name} className="rounded-lg border border-bg/10 bg-surface-alt p-6">
              <h3 className="text-lg font-bold text-bg">{tier.name}</h3>
              <p className="mt-1 text-2xl font-bold italic text-brand">{tier.amount}</p>
              <ul className="mt-4 space-y-2 text-sm text-bg/70">
                {tier.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface" padding="tight" aria-labelledby="current-sponsors-heading">
        <h2
          id="current-sponsors-heading"
          className="text-center text-2xl font-bold italic text-brand sm:text-3xl"
        >
          Our current sponsors
        </h2>
        <div className="mt-10">
          <SponsorGrid />
        </div>
      </Section>

      <Section tone="light" aria-labelledby="other-ways-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="other-ways-heading" className="text-2xl font-bold text-bg">
            Other ways to help
          </h2>
          <div className="mt-8">
            <Photo
              src="/images/original/pit-crew.png"
              alt="Students and mentors repairing the robot together between matches"
              sizes="(min-width: 768px) 672px, 100vw"
            />
          </div>
          <p className="mt-8 text-lg leading-relaxed text-bg/75">{OTHER_WAYS_COPY}</p>
          <p className="mt-2 text-lg leading-relaxed text-bg/75">
            Email{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-bg underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>{' '}
            or use the button below.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="dark">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
