import type { ReactNode } from 'react'

type AwardPillSize = 'sm' | 'md'

/** sm suits the /robots cards; md suits the roomier robot-page Awards row. */
const SIZE_CLASSES: Record<AwardPillSize, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-1.5 text-sm',
}

/**
 * Brand-tinted award badge. Dark text on bg-brand/10 (not text-brand, which is
 * contrast-safe only at large sizes) so it passes axe color-contrast at pill
 * sizes.
 */
export function AwardPill({ children, size = 'md' }: { children: ReactNode; size?: AwardPillSize }) {
  return (
    <span className={`inline-block rounded-full bg-brand/10 font-semibold text-bg ${SIZE_CLASSES[size]}`}>
      {children}
    </span>
  )
}
