import type { Metadata } from 'next'
import { ExternalLinkNote } from '@/components/external-link-note'
import { Section } from '@/components/section'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Our Location',
  description: "Where to find Team 4788 at Curtin University's Bentley campus.",
  path: '/location',
})

const LOCATION_COPY =
  'We are based out of Curtin University, on the Bentley campus, in building 201 (the Architecture and Planning building). We recommend parking and pick-up/drop-off in car park 211 (aka "Big Car Park") shown on the map below.'

// Improvement: the live page embeds a Google Maps widget that isn't captured
// in the static mirror. This is an OpenStreetMap embed centred on Curtin's
// Bentley campus instead, so the page doesn't depend on a Google Maps API key.
const OSM_EMBED_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=115.888,-32.010,115.900,-32.002&layer=mapnik&marker=-32.0064,115.8944'
const OSM_LARGE_MAP_URL = 'https://www.openstreetmap.org/?mlat=-32.0064&mlon=115.8944#map=17/-32.0064/115.8944'

export default function LocationPage() {
  return (
    <main>
      <Section tone="light" aria-labelledby="location-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h1
            id="location-heading"
            className="text-4xl font-bold italic text-brand sm:text-5xl"
          >
            Our Location
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-bg/75">{LOCATION_COPY}</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <iframe
            src={OSM_EMBED_SRC}
            title="Map showing Team 4788's location at Curtin University"
            loading="lazy"
            className="h-[420px] w-full rounded-lg border border-bg/10"
          />
          <p className="mt-3 text-center text-sm text-bg/60">
            <a
              href={OSM_LARGE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-bg underline underline-offset-2"
            >
              View larger map
              <ExternalLinkNote />
            </a>
          </p>
        </div>
      </Section>
    </main>
  )
}
