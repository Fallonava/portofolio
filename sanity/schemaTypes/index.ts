import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { experienceType } from './experienceType'
import { testimonialType } from './testimonialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, experienceType, testimonialType],
}
