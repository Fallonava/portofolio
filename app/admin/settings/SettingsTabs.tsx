'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Palette, Layout, Link2, Search, Loader2, CheckCircle2, Plus, Trash2, Eye, EyeOff, Upload } from 'lucide-react'
import type { SiteSettings } from '@/sanity/lib/siteSettings'
import {
  updateHeroSettings, updateThemeSettings,
  updateSectionSettings, updateSocialLinks, updateSeoSettings,
} from './actions'

const TABS = [
  { id: 'hero',     label: 'Hero',     icon: User },
  { id: 'theme',    label: 'Theme',    icon: Palette },
  { id: 'sections', label: 'Sections', icon: Layout },
  { id: 'social',   label: 'Social',   icon: Link2 },
  { id: 'seo',      label: 'SEO',      icon: Search },
]

const PLATFORMS = ['GitHub','LinkedIn','Twitter/X','Instagram','YouTube','Dribbble','Behance','Website','Email','WhatsApp']
const ACCENT_PRESETS = ['#007AFF','#34C759','#AF52DE','#FF9500','#FF3B30','#5AC8FA','#FF2D55','#FFCC00']

const inputCls  = "w-full px-4 py-3 bg-gray-50/80 border border-gray-200/60 focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 rounded-2xl outline-none transition-all text-gray-900 placeholder-gray-400 font-medium text-sm"
const labelCls  = "text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block"

function SaveButton({ loading, saved }: { loading: boolean; saved: boolean }) {
  return (
    <button type="submit" disabled={loading || saved}
      className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl text-sm transition-all hover:scale-[1.02] disabled:opacity-60">
      {saved   ? <><CheckCircle2 size={14} className="text-[#34C759]" /> Saved!</> :
       loading ? <><Loader2 size={14} className="animate-spin" /> Saving...</> :
                 'Save Changes'}
    </button>
  )
}

function useFormState() {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved]     = useState(false)
  const [error, setError]     = useState('')

  const submit = async (action: (fd: FormData) => Promise<{ success?: boolean; error?: string }>, fd: FormData) => {
    setLoading(true); setSaved(false); setError('')
    const res = await action(fd)
    setLoading(false)
    if (res.error) setError(res.error)
    else { setSaved(true); setTimeout(() => setSaved(false), 2500) }
  }

  return { loading, saved, error, submit }
}

