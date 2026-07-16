import type { Metadata } from 'next'
import Link from 'next/link'
import { OutreachPage } from '@/components/outreach-page'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Workshops',
  description: "Workshops Team 4788 runs for schools and the community as part of its STEM outreach.",
  path: '/workshops',
})

const PHOTO = {
  src: '/images/original/0tGQre5LPFJdWOoImKfZaHZfbw.jpg',
  alt: 'Team members gathered around a table sketching robot design ideas together',
}

export default function WorkshopsPage() {
  return (
    <OutreachPage
      title="Workshops"
      photo={PHOTO}
      intro={
        <>
          <p>
            Our flagship workshop is{' '}
            <Link href="/roboacademy" className="font-medium text-bg underline underline-offset-2">
              Roboacademy
            </Link>
            , a hands-on robotics program for kids aged 8 to 15 using LEGO Spike Prime and
            Micro:bit.
          </p>
          <p>
            Beyond Roboacademy, team members run other STEM workshops and talks for schools and
            community groups across Western Australia, sharing what they&rsquo;ve learned
            building a competition robot each year.
          </p>
          {/* ponytail: describe workshop topics, audience/year level, and how a school books one */}
        </>
      }
    />
  )
}
