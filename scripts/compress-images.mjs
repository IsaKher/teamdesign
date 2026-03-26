/**
 * Compress project images to web-appropriate sizes.
 * Resizes to max 2400px on longest side, JPEG quality 82.
 * Run once: node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'fs';
import { join, extname, basename } from 'path';

const PROJECTS_DIR = new URL('../public/projects', import.meta.url).pathname;
const MAX_PX = 2400;
const JPEG_Q = 82;
const PNG_Q = 85;
const MIN_SAVE_KB = 200; // only replace if we save at least this much

async function compressFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  const tmpPath = filePath + '.tmp';
  const originalSize = statSync(filePath).size;

  try {
    const image = sharp(filePath).rotate(); // auto-rotate from EXIF

    const meta = await image.metadata();
    const needsResize = (meta.width ?? 0) > MAX_PX || (meta.height ?? 0) > MAX_PX;

    let pipeline = needsResize
      ? image.resize(MAX_PX, MAX_PX, { fit: 'inside', withoutEnlargement: true })
      : image;

    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: JPEG_Q, mozjpeg: true }).toFile(tmpPath);
    } else if (ext === '.png') {
      await pipeline.png({ quality: PNG_Q, compressionLevel: 9 }).toFile(tmpPath);
    } else {
      return;
    }

    const newSize = statSync(tmpPath).size;
    const savedKB = Math.round((originalSize - newSize) / 1024);

    if (savedKB >= MIN_SAVE_KB) {
      renameSync(tmpPath, filePath);
      console.log(`✓ ${basename(filePath)} ${(originalSize/1024/1024).toFixed(1)}MB → ${(newSize/1024/1024).toFixed(1)}MB (saved ${savedKB}KB)`);
    } else {
      renameSync(tmpPath, filePath); // still use optimised version even if small gain
      console.log(`· ${basename(filePath)} minimal gain (${savedKB}KB), kept`);
    }
  } catch (err) {
    console.error(`✗ ${basename(filePath)}: ${err.message}`);
    try { renameSync(tmpPath, filePath); } catch {}
  }
}

const projects = readdirSync(PROJECTS_DIR).filter(
  d => statSync(join(PROJECTS_DIR, d)).isDirectory()
);

for (const project of projects) {
  const dir = join(PROJECTS_DIR, project);
  const files = readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));
  if (files.length === 0) continue;
  console.log(`\n── ${project} (${files.length} files)`);
  for (const file of files) {
    await compressFile(join(dir, file));
  }
}

console.log('\n✅ Done');
