import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { isExternal } from '@/data/nav'
import { ExternalLinkNote } from './external-link-note'

type ButtonVariant = 'primary' | 'dark' | 'light'

type SharedProps = {
  variant?: ButtonVariant
  className?: string
}

type LinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & { href: string }

type ButtonElProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { href?: undefined }

type ButtonProps = LinkProps | ButtonElProps

const BASE_CLASSES =
  'inline-flex items-center justify-center rounded-input px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // White text on --color-brand is 4.3:1, just under the 4.5:1 AA floor for
  // this text size — bg-brand is documented as "large text only". Darkened
  // for the button background specifically (5.92:1); hover brightens to the
  // full brand pink.
  primary: 'bg-[#c40068] text-ink hover:bg-brand',
  /** Dark pill with white text — buttons on the light content bands (per live site). */
  dark: 'bg-bg text-ink hover:bg-surface',
  /** White pill with dark text — the hero's primary CTA (per live site). */
  light: 'bg-surface-alt text-bg hover:bg-surface-alt/80',
}

/** Renders an `<a>`/Link when `href` is given, otherwise a `<button>`. */
export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim()

  if (props.href) {
    const { href, ...rest } = props as LinkProps
    if (isExternal(href)) {
      const { children, ...anchorRest } = rest
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...anchorRest}>
          {children}
          <ExternalLinkNote />
        </a>
      )
    }
    return <Link href={href} className={classes} {...rest} />
  }

  const { href: _href, ...rest } = props as ButtonElProps
  return <button className={classes} {...rest} />
}
