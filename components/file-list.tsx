import { isExternal } from '@/data/nav'
import { CONTACT_EMAIL } from '@/data/contact'
import { Button } from '@/components/button'
import { ExternalLinkNote } from '@/components/external-link-note'
import type { FileEntry } from '@/data/downloads'

/**
 * Shared list/empty-state for /handbook and /downloads. Both pages have no
 * real files yet (see data/downloads.ts), so the empty state is the state
 * most visitors will see until the team supplies files.
 */
export function FileList({ files, emptyLabel }: { files: FileEntry[]; emptyLabel: string }) {
  if (files.length === 0) {
    return (
      <div className="rounded-lg border border-bg/10 bg-surface-alt p-8 text-center">
        <p className="text-bg/75">
          Nothing here yet. If you&rsquo;re looking for {emptyLabel}, email{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-bg underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>{' '}
          and we&rsquo;ll send it directly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="dark">
            Contact Us
          </Button>
        </div>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-bg/10 rounded-lg border border-bg/10 bg-surface-alt">
      {files.map((file) => {
        const external = isExternal(file.href)
        return (
          <li key={file.href}>
            <a
              href={file.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 p-5 hover:bg-bg/5"
            >
              <span>
                <span className="font-medium text-bg underline decoration-brand decoration-2 underline-offset-4">
                  {file.label}
                  {external && <ExternalLinkNote />}
                </span>
                {file.note && <span className="mt-1 block text-sm text-bg/60">{file.note}</span>}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
