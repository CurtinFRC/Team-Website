export type FileEntry = {
  label: string
  href: string
  note?: string
}

/**
 * Files for /handbook and /downloads. Both start empty: the live site never
 * shipped real files behind either route (mirror/handbook.html and
 * mirror/downloads.html are both stub pages), so there is nothing to migrate.
 * See app/handbook/page.tsx and app/downloads/page.tsx for the empty-state
 * fallback these pages render while these arrays are empty.
 */
export const files: { handbook: FileEntry[]; downloads: FileEntry[] } = {
  handbook: [],
  downloads: [],
}
