import type { Metadata } from 'next'
import { Section } from '@/components/section'
import { ContactForm } from '@/components/contact-form'
import { CONTACT_EMAIL } from '@/data/contact'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Team 4788 by email or contact form.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-3xl">
          <h1
            id="contact-heading"
            className="text-center text-4xl font-bold italic text-brand sm:text-5xl"
          >
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-bg/75">
            Something to ask, or let us know? We&rsquo;re here to help. Simply fill out the form
            below and we will send you an email as soon as we can regarding your message.
          </p>
          <p className="mt-2 text-center text-lg leading-relaxed text-bg/75">
            Alternatively email{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-bg underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </Section>
    </main>
  )
}
