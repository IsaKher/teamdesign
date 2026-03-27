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
    defineField({ name: 'area', title: 'Area', type: 'string' }),
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
    defineField({ name: 'description', title: 'Full Project Description', type: 'text', rows: 8 }),
    defineField({
      name: 'testimonial',
      title: 'Associated Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }] }),
    defineField({ name: 'gallery', title: 'Photo Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks (Project Detail Layout)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'paragraphBlock',
          title: 'Paragraph',
          fields: [
            { name: 'text', title: 'Text', type: 'text', rows: 5 },
          ],
          preview: { select: { title: 'text' } },
        },
        {
          type: 'object',
          name: 'fullWidthImageBlock',
          title: 'Full Width Image',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
          preview: { select: { title: 'caption', media: 'image' } },
        },
        {
          type: 'object',
          name: 'halfWidthImagesBlock',
          title: 'Half Width Images (2-up)',
          fields: [
            { name: 'imageLeft', title: 'Left Image', type: 'image', options: { hotspot: true } },
            { name: 'captionLeft', title: 'Left Caption', type: 'string' },
            { name: 'imageRight', title: 'Right Image', type: 'image', options: { hotspot: true } },
            { name: 'captionRight', title: 'Right Caption', type: 'string' },
          ],
          preview: { select: { title: 'captionLeft', media: 'imageLeft' } },
        },
        {
          type: 'object',
          name: 'pullQuoteBlock',
          title: 'Pull Quote',
          fields: [
            { name: 'text', title: 'Quote Text', type: 'string' },
          ],
          preview: { select: { title: 'text' } },
        },
      ],
    }),
    defineField({ name: 'isPublished', title: 'Published (visible on website)?', type: 'boolean', initialValue: false }),
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
