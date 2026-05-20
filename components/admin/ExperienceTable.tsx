'use client';

import { useState, useTransition } from 'react';
import { Edit2, Trash2, Loader2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { deleteExperience, updateExperience } from '@/app/admin/experience/actions';
import { useRouter } from 'next/navigation';

interface Experience {
  _id: string;
  title: string;
  company: string;
  year: string;
  description?: string;
  tech?: string[];
  order?: number;
}

const inputCls = "w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200/60 focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/10 rounded-xl outline-none transition-all text-gray-900 text-sm font-medium";

export function ExperienceTable({ experiences: initial }: { experiences: Experience[] }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string) => {
    if (deleteId !== id) {
      setDeleteId(id);
      setTimeout(() => setDeleteId(null), 3000);
      return;
    }
    startTransition(async () => {
      const res = await deleteExperience(id);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Experience deleted.');
        setItems(prev => prev.filter(e => e._id !== id));
        setDeleteId(null);
        router.refresh();
      }
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateExperience(editing._id, fd);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Experience updated!');
        setItems(prev => prev.map(item =>
          item._id === editing._id
            ? { ...item, title: fd.get('title') as string, company: fd.get('company') as string, year: fd.get('year') as string }
            : item
        ));
        setEditing(null);
        router.refresh();
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto flex-1 min-h-0 overflow-y-auto">
        <table className="w-full text-left text-sm text-gray-600 border-collapse min-w-[500px]">
          <thead className="bg-white/40 text-xs uppercase text-gray-400 border-b border-gray-100/50 backdrop-blur-md sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 font-semibold">Job Title</th>
              <th className="px-6 py-4 font-semibold">Company</th>
              <th className="px-6 py-4 font-semibold">Duration</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/50">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-16 text-center">
                  <p className="text-gray-400 font-medium">No experience records found.</p>
                </td>
              </tr>
            ) : items.map((exp, index) => (
              <motion.tr
                key={exp._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="hover:bg-white/50 transition-colors duration-200 group"
              >
                <td className="px-6 py-5 font-semibold text-gray-900 text-[15px]">{exp.title}</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1.5 rounded-full bg-gray-100/80 text-gray-700 text-xs font-semibold">
                    {exp.company}
                  </span>
                </td>
                <td className="px-6 py-5 font-mono text-[11px] text-gray-500">{exp.year}</td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditing(exp)}
                      className="p-2 bg-white rounded-xl text-gray-400 hover:text-[#007AFF] hover:shadow-md border border-gray-100 transition-all"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      disabled={isPending}
                      className={`p-2 rounded-xl border transition-all ${
                        deleteId === exp._id
                          ? 'bg-red-50 text-[#FF3B30] border-red-200 animate-pulse'
                          : 'bg-white text-gray-400 hover:text-[#FF3B30] hover:shadow-md border-gray-100'
                      }`}
                      title={deleteId === exp._id ? 'Click again to confirm' : 'Delete'}
                    >
                      {isPending && deleteId === exp._id
                        ? <Loader2 size={14} className="animate-spin" />
                        : <Trash2 size={14} />
                      }
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditing(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.15)] w-full max-w-lg p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Edit Experience</h2>
                <button onClick={() => setEditing(null)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Job Title *</label>
                  <input name="title" defaultValue={editing.title} required className={inputCls} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Company *</label>
                  <input name="company" defaultValue={editing.company} required className={inputCls} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Duration / Year *</label>
                  <input name="year" defaultValue={editing.year} placeholder="e.g. 2023 – Present" required className={inputCls} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Description</label>
                  <textarea name="description" defaultValue={editing.description || ''} rows={3} className={inputCls} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Tech Stack (comma-separated)</label>
                  <input name="tech" defaultValue={editing.tech?.join(', ') || ''} className={inputCls} />
                </div>
                <input type="hidden" name="order" value={editing.order ?? 0} />

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl transition-all disabled:opacity-60"
                  >
                    {isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                    {isPending ? 'Saving…' : 'Save Changes'}
                  </button>
                  <button type="button" onClick={() => setEditing(null)}
                    className="px-5 py-3 text-gray-500 hover:text-gray-900 font-semibold rounded-2xl hover:bg-gray-50 transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
