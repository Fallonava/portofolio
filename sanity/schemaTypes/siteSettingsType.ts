import { defineField, defineType } from 'sanity'
import { Settings } from 'lucide-react'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  fields: [
    // ── HERO ──────────────────────────────────────
    defineField({ name: 'heroName', title: 'Your Name', type: 'string', group: 'hero', initialValue: 'Faishal Fx' }),
    defineField({ name: 'heroTagline', title: 'Tagline / Role', type: 'string', group: 'hero', initialValue: 'Full-Stack Developer' }),
    defineField({ name: 'heroBio', title: 'Short Bio', type: 'text', group: 'hero', rows: 3 }),
    defineField({ name: 'heroCtaLabel', title: 'CTA Button Label', type: 'string', group: 'hero', initialValue: "Let's Talk" }),
    defineField({ name: 'heroCtaUrl', title: 'CTA Button URL', type: 'url', group: 'hero' }),
    defineField({ name: 'profileImage', title: 'Profile / Avatar Image', type: 'image', group: 'hero', options: { hotspot: true } }),
    defineField({
      name: 'heroBackgroundVideo',
      title: 'Hero Background Video URL',
      type: 'url',
      group: 'hero',
      description: 'Optional: Link to an MP4 video to use as an ambient background loop in the Hero section.',
    }),

    // ── ABOUT ─────────────────────────────────────
    defineField({ name: 'aboutHeading', title: 'About Section Heading', type: 'string', group: 'about', initialValue: 'ABOUT ME' }),
    defineField({
      name: 'aboutText',
      title: 'About Me Text',
      type: 'text',
      group: 'about',
      rows: 5,
      description: 'Main paragraph text in the About section.',
      initialValue: "I'm a full-stack developer who crafts premium digital experiences. I combine clean code with bold design to build products that stand out.",
    }),
    defineField({
      name: 'aboutSkills',
      title: 'Skills / Expertise Tags',
      type: 'array',
      group: 'about',
      of: [{ type: 'string' }],
      description: 'Tags displayed in the About section (e.g. Next.js, TypeScript, UI/UX)',
      initialValue: ['Next.js', 'TypeScript', 'React', 'UI/UX', 'Tailwind CSS'],
    }),

    // ── MARQUEE ───────────────────────────────────
    defineField({
      name: 'marqueeText',
      title: 'Marquee / Ticker Text',
      type: 'string',
      group: 'theme',
      description: 'The scrolling banner text. Use • as separator. Will loop automatically.',
      initialValue: 'NEOBRUTALISM 2026 • CREATIVE DEVELOPER • RAW POWER • BENTO UI',
    }),

    // ── THEME ─────────────────────────────────────
    defineField({ name: 'accentColor', title: 'Accent Color (hex)', type: 'string', group: 'theme', description: 'e.g. #007AFF', initialValue: '#007AFF' }),
    defineField({ name: 'darkModeDefault', title: 'Default Dark Mode on public site', type: 'boolean', group: 'theme', initialValue: false }),

    // ── SECTIONS ──────────────────────────────────
    defineField({ name: 'showExperience', title: 'Show Experience Section', type: 'boolean', group: 'sections', initialValue: true }),
    defineField({ name: 'showProjects', title: 'Show Projects Section', type: 'boolean', group: 'sections', initialValue: true }),
    defineField({ name: 'showTestimonials', title: 'Show Testimonials Section', type: 'boolean', group: 'sections', initialValue: true }),
    defineField({ name: 'showFeatures', title: 'Show Features Section', type: 'boolean', group: 'sections', initialValue: true }),
    defineField({ name: 'showBlog', title: 'Show Blog Section', type: 'boolean', group: 'sections', initialValue: false }),
    defineField({ name: 'maintenanceMode', title: 'Maintenance Mode', type: 'boolean', group: 'sections', initialValue: false }),
    defineField({ name: 'maintenanceMessage', title: 'Maintenance Message', type: 'string', group: 'sections', initialValue: 'Site is under maintenance. Coming back soon!' }),

    // ── SOCIAL LINKS ──────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'platform', title: 'Platform', type: 'string', options: { list: ['GitHub','LinkedIn','Twitter/X','Instagram','YouTube','Dribbble','Behance','Website','Email','WhatsApp'] } }),
          defineField({ name: 'url', title: 'URL', type: 'string' }),
          defineField({ name: 'visible', title: 'Show on site', type: 'boolean', initialValue: true }),
        ],
        preview: { select: { title: 'platform', subtitle: 'url' } },
      }],
    }),

    // ── SEO ───────────────────────────────────────
    defineField({ name: 'seoTitle', title: 'SEO Meta Title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Meta Description', type: 'text', group: 'seo', rows: 2 }),
    defineField({ name: 'ogImage', title: 'OG / Social Share Image', type: 'image', group: 'seo' }),
    defineField({ name: 'resumeUrl', title: 'Resume PDF URL', type: 'url', group: 'seo' }),
  ],

  groups: [
    { name: 'hero',     title: '🙋 Hero',     default: true },
    { name: 'about',    title: '👤 About' },
    { name: 'theme',    title: '🎨 Theme & Marquee' },
    { name: 'sections', title: '📐 Sections' },
    { name: 'social',   title: '🔗 Social Links' },
    { name: 'seo',      title: '🔍 SEO' },
  ],
})
