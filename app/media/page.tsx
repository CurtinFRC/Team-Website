import type { Metadata } from 'next'
import { OutreachPage } from '@/components/outreach-page'
import { ExternalLinkNote } from '@/components/external-link-note'
import { CONTACT_EMAIL } from '@/data/contact'
import { socialLinks } from '@/data/nav'
import { robots } from '@/data/robots'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Media',
  description: 'Press contact, photo galleries, and social channels for Team 4788.',
  path: '/media',
})

const PHOTO = {
  src: '/images/original/lRnGMWMf1Zz7Q1S71FvPCN7toI.jpg',
  alt: 'Team members and a guest posing with the robot in front of a screen showing team photos',
}

// Season galleries with a real public link, newest first.
const GALLERIES = robots
  .filter((robot) => robot.links.galleries?.length)
  .map((robot) => ({ year: robot.year, urls: robot.links.galleries! }))

export default function MediaPage() {
  return (
    <OutreachPage
      title="Media"
      photo={PHOTO}
      intro={
        <>
          <p>
            For interviews, quotes, or coverage of Team 4788, email{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-bg underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>{' '}
            and we&rsquo;ll put you in touch with the right person on the team.
          </p>
          <p>
            For robot reveal and highlight videos, see our YouTube channel, linked below along
            with our other social channels.
          </p>
          {/* ponytail: add a downloadable press kit (logos, team one-pager, high-res photos) when the team has one */}
        </>
      }
    >
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold text-bg">Photo galleries</h2>
          <ul className="mt-3 space-y-2">
            {GALLERIES.map((gallery) => (
              <li key={gallery.year}>
                {gallery.urls.map((url, index) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-medium text-bg underline decoration-brand decoration-2 underline-offset-4"
                  >
                    {gallery.year} season{gallery.urls.length > 1 ? ` — gallery ${index + 1}` : ''}
                    <ExternalLinkNote />
                  </a>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-bg">Follow us</h2>
          <ul className="mt-3 space-y-2">
            {socialLinks.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-bg underline decoration-brand decoration-2 underline-offset-4"
                >
                  {social.label}
                  <ExternalLinkNote />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </OutreachPage>
  )
}
