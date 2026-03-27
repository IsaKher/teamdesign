// convert-to-webp.mjs
// Converts all large static PNGs in /public to WebP using sharp.
// Keeps the originals as fallback. Run with: node scripts/convert-to-webp.mjs

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const TARGETS = [
  'public/hero-building.png',
  'public/interiors-cta.png',
  'public/studio-sketch.png',
  'public/studio-story.png',
  'public/tasadduq-kher.png',
  'public/images/Concept Design.png',
  'public/images/Design Development.png',
  'public/images/Site Supervision.png',
  'public/images/Technical Documentation.png',
];

const ROOT = '/Users/isakher/Desktop/teamdesign';

async function convert() {
  for (const rel of TARGETS) {
    const src  = join(ROOT, rel);
    const dest = src.replace(/\.png$/i, '.webp');

    const before = (await stat(src)).size;
    await sharp(src)
      .webp({ quality: 82 })
      .toFile(dest);
    const after = (await stat(dest)).size;

    const saved = (((before - after) / before) * 100).toFixed(0);
    console.log(`✅  ${rel.split('/').pop()}`);
    console.log(`    ${(before/1024/1024).toFixed(1)} MB → ${(after/1024/1024).toFixed(1)} MB  (${saved}% smaller)\n`);
  }
  console.log('Done. Update src references from .png → .webp in the code.');
}

convert().catch(err => { console.error(err); process.exit(1); });
