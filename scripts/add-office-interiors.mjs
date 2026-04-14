/**
 * Add Luthra Group + Unilazer Ventures to Sanity CMS
 * Run with: node scripts/add-office-interiors.mjs
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: 'il220i1c',
  dataset: 'production',
  token: 'skhZXdMjvgTxPrSsmhp7yriWG0w0BgI42mg6dQpoxgMzPBgYCoF1Z7d9OzlYP5nXo4q96cmpxAgQvNgFTcfvwKWVBVL0q1ZJ3uhBTUdnkW4hKg9RVK3e914sVJBYtmCyZnptKRqaHOejbKyXWvRcVTUsLHz11QWxA2vwTlJZRmUB8GKyxYkL',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const BASE = '/Users/isakher/Desktop/Website Team Design 2026 /Interiors- Offices';

function key() { return Math.random().toString(36).slice(2, 12); }

async function uploadImage(filepath) {
  if (!fs.existsSync(filepath)) { console.warn(`  ⚠ Not found: ${filepath}`); return null; }
  const buffer = fs.readFileSync(filepath);
  const filename = path.basename(filepath);
  try {
    const asset = await client.assets.upload('image', buffer, { filename, contentType: 'image/jpeg' });
    console.log(`  ✓ ${filename} → ${asset._id}`);
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.warn(`  ✗ Failed: ${filename}`, err.message);
    return null;
  }
}

// ─── Luthra Group ─────────────────────────────────────────────────────────────

async function addLuthra() {
  console.log('\n── Luthra Group ──');

  const dir = path.join(BASE, 'Luthra Group');
  const images = [
    { file: 'NSP_5159_3.jpg', caption: 'The reception lobby features an organic wavy cove-light ceiling, a curved macassar ebony reception desk set on veined marble, and a glass-partitioned boardroom visible beyond.' },
    { file: 'NSP_5305.jpg',   caption: 'The boardroom\'s centrepiece is a glass-topped table resting on a sculpted natural driftwood base, surrounded by cane-back chairs and framed by full-height glazing with city views.' },
    { file: 'NSP_5333.jpg',   caption: 'An alternate angle reveals the curved glass partition system that encloses the conference space, the driftwood table base casting texture against the Mumbai skyline.' },
    { file: 'NSP_5477.jpg',   caption: 'The pantry pairs louvred timber cabinetry with a live-edge wooden bar counter and bar stools — a material counterpoint to the formal board spaces.' },
  ];

  const uploaded = [];
  for (const img of images) {
    const ref = await uploadImage(path.join(dir, img.file));
    uploaded.push({ ref, caption: img.caption });
  }

  const valid = uploaded.filter(u => u.ref);

  const contentBlocks = [
    {
      _type: 'paragraphBlock', _key: key(),
      text: 'The Luthra Group headquarters in Mumbai is designed around two governing ideas: the fluidity of leadership and the weight of craft. At 2,500 sqft, the office distils these principles into a compact sequence — a reception that curves to receive, a boardroom that commands, and a pantry that rewards.',
    },
    ...(valid[0]?.ref ? [{ _type: 'fullWidthImageBlock', _key: key(), image: valid[0].ref, caption: valid[0].caption }] : []),
    {
      _type: 'pullQuoteBlock', _key: key(),
      text: 'The driftwood table at the heart of the boardroom is both sculpture and statement — a single piece of nature holding the weight of every decision made across it.',
    },
    ...(valid[1]?.ref && valid[2]?.ref ? [{
      _type: 'halfWidthImagesBlock', _key: key(),
      imageLeft: valid[1].ref, imageRight: valid[2].ref,
      captionLeft: valid[1].caption, captionRight: valid[2].caption,
    }] : []),
    ...(valid[3]?.ref ? [{ _type: 'fullWidthImageBlock', _key: key(), image: valid[3].ref, caption: valid[3].caption }] : []),
  ];

  const gallery = valid.slice(1).map(u => ({ ...u.ref, _key: key() }));

  const doc = {
    _type: 'project',
    title: 'Luthra Group',
    slug: { _type: 'slug', current: 'luthra-group' },
    client: 'Luthra Group',
    location: 'Mumbai, India',
    year: 2017,
    area: '2,500 sqft',
    projectType: 'Commercial Interiors',
    description: 'A 2,500 sqft corporate headquarters in Mumbai that pairs an organic wavy reception ceiling with a sculptural driftwood boardroom table — craft and command in one compact floor plate.',
    contentBlocks,
    isFeatured: true,
    isPublished: true,
    isMarquee: false,
    orderRank: 11,
    ...(valid[0]?.ref ? { mainImage: valid[0].ref } : {}),
    ...(gallery.length > 0 ? { gallery } : {}),
  };

  const result = await client.create(doc);
  console.log(`  ✓ Created: ${result._id}`);
  return result._id;
}

// ─── Unilazer Ventures ────────────────────────────────────────────────────────

async function addUnilazer() {
  console.log('\n── Unilazer Ventures Private Limited ──');

  const dir = path.join(BASE, 'Unilazer Ventures Private Limited');
  const images = [
    { file: 'DSC_4873.jpg', caption: 'A corner director\'s cabin with warm amber cove ceiling, floor-to-ceiling glazing on two sides overlooking the garden canopy, a circular meeting table, and a curated bookshelf lined with art objects.' },
    { file: 'DSC_4900.jpg', caption: 'The open-plan workstation floor is organised beneath a glass-box meeting room that floats above the desk clusters, with a coloured-panel reception counter anchoring the central core.' },
    { file: 'DSC_4906.jpg', caption: 'A corridor of timber-clad private cabins lines the perimeter, each with glass-front partitions and individual workstations finished in warm carpet tiles.' },
    { file: 'DSC_4955.jpg', caption: 'The formal boardroom features a backlit white glass table, mesh executive chairs, a large artwork wall, and warm cove-lit ceiling with flanking acoustic fabric panels.' },
  ];

  const uploaded = [];
  for (const img of images) {
    const ref = await uploadImage(path.join(dir, img.file));
    uploaded.push({ ref, caption: img.caption });
  }

  const valid = uploaded.filter(u => u.ref);

  const contentBlocks = [
    {
      _type: 'paragraphBlock', _key: key(),
      text: 'The Unilazer Ventures office in Mumbai is designed for a venture capital firm that prizes both openness and discretion. The floor plate balances a transparent, light-filled open workspace with a sequence of private cabins, a formal boardroom, and a director\'s corner that draws the outside garden in through full-height glass.',
    },
    ...(valid[0]?.ref ? [{ _type: 'fullWidthImageBlock', _key: key(), image: valid[0].ref, caption: valid[0].caption }] : []),
    {
      _type: 'pullQuoteBlock', _key: key(),
      text: 'Light, transparency, and the green canopy beyond — a workspace that reflects the firm\'s outward-looking, ideas-first culture.',
    },
    ...(valid[1]?.ref && valid[2]?.ref ? [{
      _type: 'halfWidthImagesBlock', _key: key(),
      imageLeft: valid[1].ref, imageRight: valid[2].ref,
      captionLeft: valid[1].caption, captionRight: valid[2].caption,
    }] : []),
    ...(valid[3]?.ref ? [{ _type: 'fullWidthImageBlock', _key: key(), image: valid[3].ref, caption: valid[3].caption }] : []),
  ];

  const gallery = valid.slice(1).map(u => ({ ...u.ref, _key: key() }));

  const doc = {
    _type: 'project',
    title: 'Unilazer Ventures',
    slug: { _type: 'slug', current: 'unilazer-ventures' },
    client: 'Unilazer Ventures Private Limited',
    location: 'Mumbai, India',
    year: 2017,
    projectType: 'Commercial Interiors',
    description: 'A venture capital office in Mumbai that balances an open, light-filled workspace with a sequence of private cabins and a garden-facing director\'s corner — transparency and discretion in equal measure.',
    contentBlocks,
    isFeatured: true,
    isPublished: true,
    isMarquee: false,
    orderRank: 12,
    ...(valid[0]?.ref ? { mainImage: valid[0].ref } : {}),
    ...(gallery.length > 0 ? { gallery } : {}),
  };

  const result = await client.create(doc);
  console.log(`  ✓ Created: ${result._id}`);
  return result._id;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await addLuthra();
  await addUnilazer();
  console.log('\n✅ Both projects added.');
}

main().catch(err => { console.error(err); process.exit(1); });
