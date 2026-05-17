import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const writeClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false, // Important: don't use CDN when writing/mutating data
  token: process.env.SANITY_API_WRITE_TOKEN,
})
