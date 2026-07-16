#!/usr/bin/env node
// Runs after `next build`. Next's static export writes an RSC payload file to
// out/robots.txt (the prefetch payload for the app/robots/page.tsx route,
// since its route segment is literally named "robots") which silently
// overwrites any crawler-facing robots.txt written during the build itself.
// This script writes the real one back afterwards, so it's always the last
// thing to touch out/robots.txt.
//
// SITE_URL below must match lib/site.ts's SITE_URL — duplicated here because
// this script runs as plain Node ESM, outside the TypeScript build.
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_URL = "https://team4788.com";

const ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const outDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..", "out");

if (!existsSync(outDir)) {
  console.error(
    `postbuild: ${outDir} does not exist — this script must run after \`next build\` (see the "build" script in package.json).`,
  );
  process.exit(1);
}

const robotsPath = path.join(outDir, "robots.txt");
await writeFile(robotsPath, ROBOTS_TXT, "utf-8");
console.log(`postbuild: wrote crawler robots.txt to ${robotsPath}`);
