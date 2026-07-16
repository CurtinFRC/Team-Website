import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { onRequestPost } from '../functions/api/contact'

const CONTACT_EMAIL = 'FIRSTRoboticsTeam@curtin.edu.au'

type Env = { TURNSTILE_SECRET?: string; RESEND_KEY?: string }

function makeContext(rawBody: string, env: Env = {}) {
  return {
    request: new Request('https://team4788.com/api/contact', { method: 'POST', body: rawBody }),
    env,
  } as unknown as Parameters<typeof onRequestPost>[0]
}

function json(body: unknown): string {
  return JSON.stringify(body)
}

describe('POST /api/contact', () => {
  let fetchStub: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchStub = vi.fn()
    vi.stubGlobal('fetch', fetchStub)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns 400 for a non-JSON body', async () => {
    const response = await onRequestPost(makeContext('not json'))
    expect(response.status).toBe(400)
  })

  it('returns 400 when name, email, or message is missing', async () => {
    const response = await onRequestPost(makeContext(json({ name: 'Jane' })))
    expect(response.status).toBe(400)
  })

  it('returns 400 when a field is not a string', async () => {
    const response = await onRequestPost(
      makeContext(json({ name: 'Jane', email: 'jane@example.com', message: 123 })),
    )
    expect(response.status).toBe(400)
  })

  it('returns 400 when a field exceeds its max length', async () => {
    const response = await onRequestPost(
      makeContext(json({ name: 'a'.repeat(201), email: 'jane@example.com', message: 'hi' })),
    )
    expect(response.status).toBe(400)
  })

  it('returns 400 when a field is whitespace-only', async () => {
    const response = await onRequestPost(
      makeContext(json({ name: '   ', email: 'jane@example.com', message: 'hi' })),
    )
    expect(response.status).toBe(400)
  })

  it('returns 400 when the email is not email-shaped', async () => {
    const response = await onRequestPost(
      makeContext(json({ name: 'Jane', email: 'not-an-email', message: 'hi' })),
    )
    expect(response.status).toBe(400)
  })

  describe('with TURNSTILE_SECRET set', () => {
    const env: Env = { TURNSTILE_SECRET: 'test-secret', RESEND_KEY: 'test-resend-key' }

    it('returns 403 when the token is missing, without calling fetch', async () => {
      const response = await onRequestPost(
        makeContext(json({ name: 'Jane', email: 'jane@example.com', message: 'hi' }), env),
      )
      expect(response.status).toBe(403)
      expect(fetchStub).not.toHaveBeenCalled()
    })

    it('calls siteverify with the secret and token via POST, and returns 403 when it fails', async () => {
      fetchStub.mockResolvedValueOnce(new Response(json({ success: false }), { status: 200 }))

      const response = await onRequestPost(
        makeContext(
          json({ name: 'Jane', email: 'jane@example.com', message: 'hi', token: 'tok-123' }),
          env,
        ),
      )

      expect(fetchStub).toHaveBeenCalledTimes(1)
      const [url, init] = fetchStub.mock.calls[0]
      expect(url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify')
      expect(init.method).toBe('POST')
      const sentBody = init.body as URLSearchParams
      expect(sentBody.get('secret')).toBe('test-secret')
      expect(sentBody.get('response')).toBe('tok-123')

      expect(response.status).toBe(403)
    })

    it('sends via Resend and returns 200 when verification passes', async () => {
      fetchStub
        .mockResolvedValueOnce(new Response(json({ success: true }), { status: 200 }))
        .mockResolvedValueOnce(new Response(json({ id: 'email-1' }), { status: 200 }))

      const response = await onRequestPost(
        makeContext(
          json({
            name: 'Jane Smith',
            email: 'jane@example.com',
            message: 'Hello there',
            token: 'tok-123',
          }),
          env,
        ),
      )

      expect(response.status).toBe(200)
      expect(fetchStub).toHaveBeenCalledTimes(2)

      const [resendUrl, resendInit] = fetchStub.mock.calls[1]
      expect(resendUrl).toBe('https://api.resend.com/emails')
      expect(resendInit.method).toBe('POST')
      expect(resendInit.headers.Authorization).toBe('Bearer test-resend-key')

      const payload = JSON.parse(resendInit.body as string)
      expect(payload.from).toBe('website@team4788.com')
      expect(payload.to).toBe(CONTACT_EMAIL)
      expect(payload.reply_to).toBe('jane@example.com')
      expect(payload.subject).toContain('Jane Smith')
      expect(payload.text).toBe('Hello there')
    })

    it('returns 502 when Resend responds with a non-ok status', async () => {
      fetchStub
        .mockResolvedValueOnce(new Response(json({ success: true }), { status: 200 }))
        .mockResolvedValueOnce(new Response('server error', { status: 500 }))

      const response = await onRequestPost(
        makeContext(
          json({ name: 'Jane', email: 'jane@example.com', message: 'hi', token: 'tok-123' }),
          env,
        ),
      )
      expect(response.status).toBe(502)
    })

    it('strips CRLF from the name before it reaches the subject', async () => {
      fetchStub
        .mockResolvedValueOnce(new Response(json({ success: true }), { status: 200 }))
        .mockResolvedValueOnce(new Response(json({ id: 'email-1' }), { status: 200 }))

      await onRequestPost(
        makeContext(
          json({
            name: 'Jane\r\nBcc: evil@example.com',
            email: 'jane@example.com',
            message: 'hi',
            token: 'tok-123',
          }),
          env,
        ),
      )

      const [, resendInit] = fetchStub.mock.calls[1]
      const payload = JSON.parse(resendInit.body as string)
      expect(payload.subject).not.toMatch(/[\r\n]/)
    })

    it('rejects a CRLF-carrying email with 400 instead of forwarding it to reply_to', async () => {
      const response = await onRequestPost(
        makeContext(
          json({
            name: 'Jane',
            email: 'jane@example.com\r\nX-Injected: 1',
            message: 'hi',
            token: 'tok-123',
          }),
          env,
        ),
      )

      expect(response.status).toBe(400)
      expect(fetchStub).not.toHaveBeenCalled()
    })
  })

  describe('with TURNSTILE_SECRET unset', () => {
    const env: Env = { RESEND_KEY: 'test-resend-key' }

    it('skips verification and still sends the email', async () => {
      fetchStub.mockResolvedValueOnce(new Response(json({ id: 'email-1' }), { status: 200 }))

      const response = await onRequestPost(
        makeContext(json({ name: 'Jane', email: 'jane@example.com', message: 'hi' }), env),
      )

      expect(fetchStub).toHaveBeenCalledTimes(1)
      const [url] = fetchStub.mock.calls[0]
      expect(url).toBe('https://api.resend.com/emails')
      expect(response.status).toBe(200)
    })
  })

  describe('with RESEND_KEY unset', () => {
    it('returns 503 with a body hinting at configuration, without calling fetch', async () => {
      const response = await onRequestPost(
        makeContext(json({ name: 'Jane', email: 'jane@example.com', message: 'hi' })),
      )

      expect(response.status).toBe(503)
      const body = (await response.json()) as Record<string, unknown>
      expect(JSON.stringify(body).toLowerCase()).toMatch(/config/)
      expect(fetchStub).not.toHaveBeenCalled()
    })
  })
})
