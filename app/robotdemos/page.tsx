import type { Metadata } from 'next'
import { OutreachPage } from '@/components/outreach-page'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Robot Demos',
  description: 'How Team 4788 brings its competition robot to schools and community events.',
  path: '/robotdemos',
})

const PHOTO = {
  src: '/images/original/V91ych1Z3VmzcYyZKLiVwx9V2GI.png',
  alt: 'Team members operating the robot at a community show booth',
}

export default function RobotDemosPage() {
  return (
    <OutreachPage
      title="Robot Demos"
      photo={PHOTO}
      intro={
        <>
          <p>
            We bring our competition robot to schools, shows, and community events across Western
            Australia so people can see it drive up close. Alongside the competition robot, we
            maintain smaller demo robots built specifically for these events.
          </p>
          <p>To book a demo for your school or event, contact us below.</p>
          {/* ponytail: describe demo format, typical event types, and lead time needed to book */}
        </>
      }
    />
  )
}
