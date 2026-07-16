import type { Metadata } from 'next'
import { Section } from '@/components/section'
import { FileList } from '@/components/file-list'
import { files } from '@/data/downloads'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Team Handbook',
  description: 'How Team 4788 runs: roles, expectations, and how to become a member.',
  path: '/handbook',
})

const INTRO_COPY =
  'The Team Handbook covers how the team runs: roles, expectations, and how to become a member.'

export default function HandbookPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="handbook-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h1
            id="handbook-heading"
            className="text-4xl font-bold italic text-brand sm:text-5xl"
          >
            Team Handbook
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-bg/75">{INTRO_COPY}</p>
        </div>

        {/* ponytail: add the handbook PDF here when the team supplies it */}
        <div className="mx-auto mt-10 max-w-2xl">
          <FileList files={files.handbook} emptyLabel="the Team Handbook" />
        </div>
      </Section>
    </main>
  )
}
