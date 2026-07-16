import type { ElementType } from 'react'
import { isExternal } from '@/data/nav'
import { ExternalLinkNote } from './external-link-note'

type LinkCardProps = {
  title: string
  description: string
  href: string
  /** Heading level for the card title, so callers can keep correct document outline. */
  headingLevel: ElementType
}

/** A bordered card linking out to a resource (CAD, code, gallery, training course, etc). */
export function LinkCard({ title, description, href, headingLevel: Heading }: LinkCardProps) {
  const external = isExternal(href)
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="block rounded-lg border border-bg/10 bg-surface-alt p-6 transition-colors hover:border-bg/25"
    >
      <Heading className="text-lg font-bold text-bg underline decoration-brand decoration-2 underline-offset-4">
        {title}
        {external && <ExternalLinkNote />}
      </Heading>
      <p className="mt-2 text-bg/70">{description}</p>
    </a>
  )
}
