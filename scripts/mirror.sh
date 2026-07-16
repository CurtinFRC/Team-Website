#!/usr/bin/env bash
# Mirrors every page of team4788.com into mirror/*.html
# Run from repo root: bash scripts/mirror.sh
set -euo pipefail

OUT_DIR="mirror"
mkdir -p "$OUT_DIR"

# path -> output filename (relative to $OUT_DIR)
declare -A PAGES=(
  ["/"]="home.html"
  ["/2025frcrobot"]="2025frcrobot.html"
  ["/2024frcrobot"]="2024frcrobot.html"
  ["/2023frcrobot"]="2023frcrobot.html"
  ["/2022frcrobot"]="2022frcrobot.html"
  ["/2021frcrobot"]="2021frcrobot.html"
  ["/404"]="404.html"
  ["/robots"]="robots.html"
  ["/blog"]="blog.html"
  ["/resources"]="resources.html"
  ["/about"]="about.html"
  ["/structure"]="structure.html"
  ["/recruitment"]="recruitment.html"
  ["/first"]="first.html"
  ["/faq"]="faq.html"
  ["/location"]="location.html"
  ["/contact"]="contact.html"
  ["/roboacademy"]="roboacademy.html"
  ["/handbook"]="handbook.html"
  ["/downloads"]="downloads.html"
  ["/workshops"]="workshops.html"
  ["/diversity"]="diversity.html"
  ["/robotdemos"]="robotdemos.html"
  ["/media"]="media.html"
  ["/support"]="support.html"
  ["/blog/2025-cad-resources"]="blog-2025-cad-resources.html"
  ["/blog/offseason-25-electrical-can-connectors"]="blog-offseason-25-electrical-can-connectors.html"
  ["/blog/offseason-25-robust-vision"]="blog-offseason-25-robust-vision.html"
  ["/blog/offseason-25-carbon-fibre-shafts"]="blog-offseason-25-carbon-fibre-shafts.html"
  ["/blog/2024-build-blog-design-guidelines"]="blog-2024-build-blog-design-guidelines.html"
)

BASE="https://team4788.com"
fail=0

for path in "${!PAGES[@]}"; do
  out="${PAGES[$path]}"
  url="${BASE}${path}"
  echo "Fetching ${url} -> ${OUT_DIR}/${out}"
  code=$(curl -sL -A "Mozilla/5.0 (compatible; team4788-mirror/1.0)" \
    -w "%{http_code}" -o "${OUT_DIR}/${out}" "${url}" --max-time 30)
  size=$(wc -c < "${OUT_DIR}/${out}" | tr -d ' ')
  if [ "$size" -eq 0 ]; then
    echo "  WARNING: empty response (HTTP ${code}) for ${url}"
    fail=1
  else
    echo "  OK (HTTP ${code}, ${size} bytes)"
  fi
done

echo "Done. ${#PAGES[@]} pages requested."
exit $fail
