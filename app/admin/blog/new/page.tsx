'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Loader2, Save, Info, AlignLeft, BarChart2, ChevronRight, BookOpen, FileText } from 'lucide-react';
import Link from 'next/link';
import { createPost } from '../actions';
import { MotionDiv } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'basic',   label: 'Article Info',   icon: Info },
  { id: 'content', label: 'Body & Cover',   icon: AlignLeft },
  { id: 'publish', label: 'Publishing',     icon: BarChart2 },
];

const inputCls = "w-full px-4 py-3 bg-gray-50/80 border border-gray-200/60 focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 rounded-2xl outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-gray-900 placeholder-gray-400 font-medium text-sm";
const labelCls = "text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    const result = await createPost(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/admin/blog');
      router.refresh();
    }
  };

  const tabOrder = TABS.map(t => t.id);
  const currentIdx = tabOrder.indexOf(activeTab);
  const isLast = currentIdx === tabOrder.length - 1;
  const goNext = () => { if (!isLast) setActiveTab(tabOrder[currentIdx + 1]); };

  return (
    <div className="flex flex-col h-full gap-4">

      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 shrink-0"
      >
        <Link href="/admin/blog" className="p-2.5 bg-white/70 backdrop-blur-md rounded-xl border border-white/60 text-gray-500 hover:text-gray-900 hover:bg-white transition-all shadow-sm">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">New Blog Post</h1>
          <p className="text-gray-400 text-xs font-medium mt-0.5 truncate">Write and publish a new article to your portfolio website</p>
        </div>

        {/* Progress dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {TABS.map((tab, i) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`transition-all duration-300 rounded-full ${activeTab === tab.id ? 'w-6 h-2 bg-gray-900' : i < currentIdx ? 'w-2 h-2 bg-[#34C759]' : 'w-2 h-2 bg-gray-200'}`}
            />
          ))}
        </div>
      </MotionDiv>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="shrink-0 px-4 py-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-medium text-sm">
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Bar */}
      <div className="shrink-0 flex gap-1 p-1 bg-gray-100/80 rounded-2xl backdrop-blur-sm">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDone = tabOrder.indexOf(tab.id) < currentIdx;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[14px] text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : isDone ? 'text-[#34C759]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <tab.icon size={15} strokeWidth={2} />
              <span className="hidden sm:inline">{tab.label}</span>
              {isDone && <span className="hidden sm:inline text-[#34C759] text-xs">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col gap-3">

        {/* Tab Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait">

            {/* TAB 1 — Article Info */}
            {activeTab === 'basic' && (
              <motion.div key="basic"
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2"
              >
                {/* Title */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className={labelCls}>Post Title *</label>
                  <input name="title" required className={inputCls} placeholder="E.g. Building VisionOS Interfaces with Clean React Code" />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className={labelCls}>Slug (URL Slug) *</label>
                  <input name="slug" required className={`${inputCls} font-mono`} placeholder="building-visionos-interfaces-clean-react" />
                </div>

                {/* Read Time */}
                <div className="space-y-1.5">
                  <label className={labelCls}>Read Time (Minutes)</label>
                  <input name="readTime" type="number" defaultValue={5} min={1} className={inputCls} />
                </div>

                {/* Tags */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className={labelCls}>Tags (Comma separated)</label>
                  <input name="tags" className={inputCls} placeholder="React, Next.js, UI/UX, Brutalism" />
                </div>
              </motion.div>
            )}

            {/* TAB 2 — Body & Cover */}
            {activeTab === 'content' && (
              <motion.div key="content"
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-2"
              >
                {/* Excerpt */}
                <div className="space-y-1.5 md:col-span-3">
                  <label className={labelCls}>Excerpt (Short Teaser Summary) *</label>
                  <textarea name="excerpt" required rows={2} maxLength={250}
                    className={`${inputCls} resize-none`} placeholder="A brief teaser paragraph to hook readers on list pages (max 250 chars)..." />
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-1.5 md:col-span-3">
                  <label className={labelCls}>Featured Cover Image *</label>
                  <div className="relative border-2 border-dashed border-gray-200 hover:border-[#007AFF] bg-gray-50/50 rounded-2xl transition-colors group cursor-pointer overflow-hidden">
                    <input type="file" name="mainImage" accept="image/*" required onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {imagePreview ? (
                      <div className="relative w-full h-44">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm font-bold">Change Image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6 text-gray-400 group-hover:text-[#007AFF] transition-colors">
                        <Upload size={24} className="mb-2" />
                        <p className="text-sm font-semibold">Click or drag banner image</p>
                        <p className="text-xs opacity-70 mt-0.5">JPG, PNG, WEBP</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Content Editor (Markdown-capable) */}
                <div className="space-y-1.5 md:col-span-3">
                  <div className="flex justify-between items-center">
                    <label className={labelCls}>Article Content (Markdown syntax) *</label>
                    <span className="text-[10px] font-bold text-[#007AFF] bg-blue-50 px-2 py-0.5 rounded-lg">
                      Headers (#, ##, ###), Quotes (&gt;), Lists (-, 1.) supported!
                    </span>
                  </div>
                  <textarea name="content" required rows={10}
                    className={`${inputCls} font-mono resize-y text-xs`} 
                    placeholder="# Main Title Heading&#10;&#10;Write your paragraphs here. You can use standard Markdown tags.&#10;&#10;## Second Level Subheader&#10;&#10;Use:&#10;- Bullet points&#10;- Second item&#10;&#10;> Or blockquotes to emphasize content." />
                </div>
              </motion.div>
            )}

            {/* TAB 3 — Publishing */}
            {activeTab === 'publish' && (
              <motion.div key="publish"
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 pb-2"
              >
                {/* Make Public toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-2xl border border-gray-200/60">
                  <div>
                    <p className="text-sm font-bold text-gray-900">Publish Immediately</p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">Make this article publicly readable instantly.</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" name="isPublic" className="sr-only peer" defaultChecked={true} />
                      <div className="block bg-gray-200 w-[52px] h-8 rounded-full transition-colors duration-300 peer-checked:bg-[#34C759] shadow-inner"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 transform translate-x-0 peer-checked:translate-x-5 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"></div>
                    </div>
                  </label>
                </div>

                <div className="p-5 bg-blue-50/40 border border-blue-100/50 rounded-2xl flex items-start gap-3">
                  <BookOpen className="text-[#007AFF] shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Premium Tip</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1 font-medium">
                      Writing high-quality blog posts increases SEO scores and provides social proof for prospective clients! Make sure your headings reflect searchable tech terms like &quot;React design systems&quot; or &quot;Next.js optimizations&quot;.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer: Nav + Submit */}
        <div className="shrink-0 flex items-center gap-3 pt-1">
          {/* Back tab */}
          {currentIdx > 0 && (
            <button type="button" onClick={() => setActiveTab(tabOrder[currentIdx - 1])}
              className="px-4 py-3 bg-white/80 border border-gray-200/60 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-all text-sm">
              Back
            </button>
          )}

          {/* Next / Submit */}
          {isLast ? (
            <button type="submit" disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-[#007AFF] hover:bg-[#0062CC] text-white font-bold py-3 px-6 rounded-2xl shadow-[0_6px_16px_rgba(0,122,255,0.3)] transition-all duration-300 disabled:opacity-70 hover:scale-[1.01] active:scale-[0.99] text-sm"
            >
              {loading ? <><Loader2 size={18} className="animate-spin" />Saving...</> : <><Save size={18} />Create Post</>}
            </button>
          ) : (
            <button type="button" onClick={goNext}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] text-sm"
            >
              Next: {TABS[currentIdx + 1]?.label}
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
