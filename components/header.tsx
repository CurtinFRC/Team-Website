'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { isExternal, navGroups, navTopLevelLinks, type NavGroup } from '@/data/nav'
import { Button } from './button'
import { Container } from './container'
import { ExternalLinkNote } from './external-link-note'

function NavItemLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string
  className: string
  onClick?: () => void
  children: React.ReactNode
}) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {children}
        <ExternalLinkNote />
      </a>
    )
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 14 14"
      aria-hidden="true"
      className={`h-3 w-3 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path
        d="M 3 5.5 L 7 9.5 L 11 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
        <path
          d="M4 4 L16 16 M16 4 L4 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
      <path d="M3 6h14 M3 10h14 M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function NavDropdown({
  group,
  open,
  onToggle,
  onClose,
  triggerRef,
}: {
  group: NavGroup
  open: boolean
  onToggle: () => void
  onClose: () => void
  triggerRef: (el: HTMLButtonElement | null) => void
}) {
  const menuId = useId()
  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={onToggle}
        className="flex items-center gap-1 rounded-input px-3 py-2 text-sm font-medium text-ink hover:text-brand-bright"
      >
        {group.label}
        <ChevronIcon open={open} />
      </button>
      <ul
        id={menuId}
        hidden={!open}
        className="absolute left-0 top-full z-10 mt-1 min-w-56 rounded-input border border-bg bg-surface py-2 shadow-xl"
      >
        {group.links.map((link) => (
          <li key={link.href}>
            <NavItemLink
              href={link.href}
              onClick={onClose}
              className="block px-4 py-2 text-sm text-ink hover:bg-bg hover:text-brand-bright"
            >
              {link.label}
            </NavItemLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>())

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (openGroup) triggerRefs.current.get(openGroup)?.focus()
        setOpenGroup(null)
        setMobileOpen(false)
      }
    }
    function onClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenGroup(null)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [openGroup])

  // Collapse the mobile panel back to desktop layout without a resize listener.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 64rem)')
    const onChange = () => setMobileOpen(false)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-bg bg-surface">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex flex-col leading-tight" onClick={() => setMobileOpen(false)}>
          <span className="text-base font-semibold text-ink">Team 4788</span>
          <span className="font-mono text-[11px] text-ink-muted">Can&apos;t Control</span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {navGroups.map((group) => (
            <NavDropdown
              key={group.label}
              group={group}
              open={openGroup === group.label}
              onToggle={() => setOpenGroup((current) => (current === group.label ? null : group.label))}
              onClose={() => setOpenGroup(null)}
              triggerRef={(el) => {
                if (el) triggerRefs.current.set(group.label, el)
                else triggerRefs.current.delete(group.label)
              }}
            />
          ))}
          {navTopLevelLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-input px-3 py-2 text-sm font-medium text-ink hover:text-brand-bright"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/recruitment">Join our team</Button>
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-input text-ink lg:hidden"
        >
          <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          <MenuIcon open={mobileOpen} />
        </button>
      </Container>

      {mobileOpen && (
        <div id="mobile-nav-panel" className="border-t border-bg bg-surface lg:hidden">
          <Container className="flex flex-col gap-6 py-6">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">{group.label}</p>
                <ul className="mt-2 flex flex-col">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <NavItemLink
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-input px-2 py-2 text-ink hover:text-brand-bright"
                      >
                        {link.label}
                      </NavItemLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col border-t border-bg pt-4">
              {navTopLevelLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-input px-2 py-2 text-ink hover:text-brand-bright"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Button href="/recruitment" onClick={() => setMobileOpen(false)}>
              Join our team
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
