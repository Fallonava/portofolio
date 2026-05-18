'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, CheckCircle2, Circle, Flag } from 'lucide-react';

interface Milestone {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'project-milestones';

function loadMilestones(projectId: string): Milestone[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    return all[projectId] ?? [];
  } catch { return []; }
}

function saveMilestones(projectId: string, milestones: Milestone[]) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    all[projectId] = milestones;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {}
}

export function MilestoneTracker({ projectId }: { projectId: string }) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [input, setInput]           = useState('');
  const [mounted, setMounted]       = useState(false);

  useEffect(() => {
    setMilestones(loadMilestones(projectId));
    setMounted(true);
  }, [projectId]);

  const sync = (updated: Milestone[]) => {
    setMilestones(updated);
    saveMilestones(projectId, updated);
  };

  const addMilestone = () => {
    if (!input.trim()) return;
    sync([...milestones, { id: Date.now().toString(), text: input.trim(), done: false, createdAt: new Date().toISOString() }]);
    setInput('');
  };

  const toggleMilestone = (id: string) =>
    sync(milestones.map(m => m.id === id ? { ...m, done: !m.done } : m));

  const deleteMilestone = (id: string) =>
    sync(milestones.filter(m => m.id !== id));

  const done  = milestones.filter(m => m.done).length;
  const total = milestones.length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  if (!mounted) return null;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Flag size={12} className="text-gray-400" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Milestones</p>
        {total > 0 && (
          <span className="ml-auto text-[11px] font-bold text-gray-500">
            {done}/{total} · {pct}%
          </span>
        )}
      </div>

      {/* Progress */}
      {total > 0 && (
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`h-full rounded-full ${pct === 100 ? 'bg-[#34C759]' : 'bg-[#007AFF]'}`}
          />
        </div>
      )}

      {/* List */}
      <div className="space-y-1.5 max-h-[180px] overflow-y-auto overscroll-contain">
        <AnimatePresence initial={false}>
          {milestones.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2.5 group"
            >
              <button onClick={() => toggleMilestone(m.id)} className="shrink-0 transition-transform hover:scale-110">
                {m.done
                  ? <CheckCircle2 size={16} className="text-[#34C759]" />
                  : <Circle size={16} className="text-gray-300 group-hover:text-gray-400" />
                }
              </button>
              <span className={`flex-1 text-[12px] font-medium leading-snug ${m.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {m.text}
              </span>
              <button onClick={() => deleteMilestone(m.id)} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-[#FF3B30]">
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {milestones.length === 0 && (
          <p className="text-[11px] text-gray-300 font-medium text-center py-2">No milestones yet</p>
        )}
      </div>

      {/* Add Input */}
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addMilestone(); } }}
          placeholder="Add milestone..."
          className="flex-1 text-[12px] font-medium px-3 py-2 bg-gray-50 border border-gray-200/60 focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/10 rounded-xl outline-none transition-all text-gray-900 placeholder-gray-400"
        />
        <button
          onClick={addMilestone}
          disabled={!input.trim()}
          className="w-8 h-8 shrink-0 flex items-center justify-center bg-gray-900 text-white rounded-xl hover:bg-black disabled:opacity-40 transition-all hover:scale-105"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
