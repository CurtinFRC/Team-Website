import { describe, expect, it } from 'vitest'
import { faqs, linkablePhrases } from '../data/faq'

/** The live question set, verbatim from mirror/content-notes.md (§ /faq), in page order. */
const LIVE_QUESTIONS = [
  'What does “4788” mean?',
  'What are FIRST and FRC?',
  'Why are you doing all this?',
  'I’d like to join! What do I have to do?',
  'What kinds of opportunities are there on the team?',
  'This is wicked! How can I help support the team?',
  'I just was reading about FIRST® and everyone was talking about “gracious professionalism” and “coopertition”. What is that?',
  'I have a question or want to learn more about 4788 and what you do. Where do I ask?',
]

describe('faqs', () => {
  it('has exactly 8 entries', () => {
    expect(faqs.length).toBe(8)
  })

  it('gives every entry a non-empty question and answer', () => {
    for (const entry of faqs) {
      expect(entry.question.trim().length).toBeGreaterThan(0)
      expect(entry.answer.trim().length).toBeGreaterThan(0)
    }
  })

  it('matches all 8 live questions verbatim, in page order', () => {
    expect(faqs.map((entry) => entry.question)).toEqual(LIVE_QUESTIONS)
  })

  it('includes the live answer text verbatim (spot-checked)', () => {
    const meaning = faqs.find((entry) => entry.question === 'What does “4788” mean?')
    expect(meaning?.answer).toContain(
      'our team was the 4,788th team to join the competition',
    )
  })
})

describe('linkablePhrases', () => {
  // Guards the coupling between the linkification map and the answer copy: a
  // copy edit that removes or rewords a phrase would silently drop its link.
  // "At least one" rather than "exactly one" because "Contact Us page"
  // legitimately appears in two answers.
  it('every phrase occurs in at least one answer', () => {
    for (const phrase of Object.keys(linkablePhrases)) {
      const matches = faqs.filter((entry) => entry.answer.includes(phrase))
      expect(matches.length, `phrase "${phrase}" not found in any answer`).toBeGreaterThan(0)
    }
  })

  it('every phrase maps to a root-relative route', () => {
    for (const [phrase, href] of Object.entries(linkablePhrases)) {
      expect(href.startsWith('/'), `phrase "${phrase}" maps to non-route "${href}"`).toBe(true)
    }
  })
})
