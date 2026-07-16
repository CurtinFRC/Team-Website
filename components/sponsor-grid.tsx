import { sponsors } from '@/data/sponsors'
import { Photo } from './photo'

/**
 * Sponsor logo wall. Matches the live site: a dark band with the rescued
 * white-on-transparent logos rendered as-is. Renders via `Photo`, which
 * resolves each logo's optimized WebP variant (see
 * scripts/optimize-images.mjs) when there is one and otherwise falls back to
 * the original — most of these logos are small/near-flat PNGs where
 * optimizing doesn't shrink the file, so they render unoptimized, still
 * transparent, with no change in appearance.
 */
export function SponsorGrid() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 sm:gap-x-16 md:gap-x-20">
      {sponsors.map((sponsor) => (
        <li key={sponsor.name} className="flex items-center justify-center">
          <Photo
            src={sponsor.logo}
            alt={sponsor.name}
            eager
            className="h-14 w-auto max-w-[280px] object-contain opacity-90 transition-opacity duration-200 hover:opacity-100 md:h-20 lg:h-24"
            sizes="280px"
          />
        </li>
      ))}
    </ul>
  )
}
