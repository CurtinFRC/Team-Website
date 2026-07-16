import type { NextConfig } from 'next'
import { withContentCollections } from '@content-collections/next'

const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
} satisfies NextConfig

export default withContentCollections(nextConfig)
