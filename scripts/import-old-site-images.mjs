/**
 * import-old-site-images.mjs
 *
 * Downloads images from teamdesign.in, uploads them to Sanity,
 * and patches each project's mainImage + gallery fields.
 *
 * Usage:
 *   SANITY_TOKEN=<your-token> node scripts/import-old-site-images.mjs
 *
 * Get a token at: https://www.sanity.io/manage/project/il220i1c/api
 * → "Tokens" → "Add API Token" → Editor role
 */

import { createClient } from 'next-sanity';
import { createReadStream, createWriteStream, mkdirSync, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import { join, basename } from 'path';
import { tmpdir } from 'os';
import { fetch } from 'undici';

const PROJECT_ID = 'il220i1c';
const DATASET = 'production';
const TOKEN = process.env.SANITY_TOKEN;

if (!TOKEN) {
  console.error('❌  SANITY_TOKEN not set. Get one at https://www.sanity.io/manage/project/il220i1c/api');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: TOKEN,
});

// ─── Image map ────────────────────────────────────────────────────────────────
// First URL in each array becomes mainImage; rest become gallery.

const PROJECTS = [
  {
    _id: 'dW7bkxuW7lwltD3OAuvTED',
    title: 'Wedding Destination',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/w-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/w-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/w-8-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/w-10-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvTtJ',
    title: 'Temple Building — Goddess Kali',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_01-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_03-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_04-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvU97',
    title: 'Service Industry Education Campus',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-5-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-6-1.jpg',
    ],
  },
  {
    _id: '2Q3Hkst6W23iaT5J8CBdDy',
    title: 'Mist View Bungalows',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-7-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-10-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-6-1.jpg',
    ],
  },
  {
    _id: '2Q3Hkst6W23iaT5J8CBdV4',
    title: 'MBA Hostel Towers — ITM',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/MBA-Hostel-Building-ITM-Navi-Mumbai-India-5-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/HOSTEL-BUILDING-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/HOSTEL-BUILDING-3-1.jpg',
    ],
  },
  {
    _id: '9td5z7HwDgMNxTZ8eabpDx',
    title: 'Mariwala Estate Annexe',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-6-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/5-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/1-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvVyv',
    title: 'Luxurious 5BHK Villa',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Luxurious-5BHK-Villa-Mr-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Luxuerious-5BHK-Villa-Mr-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Luxuriewous-5BHK-Villa-Mr-1.jpg',
    ],
  },
  {
    _id: '2Q3Hkst6W23iaT5J8CBdbu',
    title: 'J&K Bank Branch Building',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-4-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvWBZ',
    title: 'College Campus Extension — ITM',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-2-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvWOD',
    title: 'Guest House — NRB Bearings',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-3-1.jpg',
    ],
  },
  {
    _id: '9td5z7HwDgMNxTZ8eabphX',
    title: 'Gokul Cultural Centre',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_01-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_021-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvWkL',
    title: 'Glass Kitchen',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-5-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-3-copy-1.jpg',
    ],
  },
  {
    _id: '2Q3Hkst6W23iaT5J8CBdik',
    title: 'College for Engineering & Management',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-OF-ENG-_-MANAGEMENT-5.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/College-of-Engineerin-_-Management-Nagpur-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/College-of-Engineerin-_-Management-Nagp-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/College-of-Engineerin-_-Management-Nagp-3-1.jpg',
    ],
  },
  {
    _id: '9td5z7HwDgMNxTZ8eabpyR',
    title: 'Bungalow in Ahmedabad',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-4.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-6.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-5.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvWwz',
    title: 'Bhandari House',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/11/Bhandari-House.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/11/REVISED-CAM-3-.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/11/REVISED-CAM-1-.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/11/LAYOUT.jpg',
    ],
  },
  {
    _id: '2Q3Hkst6W23iaT5J8CBdui',
    title: 'Building for Precision Metals — Venus Wires',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-9-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-3-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvX9d',
    title: "Women's Bank Branch — J&K Bank",
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-4-1.jpg',
    ],
  },
  {
    _id: '9td5z7HwDgMNxTZ8eabqS1',
    title: 'Show Flat',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/DSC_5975-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/DSC_5945-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/DSC_6006-1.jpg',
    ],
  },
  {
    _id: '2Q3Hkst6W23iaT5J8CBeBo',
    title: 'Office for Unilazer Ventures',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-10-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-8-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-5-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvXSb',
    title: 'National Business Centre — J&K Bank',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-20-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-12-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-9-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-23-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvXfF',
    title: 'High Networth Bank Branch',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-5-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-10-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-7-1.jpg',
    ],
  },
  {
    _id: '9td5z7HwDgMNxTZ8eabqzp',
    title: 'HDFC Bank Corporate Office',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/NSP_9833-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/NSP_0096-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/NSP_0010-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/NSP_9972-1.jpg',
    ],
  },
  {
    _id: '9td5z7HwDgMNxTZ8eabrGj',
    title: 'Garden Glory Penthouse',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-7-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-5-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-10-1.jpg',
    ],
  },
  {
    _id: '2Q3Hkst6W23iaT5J8CBePU',
    title: 'Executive Airport Lounge — J&K Bank',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-6-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-5-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvXrt',
    title: 'Exclusive Villa',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-6-1.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvY4X',
    title: 'Electronic Bank Lobby — J&K Bank',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-5-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-4-1.jpg',
    ],
  },
  {
    _id: '2Q3Hkst6W23iaT5J8CBeWK',
    title: 'Contemporary Modern Home',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-5.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-7.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-8.jpg',
    ],
  },
  {
    _id: 'dW7bkxuW7lwltD3OAuvYHB',
    title: 'Classic Modern Home',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-6-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-8-1.jpg',
    ],
  },
  {
    _id: '2Q3Hkst6W23iaT5J8CBedA',
    title: 'Cinemarc Cinema Theatre',
    images: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-5-1.jpg',
    ],
  },
];

