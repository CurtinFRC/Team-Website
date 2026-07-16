import type { ComponentPropsWithoutRef } from 'react'
import { Container } from './container'

type Tone = 'dark' | 'surface' | 'light'

const TONE_CLASSES: Record<Tone, string> = {
  dark: 'bg-bg text-ink',
  surface: 'bg-surface text-ink',
  light: 'bg-surface-alt text-bg',
}

type Padding = 'default' | 'tight'

const PADDING_CLASSES: Record<Padding, string> = {
  default: 'py-20 md:py-28',
  tight: 'py-16 md:py-20',
}

type SectionProps = {
  /** Band background: dark (#111), surface (#222, sponsor strip), or light (#fefefa). Default dark. */
  tone?: Tone
  /** Vertical padding: default (py-20 md:py-28) or tight (py-16 md:py-20, e.g. the sponsor strip). */
  padding?: Padding
} & ComponentPropsWithoutRef<'section'>

/** Full-width banded section with a centered max-width Container inside. */
export function Section({
  tone = 'dark',
  padding = 'default',
  className = '',
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={`${TONE_CLASSES[tone]} ${PADDING_CLASSES[padding]} ${className}`.trim()}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  )
}
