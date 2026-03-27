/**
 * Marks the 6 newer projects (with images) as isPublished: true
 * Run with: SANITY_API_TOKEN=<token> npx tsx scripts/publish-projects.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'il220i1c',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const PUBLISHED_SLUGS = [
  'mohan-shenoi-residence',
  'jhaveri-zaveri-residence',
  'rahul-sanjana-residence',
  'usha-shenoi-residence',
  'nikhil-gupta-bungalow',
  'qudrati-greens-indore',
];

async function main() {
  console.log('Publishing projects with images...\n');

  for (const slug of PUBLISHED_SLUGS) {
    const doc = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{ _id, title }`,
      { slug }
    );

    if (!doc) {
      console.warn(`  ⚠ Not found: ${slug}`);
      continue;
    }

    await client.patch(doc._id).set({ isPublished: true }).commit();
    console.log(`  ✓ Published: ${doc.title}`);
  }

  console.log('\n✅ Done. These projects are now visible on the website.');
}

main().catch(err => { console.error(err); process.exit(1); });
