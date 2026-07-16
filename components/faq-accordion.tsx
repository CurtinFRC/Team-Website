import Link from 'next/link'
import type { ReactNode } from 'react'
import { linkablePhrases, type Faq } from '@/data/faq'

const PHRASE_PATTERN = new RegExp(
  `(${Object.keys(linkablePhrases)
    .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})`,
  'g',
)

function linkifyAnswer(answer: string): ReactNode[] {
  return answer.split(PHRASE_PATTERN).map((part, index) => {
    const href = linkablePhrases[part]
    if (!href) return part
    return (
      <Link key={index} href={href} className="underline underline-offset-2 hover:text-brand">
        {part}
      </Link>
    )
  })
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-bg/60 transition-transform duration-200 group-open:rotate-180"
    >
      <path
        d="M 3 5.5 L 7 9.5 L 11 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Native `<details>/<summary>` accordion — no JS, keyboard- and screen-reader-accessible by default. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-bg/10 rounded-input border border-bg/10 bg-bg/[0.03]">
      {items.map((item) => (
        <details key={item.question} className="group p-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-bg [&::-webkit-details-marker]:hidden">
            <span>
              <span className="text-bg/60">Q. </span>
              {item.question}
            </span>
            <ChevronIcon />
          </summary>
          <p className="mt-4 leading-relaxed text-bg/75">
            <span className="text-bg/60">A. </span>
            {linkifyAnswer(item.answer)}
          </p>
        </details>
      ))}
    </div>
  )
}
