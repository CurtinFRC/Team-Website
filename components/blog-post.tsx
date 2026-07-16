import { notFound } from 'next/navigation'
import { allBlogs } from 'content-collections'
import { MDXContent } from '@content-collections/mdx/react'
import { isExternal } from '@/data/nav'
import { formatPostDate } from '@/lib/blog'
import { getOptimizedImage, toSrcSet } from '@/lib/optimized-image'
import { SITE_URL } from '@/lib/site'
import { ExternalLinkNote } from './external-link-note'
import { JsonLd } from './json-ld'
import { Section } from './section'

const BLOG_IMAGE_CLASSES = 'mt-6 w-full rounded-lg object-cover'
// Post body is capped at max-w-3xl (48rem = 768px).
const BLOG_IMAGE_SIZES = '(min-width: 768px) 768px, 100vw'

const mdxComponents = {
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="mt-12 text-2xl font-bold text-bg first:mt-0" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="mt-8 text-xl font-bold text-bg" {...props} />
  ),
  h4: (props: React.ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="mt-6 text-lg font-bold text-bg" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<'p'>) => (
    <p className="mt-4 leading-relaxed text-bg/75" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mt-4 list-disc space-y-1 pl-6 text-bg/75" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mt-4 list-decimal space-y-1 pl-6 text-bg/75" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<'li'>) => <li className="leading-relaxed" {...props} />,
  a: ({ href = '', children, ...props }: React.ComponentPropsWithoutRef<'a'>) => {
    const external = isExternal(href)
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-bg underline decoration-brand decoration-2 underline-offset-4 hover:text-bg/70"
        {...props}
      >
        {children}
        {external && <ExternalLinkNote />}
      </a>
    )
  },
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-bold text-bg" {...props} />
  ),
  code: (props: React.ComponentPropsWithoutRef<'code'>) => (
    <code className="rounded bg-bg/10 px-1.5 py-0.5 font-mono text-sm text-bg" {...props} />
  ),
  img: ({ alt = '', src, ...props }: React.ComponentPropsWithoutRef<'img'>) => {
    const optimized = typeof src === 'string' ? getOptimizedImage(src) : null
    if (!optimized) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={alt}
          src={src}
          className={BLOG_IMAGE_CLASSES}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )
    }
    const hasVariants = optimized.variants.length > 0
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt}
        src={optimized.fallback}
        srcSet={hasVariants ? toSrcSet(optimized) : undefined}
        sizes={hasVariants ? BLOG_IMAGE_SIZES : undefined}
        width={optimized.width}
        height={optimized.height}
        className={BLOG_IMAGE_CLASSES}
        loading="lazy"
        decoding="async"
        {...props}
      />
    )
  },
  table: (props: React.ComponentPropsWithoutRef<'table'>) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-max border-collapse text-left text-sm text-bg/75" {...props} />
    </div>
  ),
  thead: (props: React.ComponentPropsWithoutRef<'thead'>) => (
    <thead className="border-b border-bg/20 text-bg" {...props} />
  ),
  th: (props: React.ComponentPropsWithoutRef<'th'>) => <th className="px-3 py-2 font-bold" {...props} />,
  td: (props: React.ComponentPropsWithoutRef<'td'>) => (
    <td className="border-b border-bg/10 px-3 py-2 align-top" {...props} />
  ),
}

/** Renders one blog post, looked up by slug from the content-collections `blog` collection. */
export function BlogPost({ slug }: { slug: string }) {
  const post = allBlogs.find((entry) => entry.slug === slug)
  if (!post) {
    notFound()
  }

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date.toISOString(),
    description: post.summary,
    url: `${SITE_URL}/blog/${post.slug}`,
  }

  return (
    <main>
      <JsonLd data={blogPostingJsonLd} />
      <Section tone="light" aria-labelledby="post-heading">
        <header className="mx-auto max-w-3xl text-center">
          <h1 id="post-heading" className="text-4xl font-bold italic text-brand sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-bg/60">
            <time dateTime={post.date.toISOString()}>{formatPostDate(post.date)}</time>
            {' · '}
            {post.readingTimeMinutes} min read
          </p>
          {post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
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
        </header>

        <div className="mx-auto mt-12 max-w-3xl">
          <MDXContent code={post.mdx} components={mdxComponents} />
        </div>
      </Section>
    </main>
  )
}