// ── TAB: HERO ────────────────────────────────────────────────────────────────
function HeroTab({ s }: { s: SiteSettings }) {
  const { loading, saved, error, submit } = useFormState()
  const [preview, setPreview] = useState<string | null>(s.profileImageUrl ?? null)

  return (
    <form onSubmit={async (e) => { e.preventDefault(); await submit(updateHeroSettings, new FormData(e.currentTarget)) }}
      className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Your Name</label>
          <input name="heroName" defaultValue={s.heroName} className={inputCls} placeholder="Faishal Fx" />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Role / Tagline</label>
          <input name="heroTagline" defaultValue={s.heroTagline} className={inputCls} placeholder="Full-Stack Developer" />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className={labelCls}>Short Bio</label>
          <textarea name="heroBio" rows={3} defaultValue={s.heroBio} className={`${inputCls} resize-none`} placeholder="Building beautiful products..." />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>CTA Button Label</label>
          <input name="heroCtaLabel" defaultValue={s.heroCtaLabel} className={inputCls} placeholder="Let's Talk" />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>CTA Button URL</label>
          <input name="heroCtaUrl" type="url" defaultValue={s.heroCtaUrl} className={inputCls} placeholder="https://wa.me/..." />
        </div>
        
        <div className="space-y-1.5 md:col-span-2">
          <label className={labelCls}>Hero Background Video URL</label>
          <input name="heroBackgroundVideo" type="url" defaultValue={s.heroBackgroundVideo} className={inputCls} placeholder="E.g. https://www.youtube.com/watch?v=... or direct MP4 link" />
        </div>

        {/* About & Marquee Sync */}
        <div className="md:col-span-2 border-t border-gray-150 pt-4 space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">About & Marquee Customization</h3>
          
          <div className="space-y-1.5">
            <label className={labelCls}>About Section Heading</label>
            <input name="aboutHeading" defaultValue={s.aboutHeading} className={inputCls} placeholder="ABOUT ME" />
          </div>
          
          <div className="space-y-1.5">
            <label className={labelCls}>About Section Text</label>
            <textarea name="aboutText" rows={3} defaultValue={s.aboutText} className={`${inputCls} resize-none`} placeholder="Describe yourself in detail..." />
          </div>

          <div className="space-y-1.5">
            <label className={labelCls}>About Skills Tags (Comma separated)</label>
            <input name="aboutSkills" defaultValue={s.aboutSkills?.join(', ')} className={inputCls} placeholder="Next.js, TypeScript, React, UI/UX" />
          </div>

          <div className="space-y-1.5">
            <label className={labelCls}>Scrolling Marquee Text</label>
            <input name="marqueeText" defaultValue={s.marqueeText} className={inputCls} placeholder="CREATIVE DEVELOPER • NEOBRUTALISM • DYNAMIC UI" />
          </div>
        </div>

        {/* Profile Image */}
        <div className="space-y-1.5 md:col-span-2 border-t border-gray-150 pt-4">
          <label className={labelCls}>Profile / Avatar Image</label>
          <div className="flex items-center gap-4">
            {preview && <img src={preview} alt="Profile" className="w-16 h-16 rounded-2xl object-cover border border-gray-100" />}
            <div className="relative flex-1 border-2 border-dashed border-gray-200 hover:border-[#007AFF] rounded-2xl transition-colors cursor-pointer group">
              <input type="file" name="profileImage" accept="image/*"
                onChange={e => { const f = e.target.files?.[0]; if (f) setPreview(URL.createObjectURL(f)) }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="flex items-center justify-center gap-2 py-4 text-gray-400 group-hover:text-[#007AFF] transition-colors">
                <Upload size={16} /><span className="text-sm font-semibold">Upload new photo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-[#FF3B30] text-sm font-semibold">{error}</p>}
      <div className="flex justify-end"><SaveButton loading={loading} saved={saved} /></div>
    </form>
  )
}

// ── TAB: THEME ───────────────────────────────────────────────────────────────
function ThemeTab({ s }: { s: SiteSettings }) {
  const { loading, saved, error, submit } = useFormState()
  const [accent, setAccent] = useState(s.accentColor ?? '#007AFF')

  return (
    <form onSubmit={async (e) => { e.preventDefault(); await submit(updateThemeSettings, new FormData(e.currentTarget)) }}
      className="space-y-6">
      <div className="space-y-3">
        <label className={labelCls}>Accent Color</label>
        <div className="flex flex-wrap gap-2">
          {ACCENT_PRESETS.map(c => (
            <button key={c} type="button" onClick={() => setAccent(c)}
              className={`w-9 h-9 rounded-xl border-2 transition-all ${accent === c ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-105'}`}
              style={{ background: c }} />
          ))}
          <div className="flex items-center gap-2 ml-2">
            <input type="color" value={accent} onChange={e => setAccent(e.target.value)}
              className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent" />
            <span className="text-sm font-bold text-gray-600">{accent}</span>
          </div>
        </div>
        <input type="hidden" name="accentColor" value={accent} />

        {/* Preview */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Preview</p>
          <button type="button" className="px-5 py-2.5 text-white font-bold rounded-2xl text-sm"
            style={{ background: accent }}>Sample Button</button>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50/80 border border-gray-200/60 rounded-2xl">
        <input type="checkbox" name="darkModeDefault" id="darkDefault" defaultChecked={s.darkModeDefault}
          className="w-4 h-4 rounded accent-[#007AFF]" />
        <label htmlFor="darkDefault" className="text-sm font-semibold text-gray-700 cursor-pointer">
          Default dark mode for public visitors
        </label>
      </div>

      {error && <p className="text-[#FF3B30] text-sm font-semibold">{error}</p>}
      <div className="flex justify-end"><SaveButton loading={loading} saved={saved} /></div>
    </form>
  )
}

// ── TAB: SECTIONS ────────────────────────────────────────────────────────────
function SectionsTab({ s }: { s: SiteSettings }) {
  const { loading, saved, error, submit } = useFormState()

  const toggles = [
    { name: 'showExperience',   label: 'Experience Section',   default: s.showExperience ?? true },
    { name: 'showProjects',     label: 'Projects Section',     default: s.showProjects ?? true },
    { name: 'showTestimonials', label: 'Testimonials Section', default: s.showTestimonials ?? true },
    { name: 'showFeatures',     label: 'Features Section',     default: s.showFeatures ?? true },
    { name: 'showBlog',         label: 'Blog / Writeups Section', default: s.showBlog ?? false },
  ]

  return (
    <form onSubmit={async (e) => { e.preventDefault(); await submit(updateSectionSettings, new FormData(e.currentTarget)) }}
      className="space-y-4">

      <div className="space-y-2">
        {toggles.map(t => (
          <label key={t.name} className="flex items-center justify-between p-4 bg-white/70 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50/50 transition-colors">
            <span className="font-semibold text-gray-800 text-sm">{t.label}</span>
            <input type="checkbox" name={t.name} defaultChecked={t.default} className="w-4 h-4 rounded accent-[#007AFF]" />
          </label>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-3">
        <p className="text-[11px] font-bold text-[#FF3B30] uppercase tracking-wider">⚠️ Maintenance Mode</p>
        <label className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100 rounded-2xl cursor-pointer">
          <div>
            <span className="font-bold text-gray-800 text-sm">Enable Maintenance Mode</span>
            <p className="text-xs text-gray-400 mt-0.5">Hides all content and shows a message to visitors</p>
          </div>
          <input type="checkbox" name="maintenanceMode" defaultChecked={s.maintenanceMode} className="w-4 h-4 rounded accent-[#FF3B30]" />
        </label>
        <div className="space-y-1.5">
          <label className={labelCls}>Maintenance Message</label>
          <input name="maintenanceMessage" defaultValue={s.maintenanceMessage} className={inputCls}
            placeholder="We'll be back shortly..." />
        </div>
      </div>

      {error && <p className="text-[#FF3B30] text-sm font-semibold">{error}</p>}
      <div className="flex justify-end"><SaveButton loading={loading} saved={saved} /></div>
    </form>
  )
}

// ── TAB: SOCIAL LINKS ────────────────────────────────────────────────────────
function SocialTab({ s }: { s: SiteSettings }) {
  const [links, setLinks] = useState(s.socialLinks ?? [])
  const [loading, setLoading] = useState(false)
  const [saved, setSaved]     = useState(false)
  const [error, setError]     = useState('')

  const add    = () => setLinks([...links, { platform: 'GitHub', url: '', visible: true }])
  const remove = (i: number) => setLinks(links.filter((_, idx) => idx !== i))
  const update = (i: number, key: string, val: any) => setLinks(links.map((l, idx) => idx === i ? { ...l, [key]: val } : l))

  const save = async () => {
    setLoading(true); setSaved(false); setError('')
    const res = await updateSocialLinks(links)
    setLoading(false)
    if (res.error) setError(res.error)
    else { setSaved(true); setTimeout(() => setSaved(false), 2500) }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {links.map((link, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }}
              className="flex items-center gap-3 p-3 bg-white/70 border border-gray-100 rounded-2xl">
              <select value={link.platform} onChange={e => update(i, 'platform', e.target.value)}
                className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200/60 rounded-xl px-2 py-2 outline-none min-w-[120px]">
                {PLATFORMS.map(p => <option key={p}>{p}</option>)}
              </select>
              <input value={link.url} onChange={e => update(i, 'url', e.target.value)}
                placeholder="https://..." className="flex-1 text-sm font-medium px-3 py-2 bg-gray-50 border border-gray-200/60 rounded-xl outline-none focus:border-[#007AFF] transition-all" />
              <button type="button" onClick={() => update(i, 'visible', !link.visible)}
                className={`p-2 rounded-xl transition-all ${link.visible ? 'text-[#007AFF] bg-blue-50' : 'text-gray-300 bg-gray-50'}`}>
                {link.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              <button type="button" onClick={() => remove(i)}
                className="p-2 rounded-xl text-gray-300 hover:text-[#FF3B30] hover:bg-red-50 transition-all">
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button type="button" onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 hover:border-[#007AFF] text-gray-400 hover:text-[#007AFF] rounded-2xl transition-all text-sm font-semibold">
        <Plus size={16} /> Add Social Link
      </button>

      {error && <p className="text-[#FF3B30] text-sm font-semibold">{error}</p>}
      <div className="flex justify-end">
        <button onClick={save} disabled={loading || saved}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl text-sm transition-all hover:scale-[1.02] disabled:opacity-60">
          {saved ? <><CheckCircle2 size={14} className="text-[#34C759]" /> Saved!</> :
           loading ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : 'Save Links'}
        </button>
      </div>
    </div>
  )
}

// ── TAB: SEO ─────────────────────────────────────────────────────────────────
function SeoTab({ s }: { s: SiteSettings }) {
  const { loading, saved, error, submit } = useFormState()
  const [ogPreview, setOgPreview] = useState<string | null>(s.ogImageUrl ?? null)
  const titleLen = s.seoTitle?.length ?? 0
  const descLen  = s.seoDescription?.length ?? 0

  return (
    <form onSubmit={async (e) => { e.preventDefault(); await submit(updateSeoSettings, new FormData(e.currentTarget)) }}
      className="space-y-5">
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <label className={labelCls}>SEO Title</label>
          <span className={`text-[10px] font-bold ${titleLen > 60 ? 'text-[#FF3B30]' : 'text-gray-400'}`}>{titleLen}/60</span>
        </div>
        <input name="seoTitle" defaultValue={s.seoTitle} className={inputCls} placeholder="Faishal Fx | Full-Stack Developer" />
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <label className={labelCls}>Meta Description</label>
          <span className={`text-[10px] font-bold ${descLen > 160 ? 'text-[#FF3B30]' : 'text-gray-400'}`}>{descLen}/160</span>
        </div>
        <textarea name="seoDescription" rows={3} defaultValue={s.seoDescription} className={`${inputCls} resize-none`}
          placeholder="I build beautiful, high-performance web applications..." />
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>Resume PDF URL</label>
        <input name="resumeUrl" type="url" defaultValue={s.resumeUrl} className={inputCls} placeholder="https://drive.google.com/..." />
      </div>
      <div className="space-y-1.5">
        <label className={labelCls}>OG / Social Share Image</label>
        <div className="flex items-center gap-4">
          {ogPreview && <img src={ogPreview} alt="OG" className="h-12 rounded-xl object-cover border border-gray-100" />}
          <div className="relative flex-1 border-2 border-dashed border-gray-200 hover:border-[#007AFF] rounded-2xl cursor-pointer group transition-colors">
            <input type="file" name="ogImage" accept="image/*"
              onChange={e => { const f = e.target.files?.[0]; if (f) setOgPreview(URL.createObjectURL(f)) }}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
            <div className="flex items-center justify-center gap-2 py-3 text-gray-400 group-hover:text-[#007AFF] transition-colors">
              <Upload size={14} /><span className="text-sm font-semibold">Upload 1200×630 image</span>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-[#FF3B30] text-sm font-semibold">{error}</p>}
      <div className="flex justify-end"><SaveButton loading={loading} saved={saved} /></div>
    </form>
  )
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function SettingsTabs({ settings }: { settings: SiteSettings }) {
  const [active, setActive] = useState('hero')

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Tab Bar */}
      <div className="flex items-center gap-1 p-1 bg-gray-100/80 rounded-2xl shrink-0 overflow-x-auto">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-bold whitespace-nowrap transition-all duration-200 ${active === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            <tab.icon size={13} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-0 bg-white/70 backdrop-blur-xl border border-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-y-auto overscroll-contain">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}>
            {active === 'hero'     && <HeroTab     s={settings} />}
            {active === 'theme'    && <ThemeTab    s={settings} />}
            {active === 'sections' && <SectionsTab s={settings} />}
            {active === 'social'   && <SocialTab   s={settings} />}
            {active === 'seo'      && <SeoTab      s={settings} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
