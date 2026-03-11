import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
    defineField({ name: 'bio', title: 'Biography', type: 'text', rows: 4 }),
    defineField({ name: 'education', title: 'Education / Credentials', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isPrincipal', title: 'Is this the Principal Architect?', type: 'boolean', initialValue: false }),
    defineField({ name: 'founding', title: 'Founding Year (for principal only)', type: 'number' }),
    defineField({ name: 'orderRank', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
});
