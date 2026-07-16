import Link from 'next/link'
import { CONTACT_EMAIL } from '@/data/contact'
import { isExternal, navGroups, navTopLevelLinks, socialLinks } from '@/data/nav'
import { Container } from './container'
import { ExternalLinkNote } from './external-link-note'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-bg bg-surface">
      <Container className="flex flex-col gap-10 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">{group.label}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {group.links.map((link) =>
                  isExternal(link.href) ? (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink-muted hover:text-brand-bright"
                      >
                        {link.label}
                        <ExternalLinkNote />
                      </a>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-ink-muted hover:text-brand-bright">
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-bg pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2 text-sm text-ink-muted">
            <p className="font-mono text-brand-bright">
              © Team 4788 Can&apos;t Control, {year}
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-bright">
              {CONTACT_EMAIL}
            </a>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {navTopLevelLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-brand-bright">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-ink-muted">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-bright"
              >
                {social.label}
                <ExternalLinkNote />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
