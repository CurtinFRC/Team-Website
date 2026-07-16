import type { Metadata } from 'next'
import { allBlogs } from 'content-collections'
import { BlogPost } from '@/components/blog-post'
import { pageMetadata } from '@/lib/site'

export function generateStaticParams() {
  return allBlogs.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = allBlogs.find((entry) => entry.slug === slug)
  if (!post) return {}

  return pageMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date.toISOString(),
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <BlogPost slug={slug} />
}
