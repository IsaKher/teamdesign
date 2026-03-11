import { defineField, defineType } from 'sanity';

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 5, validation: r => r.required() }),
    defineField({ name: 'clientName', title: 'Client Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'clientTitle', title: 'Client Title / Role', type: 'string' }),
    defineField({ name: 'clientCompany', title: 'Company / Organisation', type: 'string' }),
    defineField({ name: 'projectName', title: 'Project Name', type: 'string' }),
    defineField({ name: 'isMarquee', title: 'Feature prominently on homepage?', type: 'boolean', initialValue: false }),
    defineField({ name: 'orderRank', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'clientName', subtitle: 'clientCompany' },
  },
});

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'firmName', title: 'Firm Name', type: 'string', initialValue: 'Team Design Architects' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (with country code, e.g. 919876543210)', type: 'string' }),
    defineField({ name: 'address', title: 'Studio Address', type: 'text', rows: 3 }),
    defineField({ name: 'yearsInPractice', title: 'Years in Practice (e.g. 25+)', type: 'string', initialValue: '25+' }),
    defineField({ name: 'projectCount', title: 'Projects Completed (e.g. 300+)', type: 'string', initialValue: '300+' }),
    defineField({ name: 'clientCount', title: 'Clients Served (e.g. 500+)', type: 'string', initialValue: '500+' }),
    defineField({ name: 'sqftCompleted', title: 'Square Feet Completed (e.g. 20,00,000+)', type: 'string', initialValue: '20,00,000+' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({
      name: 'selectedClients',
      title: 'Selected Clients (for homepage credentials section)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Client Name', type: 'string' },
          { name: 'description', title: 'Who they are', type: 'string' },
          { name: 'project', title: 'Project Name', type: 'string' },
        ],
      }],
    }),
  ],
});
