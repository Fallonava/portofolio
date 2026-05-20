import { client } from './client'

// The siteSettings document has a fixed ID
const SITE_SETTINGS_ID = 'siteSettings'

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  heroName, heroTagline, heroBio, heroCtaLabel, heroCtaUrl,
  "profileImageUrl": profileImage.asset->url,
  heroBackgroundVideo,
  aboutHeading, aboutText, aboutSkills,
  marqueeText,
  accentColor, darkModeDefault,
  showExperience, showProjects, showTestimonials, showFeatures, showBlog,
  maintenanceMode, maintenanceMessage,
  socialLinks,
  seoTitle, seoDescription,
  "ogImageUrl": ogImage.asset->url,
  resumeUrl
}`

export type SiteSettings = {
  heroName?: string
  heroTagline?: string
  heroBio?: string
  heroCtaLabel?: string
  heroCtaUrl?: string
  profileImageUrl?: string
  heroBackgroundVideo?: string
  aboutHeading?: string
  aboutText?: string
  aboutSkills?: string[]
  marqueeText?: string
  accentColor?: string
  darkModeDefault?: boolean
  showExperience?: boolean
  showProjects?: boolean
  showTestimonials?: boolean
  showFeatures?: boolean
  showBlog?: boolean
  maintenanceMode?: boolean
  maintenanceMessage?: string
  socialLinks?: Array<{ platform: string; url: string; visible: boolean }>
  seoTitle?: string
  seoDescription?: string
  ogImageUrl?: string
  resumeUrl?: string
}

export const DEFAULT_SETTINGS: SiteSettings = {
  heroName: 'Faishal Fx',
  heroTagline: 'Full-Stack Developer',
  heroBio: 'Building beautiful products with clean code.',
  heroCtaLabel: "Let's Talk",
  aboutHeading: 'ABOUT ME',
  aboutText: "I'm a full-stack developer who crafts premium digital experiences. I combine clean code with bold design to build products that stand out.",
  aboutSkills: ['Next.js', 'TypeScript', 'React', 'UI/UX', 'Tailwind CSS'],
  marqueeText: 'NEOBRUTALISM 2026 • CREATIVE DEVELOPER • RAW POWER • BENTO UI',
  accentColor: '#007AFF',
  darkModeDefault: false,
  showExperience: true,
  showProjects: true,
  showTestimonials: true,
  showFeatures: true,
  showBlog: false,
  maintenanceMode: false,
  socialLinks: [],
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await client.fetch(SITE_SETTINGS_QUERY)
    return { ...DEFAULT_SETTINGS, ...data }
  } catch {
    return DEFAULT_SETTINGS
  }
}
