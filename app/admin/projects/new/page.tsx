'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Loader2, Save, Info, AlignLeft, BarChart2, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { createProject } from '../actions';
import { MotionDiv } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'basic',   label: 'Basic Info',   icon: Info },
  { id: 'content', label: 'Content',      icon: AlignLeft },
  { id: 'crm',     label: 'CRM',          icon: BarChart2 },
];

const inputCls = "w-full px-4 py-3 bg-gray-50/80 border border-gray-200/60 focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 rounded-2xl outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-gray-900 placeholder-gray-400 font-medium text-sm";
const labelCls = "text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block";

export default function NewProjectPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [generatedDesc, setGeneratedDesc] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const generateDescription = async () => {
    const form = formRef.current;
    if (!form) return;
    const title = (form.querySelector('[name="title"]') as HTMLInputElement)?.value;
    const tech = (form.querySelector('[name="tech"]') as HTMLInputElement)?.value;
    const category = (form.querySelector('[name="category"]') as HTMLSelectElement)?.value;
    if (!title) { setAiError('Fill in the Project Title first (Tab 1).'); return; }
    setAiLoading(true); setAiError('');
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, tech, category }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGeneratedDesc(data.description);
      // Auto-fill the textarea
      const textarea = form.querySelector('[name="description"]') as HTMLTextAreaElement;
      if (textarea) { textarea.value = data.description; textarea.dispatchEvent(new Event('input', { bubbles: true })); }
    } catch (err: any) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    const result = await createProject(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/admin/projects');
      router.refresh();
    }
  };

  const tabOrder = TABS.map(t => t.id);
  const currentIdx = tabOrder.indexOf(activeTab);
  const isLast = currentIdx === tabOrder.length - 1;
  const goNext = () => { if (!isLast) setActiveTab(tabOrder[currentIdx + 1]); };

  return (
    <div className="flex flex-col h-full gap-4">

      {/* ── Header ── */}
      <MotionDiv
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 shrink-0"
      >
        <Link href="/admin/projects" className="p-2.5 bg-white/70 backdrop-blur-md rounded-xl border border-white/60 text-gray-500 hover:text-gray-900 hover:bg-white transition-all shadow-sm">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">New Project</h1>
          <p className="text-gray-400 text-xs font-medium mt-0.5 truncate">Add a new project to your portfolio or internal CRM</p>
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

      {/* ── Error Banner ── */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="shrink-0 px-4 py-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-medium text-sm">
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tab Bar ── */}
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

      {/* ── Form ── */}
      <form ref={formRef} onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col gap-3">

        {/* Tab Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait">

            {/* TAB 1 — Basic Info */}
            {activeTab === 'basic' && (
              <motion.div key="basic"
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2"
              >
                {/* Title */}
                <div className="space-y-1.5">
                  <label className={labelCls}>Project Title *</label>
                  <input name="title" required className={inputCls} placeholder="E.g. E-Commerce Redesign" />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className={labelCls}>Slug (URL) *</label>
                  <input name="slug" required className={`${inputCls} font-mono`} placeholder="e-commerce-redesign" />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className={labelCls}>Category *</label>
                  <select name="category" required className={`${inputCls} appearance-none`}>
                    <option value="">Select category</option>
                    <option>Web</option><option>Mobile</option><option>UI/UX</option><option>System</option>
                  </select>
                </div>

                {/* Color */}
                <div className="space-y-1.5">
                  <label className={labelCls}>Card Color</label>
                  <select name="color" className={`${inputCls} appearance-none`}>
                    <option value="">Default</option>
                    <option value="blue">Cyan / Blue</option>
                    <option value="pink">Pink / Magenta</option>
                  </select>
                </div>

                {/* Tech */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className={labelCls}>Tech Stack (Comma separated)</label>
                  <input name="tech" className={inputCls} placeholder="React, Next.js, Tailwind CSS" />
                </div>

                {/* Image Upload */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className={labelCls}>Main Image *</label>
                  <div className="relative border-2 border-dashed border-gray-200 hover:border-[#007AFF] bg-gray-50/50 rounded-2xl transition-colors group cursor-pointer overflow-hidden">
                    <input type="file" name="image" accept="image/*" required onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {imagePreview ? (
                      <div className="relative w-full h-40">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm font-bold">Change Image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-gray-400 group-hover:text-[#007AFF] transition-colors">
                        <Upload size={24} className="mb-2" />
                        <p className="text-sm font-semibold">Click or drag image</p>
                        <p className="text-xs opacity-70 mt-0.5">JPG, PNG, WEBP</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2 — Content */}
            {activeTab === 'content' && (
              <motion.div key="content"
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-2"
              >
                {/* Short Description */}
                <div className="space-y-1.5 md:col-span-3">
                  <div className="flex items-center justify-between">
                    <label className={labelCls}>Short Description *</label>
                    <button
                      type="button"
                      onClick={generateDescription}
                      disabled={aiLoading}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#007AFF] to-[#AF52DE] text-white text-[11px] font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-60 shadow-[0_2px_8px_rgba(0,122,255,0.3)]"
                    >
                      {aiLoading ? <Loader2 size={11} className="animate-spin" /> : <Sparkles size={11} />}
                      {aiLoading ? 'Generating...' : 'AI Generate'}
                    </button>
                  </div>
                  {aiError && <p className="text-[11px] text-[#FF3B30] font-semibold">{aiError}</p>}
                  <textarea name="description" required rows={3}
                    className={`${inputCls} resize-none`} placeholder="Brief summary of the project..." />
                </div>

                {/* Long Description */}
                <div className="space-y-1.5 md:col-span-3">
                  <label className={labelCls}>Long Description</label>
                  <textarea name="longDescription" rows={5}
                    className={`${inputCls} resize-none`} placeholder="Detailed explanation..." />
                </div>

                {/* Link */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className={labelCls}>Project Link (URL)</label>
                  <input name="link" type="url" className={inputCls} placeholder="https://" />
                </div>

                {/* Order */}
                <div className="space-y-1.5">
                  <label className={labelCls}>Order (Sorting)</label>
                  <input name="order" type="number" defaultValue={0} className={inputCls} />
                </div>
              </motion.div>
            )}

            {/* TAB 3 — CRM */}
            {activeTab === 'crm' && (
              <motion.div key="crm"
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 pb-2"
              >
                {/* Make Public toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-2xl border border-gray-200/60">
                  <div>
                    <p className="text-sm font-bold text-gray-900">Make Public</p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">Show this project on your portfolio</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" name="isPublic" className="sr-only peer" defaultChecked={false} />
                      <div className="block bg-gray-200 w-[52px] h-8 rounded-full transition-colors duration-300 peer-checked:bg-[#34C759] shadow-inner"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 transform translate-x-0 peer-checked:translate-x-5 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"></div>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className={labelCls}>Client Name</label>
                    <input name="clientName" className={inputCls} placeholder="Internal reference" />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelCls}>Deadline</label>
                    <input type="date" name="deadline" className={inputCls} />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelCls}>Project Status</label>
                    <select name="status" defaultValue="Planning" className={`${inputCls} appearance-none font-bold`}>
                      <option>Planning</option><option>In Progress</option>
                      <option>In Review</option><option>Completed</option><option>Cancelled</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelCls}>Payment Status</label>
                    <select name="paymentStatus" defaultValue="Unpaid" className={`${inputCls} appearance-none font-bold`}>
                      <option>Unpaid</option><option value="Partial / DP">Partial / DP</option><option>Paid</option>
                    </select>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className={labelCls}>Progress — <span className="text-[#007AFF] font-black">{progress}%</span></label>
                    <div className="relative h-10 flex items-center px-4 bg-gray-50/80 rounded-2xl border border-gray-200/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                      <input type="range" name="progress" min="0" max="100" defaultValue="0"
                        className="w-full accent-[#007AFF]"
                        onChange={(e) => setProgress(Number(e.target.value))} />
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className={labelCls}>Budget / Deal Value</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-400 font-bold text-sm">$</span>
                      <input type="number" name="budget" className={`${inputCls} pl-8`} placeholder="0.00" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ── Footer: Nav + Submit ── */}
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
              {loading ? <><Loader2 size={18} className="animate-spin" />Saving...</> : <><Save size={18} />Create Project</>}
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
