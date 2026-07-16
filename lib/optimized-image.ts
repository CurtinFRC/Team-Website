import manifestJson from '@/public/images/opt/manifest.json'

export type OptVariant = { w: number; src: string }
export type OptEntry = { width: number; height: number; variants: OptVariant[]; fallback: string }

const manifest = manifestJson as Record<string, OptEntry>

/**
 * Looks up the build-time-optimized WebP variants for an `/images/original/...`
 * src (see `scripts/optimize-images.mjs`). Returns null for anything not in
 * the manifest — SVGs, and any raster image that isn't referenced by the site
 * or that optimizing didn't shrink — so callers can fall back to the original.
 */
export function getOptimizedImage(src: string): OptEntry | null {
  return manifest[src] ?? null
}

/** Builds a `srcset` attribute value from an optimized entry's variants. */
export function toSrcSet(entry: OptEntry): string {
  return entry.variants.map((variant) => `${variant.src} ${variant.w}w`).join(', ')
}
