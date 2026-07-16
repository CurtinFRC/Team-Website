import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

const WORDS_PER_MINUTE = 200

const blog = defineCollection({
  name: 'blog',
  directory: 'content/blog',
  include: '*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()),
    content: z.string(),
  }),
  transform: async (post, context) => {
    const mdx = await compileMDX(context, post, { remarkPlugins: [remarkGfm] })
    const textOnly = post.content
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images: keep alt text, drop the URL
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links: keep link text, drop the URL
    const wordCount = textOnly.trim().split(/\s+/).filter(Boolean).length
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))

    return {
      ...post,
      slug: post._meta.path,
      mdx,
      readingTimeMinutes,
    }
  },
})

export default defineConfig({
  content: [blog],
})
