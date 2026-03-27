/**
 * patch-team-tiers.ts
 * Run once to add the `tier` field to existing team member documents that were
 * created before the tier field was added to the schema.
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const TIER_MAP: Record<string, string> = {
  'Tasadduq Kher': 'principal',
  'Zainab (Xen)':  'featured',
  'Ali':           'core',
  'Mustafa':       'core',
  'Taher':         'core',
  'Sarrah':        'core',
  'Hamid':         'operations',
  'Vijay':         'operations',
};

const ORDER_MAP: Record<string, number> = {
  'Tasadduq Kher': 1,
  'Zainab (Xen)':  2,
  'Ali':           3,
  'Mustafa':       4,
  'Taher':         5,
  'Sarrah':        6,
  'Hamid':         7,
  'Vijay':         8,
};

async function patch() {
  const members: { _id: string; name: string; tier?: string }[] = await client.fetch(
    `*[_type == "teamMember"]{ _id, name, tier }`
  );

  for (const m of members) {
    const tier = TIER_MAP[m.name];
    const orderRank = ORDER_MAP[m.name];
    if (!tier) {
      console.log(`  ⚠️  Unknown member "${m.name}" — skipping`);
      continue;
    }
    if (m.tier === tier) {
      console.log(`  ⏭  "${m.name}" already has tier="${tier}"`);
      continue;
    }
    await client.patch(m._id).set({ tier, orderRank }).commit();
    console.log(`  ✅  Patched "${m.name}" → tier="${tier}", orderRank=${orderRank}`);
  }

  console.log('\nDone. All team members now have correct tier values.');
}

patch().catch(err => {
  console.error(err);
  process.exit(1);
});
