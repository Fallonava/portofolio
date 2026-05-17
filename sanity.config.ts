import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { StudioLogo } from './sanity/components/StudioLogo'
import { StudioNavbar } from './sanity/components/StudioNavbar'
import { StudioLayout } from './sanity/components/StudioLayout'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'

import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  name: 'fallonava-studio',
  title: 'Fallonava Studio',
  icon: StudioLogo,
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    deskTool({ structure }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  studio: {
    components: {
      layout: StudioLayout,
      logo: StudioLogo,
      navbar: StudioNavbar,
    },
  },
})
