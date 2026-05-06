#!/usr/bin/env node
// Pre-build Sanity snapshot.
//
// Runs as part of `npm run build` (wired via the `prebuild` script in
// package.json). Fetches every Sanity dataset the site needs and writes
// the result to lib/sanity-snapshot.json.
//
// At runtime, lib/sanity.ts tries Sanity first; if a fetch fails or comes
// back empty, it falls back to the snapshot. So a Vercel deploy + a Sanity
// outage at the same time will still serve the last known-good content.
//
// IMPORTANT: this script is RESILIENT. If Sanity is unreachable when this
// runs, we DO NOT throw — we leave the existing snapshot file in place and
// log a warning. That way an outage during a deploy doesn't break the build;
// it just builds against slightly older content.

import { createClient } from '@sanity/client';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_PATH = resolve(__dirname, '..', 'lib', 'sanity-snapshot.json');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  console.warn('[snapshot] NEXT_PUBLIC_SANITY_PROJECT_ID not set — keeping existing snapshot.');
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const queries = {
  projects: `*[_type == "project" && isPublished != false] | order(orderRank asc) {
    "slug": slug.current,
    title, client, "type": projectType, location, year, area,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip
  }`,
  projectSlugs: `*[_type == "project"].slug.current`,
  navProjects: `*[_type == "project" && isPublished != false] | order(orderRank asc) {
    "slug": slug.current,
    title, "type": projectType, location,
    "mainImage": mainImage.asset->url,
    "mainImageLqip": mainImage.asset->metadata.lqip
  }`,
  // Full detail data for every project — used as fallback in getProjectBySlug
  // when the runtime Sanity fetch fails (quota exceeded, outage, etc.)
  projectDetails: `*[_type == "project" && isPublished != false] {
    "slug": slug.current,
    title, client, "type": projectType, location, year, area, description,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    "mainImageLqip": mainImage.asset->metadata.lqip,
    "gallery": gallery[]{ "url": asset->url, "alt": alt, "lqip": asset->metadata.lqip },
    "contentBlocks": contentBlocks[] {
      _type, text,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      "imageLqip": image.asset->metadata.lqip,
      caption,
      "imageLeftUrl": imageLeft.asset->url,
      "imageLeftAlt": imageLeft.alt,
      "imageLeftLqip": imageLeft.asset->metadata.lqip,
      captionLeft,
      "imageRightUrl": imageRight.asset->url,
      "imageRightAlt": imageRight.alt,
      "imageRightLqip": imageRight.asset->metadata.lqip,
      captionRight
    },
    "testimonial": testimonial->{ quote, "author": clientName, "title": clientTitle },
    "related": relatedProjects[]->{
      "slug": slug.current, title, "type": projectType, location,
      "image": mainImage.asset->url, "lqip": mainImage.asset->metadata.lqip
    }
  }`,
  featured: `*[_type == "project" && isPublished != false && isFeatured == true] | order(orderRank asc) [0...4] {
    "slug": slug.current,
    title, client, "type": projectType, location,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "tagline": shortDescription
  }`,
  settings: `*[_type == "siteSettings"][0] {
    phone, email, whatsapp, linkedinUrl, instagramUrl,
    yearsInPractice, projectCount, clientCount, sqftCompleted
  }`,
  testimonials: `*[_type == "testimonial"] | order(orderRank asc) {
    quote, "name": clientName, "title": clientTitle, "project": projectName
  }`,
  jobs: `*[_type == "job" && isOpen == true] | order(orderRank asc) {
    title, type, duration, brief, linkedinUrl
  }`,
  teamMembers: `*[_type == "teamMember"] | order(orderRank asc) {
    name, role, tier, bio, education, award, founding,
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt,
    "photoLqip": photo.asset->metadata.lqip,
    orderRank
  }`,
  journalPosts: `*[_type == "journalPost" && isPublished != false] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    publishedAt,
    category,
    excerpt,
    "coverImage": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    "coverImageLqip": coverImage.asset->metadata.lqip,
    readTime
  }`,
  journalPostSlugs: `*[_type == "journalPost" && isPublished != false].slug.current`,
};

async function main() {
  try {
    const [projects, projectSlugs, navProjects, projectDetailsArr, featured, settings, testimonials, jobs, teamMembers, journalPosts, journalPostSlugs] =
      await Promise.all(Object.values(queries).map((q) => client.fetch(q)));

    // Store project details as a slug-keyed map for O(1) lookup at runtime
    const projectDetails = Object.fromEntries(
      projectDetailsArr.map((p) => [p.slug, p])
    );

    const snapshot = {
      builtAt: new Date().toISOString(),
      projects,
      projectSlugs,
      navProjects,
      projectDetails,
      featured,
      settings,
      testimonials,
      jobs,
      teamMembers,
      journalPosts,
      journalPostSlugs,
    };

    writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2));

    const counts = `${projects.length} projects (${projectDetailsArr.length} with detail), ${testimonials.length} testimonials, ${teamMembers.length} team members, ${jobs.length} jobs, ${journalPosts.length} journal posts`;
    console.log(`[snapshot] ✓ ${counts} → lib/sanity-snapshot.json`);
  } catch (err) {
    const existing = existsSync(SNAPSHOT_PATH);
    if (existing) {
      const stat = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf-8'));
      console.warn(`[snapshot] ⚠ Sanity fetch failed (${err.message}). Keeping previous snapshot from ${stat.builtAt}.`);
    } else {
      console.warn(`[snapshot] ⚠ Sanity fetch failed and no previous snapshot exists: ${err.message}`);
      console.warn('[snapshot]   Build will proceed; runtime fetches will return empty until Sanity is reachable.');
      // Write an empty skeleton so the import in lib/sanity.ts succeeds
      writeFileSync(SNAPSHOT_PATH, JSON.stringify({
        builtAt: null,
        projects: [], projectSlugs: [], navProjects: [], projectDetails: {},
        featured: [], settings: null, testimonials: [], jobs: [], teamMembers: [],
        journalPosts: [], journalPostSlugs: [],
      }, null, 2));
    }
  }
}

main();
