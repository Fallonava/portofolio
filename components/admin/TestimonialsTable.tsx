'use client';

import { useState, useTransition } from 'react';
import { Edit2, Trash2, Loader2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { deleteTestimonial, updateTestimonial } from '@/app/admin/testimonials/actions';
import { useRouter } from 'next/navigation';

interface Testimonial {
  _id: string;
  name: string;
  designation: string;
  content: string;
  order?: number;
}

const inputCls = "w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200/60 focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/10 rounded-xl outline-none transition-all text-gray-900 text-sm font-medium";

export function TestimonialsTable({ testimonials: initial }: { testimonials: Testimonial[] }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<Testimonial | null>(null);
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
      const res = await deleteTestimonial(id);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Testimonial deleted.');
        setItems(prev => prev.filter(t => t._id !== id));
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
      const res = await updateTestimonial(editing._id, fd);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Testimonial updated!');
        setItems(prev => prev.map(item =>
          item._id === editing._id
            ? { ...item, name: fd.get('name') as string, designation: fd.get('designation') as string, content: fd.get('content') as string }
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
        <table className="w-full text-left text-sm text-gray-600 border-collapse min-w-[480px]">
          <thead className="bg-white/40 text-xs uppercase text-gray-400 border-b border-gray-100/50 backdrop-blur-md sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 font-semibold">Client Name</th>
              <th className="px-6 py-4 font-semibold">Designation</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/50">
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-8 py-16 text-center">
                  <p className="text-gray-400 font-medium">No testimonials found.</p>
                </td>
              </tr>
            ) : items.map((test, index) => (
              <motion.tr
                key={test._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="hover:bg-white/50 transition-colors duration-200 group"
              >
                <td className="px-6 py-5 font-semibold text-gray-900 text-[15px]">{test.name}</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1.5 rounded-full bg-gray-100/80 text-gray-700 text-xs font-semibold">
                    {test.designation}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditing(test)}
                      className="p-2 bg-white rounded-xl text-gray-400 hover:text-[#007AFF] hover:shadow-md border border-gray-100 transition-all"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(test._id)}
                      disabled={isPending}
                      className={`p-2 rounded-xl border transition-all ${
                        deleteId === test._id
                          ? 'bg-red-50 text-[#FF3B30] border-red-200 animate-pulse'
                          : 'bg-white text-gray-400 hover:text-[#FF3B30] hover:shadow-md border-gray-100'
                      }`}
                      title={deleteId === test._id ? 'Click again to confirm' : 'Delete'}
                    >
                      {isPending && deleteId === test._id
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
                <h2 className="text-xl font-bold text-gray-900">Edit Testimonial</h2>
                <button onClick={() => setEditing(null)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Client Name *</label>
                  <input name="name" defaultValue={editing.name} required className={inputCls} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Designation *</label>
                  <input name="designation" defaultValue={editing.designation} required className={inputCls} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Content *</label>
                  <textarea name="content" defaultValue={editing.content} rows={4} required className={inputCls} />
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
