/**
 * Migration script: projectData.ts → Sanity
 *
 * Run with:
 *   SANITY_API_TOKEN=<token> npx tsx scripts/migrate-to-sanity.ts
 *
 * - Local images (/projects/...) are uploaded to Sanity CDN
 * - WordPress image URLs are dead — image fields left empty for those projects
 * - Testimonials are created first, then projects reference them
 * - Related project links are skipped (set manually in Studio later)
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { PROJECT_DATA } from '../lib/projectData';

// ─── Client ──────────────────────────────────────────────────────────────────

const client = createClient({
  projectId: 'il220i1c',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PUBLIC_DIR = path.join(process.cwd(), 'public');

/** Returns true if the image is a local path (not a WordPress/external URL) */
function isLocalImage(src: string): boolean {
  return src.startsWith('/projects/') || src.startsWith('/team/');
}

/** Upload a local image to Sanity and return an image reference object */
async function uploadImage(src: string): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } } | null> {
  const absolutePath = path.join(PUBLIC_DIR, src);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`  ⚠ Image not found, skipping: ${src}`);
    return null;
  }

  const ext = path.extname(src).toLowerCase().slice(1);
  const mimeType = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/jpeg';
  const buffer = fs.readFileSync(absolutePath);

  try {
    const asset = await client.assets.upload('image', buffer, {
      filename: path.basename(src),
      contentType: mimeType,
    });
    console.log(`  ✓ Uploaded: ${src}`);
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.warn(`  ✗ Upload failed: ${src}`, err);
    return null;
  }
}

/** Resolve an image src: upload if local, return null if external (dead) */
async function resolveImage(src: string) {
  if (!src) return null;
  if (isLocalImage(src)) return uploadImage(src);
  // WordPress URLs are dead — skip
  return null;
}

// ─── Testimonials ────────────────────────────────────────────────────────────

/** Map from project slug → Sanity testimonial document ID */
const testimonialIdBySlug: Record<string, string> = {};

async function migrateTestimonials() {
  console.log('\n── Migrating testimonials ──');
  let order = 1;

  for (const [slug, project] of Object.entries(PROJECT_DATA)) {
    if (!project.testimonial) continue;
    const { quote, author, title } = project.testimonial;

    const doc = {
      _type: 'testimonial',
      quote,
      clientName: author,
      clientTitle: title,
      projectName: project.title,
      orderRank: order++,
      isMarquee: false,
    };

    const result = await client.create(doc);
    testimonialIdBySlug[slug] = result._id;
    console.log(`  ✓ Testimonial created for: ${project.title}`);
  }
}

// ─── Content Blocks ──────────────────────────────────────────────────────────

async function migrateContentBlocks(blocks: typeof PROJECT_DATA[string]['contentBlocks']) {
  if (!blocks || blocks.length === 0) return [];

  const result = [];

  for (const block of blocks) {
    if (block.type === 'paragraph') {
      result.push({ _type: 'paragraphBlock', _key: crypto.randomUUID(), text: block.text });

    } else if (block.type === 'pullQuote') {
      result.push({ _type: 'pullQuoteBlock', _key: crypto.randomUUID(), text: block.text });

    } else if (block.type === 'fullWidthImage') {
      const image = await resolveImage(block.src);
      result.push({
        _type: 'fullWidthImageBlock',
        _key: crypto.randomUUID(),
        ...(image ? { image } : {}),
        caption: block.caption ?? '',
      });

    } else if (block.type === 'halfWidthImages') {
      const [leftSrc, rightSrc] = block.images;
      const [leftCaption, rightCaption] = block.captions ?? ['', ''];
      const imageLeft = await resolveImage(leftSrc);
      const imageRight = await resolveImage(rightSrc);
      result.push({
        _type: 'halfWidthImagesBlock',
        _key: crypto.randomUUID(),
        ...(imageLeft  ? { imageLeft }  : {}),
        ...(imageRight ? { imageRight } : {}),
        captionLeft:  leftCaption  ?? '',
        captionRight: rightCaption ?? '',
      });
    }
  }

  return result;
}

// ─── Projects ────────────────────────────────────────────────────────────────

// Newer projects with local images (in roughly display order)
const FEATURED_SLUGS = [
  'mohan-shenoi-residence',
  'jhaveri-zaveri-residence',
  'rahul-sanjana-residence',
  'usha-shenoi-residence',
  'nikhil-gupta-bungalow',
  'qudrati-greens-indore',
];

