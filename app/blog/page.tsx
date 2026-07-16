import type { Metadata } from 'next'
import Link from 'next/link'
import { allBlogs } from 'content-collections'
import { Section } from '@/components/section'
import { formatPostDate, sortPostsNewestFirst } from '@/lib/blog'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description: 'Build season updates and technical write-ups from Team 4788.',
  path: '/blog',
})

export default function BlogIndexPage() {
  const posts = sortPostsNewestFirst(allBlogs)

  return (
    <main>
      <Section tone="light" aria-labelledby="blog-heading">
        <h1
          id="blog-heading"
          className="text-center text-4xl font-bold italic text-brand sm:text-5xl"
        >
          Team 4788&apos;s Blogs
        </h1>
        <p className="mt-4 text-center text-lg text-bg/70">
          Hosted, Posted, Boasted content by Team 4788 Can&apos;t Control!
        </p>
        <p className="mt-4 text-center">
          <a
            href="/feed.xml"
            className="text-sm font-medium text-bg/70 underline decoration-brand decoration-2 underline-offset-4 hover:text-bg"
          >
            RSS
          </a>
        </p>

        <ul className="mx-auto mt-16 max-w-3xl space-y-10">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-bg/10 pb-10 last:border-none">
              <h2 className="text-2xl font-bold text-bg">
                <Link
                  href={`/blog/${post.slug}`}
                  className="underline decoration-brand decoration-2 underline-offset-4"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-bg/60">
                <time dateTime={post.date.toISOString()}>{formatPostDate(post.date)}</time>
                {' · '}
                {post.readingTimeMinutes} min read
              </p>
              <p className="mt-3 text-bg/75">{post.summary}</p>
              {post.tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-bg/5 px-3 py-1 font-mono text-xs uppercase tracking-wide text-bg/60"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}
