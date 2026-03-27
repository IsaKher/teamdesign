/**
 * seed-team-members.ts
 * Run once: npx ts-node --project tsconfig.scripts.json scripts/seed-team-members.ts
 *
 * Creates all team member documents in Sanity from the current hardcoded data.
 * Safe to re-run — checks for existing documents by name before creating.
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

const TEAM_MEMBERS = [
  {
    name: 'Tasadduq Kher',
    role: 'Founder & Principal Architect',
    tier: 'principal',
    bio: 'Tasadduq founded the practice in 1996, beginning his career under Architect P K Das as mentor. A former visiting professor at the Academy of Architecture, Mumbai for nearly a decade, he believes deeply that the quality of our surroundings affects the quality of our lives. A traveler, book lover, and motorcycle enthusiast, his personal philosophy is simple: "There is one life to live and one must live it in every aspect, leaving no regrets." His expertise spans acknowledged design talent, mentoring the design team, and demonstrated success across 25+ years of practice.',
    education: 'B.Arch, Rachana Sansad Academy of Architecture, Mumbai',
    founding: 1996,
    orderRank: 1,
  },
  {
    name: 'Zainab (Xen)',
    role: 'Partner & Head of Design',
    tier: 'featured',
    bio: "Zainab co-drives the design direction of the practice alongside Tasadduq. Registered with the Council of Architecture, New Delhi, she was recognised by Architects & Interiors India magazine in 2016 as one of India's top 50 architects under the age of 35 — an award presented by Hafeez Contractor at the iGEN Design Forum. Her intellectually rigorous approach to the analysis and interpretation of a client brief informs every project she leads.",
    education: 'B.Arch with Honours, Academy of Architecture, Mumbai (2004)',
    award: 'Top 50 Architects Under 35 — Architects & Interiors India, 2016',
    orderRank: 2,
  },
  {
    name: 'Ali',
    role: 'Project Manager / Project Head',
    tier: 'core',
    bio: 'With over 10 years in construction and project management, Ali focuses on technical details, analyses, budgets, specifications, measurements, site supervision, and final acceptance. His keen eye for detail, site coordination, and troubleshooting skills keep complex projects running on time.',
    orderRank: 3,
  },
  {
    name: 'Mustafa',
    role: 'Construction Partner / Project Head',
    tier: 'core',
    bio: "Over 15 years in interior fit-out works, Mustafa also runs his own construction company. He believes every finished project — big or small — is the product of a team, and that the right partnerships and respect for everyone's role are crucial in achieving a great result.",
    orderRank: 4,
  },
  {
    name: 'Taher',
    role: 'Junior Architect',
    tier: 'core',
    bio: "Associated with Team Design since 2016, Taher's thesis on rehabilitation centres for widows introduced a social dimension to his practice that has never left. He approaches design as a tool for dignity — spaces that restore as much as they shelter.",
    orderRank: 5,
  },
  {
    name: 'Sarrah',
    role: 'Design & Operations',
    tier: 'core',
    bio: 'Sarrah brings a meticulous and organised approach to both design coordination and operational flow within the studio. Her ability to balance creative demands with practical execution makes her an integral part of the core management team.',
    orderRank: 6,
  },
  {
    name: 'Hamid',
    role: 'Head of Transportation',
    tier: 'operations',
    orderRank: 7,
  },
  {
    name: 'Vijay',
    role: 'Head of Day-to-Day Management',
    tier: 'operations',
    orderRank: 8,
  },
];

async function seed() {
  console.log('Checking for existing team members in Sanity…\n');

  const existing: { name: string }[] = await client.fetch(
    `*[_type == "teamMember"]{ name }`
  );
  const existingNames = new Set(existing.map(m => m.name));

  for (const member of TEAM_MEMBERS) {
    if (existingNames.has(member.name)) {
      console.log(`  ⏭  Skipping "${member.name}" — already exists`);
      continue;
    }

    const doc = {
      _type: 'teamMember' as const,
      name: member.name,
      role: member.role ?? '',
      tier: member.tier,
      bio: (member as any).bio ?? null,
      education: (member as any).education ?? null,
      award: (member as any).award ?? null,
      founding: (member as any).founding ?? null,
      orderRank: member.orderRank,
    };

    await client.create(doc);
    console.log(`  ✅  Created "${member.name}" (${member.tier})`);
  }

  console.log('\nDone. All team members are now in Sanity.');
  console.log('You can now upload photos for each member in Sanity Studio → Team Members.');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
