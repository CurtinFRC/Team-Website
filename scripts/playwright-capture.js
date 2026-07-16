#!/usr/bin/env node
// Uses a real headless browser to:
//  1. capture full-page screenshots (1440px + 375px) of the 17 built pages
//  2. extract innerText of each of the 30 pages (real rendered text -- avoids
//     the responsive-breakpoint duplication seen in raw Framer HTML, and
//     picks up interactive content like the FAQ accordion answers, which are
//     NOT present at all in the static HTML and only render on click)
// Writes mirror/screenshots/<slug>-<width>.png and mirror/rendered-text.json
"use strict";
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..");
const SCREENSHOT_DIR = path.join(ROOT, "mirror", "screenshots");
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

// slug, path, isBuilt (screenshot it) -- stubs are skipped for screenshots
const PAGES = [
  ["home", "/", true],
  ["2025frcrobot", "/2025frcrobot", true],
  ["2024frcrobot", "/2024frcrobot", true],
  ["2023frcrobot", "/2023frcrobot", true],
  ["2022frcrobot", "/2022frcrobot", true],
  ["2021frcrobot", "/2021frcrobot", true],
  ["404", "/404", true],
  ["robots", "/robots", true],
  ["blog", "/blog", true],
  ["resources", "/resources", false],
  ["about", "/about", true],
  ["structure", "/structure", true],
  ["recruitment", "/recruitment", true],
  ["first", "/first", true],
  ["faq", "/faq", true],
  ["location", "/location", true],
  ["contact", "/contact", true],
  ["roboacademy", "/roboacademy", false],
  ["handbook", "/handbook", false],
  ["downloads", "/downloads", false],
  ["workshops", "/workshops", false],
  ["diversity", "/diversity", false],
  ["robotdemos", "/robotdemos", false],
  ["media", "/media", false],
  ["support", "/support", false],
  ["blog-2025-cad-resources", "/blog/2025-cad-resources", true],
  ["blog-offseason-25-electrical-can-connectors", "/blog/offseason-25-electrical-can-connectors", true],
  ["blog-offseason-25-robust-vision", "/blog/offseason-25-robust-vision", true],
  ["blog-offseason-25-carbon-fibre-shafts", "/blog/offseason-25-carbon-fibre-shafts", true],
  ["blog-2024-build-blog-design-guidelines", "/blog/2024-build-blog-design-guidelines", true],
];

const BASE = "https://team4788.com";
const WIDTHS = [1440, 375];

const RENDERED_PATH = path.join(ROOT, "mirror", "rendered-text.json");

async function main() {
  const browser = await chromium.launch();
  // resume support: reload text captured on a previous partial run
  let renderedText = {};
  if (fs.existsSync(RENDERED_PATH)) {
    try { renderedText = JSON.parse(fs.readFileSync(RENDERED_PATH, "utf8")); } catch {}
  }
  const screenshotResults = [];

  for (const [slug, urlPath, isBuilt] of PAGES) {
    const url = BASE + urlPath;

    // resume support: skip pages whose text + screenshots are already done
    const shotsDone = !isBuilt || WIDTHS.every((w) => {
      const f = path.join(SCREENSHOT_DIR, `${slug}-${w}.png`);
      return fs.existsSync(f) && fs.statSync(f).size > 0;
    });
    if (renderedText[urlPath] && shotsDone) {
      console.error(`\n=== ${url} === (already captured, skipping)`);
      if (isBuilt) for (const w of WIDTHS) screenshotResults.push({ slug, width: w, ok: true, resumed: true });
      continue;
    }

    console.error(`\n=== ${url} ===`);
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: "load", timeout: 45000 });
      await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    } catch (e) {
      console.error(`  navigation warning: ${e.message}`);
    }

    // homepage has a Rive animation -- let it settle
    if (slug === "home") {
      await page.waitForTimeout(5000);
    } else {
      await page.waitForTimeout(1500);
    }

    // FAQ accordion: click every question to reveal answers before extracting text
    if (slug === "faq") {
      try {
        const questions = await page.locator('[data-framer-name="Question"]').all();
        console.error(`  found ${questions.length} FAQ questions, clicking each`);
        for (const q of questions) {
          try {
            await q.click({ timeout: 3000 });
            await page.waitForTimeout(200);
          } catch (e) {
            console.error(`  click failed: ${e.message}`);
          }
        }
        await page.waitForTimeout(500);
      } catch (e) {
        console.error(`  FAQ accordion expansion failed: ${e.message}`);
      }
    }

    // extract rendered visible text (persist incrementally so a crash keeps progress)
    try {
      const text = await page.evaluate(() => document.body.innerText);
      renderedText[urlPath] = text;
    } catch (e) {
      console.error(`  innerText extraction failed: ${e.message}`);
      renderedText[urlPath] = null;
    }
    fs.writeFileSync(RENDERED_PATH, JSON.stringify(renderedText, null, 2), "utf8");

    // screenshots (built pages only)
    if (isBuilt) {
      for (const width of WIDTHS) {
        try {
          await page.setViewportSize({ width, height: 900 });
          await page.waitForTimeout(slug === "home" ? 2000 : 500);
          const outFile = path.join(SCREENSHOT_DIR, `${slug}-${width}.png`);
          await page.screenshot({ path: outFile, fullPage: true, timeout: 30000 });
          const size = fs.statSync(outFile).size;
          console.error(`  screenshot ${width}px OK (${size} bytes)`);
          screenshotResults.push({ slug, width, ok: true, size });
        } catch (e) {
          console.error(`  screenshot ${width}px FAILED: ${e.message}`);
          screenshotResults.push({ slug, width, ok: false, error: e.message });
        }
      }
    }

    await context.close();
  }

  await browser.close();

  fs.writeFileSync(RENDERED_PATH, JSON.stringify(renderedText, null, 2), "utf8");
  fs.writeFileSync(
    path.join(ROOT, "mirror", "screenshot-results.json"),
    JSON.stringify(screenshotResults, null, 2),
    "utf8"
  );

  const failed = screenshotResults.filter((r) => !r.ok);
  console.error(`\nDone. ${screenshotResults.length - failed.length}/${screenshotResults.length} screenshots OK.`);
  if (failed.length) {
    console.error("Failed screenshots:", JSON.stringify(failed, null, 2));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
