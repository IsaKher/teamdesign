/**
 * Add Maharaja Agrasen Palace to Sanity CMS
 * Run with: node scripts/add-maharaja-agrasen.mjs
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: 'il220i1c',
  dataset: 'production',
  token: 'skhZXdMjvgTxPrSsmhp7yriWG0w0BgI42mg6dQpoxgMzPBgYCoF1Z7d9OzlYP5nXo4q96cmpxAgQvNgFTcfvwKWVBVL0q1ZJ3uhBTUdnkW4hKg9RVK3e914sVJBYtmCyZnptKRqaHOejbKyXWvRcVTUsLHz11QWxA2vwTlJZRmUB8GKyxYkL',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const IMAGE_DIR = '/Users/isakher/Desktop/Website Team Design 2026 /Architecture- Buildings/Maharaja Agrasen Palace';

// Images in display order with descriptive captions
const IMAGES = [
  {
    file: 'DSC06529-HDR-scaled.jpg',
    caption: 'The grand forecourt and landscaped approach frame the three-storey façade, with its ornate brown lattice screens and Mughal-inspired arched detailing in cream render.',
  },
  {
    file: 'DSC_0195-scaled.jpg',
    caption: 'A colonnaded portico of pointed white arches opens onto lush palm-lined gardens, with red brick tile paving and glass balustrades lending a contemporary refinement to the traditional form.',
  },
  {
    file: '0L3A3143-scaled.jpg',
    caption: 'The arrival canopy at dusk — floodlit vaulted arches cast warm amber light across the brick-paved forecourt, creating a dramatic ceremonial threshold.',
  },
  {
    file: 'DSC06748-HDR-scaled.jpg',
    caption: 'An interior corridor clad in dark marble with white inlay leads past an arched niche set into an ochre accent wall, the recessed ceiling lights marking the procession toward the main hall.',
  },
  {
    file: 'DSC06889-scaled.jpg',
    caption: 'The double-height lobby features a sweeping spiral staircase with gold balustrade, a marble medallion floor with peacock motif, and arched timber doorways that echo the palace\'s classical vocabulary.',
  },
  {
    file: '0L3A3203-scaled.jpg',
    caption: 'A guest suite appointed with twin beds, warm cove lighting, and a bespoke timber headboard panel — the large draped window filters soft natural light across the neutral palette.',
  },
  {
    file: 'DSC06980-1-scaled.jpg',
    caption: 'Landscape terracing steps down from the building envelope, with sculpted planting beds and a paved walkway connecting the palace to the broader resort grounds.',
  },
];

async function uploadImage(filename) {
  const filepath = path.join(IMAGE_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.warn(`  ⚠ Not found: ${filename}`);
    return null;
  }
  const buffer = fs.readFileSync(filepath);
  const ext = path.extname(filename).toLowerCase().slice(1);
  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';

  try {
    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType: mimeType,
    });
    console.log(`  ✓ Uploaded: ${filename} → ${asset._id}`);
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.warn(`  ✗ Failed: ${filename}`, err.message);
    return null;
  }
}

function randomKey() {
  return Math.random().toString(36).slice(2, 12);
}

async function main() {
  console.log('── Uploading images ──');

  const uploaded = [];
  for (const img of IMAGES) {
    const ref = await uploadImage(img.file);
    uploaded.push({ ref, caption: img.caption });
  }

  const validUploads = uploaded.filter(u => u.ref !== null);
  console.log(`\n  ${validUploads.length}/${IMAGES.length} images uploaded.`);

  // Build content blocks
  const contentBlocks = [];

  // Opening paragraph
  contentBlocks.push({
    _type: 'paragraphBlock',
    _key: randomKey(),
    text: 'Maharaja Agrasen Palace is a contemporary interpretation of classical Indian architecture — where symmetry, materiality, and landscape come together to create a timeless destination in Lonavala. Commissioned by the Agrawal Global Foundation, the 1,50,000 sq ft resort and convention centre draws from Mughal archetypes to craft a built form that feels both rooted and refined.',
  });

  // First image: full-width facade
  if (validUploads[0]?.ref) {
    contentBlocks.push({
      _type: 'fullWidthImageBlock',
      _key: randomKey(),
      image: validUploads[0].ref,
      caption: validUploads[0].caption,
    });
  }

  // Pull quote
  contentBlocks.push({
    _type: 'pullQuoteBlock',
    _key: randomKey(),
    text: 'A dialogue between classical Indian form and contemporary sensibility — where every arch, screen, and courtyard participates in a larger spatial narrative.',
  });

  // Images 2 & 3: half-width pair (portico + arrival canopy)
  if (validUploads[1]?.ref && validUploads[2]?.ref) {
    contentBlocks.push({
      _type: 'halfWidthImagesBlock',
      _key: randomKey(),
      imageLeft: validUploads[1].ref,
      imageRight: validUploads[2].ref,
      captionLeft: validUploads[1].caption,
      captionRight: validUploads[2].caption,
    });
  } else if (validUploads[1]?.ref) {
    contentBlocks.push({
      _type: 'fullWidthImageBlock',
      _key: randomKey(),
      image: validUploads[1].ref,
      caption: validUploads[1].caption,
    });
  }

  // Second paragraph
  contentBlocks.push({
    _type: 'paragraphBlock',
    _key: randomKey(),
    text: 'The interiors unfold as a sequence of richly articulated spaces — from a marble-inlaid arrival corridor to the double-height lobby anchored by a spiral stair and a hand-laid peacock medallion at its centre. Each room and passage is designed to reinforce a sense of occasion, balancing ceremonial grandeur with the warmth expected of a boutique resort.',
  });

  // Images 4 & 5: half-width pair (corridor + lobby)
  if (validUploads[3]?.ref && validUploads[4]?.ref) {
    contentBlocks.push({
      _type: 'halfWidthImagesBlock',
      _key: randomKey(),
      imageLeft: validUploads[3].ref,
      imageRight: validUploads[4].ref,
      captionLeft: validUploads[3].caption,
      captionRight: validUploads[4].caption,
    });
  }

  // Image 6: guest room full-width
  if (validUploads[5]?.ref) {
    contentBlocks.push({
      _type: 'fullWidthImageBlock',
      _key: randomKey(),
      image: validUploads[5].ref,
      caption: validUploads[5].caption,
    });
  }

  // Image 7: landscape full-width
  if (validUploads[6]?.ref) {
    contentBlocks.push({
      _type: 'fullWidthImageBlock',
      _key: randomKey(),
      image: validUploads[6].ref,
      caption: validUploads[6].caption,
    });
  }

  // Build gallery array (all images with keys)
  const gallery = validUploads
    .slice(1)
    .filter(u => u.ref)
    .map(u => ({ ...u.ref, _key: randomKey() }));

  // Create the project document
  const doc = {
    _type: 'project',
    title: 'Maharaja Agrasen Palace',
    slug: { _type: 'slug', current: 'maharaja-agrasen-palace' },
    client: 'Agrawal Global Foundation',
    location: 'Lonavala, India',
    year: 2022,
    area: '1,50,000 sqft',
    projectType: 'Institutional',
    description: 'A contemporary interpretation of classical Indian architecture — where symmetry, materiality, and landscape come together to create a timeless resort and convention centre in Lonavala.',
    contentBlocks,
    isFeatured: true,
    isMarquee: false,
    orderRank: 10,
    ...(validUploads[0]?.ref ? { mainImage: validUploads[0].ref } : {}),
    ...(gallery.length > 0 ? { gallery } : {}),
  };

  console.log('\n── Creating Sanity document ──');
  try {
    const result = await client.create(doc);
    console.log(`  ✓ Created: ${result._id}`);
    console.log(`  ✓ View at: https://il220i1c.sanity.studio/structure/project;${result._id}`);
  } catch (err) {
    console.error('  ✗ Failed to create document:', err.message);
    throw err;
  }

  console.log('\n✅ Done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
