import project from './project';
import teamMember from './teamMember';
import { testimonialSchema, siteSettingsSchema } from './settings';

export const schemaTypes = [
  project,
  teamMember,
  testimonialSchema,
  siteSettingsSchema,
];
