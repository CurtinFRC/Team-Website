'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import { Button } from './button'
import { Container } from './container'

const HEADLINE_LINES = ['Ignite,', 'Improve,', 'Innovate.']

/**
 * Pre-resolved hero image, passed in from the server component that renders
 * `<Hero>` (app/page.tsx). Hero is a `'use client'` component, so it must NOT
 * import lib/optimized-image / the image manifest — doing so would bundle the
 * whole manifest into the homepage client chunk. The parent resolves the
 * optimized variants server-side and hands the finished attributes down.
 */
export type HeroImage = {
  src: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
  alt: string
}

/**
 * Homepage hero. Replaces the live site's Rive animation with a Motion
 * composition: the team photo with a load zoom-in + scroll parallax, a pulsing
 * pink accent glow, and a staggered word-reveal of the headline. All motion is
 * gated behind `useReducedMotion()` — once hydrated, a reduced-motion client
 * renders static and fully visible with no opacity-0 flash. The server-rendered
 * HTML still ships the opacity-0 initial states for the glow/headline/buttons
 * (the server can't know the client's motion preference), so there's a brief
 * pre-hydration window where that's untrue. The photo is the page's LCP element,
 * so it loads eager/high-priority (`fetchpriority="high"`, no `loading="lazy"`)
 * with the pre-resolved responsive srcset, and (unlike the rest of the hero) is
 * never animated from opacity 0, so it doesn't get held hostage by hydration +
 * animation timing (see the comment on its wrapper below).
 */
export function Hero({ image }: { image: HeroImage }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])

  const headline: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  }
  const lineReveal: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-bg"
    >
      {/* Background photo: load zoom-in + scroll parallax. Opacity is never
          animated here (unlike the headline/buttons below) — this img is the
          page's LCP element, and Chrome doesn't count an opacity:0 element as
          "painted" for LCP purposes, so animating it in from opacity 0 pushed
          LCP out to when the animation settled instead of first paint. */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduce ? undefined : { y: parallaxY }}
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes}
          width={image.width}
          height={image.height}
          alt={image.alt}
          className="h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>

      {/* Light legibility scrim: keep the photo bright like the live site, with a
          centered gradient behind the text for readable contrast. */}
      <div className="absolute inset-0 -z-10 bg-bg/25" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_62%_58%_at_50%_55%,rgba(17,17,17,0.6),transparent_72%)]" />

      {/* Pink accent glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[130px]"
        initial={reduce ? false : { opacity: 0.15, scale: 0.9 }}
        animate={reduce ? { opacity: 0.22 } : { opacity: [0.15, 0.34, 0.15], scale: [0.9, 1.06, 0.9] }}
        transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative flex flex-col items-center py-24 text-center">
        <motion.h1
          variants={headline}
          initial="hidden"
          animate="visible"
          className="font-sans text-5xl font-bold italic leading-[1.02] tracking-tight text-ink [text-shadow:0_2px_18px_rgba(0,0,0,0.65)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {HEADLINE_LINES.map((word) => (
            <motion.span key={word} variants={lineReveal} className="block">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.7, duration: 0.5 }}
          className="mt-6 font-mono text-base text-brand-bright [text-shadow:0_1px_10px_rgba(0,0,0,0.8)] sm:text-lg"
        >
          FRC Team 4788 - Can&apos;t Control
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.85, duration: 0.5 }}
          className="mt-9 flex flex-wrap justify-center gap-4"
        >
          <Button href="/recruitment" variant="light">
            Join our team
          </Button>
          <Button href="/about" variant="dark">
            About Us
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
