import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'client', title: 'Client Name', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'year', title: 'Year Completed', type: 'number' }),
    defineField({ name: 'area', title: 'Area (sq ft)', type: 'number' }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'Residential' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Institutional', value: 'Institutional' },
          { title: 'Residential Interiors', value: 'Residential Interiors' },
          { title: 'Commercial Interiors', value: 'Commercial Interiors' },
          { title: 'Hospitality', value: 'Hospitality' },
        ],
      },
    }),
    defineField({ name: 'shortDescription', title: 'Short Description (for grid card)', type: 'text', rows: 2 }),
    defineField({ name: 'fullDescription', title: 'Full Project Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }] }),
    defineField({ name: 'gallery', title: 'Photo Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'isFeatured', title: 'Feature on Homepage?', type: 'boolean', initialValue: false }),
    defineField({ name: 'isMarquee', title: 'Marquee Project (Mariwala / Screwvala tier)?', type: 'boolean', initialValue: false }),
    defineField({ name: 'orderRank', title: 'Display Order', type: 'number' }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'mainImage' },
  },
});
