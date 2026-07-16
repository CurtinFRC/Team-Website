#!/usr/bin/env bash
# Downloads every framerusercontent.com/images/... URL referenced in mirror/*.html
# into public/images/original/, and writes public/images/manifest.json.
# Run from repo root: bash scripts/download-images.sh
set -euo pipefail

OUT_DIR="public/images/original"
mkdir -p "$OUT_DIR"

grep -ohE 'https://framerusercontent\.com/images/[^"?, )\\]*' mirror/*.html | sort -u > /tmp/team4788_image_urls.txt

echo "{" > public/images/manifest.json
first=1
fail=0

while IFS= read -r url; do
  fname=$(basename "$url")
  dest="${OUT_DIR}/${fname}"
  if [ ! -s "$dest" ]; then
    echo "Downloading ${url}"
    # -f: fail on HTTP errors; download to a temp file and mv on success so an
    # interrupted transfer can't leave a partial file the skip check treats as done
    tmp="${dest}.part"
    if curl -fsL -A "Mozilla/5.0 (compatible; team4788-mirror/1.0)" -o "$tmp" "$url" --max-time 30; then
      mv "$tmp" "$dest"
    else
      echo "  ERROR: download failed for ${url}"
      rm -f "$tmp"
      fail=1
      continue
    fi
  fi
  size=$(wc -c < "$dest" | tr -d ' ')
  if [ "$size" -eq 0 ]; then
    echo "  WARNING: empty file for ${url}"
    fail=1
  fi
  if [ $first -eq 0 ]; then echo "," >> public/images/manifest.json; fi
  first=0
  printf '  "%s": "images/original/%s"' "$url" "$fname" >> public/images/manifest.json
done < /tmp/team4788_image_urls.txt

echo "" >> public/images/manifest.json
echo "}" >> public/images/manifest.json

count=$(wc -l < /tmp/team4788_image_urls.txt)
echo "Done. ${count} image URLs processed."
exit $fail