// Team members: Sanity _id → old site photo URL
// Run: curl -s "https://il220i1c.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=='teamMember']{_id,name}" to verify IDs
const TEAM_MEMBERS = [
  { name: 'Tasadduq Kher', photoUrl: 'https://teamdesign.in/wp-content/uploads/2018/11/86.jpg' },
  { name: 'Zainab', photoUrl: 'https://teamdesign.in/wp-content/uploads/2018/07/tt2.jpg' },
  { name: 'Ali', photoUrl: 'https://teamdesign.in/wp-content/uploads/2018/07/tt6.jpg' },
  { name: 'Mustafa', photoUrl: 'https://teamdesign.in/wp-content/uploads/2018/07/tt5.jpg' },
  { name: 'Taher', photoUrl: 'https://teamdesign.in/wp-content/uploads/2018/07/tt9.jpg' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DOWNLOAD_DIR = join(tmpdir(), 'td-import');
if (!existsSync(DOWNLOAD_DIR)) mkdirSync(DOWNLOAD_DIR, { recursive: true });

async function downloadImage(url) {
  const filename = basename(new URL(url).pathname);
  const localPath = join(DOWNLOAD_DIR, filename);
  if (existsSync(localPath)) return localPath; // cache
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  await pipeline(res.body, createWriteStream(localPath));
  return localPath;
}

async function uploadToSanity(localPath, filename) {
  const stream = createReadStream(localPath);
  const asset = await client.assets.upload('image', stream, {
    filename,
    contentType: 'image/jpeg',
  });
  return asset._id; // e.g. "image-abc123-1200x800-jpg"
}

function makeImageRef(assetId) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function importProjects() {
  console.log(`\n📦 Importing images for ${PROJECTS.length} projects...\n`);

  for (const project of PROJECTS) {
    console.log(`\n▶ ${project.title}`);
    const assetIds = [];

    for (const url of project.images) {
      try {
        process.stdout.write(`  ↓ ${basename(new URL(url).pathname)} ... `);
        const localPath = await downloadImage(url);
        const filename = basename(localPath);
        const assetId = await uploadToSanity(localPath, filename);
        assetIds.push(assetId);
        console.log(`✓ ${assetId}`);
      } catch (err) {
        console.log(`✗ ${err.message}`);
      }
    }

    if (assetIds.length === 0) {
      console.log('  ⚠  No images uploaded, skipping patch');
      continue;
    }

    const [mainAssetId, ...galleryAssetIds] = assetIds;
    const patch = client.patch(project._id).set({
      mainImage: makeImageRef(mainAssetId),
      gallery: galleryAssetIds.map((id) => ({
        ...makeImageRef(id),
        _key: id.replace('image-', '').slice(0, 12),
      })),
    });
    await patch.commit();
    console.log(`  ✅ Patched Sanity doc (main + ${galleryAssetIds.length} gallery)`);
  }
}

async function importTeamPhotos() {
  console.log(`\n👥 Importing team member photos...\n`);

  // Fetch all team members to get their _ids
  const members = await client.fetch(
    `*[_type == "teamMember"] { _id, name }`,
  );

  for (const mapping of TEAM_MEMBERS) {
    const member = members.find(
      (m) => m.name.toLowerCase().includes(mapping.name.toLowerCase()),
    );
    if (!member) {
      console.log(`  ⚠  Could not find Sanity doc for "${mapping.name}"`);
      continue;
    }

    console.log(`▶ ${member.name} (${member._id})`);
    try {
      process.stdout.write(`  ↓ ${basename(new URL(mapping.photoUrl).pathname)} ... `);
      const localPath = await downloadImage(mapping.photoUrl);
      const filename = basename(localPath);
      const assetId = await uploadToSanity(localPath, filename);
      console.log(`✓ ${assetId}`);

      await client.patch(member._id).set({ photo: makeImageRef(assetId) }).commit();
      console.log(`  ✅ Patched photo`);
    } catch (err) {
      console.log(`  ✗ ${err.message}`);
    }
  }
}

async function main() {
  await importProjects();
  await importTeamPhotos();
  console.log('\n🎉 Done! Refresh Sanity Studio to confirm.\n');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
