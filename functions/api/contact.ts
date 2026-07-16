/**
 * Cloudflare Pages Function backing the site's contact form.
 *
 * Kept dependency-free and framework-free: static-exported Next apps on
 * Cloudflare Pages get exactly one place to run server code, this file.
 *
 * Env vars (see functions/README.md):
 * - TURNSTILE_SECRET: optional. When unset, Turnstile verification is
 *   skipped (rollout path before the team creates Turnstile keys).
 * - RESEND_KEY: required to actually send mail. When unset, requests fail
 *   with 503 so deploys can happen before Resend is configured.
 */

// Duplicated from components/contact-form.tsx's CONTACT_EMAIL: that file is
// a "use client" React component and shouldn't be imported into a Workers
// bundle. Keep the two in sync if the recipient ever changes.
const CONTACT_EMAIL = 'FIRSTRoboticsTeam@curtin.edu.au'
const FROM_EMAIL = 'website@team4788.com'

const MAX_NAME_LENGTH = 200
const MAX_EMAIL_LENGTH = 200
const MAX_MESSAGE_LENGTH = 5000

interface Env {
  TURNSTILE_SECRET?: string
  RESEND_KEY?: string
}

interface ContactPayload {
  name: string
  email: string
  message: string
  token?: string
}

/** Strips CRLF so submitter-controlled values can't inject extra email headers. */
function stripCrlf(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

/** Loose shape check, just enough to bounce garbage before Resend does. */
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parsePayload(value: unknown): ContactPayload | null {
  if (typeof value !== 'object' || value === null) return null
  const { name, email, message, token } = value as Record<string, unknown>

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return null
  }
  if (token !== undefined && typeof token !== 'string') return null

  const cleanName = stripCrlf(name)
  const cleanEmail = email.trim()
  const cleanMessage = message.trim()

  if (cleanName.length === 0 || cleanEmail.length === 0 || cleanMessage.length === 0) return null
  if (cleanName.length > MAX_NAME_LENGTH || cleanEmail.length > MAX_EMAIL_LENGTH) return null
  if (cleanMessage.length > MAX_MESSAGE_LENGTH) return null
  // The shape check doubles as reply_to CRLF hygiene: an address carrying
  // CR/LF (or any whitespace) is rejected here rather than sanitized.
  if (!EMAIL_SHAPE.test(cleanEmail)) return null

  return { name: cleanName, email: cleanEmail, message: cleanMessage, token }
}

async function verifyTurnstile(token: string, secret: string): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token })
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  const result = (await response.json()) as { success?: boolean }
  return result.success === true
}

async function sendViaResend(payload: ContactPayload, resendKey: string): Promise<Response> {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      reply_to: payload.email,
      subject: `New contact form message from ${payload.name}`,
      text: payload.message,
    }),
  })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: 'Request body must be JSON' }, 400)
  }

  const payload = parsePayload(body)
  if (!payload) {
    return jsonResponse({ error: 'Missing or invalid name, email, or message' }, 400)
  }

  if (env.TURNSTILE_SECRET) {
    if (!payload.token) {
      return jsonResponse({ error: 'Missing Turnstile token' }, 403)
    }
    const verified = await verifyTurnstile(payload.token, env.TURNSTILE_SECRET)
    if (!verified) {
      return jsonResponse({ error: 'Turnstile verification failed' }, 403)
    }
  }

  if (!env.RESEND_KEY) {
    return jsonResponse({ error: 'Contact form is not configured yet (missing RESEND_KEY)' }, 503)
  }

  const resendResponse = await sendViaResend(payload, env.RESEND_KEY)
  if (!resendResponse.ok) {
    return jsonResponse({ error: 'Failed to send message' }, 502)
  }

  return jsonResponse({ ok: true }, 200)
}
