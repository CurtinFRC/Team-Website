'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { CONTACT_EMAIL } from '@/data/contact'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
const ERROR_ID = 'contact-error'

type Status = 'idle' | 'submitting' | 'success' | 'error'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

function fieldClasses(extra = '') {
  return `w-full rounded-input border border-black/15 bg-white px-3 py-2 text-bg placeholder:text-black/40 disabled:cursor-not-allowed disabled:opacity-60 ${extra}`.trim()
}

/** Loads api.js at most once per page, even if called from multiple form instances. */
let turnstileScriptPromise: Promise<void> | null = null

function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (!turnstileScriptPromise) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = TURNSTILE_SCRIPT_SRC
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Turnstile'))
      document.head.appendChild(script)
    })
  }
  return turnstileScriptPromise
}

/**
 * Live contact form, shared by the homepage contact section and /contact.
 * Posts to the Cloudflare Pages Function at /api/contact. When
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't set at build time, the Turnstile
 * widget is omitted and no token is sent. That matches the function's
 * rollout path for before the team creates Turnstile keys.
 */
export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [token, setToken] = useState<string | null>(null)
  const [turnstileReady, setTurnstileReady] = useState(false)
  const [turnstileUnavailable, setTurnstileUnavailable] = useState(false)

  const widgetContainerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const successRef = useRef<HTMLParagraphElement>(null)

  const ensureTurnstile = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || turnstileReady) return
    loadTurnstileScript()
      .then(() => setTurnstileReady(true))
      .catch(() => {
        // Widget script failed to load (blocker, CDN hiccup). Re-enable
        // tokenless submit so the button isn't dead: if the server has a
        // Turnstile secret configured it responds 403, which surfaces as
        // the normal error state with the mailto fallback.
        setTurnstileUnavailable(true)
      })
  }, [turnstileReady])

  useEffect(() => {
    if (!turnstileReady || !widgetContainerRef.current || !window.turnstile) return
    const container = widgetContainerRef.current
    const widgetId = window.turnstile.render(container, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'auto',
      callback: (responseToken: string) => setToken(responseToken),
      'error-callback': () => setToken(null),
      'expired-callback': () => setToken(null),
    })
    widgetIdRef.current = widgetId
    return () => {
      window.turnstile?.remove(widgetId)
      widgetIdRef.current = null
    }
  }, [turnstileReady])

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, message, token: token ?? undefined }),
      })

      if (!response.ok) {
        // The server consumed the token (Turnstile tokens are single-use),
        // so a retry with the same one is a guaranteed 403. Get a fresh one.
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current)
          setToken(null)
        }
      }
      setStatus(response.ok ? 'success' : 'error')
    } catch {
      // Network failure: the request never reached the server, so the
      // token is still unspent. Keep it for the retry.
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-input border border-black/15 bg-white px-6 py-8 text-center text-lg font-medium text-bg"
      >
        Thanks for reaching out! We&rsquo;ll get back to you as soon as we can.
      </p>
    )
  }

  const submitting = status === 'submitting'
  const awaitingChallenge = Boolean(TURNSTILE_SITE_KEY) && !token && !turnstileUnavailable

  return (
    <form
      className="grid gap-6 md:grid-cols-2"
      aria-describedby={status === 'error' ? `contact-note ${ERROR_ID}` : 'contact-note'}
      onFocus={ensureTurnstile}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-bg/70">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={submitting}
            placeholder="Jane Smith"
            className={fieldClasses('mt-2')}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-bg/70">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={submitting}
            placeholder="jane@gmail.com"
            className={fieldClasses('mt-2')}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="contact-message" className="block text-sm font-medium text-bg/70">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={submitting}
          rows={6}
          placeholder="Your message..."
          className={fieldClasses('mt-2 flex-1 resize-none')}
        />
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="flex justify-center md:col-span-2">
          <div ref={widgetContainerRef} />
        </div>
      )}

      <div className="flex flex-col items-center gap-3 md:col-span-2">
        <button
          type="submit"
          disabled={submitting || awaitingChallenge}
          className="w-full max-w-sm rounded-input bg-bg px-6 py-2.5 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Sending…' : 'Submit'}
        </button>

        {status === 'error' && (
          <p id={ERROR_ID} role="alert" className="text-center text-sm text-red-700">
            Something went wrong sending your message. Please try again, or email us directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}

        <p id="contact-note" className="text-center text-sm text-bg/60">
          or email us at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-bg underline underline-offset-2 hover:underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </form>
  )
}
