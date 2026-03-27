/**
 * seed-site-settings.ts
 * Run once: creates or patches the siteSettings singleton document in Sanity.
 * Safe to re-run — upserts by document ID.
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

async function seed() {
  // Use a fixed document ID so there's always exactly one siteSettings doc.
  const DOC_ID = 'siteSettings-singleton';

  const existing = await client.fetch(`*[_id == $id][0]`, { id: DOC_ID });

  const data = {
    _type: 'siteSettings' as const,
    firmName: 'Team Design Architects',
    tagline: 'Architecture & Interior Design · Mumbai',
    phone: '+91 98765 43210',
    email: 'studio@teamdesign.in',
    whatsapp: '919876543210',
    linkedinUrl: 'https://www.linkedin.com/company/teamdesign',
    instagramUrl: 'https://www.instagram.com/teamdesign2004/',
    yearsInPractice: '25+',
    projectCount: '300+',
    clientCount: '500+',
    sqftCompleted: '20L+ sq ft',
  };

  if (existing) {
    await client.patch(DOC_ID).set(data).commit();
    console.log('✅  Patched existing siteSettings document.');
  } else {
    await client.create({ _id: DOC_ID, ...data });
    console.log('✅  Created siteSettings document.');
  }

  console.log('\nDone. Edit contact info & stats from Sanity Studio → Site Settings.');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
