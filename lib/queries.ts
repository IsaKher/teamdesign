import { client } from './sanity';

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getAllProjects() {
  return client.fetch(`
    *[_type == "project"] | order(orderRank) {
      _id, title, slug, client, year, area, projectType,
      shortDescription, isFeatured, isMarquee,
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt
    }
  `);
}

export async function getFeaturedProjects() {
  return client.fetch(`
    *[_type == "project" && isFeatured == true] | order(orderRank) [0...4] {
      _id, title, slug, client, year, area, projectType,
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt
    }
  `);
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, client, year, area, projectType,
      location, shortDescription, fullDescription,
      "mainImage": mainImage.asset->url,
      "gallery": gallery[].asset->url,
      "relatedProjects": relatedProjects[]-> {
        _id, title, slug, projectType,
        "mainImage": mainImage.asset->url
      }
    }
  `, { slug });
}

export async function getInteriorProjects() {
  return client.fetch(`
    *[_type == "project" && projectType in ["Residential Interiors", "Commercial Interiors", "Hospitality"]] | order(orderRank) {
      _id, title, slug, client, year, area, projectType,
      "mainImage": mainImage.asset->url
    }
  `);
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function getAllTeamMembers() {
  return client.fetch(`
    *[_type == "teamMember"] | order(orderRank) {
      _id, name, role, bio, isPrincipal, education, founding,
      "photo": photo.asset->url
    }
  `);
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial"] | order(orderRank) {
      _id, quote, clientName, clientTitle, clientCompany, projectName, isMarquee
    }
  `);
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      firmName, tagline, phone, email, whatsapp, address,
      yearsInPractice, projectCount, clientCount, sqftCompleted,
      instagramUrl, selectedClients
    }
  `);
}
