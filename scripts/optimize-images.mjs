#!/usr/bin/env node
// Build-time image optimization. Next's static export runs with
// `images.unoptimized: true` (no hosting-side optimizer), so this script is
// the optimizer: it scans the site's source for `/images/original/...`
// references, and for each *referenced* raster image (jpg/png — SVGs are
// already optimal and skipped) emits resized WebP variants into
// public/images/opt/, plus public/images/opt/manifest.json mapping each
// original path to its variants and intrinsic dimensions. components/photo.tsx
// and components/blog-post.tsx (via lib/optimized-image.ts) read that
// manifest to render srcset/sizes/width/height without hardcoding per-image.
//
// Run before `next build` (see the "build" script in package.json) so `out/`
// always ships fresh variants. The outputs are also committed — a fresh
// checkout is deployable without re-running this script, and the skip-if-fresh
// check below means a re-run regenerates nothing whose source is unchanged.
// (Not literally zero work: the ~8 images WebP can't shrink have no committed
// variant to skip, so they're re-encoded and discarded on every run — cheap,
// sub-second in aggregate.)
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const PUBLIC_DIR = path.join(ROOT, 'public')
const ORIGINAL_DIR = path.join(PUBLIC_DIR, 'images', 'original')
const OPT_DIR = path.join(PUBLIC_DIR, 'images', 'opt')
const MANIFEST_PATH = path.join(OPT_DIR, 'manifest.json')

// Source locations that can reference an image: pages/components (<Photo>,
// hero, sponsor grid), data files (robot/sponsor photo lists), and blog MDX
// (markdown image syntax, rendered by components/blog-post.tsx).
const SCAN_DIRS = ['app', 'components', 'data', 'content'].map((dir) => path.join(ROOT, dir))
const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.mdx'])
const REFERENCE_PATTERN = /\/images\/original\/([A-Za-z0-9_-]+\.(?:jpe?g|png))/g

// Widths to generate (ascending); upscaling past the intrinsic width is
// skipped per-image. Chosen to cover common layouts: full-bleed mobile
// hero (480), ~half-viewport tablet/desktop content photos (960), and
// full-bleed desktop hero / largest content width (1440).
const WIDTHS = [480, 960, 1440]
const WEBP_QUALITY = 78

async function findReferencedFilenames() {
  const found = new Set()
  for (const dir of SCAN_DIRS) {
    if (!existsSync(dir)) continue
    await walk(dir, async (file) => {
      if (!SCAN_EXTENSIONS.has(path.extname(file))) return
      const content = await readFile(file, 'utf-8')
      for (const match of content.matchAll(REFERENCE_PATTERN)) {
        found.add(match[1])
      }
    })
  }
  return found
}

async function walk(dir, onFile) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(full, onFile)
    } else {
      await onFile(full)
    }
  }
}

/** True if `outPath` is missing or older than the source it's derived from. */
async function isStale(outPath, srcStat) {
  if (!existsSync(outPath)) return true
  const outStat = await stat(outPath)
  return outStat.mtimeMs < srcStat.mtimeMs
}

async function optimizeOne(filename) {
  const srcPath = path.join(ORIGINAL_DIR, filename)
  if (!existsSync(srcPath)) {
    console.warn(`optimize-images: referenced image not found, skipping: ${filename}`)
    return { entry: null, generated: 0 }
  }

  const srcStat = await stat(srcPath)
  const metadata = await sharp(srcPath).metadata()
  if (!metadata.width || !metadata.height) {
    console.warn(`optimize-images: could not read dimensions, skipping: ${filename}`)
    return { entry: null, generated: 0 }
  }

  const base = filename.replace(/\.[^.]+$/, '')
  const targetWidths = WIDTHS.filter((w) => w <= metadata.width)
  if (targetWidths.length === 0) targetWidths.push(metadata.width)

  const variants = []
  let generated = 0
  for (const w of targetWidths) {
    const outName = `${base}-${w}.webp`
    const outPath = path.join(OPT_DIR, outName)
    if (await isStale(outPath, srcStat)) {
      await sharp(srcPath)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outPath)
      generated++
    }
    variants.push({ w, src: `/images/opt/${outName}`, outPath })
  }

  // Benefit check: tiny/near-flat sponsor logos sometimes don't shrink under
  // WebP re-encoding. If the largest variant isn't smaller than the original,
  // drop the generated files and serve the original — still with a manifest
  // entry (empty variants, fallback = the original), so Photo/blog-post can
  // still set width/height (CLS-safe) even though there's no srcset.
  const largest = variants[variants.length - 1]
  const largestStat = await stat(largest.outPath)
  if (largestStat.size >= srcStat.size) {
    for (const variant of variants) await rm(variant.outPath, { force: true })
    return {
      entry: {
        width: metadata.width,
        height: metadata.height,
        variants: [],
        fallback: `/images/original/${filename}`,
      },
      generated,
      noBenefit: true,
    }
  }

  return {
    entry: {
      width: metadata.width,
      height: metadata.height,
      variants: variants.map(({ w, src }) => ({ w, src })),
      fallback: largest.src,
    },
    generated,
  }
}

async function main() {
  await mkdir(OPT_DIR, { recursive: true })

  const filenames = [...(await findReferencedFilenames())].sort()
  console.log(`optimize-images: ${filenames.length} referenced original image(s) found`)

  const manifest = {}
  let generated = 0
  let noBenefit = 0

  for (const filename of filenames) {
    const result = await optimizeOne(filename)
    generated += result.generated
    if (result.noBenefit) noBenefit++
    if (result.entry) manifest[`/images/original/${filename}`] = result.entry
  }

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8')
  console.log(
    `optimize-images: ${generated} variant file(s) written, ${noBenefit} image(s) skipped (no size benefit), ` +
      `${Object.keys(manifest).length} manifest entries -> ${path.relative(ROOT, MANIFEST_PATH)}`,
  )
}

await main()
