import project from './project';
import teamMember from './teamMember';
import job from './job';
import { testimonialSchema, siteSettingsSchema } from './settings';
import journalPost from './journalPost';

export const schemaTypes = [
  project,
  journalPost,
  teamMember,
  job,
  testimonialSchema,
  siteSettingsSchema,
];
