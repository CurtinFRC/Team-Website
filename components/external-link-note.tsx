/**
 * Screen-reader-only affordance for links that open in a new tab
 * (`target="_blank"`). Render as the last child inside the link so it reads
 * as "<link text> (opens in new tab)".
 */
export function ExternalLinkNote() {
  return <span className="sr-only"> (opens in new tab)</span>
}
