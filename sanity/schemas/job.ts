import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'job',
  title: 'Job Opening',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Job Title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: { list: ['Full-time', 'Intern'], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'duration', title: 'Duration (e.g. "6 months" — for internships)', type: 'string' }),
    defineField({ name: 'brief', title: 'Role Summary', type: 'text', rows: 3, validation: r => r.required() }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn Listing URL (optional)', type: 'url' }),
    defineField({ name: 'isOpen', title: 'Currently Open?', type: 'boolean', initialValue: true }),
    defineField({ name: 'orderRank', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' },
  },
});
