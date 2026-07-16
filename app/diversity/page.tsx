import type { Metadata } from 'next'
import { OutreachPage } from '@/components/outreach-page'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Diversity',
  description: "Team 4788's commitment to accessible STEM outreach across Western Australia.",
  path: '/diversity',
})

const PHOTO = {
  src: '/images/original/eSlvDiO5AlvfuNtCu7U9ODJ9kLw.jpg',
  alt: 'Team 4788 students and mentors posing with the FIRST Impact Award banner',
}

export default function DiversityPage() {
  return (
    <OutreachPage
      title="Diversity"
      photo={PHOTO}
      intro={
        <>
          <blockquote className="border-l-4 border-brand pl-6 text-xl font-semibold text-bg">
            &ldquo;We envision a Western Australia where every student, regardless of geography,
            identity, or socioeconomic background, has the opportunity to engage in meaningful
            STEM experiences.&rdquo;
          </blockquote>
          <p>
            That vision shapes our outreach. We want students across Western Australia to try
            robotics themselves, wherever they live and whatever their background.
          </p>
          <p>
            Roboacademy, our robotics workshop for kids aged 8 to 15, is part of that: we run it
            at community venues around Perth, not just on campus.
          </p>
          {/* ponytail: add specific diversity & inclusion initiatives or partnerships if the team wants to list them */}
        </>
      }
    />
  )
}
