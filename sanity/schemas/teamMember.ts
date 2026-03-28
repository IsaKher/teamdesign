import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
    defineField({
      name: 'tier',
      title: 'Display Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Principal Architect', value: 'principal' },
          { title: 'Core Management — Featured (large card)', value: 'featured' },
          { title: 'Core Management — Standard', value: 'core' },
          { title: 'Core Operations (text only)', value: 'operations' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
    }),
    defineField({ name: 'bio', title: 'Biography', type: 'text', rows: 4 }),
    defineField({ name: 'education', title: 'Education / Credentials', type: 'string' }),
    defineField({ name: 'award', title: 'Award / Recognition (optional)', type: 'string' }),
    defineField({ name: 'founding', title: 'Practice Founded Year (principal only)', type: 'number' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }] }),
    defineField({ name: 'orderRank', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
});
