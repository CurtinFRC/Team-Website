import type { Metadata } from 'next'
import { Section } from '@/components/section'
import { FaqAccordion } from '@/components/faq-accordion'
import { faqs } from '@/data/faq'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'FAQ',
  description: 'Answers to frequently asked questions about Team 4788.',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="faq-heading">
        <h1
          id="faq-heading"
          className="text-center text-4xl font-bold italic text-brand sm:text-5xl"
        >
          Frequently Asked Questions
        </h1>
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqAccordion items={faqs} />
        </div>
      </Section>
    </main>
  )
}
