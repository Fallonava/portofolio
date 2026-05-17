'use client';

import { useState, useRef, useEffect } from 'react';
import { updateProjectStatus } from '@/app/admin/projects/actions';
import { ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUSES = ['Planning', 'In Progress', 'In Review', 'Completed', 'Cancelled'];

const STATUS_STYLES: Record<string, string> = {
  'Completed':   'bg-[#34C759]/15 text-[#34C759] border-[#34C759]/20',
  'In Progress': 'bg-[#007AFF]/15 text-[#007AFF] border-[#007AFF]/20',
  'In Review':   'bg-[#AF52DE]/15 text-[#AF52DE] border-[#AF52DE]/20',
  'Planning':    'bg-[#FF9500]/15 text-[#FF9500] border-[#FF9500]/20',
  'Cancelled':   'bg-[#FF3B30]/15 text-[#FF3B30] border-[#FF3B30]/20',
};

const STATUS_DOT: Record<string, string> = {
  'Completed':   'bg-[#34C759]',
  'In Progress': 'bg-[#007AFF]',
  'In Review':   'bg-[#AF52DE]',
  'Planning':    'bg-[#FF9500]',
  'Cancelled':   'bg-[#FF3B30]',
};

export function QuickStatusEdit({ id, initialStatus }: { id: string; initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus || 'Planning');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = async (s: string) => {
    setOpen(false);
    if (s === status) return;
    setLoading(true);
    const prev = status;
    setStatus(s); // optimistic
    const res = await updateProjectStatus(id, s);
    if (res?.error) setStatus(prev); // rollback
    setLoading(false);
  };

  const style = STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-500 border-gray-200';
  const dot = STATUS_DOT[status] ?? 'bg-gray-400';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-200 hover:opacity-80 active:scale-95 ${style} ${loading ? 'opacity-60' : ''}`}
      >
        {loading
          ? <Loader2 size={10} className="animate-spin" />
          : <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        }
        {status}
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1.5 left-0 z-50 min-w-[152px] bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-1.5 overflow-hidden"
          >
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => handleSelect(s)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-semibold transition-colors duration-150 hover:bg-gray-50 ${s === status ? 'bg-gray-50' : ''}`}
              >
                <span className={`w-2 h-2 rounded-full ${STATUS_DOT[s] ?? 'bg-gray-400'}`} />
                <span className={s === status ? 'text-gray-900 font-bold' : 'text-gray-600'}>{s}</span>
                {s === status && <span className="ml-auto text-[#007AFF] text-[10px] font-black">✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
