'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { createExperience } from '../actions';
import { MotionDiv } from '@/components/ui/motion';

const inputCls = "w-full px-4 py-3 bg-gray-50/80 border border-gray-200/60 focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 rounded-2xl outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-gray-900 placeholder-gray-400 font-medium text-sm";
const labelCls = "text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block";

export default function NewExperiencePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    const result = await createExperience(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/admin/experience');
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">

      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 shrink-0"
      >
        <Link href="/admin/experience" className="p-2.5 bg-white/70 backdrop-blur-md rounded-xl border border-white/60 text-gray-500 hover:text-gray-900 hover:bg-white transition-all shadow-sm">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Add Experience</h1>
          <p className="text-gray-400 text-xs font-medium mt-0.5">Record a new role in your career journey</p>
        </div>
      </MotionDiv>

      {error && (
        <div className="shrink-0 px-4 py-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-medium text-sm">
          {error}
        </div>
      )}

      {/* Form Card */}
      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 min-h-0 bg-white/80 backdrop-blur-3xl border border-white rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="h-full flex flex-col p-6 md:p-8 gap-4">
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-1.5">
                <label className={labelCls}>Job Title *</label>
                <input name="title" required className={inputCls} placeholder="Senior Frontend Engineer" />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Company *</label>
                <input name="company" required className={inputCls} placeholder="TechCorp Inc." />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Duration / Year *</label>
                <input name="year" required className={inputCls} placeholder="2024 - Present" />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Order (Sorting)</label>
                <input name="order" type="number" defaultValue={0} className={inputCls} />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className={labelCls}>Description *</label>
                <textarea name="description" required rows={5}
                  className={`${inputCls} resize-none`}
                  placeholder="What were your key responsibilities and achievements?" />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className={labelCls}>Tech Stack (Comma separated)</label>
                <input name="tech" className={inputCls} placeholder="TypeScript, React, Node.js" />
              </div>

            </div>
          </div>

          {/* Submit */}
          <div className="shrink-0 pt-2 border-t border-gray-100">
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#007AFF] hover:bg-[#0062CC] text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_6px_16px_rgba(0,122,255,0.25)] transition-all duration-300 disabled:opacity-70 hover:scale-[1.01] active:scale-[0.99] text-sm"
            >
              {loading ? <><Loader2 size={18} className="animate-spin" />Saving...</> : <><Save size={18} />Save Experience Record</>}
            </button>
          </div>
        </form>
      </MotionDiv>
    </div>
  );
}
