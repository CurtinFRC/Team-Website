/**
 * Renders JSON-LD as the <script> tag's text child so a stray "</script>" in
 * the data can't break out of the tag; `<` is escaped to `<` as a second
 * layer of defence. Data passed in is always build-time content (site
 * constants, nav config, post frontmatter), never user input.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json">{json}</script>
}
