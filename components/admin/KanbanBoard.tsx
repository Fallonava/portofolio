'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderKanban, MoreHorizontal, ExternalLink, CheckCircle2 } from 'lucide-react';
import { QuickStatusEdit } from '@/components/admin/QuickStatusEdit';
import Link from 'next/link';

const COLUMNS = [
  { id: 'Planning',    label: 'Planning',    color: '#FF9500', bg: 'bg-orange-50',  dot: 'bg-[#FF9500]' },
  { id: 'In Progress', label: 'In Progress', color: '#007AFF', bg: 'bg-blue-50',    dot: 'bg-[#007AFF]' },
  { id: 'In Review',   label: 'In Review',   color: '#AF52DE', bg: 'bg-purple-50',  dot: 'bg-[#AF52DE]' },
  { id: 'Completed',   label: 'Completed',   color: '#34C759', bg: 'bg-green-50',   dot: 'bg-[#34C759]' },
  { id: 'Cancelled',   label: 'Cancelled',   color: '#FF3B30', bg: 'bg-red-50',     dot: 'bg-[#FF3B30]' },
];

const PAYMENT_STYLE: Record<string, string> = {
  'Paid':         'bg-[#34C759]/15 text-[#34C759]',
  'Partial / DP': 'bg-[#FF9500]/15 text-[#FF9500]',
  'Unpaid':       'bg-[#FF3B30]/15 text-[#FF3B30]',
};

export interface KanbanProject {
  _id: string;
  title: string;
  category?: string;
  status?: string;
  progress?: number;
  paymentStatus?: string;
  budget?: number;
  isPublic?: boolean;
}

export function KanbanBoard({ projects, onSelect }: { projects: KanbanProject[]; onSelect?: (p: KanbanProject) => void }) {
  const [localProjects, setLocalProjects] = useState(projects);

  const getByStatus = (status: string) =>
    localProjects.filter((p) => (p.status || 'Planning') === status);

  return (
    <div className="flex gap-4 h-full overflow-x-auto pb-2 overscroll-x-contain">
      {COLUMNS.map((col) => {
        const cards = getByStatus(col.id);
        return (
          <div key={col.id} className="flex flex-col min-w-[240px] flex-shrink-0 h-full">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3 px-1 shrink-0">
              <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
              <span className="text-[12px] font-bold text-gray-700 uppercase tracking-wider">{col.label}</span>
              <span className="ml-auto text-[11px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {cards.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-3 pr-1">
              <AnimatePresence initial={false}>
                {cards.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center gap-2"
                  >
                    <FolderKanban size={20} className="text-gray-300" />
                    <p className="text-[11px] font-semibold text-gray-300 text-center">No projects</p>
                  </motion.div>
                ) : (
                  cards.map((project, i) => (
                    <motion.div
                      key={project._id}
                      layout
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      onClick={() => onSelect?.(project)}
                      className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
                    >
                      {/* Card Top */}
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-lg">
                          {project.category || 'Web'}
                        </span>
                        <div className="flex items-center gap-1">
                          {project.isPublic && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" title="Public" />
                          )}
                          <Link
                            href={`/admin/projects/${project._id}`}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-gray-50 transition-all"
                          >
                            <ExternalLink size={12} className="text-gray-400" />
                          </Link>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[14px] font-bold text-gray-900 mb-3 leading-snug line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-semibold text-gray-400">Progress</span>
                          <span className="text-[10px] font-bold" style={{ color: col.color }}>{project.progress ?? 0}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress ?? 0}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ background: col.color }}
                          />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        {project.paymentStatus ? (
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${PAYMENT_STYLE[project.paymentStatus] ?? 'bg-gray-100 text-gray-500'}`}>
                            {project.paymentStatus}
                          </span>
                        ) : <span />}

                        {project.budget && project.budget > 0 ? (
                          <span className="text-[11px] font-bold text-gray-600">
                            ${project.budget.toLocaleString()}
                          </span>
                        ) : null}
                      </div>

                      {/* Quick Status Edit — shows on hover */}
                      <div className="mt-3 pt-3 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <QuickStatusEdit id={project._id} initialStatus={project.status || 'Planning'} />
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

