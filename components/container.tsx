import type { ComponentPropsWithoutRef, ElementType } from 'react'

type ContainerProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

/** Max-width content wrapper with consistent horizontal padding. */
export function Container<T extends ElementType = 'div'>({
  as,
  className = '',
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? 'div'
  return <Tag className={`mx-auto w-full max-w-6xl px-6 ${className}`.trim()} {...props} />
}