async function migrateProjects() {
  console.log('\n── Migrating projects ──');
  const slugs = Object.keys(PROJECT_DATA);

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const project = PROJECT_DATA[slug];
    console.log(`\n[${i + 1}/${slugs.length}] ${project.title}`);

    const mainImage = await resolveImage(project.mainImage);

    const galleryImages = [];
    for (const src of project.gallery) {
      const img = await resolveImage(src);
      if (img) galleryImages.push({ ...img, _key: crypto.randomUUID() });
    }

    const contentBlocks = await migrateContentBlocks(project.contentBlocks);

    const testimonialRef = testimonialIdBySlug[slug]
      ? { _type: 'reference' as const, _ref: testimonialIdBySlug[slug] }
      : undefined;

    const doc = {
      _type: 'project' as const,
      title: project.title,
      slug: { _type: 'slug', current: slug },
      client: project.client,
      location: project.location,
      year: project.year,
      area: project.area,
      projectType: project.type,
      description: project.description,
      contentBlocks,
      isFeatured: FEATURED_SLUGS.includes(slug),
      isMarquee: false,
      orderRank: i + 1,
      ...(mainImage ? { mainImage } : {}),
      ...(galleryImages.length > 0 ? { gallery: galleryImages } : {}),
      ...(testimonialRef ? { testimonial: testimonialRef } : {}),
    };

    await client.create(doc);
    console.log(`  ✓ Created: ${project.title}`);
  }
}

// ─── Team Members ────────────────────────────────────────────────────────────

const TEAM = [
  {
    name: 'Tasadduq Kher',
    role: 'Founder & Principal Architect',
    education: 'B.Arch, Rachana Sansad Academy of Architecture, Mumbai',
    bio: 'Tasadduq founded the practice in 1996, beginning his career under Architect P K Das as mentor. A former visiting professor at the Academy of Architecture, Mumbai for nearly a decade, he believes deeply that the quality of our surroundings affects the quality of our lives. His expertise spans acknowledged design talent, mentoring the design team, and demonstrated success across 25+ years of practice.',
    photo: '/tasadduq-kher.png',
    isPrincipal: true,
    founding: 1996,
    orderRank: 1,
  },
  {
    name: 'Zainab (Xen)',
    role: 'Partner & Head of Design',
    education: 'B.Arch with Honours, Academy of Architecture, Mumbai (2004)',
    bio: "Zainab co-drives the design direction of the practice alongside Tasadduq. Registered with the Council of Architecture, New Delhi, she was recognised by Architects & Interiors India magazine in 2016 as one of India's top 50 architects under the age of 35. Her intellectually rigorous approach to the analysis and interpretation of a client brief informs every project she leads.",
    photo: '/team/zainab.jpg',
    isPrincipal: false,
    orderRank: 2,
  },
  {
    name: 'Ali',
    role: 'Project Manager / Project Head',
    bio: 'With over 10 years in construction and project management, Ali focuses on technical details, analyses, budgets, specifications, measurements, site supervision, and final acceptance.',
    photo: '/team/ali.jpg',
    isPrincipal: false,
    orderRank: 3,
  },
  {
    name: 'Mustafa',
    role: 'Construction Partner / Project Head',
    bio: "Over 15 years in interior fit-out works, Mustafa also runs his own construction company. He believes every finished project — big or small — is the product of a team, and that the right partnerships and respect for everyone's role are crucial in achieving a great result.",
    photo: '/team/mustafa.jpg',
    isPrincipal: false,
    orderRank: 4,
  },
  {
    name: 'Taher',
    role: 'Junior Architect',
    bio: "Associated with Team Design since 2016, Taher's thesis on rehabilitation centres for widows introduced a social dimension to his practice that has never left.",
    photo: '/team/taher.jpg',
    isPrincipal: false,
    orderRank: 5,
  },
  {
    name: 'Sarrah',
    role: 'Design & Operations',
    bio: 'Sarrah brings a meticulous and organised approach to both design coordination and operational flow within the studio.',
    photo: '/team/sarrah.jpg',
    isPrincipal: false,
    orderRank: 6,
  },
];

async function migrateTeam() {
  console.log('\n── Migrating team members ──');
  for (const member of TEAM) {
    const photo = await resolveImage(member.photo);
    const doc = {
      _type: 'teamMember' as const,
      name: member.name,
      role: member.role,
      bio: member.bio,
      isPrincipal: member.isPrincipal,
      orderRank: member.orderRank,
      ...(member.education ? { education: member.education } : {}),
      ...(member.founding ? { founding: member.founding } : {}),
      ...(photo ? { photo } : {}),
    };
    await client.create(doc);
    console.log(`  ✓ ${member.name}`);
  }
}

// ─── Run ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN environment variable is required.');
    process.exit(1);
  }

  console.log('Starting migration to Sanity...');
  console.log(`Project: il220i1c | Dataset: production`);
  console.log(`Total projects to migrate: ${Object.keys(PROJECT_DATA).length}`);

  await migrateTestimonials();
  await migrateProjects();
  await migrateTeam();

  console.log('\n✅ Migration complete!');
  console.log('Check your Studio at http://localhost:3000/studio-cms');
}

main().catch((err) => {
  console.error('\n✗ Migration failed:', err);
  process.exit(1);
});
