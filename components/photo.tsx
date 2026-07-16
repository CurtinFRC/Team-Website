import { getOptimizedImage, toSrcSet } from '@/lib/optimized-image'

const DEFAULT_CLASSES = 'w-full rounded-lg object-cover'
const DEFAULT_SIZES = '(min-width: 768px) 50vw, 100vw'

type PhotoProps = {
  src: string
  alt: string
  /** Replaces the default classes entirely (rather than appending) — pass the full set you want. */
  className?: string
  /** `sizes` attribute for the srcset. Defaults to a 2-column content-band layout. */
  sizes?: string
  /** Eager, high-priority load for the LCP image (e.g. the hero). Defaults to lazy. */
  priority?: boolean
  /**
   * Eager load without the high fetch-priority of `priority`. For small,
   * brand-critical images near the top of a page (e.g. the sponsor logos)
   * where lazy-loading offscreen would leave them blank until scrolled.
   */
  eager?: boolean
}

/**
 * Content-band photo. Renders the build-time-optimized WebP srcset for `src`
 * when optimizing it produced smaller variants (see
 * scripts/optimize-images.mjs), with explicit width/height to prevent CLS.
 * Falls back to a plain `<img src>` — still sized, from the same manifest —
 * for anything optimizing didn't shrink, and to the raw original (unsized)
 * for anything not in the manifest at all (e.g. SVGs), so the component never
 * 404s on an image the script skipped.
 */
export function Photo({
  src,
  alt,
  className,
  sizes = DEFAULT_SIZES,
  priority = false,
  eager = false,
}: PhotoProps) {
  const classes = className ?? DEFAULT_CLASSES
  const optimized = getOptimizedImage(src)
  const loading = priority || eager ? undefined : 'lazy'
  const fetchPriority = priority ? 'high' : undefined

  if (!optimized) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        className={classes}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    )
  }

  const hasVariants = optimized.variants.length > 0

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={optimized.fallback}
      srcSet={hasVariants ? toSrcSet(optimized) : undefined}
      sizes={hasVariants ? sizes : undefined}
      width={optimized.width}
      height={optimized.height}
      alt={alt}
      className={classes}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
    />
  )
}
