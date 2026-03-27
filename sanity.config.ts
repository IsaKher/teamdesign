import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'teamdesign',
  title: 'Team Design — Content Studio',
  basePath: '/studio-cms',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site Settings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.divider(),
            S.listItem().title('Projects').schemaType('project').child(
              S.documentTypeList('project').title('All Projects')
            ),
            S.listItem().title('Team Members').schemaType('teamMember').child(
              S.documentTypeList('teamMember').title('Team')
            ),
            S.listItem().title('Testimonials').schemaType('testimonial').child(
              S.documentTypeList('testimonial').title('Testimonials')
            ),
          ]),
    }),
    visionTool(),
    media(),
  ],
  schema: { types: schemaTypes },
});
