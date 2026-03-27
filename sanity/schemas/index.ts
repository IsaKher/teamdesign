import project from './project';
import teamMember from './teamMember';
import job from './job';
import { testimonialSchema, siteSettingsSchema } from './settings';

export const schemaTypes = [
  project,
  teamMember,
  job,
  testimonialSchema,
  siteSettingsSchema,
];
