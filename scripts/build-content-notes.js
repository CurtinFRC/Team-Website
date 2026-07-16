#!/usr/bin/env node
// Builds mirror/content-notes.md from:
//  - mirror/<slug>.html      (title + meta description)
//  - mirror/rendered-text.json (visible innerText per page, captured by
//    scripts/playwright-capture.js in a real browser: no responsive-variant
//    duplication, and FAQ accordion answers were expanded before capture)
//  - a heading list re-extracted from the HTML so heading levels survive
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MIRROR = path.join(ROOT, "mirror");

const PAGES = [
  ["home.html", "/"],
  ["2025frcrobot.html", "/2025frcrobot"],
  ["2024frcrobot.html", "/2024frcrobot"],
  ["2023frcrobot.html", "/2023frcrobot"],
  ["2022frcrobot.html", "/2022frcrobot"],
  ["2021frcrobot.html", "/2021frcrobot"],
  ["404.html", "/404"],
  ["robots.html", "/robots"],
  ["blog.html", "/blog"],
  ["resources.html", "/resources"],
  ["about.html", "/about"],
  ["structure.html", "/structure"],
  ["recruitment.html", "/recruitment"],
  ["first.html", "/first"],
  ["faq.html", "/faq"],
  ["location.html", "/location"],
  ["contact.html", "/contact"],
  ["roboacademy.html", "/roboacademy"],
  ["handbook.html", "/handbook"],
  ["downloads.html", "/downloads"],
  ["workshops.html", "/workshops"],
  ["diversity.html", "/diversity"],
  ["robotdemos.html", "/robotdemos"],
  ["media.html", "/media"],
  ["support.html", "/support"],
  ["blog-2025-cad-resources.html", "/blog/2025-cad-resources"],
  ["blog-offseason-25-electrical-can-connectors.html", "/blog/offseason-25-electrical-can-connectors"],
  ["blog-offseason-25-robust-vision.html", "/blog/offseason-25-robust-vision"],
  ["blog-offseason-25-carbon-fibre-shafts.html", "/blog/offseason-25-carbon-fibre-shafts"],
  ["blog-2024-build-blog-design-guidelines.html", "/blog/2024-build-blog-design-guidelines"],
];

const ENTITY_MAP = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“",
  mdash: "—", ndash: "–", hellip: "…", copy: "©",
  reg: "®", trade: "™",
};
function decodeEntities(str) {
  return str.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, code) => {
    if (code[0] === "#") {
      const cp = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isNaN(cp) ? m : String.fromCodePoint(cp);
    }
    return ENTITY_MAP[code] !== undefined ? ENTITY_MAP[code] : m;
  });
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function extractHeadings(html) {
  const out = [];
  const seen = new Set();
  const re = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  for (const m of html.matchAll(re)) {
    const text = stripTags(m[2]);
    if (!text) continue;
    const key = m[1] + "|" + text;
    if (seen.has(key)) continue; // responsive variants repeat headings
    seen.add(key);
    out.push({ level: Number(m[1]), text });
  }
  return out;
}

const renderedPath = path.join(MIRROR, "rendered-text.json");
const rendered = JSON.parse(fs.readFileSync(renderedPath, "utf8"));

let doc = "# team4788.com content notes\n\n";
doc += "Copy source of truth for rebuilding pages, extracted from the live Framer site.\n\n";
doc += "Per page: `<title>`, meta description, the page's headings (deduplicated across\n";
doc += "responsive variants, with levels), and the full visible body text as rendered in a\n";
doc += "real browser (Playwright innerText -- so no hidden breakpoint duplicates; on /faq the\n";
doc += "accordion items were clicked open first, since the answers are not in the static HTML).\n";
doc += "Body text is in document order and includes nav and footer copy.\n\n---\n\n";

for (const [file, urlPath] of PAGES) {
  const html = fs.readFileSync(path.join(MIRROR, file), "utf8");
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
  const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1] || "";
  const headings = extractHeadings(html);
  const text = rendered[urlPath];

  doc += `## https://team4788.com${urlPath === "/" ? "/" : urlPath}\n\n`;
  doc += `Mirror file: \`mirror/${file}\`\n\n`;
  doc += `**Title:** ${decodeEntities(title.trim())}\n\n`;
  doc += `**Meta description:** ${decodeEntities(desc.trim())}\n\n`;

  if (headings.length) {
    doc += "**Headings:**\n\n";
    for (const h of headings) {
      doc += `- (h${h.level}) ${h.text}\n`;
    }
    doc += "\n";
  }

  doc += "**Visible text (rendered):**\n\n";
  if (text) {
    doc += "```text\n";
    // collapse 3+ blank lines, trim trailing space per line
    const cleaned = text
      .split("\n")
      .map((l) => l.replace(/\s+$/g, ""))
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    doc += cleaned + "\n";
    doc += "```\n\n";
  } else {
    doc += "_(rendered text capture failed for this page)_\n\n";
  }
  doc += "---\n\n";
}

fs.writeFileSync(path.join(MIRROR, "content-notes.md"), doc, "utf8");
console.error(`Wrote mirror/content-notes.md (${doc.length} chars)`);
