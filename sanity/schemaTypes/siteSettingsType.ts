import { defineField, defineType } from 'sanity'
import { Settings } from 'lucide-react'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  // Singleton — hanya 1 dokumen
  fields: [
    // ── HERO ──────────────────────────────────────
    defineField({
      name: 'heroName',
      title: 'Your Name',
      type: 'string',
      group: 'hero',
      initialValue: 'Faishal Fx',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Tagline / Role',
      type: 'string',
      group: 'hero',
      description: 'e.g. "Full-Stack Developer & UI Designer"',
      initialValue: 'Full-Stack Developer',
    }),
    defineField({
      name: 'heroBio',
      title: 'Short Bio',
      type: 'text',
      group: 'hero',
      rows: 3,
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'CTA Button Label',
      type: 'string',
      group: 'hero',
      initialValue: "Let's Talk",
    }),
    defineField({
      name: 'heroCtaUrl',
      title: 'CTA Button URL',
      type: 'url',
      group: 'hero',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile / Avatar Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),

    // ── THEME ─────────────────────────────────────
    defineField({
      name: 'accentColor',
      title: 'Accent Color (hex)',
      type: 'string',
      group: 'theme',
      description: 'e.g. #007AFF',
      initialValue: '#007AFF',
    }),
    defineField({
      name: 'darkModeDefault',
      title: 'Default Dark Mode on public site',
      type: 'boolean',
      group: 'theme',
      initialValue: false,
    }),

    // ── SECTIONS ──────────────────────────────────
    defineField({
      name: 'showExperience',
      title: 'Show Experience Section',
      type: 'boolean',
      group: 'sections',
      initialValue: true,
    }),
    defineField({
      name: 'showProjects',
      title: 'Show Projects Section',
      type: 'boolean',
      group: 'sections',
      initialValue: true,
    }),
    defineField({
      name: 'showTestimonials',
      title: 'Show Testimonials Section',
      type: 'boolean',
      group: 'sections',
      initialValue: true,
    }),
    defineField({
      name: 'showFeatures',
      title: 'Show Features Section',
      type: 'boolean',
      group: 'sections',
      initialValue: true,
    }),
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      description: 'Show a "coming soon" page to visitors',
      type: 'boolean',
      group: 'sections',
      initialValue: false,
    }),
    defineField({
      name: 'maintenanceMessage',
      title: 'Maintenance Message',
      type: 'string',
      group: 'sections',
      initialValue: 'Site is under maintenance. Coming back soon!',
    }),

    // ── SOCIAL LINKS ──────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string',
              options: { list: ['GitHub','LinkedIn','Twitter/X','Instagram','YouTube','Dribbble','Behance','Website','Email','WhatsApp'] } }),
            defineField({ name: 'url', title: 'URL', type: 'string' }),
            defineField({ name: 'visible', title: 'Show on site', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),

    // ── SEO ───────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Meta Title',
      type: 'string',
      group: 'seo',
      description: 'Default: "Name | Role"',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      group: 'seo',
      rows: 2,
      description: 'Max 160 characters recommended',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG / Social Share Image',
      type: 'image',
      group: 'seo',
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume PDF URL',
      type: 'url',
      group: 'seo',
      description: 'Direct link to your CV/resume PDF',
    }),
  ],

  groups: [
    { name: 'hero',     title: '🙋 Hero',     default: true },
    { name: 'theme',    title: '🎨 Theme' },
    { name: 'sections', title: '📐 Sections' },
    { name: 'social',   title: '🔗 Social Links' },
    { name: 'seo',      title: '🔍 SEO' },
  ],
})
