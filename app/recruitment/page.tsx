import type { Metadata } from 'next'
import { Button } from '@/components/button'
import { Photo } from '@/components/photo'
import { Section } from '@/components/section'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Join Us',
  description: 'How to join Team 4788: the Pre-season Design Program, Build Season, and registration.',
  path: '/recruitment',
})

const REGISTER_URL = 'https://payments.curtin.edu.au/CF2512080262'

export default function RecruitmentPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="recruitment-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h1
            id="recruitment-heading"
            className="text-5xl font-bold italic text-brand sm:text-6xl md:text-7xl"
          >
            Join Us
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-bg/70">
            Join Team 4788 to design, build, and compete with a large-scale robot alongside
            Curtin university students and industry mentors.
          </p>
          <p className="mt-4 text-xl leading-relaxed text-bg/70">
            New members start in the Pre-season Design Program, then move into Build Season from
            January to March. We compete at regional events in Perth and Sydney.
          </p>
          <p className="mt-4 text-xl leading-relaxed text-bg/70">
            Registration costs $620, including GST.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={REGISTER_URL} variant="dark">
              Register
            </Button>
            <Button href="/contact" variant="dark">
              Contact
            </Button>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <Photo
              src="/images/original/workshop-cnc.png"
              alt="Four team members holding a freshly machined part in front of our CNC mill"
              className="aspect-[4/5] w-full rounded-lg object-cover"
              sizes="(min-width: 640px) 320px, 100vw"
            />
            <Photo
              src="/images/original/cone-candid.jpg"
              alt="A team member at our Curtin workspace, wearing a traffic cone as a hat"
              className="aspect-[4/5] w-full rounded-lg object-cover"
              sizes="(min-width: 640px) 320px, 100vw"
            />
          </div>
        </div>
      </Section>
    </main>
  )
}
