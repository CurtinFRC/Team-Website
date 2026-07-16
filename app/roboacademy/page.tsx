import type { Metadata } from 'next'
import { OutreachPage } from '@/components/outreach-page'
import { ExternalLinkNote } from '@/components/external-link-note'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Roboacademy',
  description:
    "Roboacademy is Curtin University's hands-on robotics workshop for kids aged 8 to 15, run by Team 4788.",
  path: '/roboacademy',
})

const PHOTO = {
  src: '/images/original/pbEGZwYajsQJP8lnuXHlqP0bc.jpg',
  alt: 'Electronic components, tools, and a soldering iron laid out on a workbench',
}

export default function RoboacademyPage() {
  return (
    <OutreachPage
      title="Roboacademy"
      photo={PHOTO}
      intro={
        <>
          <p>
            Roboacademy is Curtin University&rsquo;s hands-on robotics workshop for kids aged 8
            to 15. Participants build and program their own robot using LEGO Spike Prime and
            Micro:bit, guided by Curtin university students.
          </p>
          <p>
            We&rsquo;ve run Roboacademy at community venues around Perth, including the Victoria
            Park Community Centre. The mentors are Team 4788 members, teaching kids the same
            fundamentals we use to build our own competition robot every year.
          </p>
          <p>
            Roboacademy is separate from our{' '}
            <a
              href="https://learn.team4788.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-bg underline underline-offset-2"
            >
              Training Course
              <ExternalLinkNote />
            </a>
            , which is a CAD curriculum for our own team members, not a kids&rsquo; workshop.
          </p>
          {/* ponytail: add upcoming Roboacademy dates/booking link */}
        </>
      }
    />
  )
}
