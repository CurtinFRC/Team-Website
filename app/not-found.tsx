import type { Metadata } from 'next'
import { Button } from '@/components/button'
import { Section } from '@/components/section'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for could not be found.',
}

// The live site's own 404 copy (mirror/404.html), reused verbatim — it has
// more personality than a generic "page not found" message.
const HEADLINE = 'This is not the page you are looking for… 🧙'

export default function NotFound() {
  return (
    <main>
      <Section tone="dark" aria-labelledby="not-found-heading">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-sm uppercase tracking-wide text-ink-muted">404</p>
          <h1
            id="not-found-heading"
            className="mt-2 text-4xl font-bold italic text-brand sm:text-5xl"
          >
            {HEADLINE}
          </h1>
          <p className="mt-6 text-lg text-ink-muted">
            Whatever you were after, it isn&rsquo;t here. Try one of these instead.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/" variant="light">
              Go back home
            </Button>
            <Button href="/robots" variant="primary">
              Our Robots
            </Button>
            <Button href="/blog" variant="primary">
              Blog
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
