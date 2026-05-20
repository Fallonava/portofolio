import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { experienceType } from './experienceType'
import { testimonialType } from './testimonialType'
import { siteSettingsType } from './siteSettingsType'
import { postType } from './postType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettingsType, projectType, experienceType, testimonialType, postType],
}
