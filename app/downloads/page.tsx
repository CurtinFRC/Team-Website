import type { Metadata } from 'next'
import { Section } from '@/components/section'
import { FileList } from '@/components/file-list'
import { files } from '@/data/downloads'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Downloads',
  description: 'Sponsorship material, forms, and other documents Team 4788 shares publicly.',
  path: '/downloads',
})

const INTRO_COPY =
  'Files the team shares publicly live here: sponsorship material, forms, and other documents.'

export default function DownloadsPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="downloads-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h1
            id="downloads-heading"
            className="text-4xl font-bold italic text-brand sm:text-5xl"
          >
            Downloads
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-bg/75">{INTRO_COPY}</p>
        </div>

        {/* ponytail: add downloadable files here when the team supplies them */}
        <div className="mx-auto mt-10 max-w-2xl">
          <FileList files={files.downloads} emptyLabel="a specific file" />
        </div>
      </Section>
    </main>
  )
}
