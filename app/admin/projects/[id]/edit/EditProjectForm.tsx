'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Loader2, Save, Info, AlignLeft, BarChart2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { updateProject } from '../../actions';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'basic',   label: 'Basic Info',  icon: Info },
  { id: 'content', label: 'Content',     icon: AlignLeft },
  { id: 'crm',     label: 'CRM & Status',icon: BarChart2 },
];

const inputCls  = "w-full px-4 py-3 bg-gray-50/80 border border-gray-200/60 focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 rounded-2xl outline-none transition-all text-gray-900 placeholder-gray-400 font-medium text-sm";
const labelCls  = "text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block";

interface Project {
  _id: string; title: string; category: string; description: string;
  longDescription?: string; link?: string; tech?: string[];
  color?: string; order?: number; isPublic?: boolean;
  clientName?: string; status?: string; progress?: number;
  paymentStatus?: string; budget?: number; deadline?: string;
  slug?: string; imageUrl?: string;
}

export function EditProjectForm({ project }: { project: Project }) {
  const router = useRouter();
  const [activeTab, setActiveTab]     = useState('basic');
  const [loading, setLoading]         = useState(false);
  const [success, setSuccess]         = useState(false);
  const [error, setError]             = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(project.imageUrl ?? null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const formData = new FormData(formRef.current!);
    const result = await updateProject(project._id, formData);
    setLoading(false);
    if (result.error) { setError(result.error); }
    else { setSuccess(true); setTimeout(() => router.push('/admin/projects'), 1200); }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <Link href="/admin/projects"
          className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/70 border border-gray-200/60 text-gray-600 hover:text-gray-900 hover:shadow-sm transition-all">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Project</h1>
          <p className="text-gray-400 text-sm font-medium">{project.title}</p>
        </div>
        {success && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#34C759]/15 text-[#34C759] rounded-2xl text-sm font-bold">
            <CheckCircle2 size={16} /> Saved!
          </motion.div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-gray-100/80 rounded-2xl mb-5 shrink-0">
        {TABS.map((tab) => (
          <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-200 ${activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            <tab.icon size={13} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1">
          <AnimatePresence mode="wait">
            {/* TAB 1 */}
            {activeTab === 'basic' && (
              <motion.div key="basic" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className={labelCls}>Project Title *</label>
                  <input name="title" required defaultValue={project.title} className={inputCls} placeholder="My Awesome Project" />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Slug (URL) *</label>
                  <input name="slug" required defaultValue={project.slug} className={inputCls} placeholder="my-awesome-project" />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Category *</label>
                  <select name="category" required defaultValue={project.category} className={inputCls}>
                    <option value="">Select...</option>
                    {['Web App','Mobile App','UI/UX Design','Branding','E-Commerce','API / Backend','Dashboard','Other'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Color Theme</label>
                  <select name="color" defaultValue={project.color} className={inputCls}>
                    {['blue','green','purple','orange','red','pink'].map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Tech Stack (comma separated)</label>
                  <input name="tech" defaultValue={project.tech?.join(', ')} className={inputCls} placeholder="React, Next.js, Tailwind" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className={labelCls}>Main Image (leave blank to keep current)</label>
                  <div className="relative border-2 border-dashed border-gray-200 hover:border-[#007AFF] bg-gray-50/50 rounded-2xl transition-colors group cursor-pointer overflow-hidden">
                    <input type="file" name="image" accept="image/*" onChange={handleImageChange}
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
                        <Upload size={24} className="mb-2" /><p className="text-sm font-semibold">Click to upload new image</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Order</label>
                  <input name="order" type="number" defaultValue={project.order ?? 0} className={inputCls} />
                </div>
              </motion.div>
            )}

            {/* TAB 2 */}
            {activeTab === 'content' && (
              <motion.div key="content" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }} className="space-y-4 pb-4">
                <div className="space-y-1.5">
                  <label className={labelCls}>Short Description *</label>
                  <textarea name="description" required rows={3} defaultValue={project.description} className={`${inputCls} resize-none`} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Long Description</label>
                  <textarea name="longDescription" rows={6} defaultValue={project.longDescription} className={`${inputCls} resize-none`} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Project Link (URL)</label>
                  <input name="link" type="url" defaultValue={project.link} className={inputCls} placeholder="https://" />
                </div>
              </motion.div>
            )}

            {/* TAB 3 */}
            {activeTab === 'crm' && (
              <motion.div key="crm" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                <div className="space-y-1.5 md:col-span-2 flex items-center gap-3 bg-gray-50/80 border border-gray-200/60 px-4 py-3 rounded-2xl">
                  <input type="checkbox" name="isPublic" id="isPublicEdit" defaultChecked={project.isPublic} className="w-4 h-4 rounded accent-[#007AFF]" />
                  <label htmlFor="isPublicEdit" className="text-sm font-semibold text-gray-700 cursor-pointer">Show on public portfolio</label>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Status</label>
                  <select name="status" defaultValue={project.status || 'Planning'} className={inputCls}>
                    {['Planning','In Progress','In Review','Completed','Cancelled'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Progress (0–100)</label>
                  <input name="progress" type="number" min="0" max="100" defaultValue={project.progress ?? 0} className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Payment Status</label>
                  <select name="paymentStatus" defaultValue={project.paymentStatus || 'Unpaid'} className={inputCls}>
                    {['Unpaid','Partial / DP','Paid'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Budget (USD)</label>
                  <input name="budget" type="number" min="0" step="0.01" defaultValue={project.budget} className={inputCls} placeholder="1500" />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Client Name</label>
                  <input name="clientName" defaultValue={project.clientName} className={inputCls} placeholder="Client Company" />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Deadline</label>
                  <input name="deadline" type="date" defaultValue={project.deadline?.slice(0, 10)} className={inputCls} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="shrink-0 pt-4 border-t border-gray-100 flex items-center gap-3">
          {error && <p className="text-[#FF3B30] text-sm font-semibold flex-1">{error}</p>}
          <div className="flex items-center gap-3 ml-auto">
            <Link href="/admin/projects" className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200/60 rounded-2xl transition-all hover:shadow-sm">
              Cancel
            </Link>
            <button type="submit" disabled={loading || success}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60">
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
