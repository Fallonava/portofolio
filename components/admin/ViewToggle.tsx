'use client';

import { useState } from 'react';
import { LayoutGrid, Table2, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KanbanBoard } from '@/components/admin/KanbanBoard';
import { QuickStatusEdit } from '@/components/admin/QuickStatusEdit';
import { ProjectSlidePanel, type ProjectDetail } from '@/components/admin/ProjectSlidePanel';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deleteProject } from '@/app/admin/projects/actions';

const PAYMENT_STYLE: Record<string, string> = {
  'Paid':         'bg-[#34C759]/15 text-[#34C759] border-[#34C759]/20',
  'Partial / DP': 'bg-[#FF9500]/15 text-[#FF9500] border-[#FF9500]/20',
  'Unpaid':       'bg-[#FF3B30]/15 text-[#FF3B30] border-[#FF3B30]/20',
};

export function ProjectsView({ projects }: { projects: ProjectDetail[] }) {
  const [view, setView]         = useState<'table' | 'kanban'>('table');
  const [selected, setSelected] = useState<ProjectDetail | null>(null);

  return (
    <>
      <div className="flex flex-col gap-4 h-full flex-1 min-h-0">

        {/* View Selector Bar */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 p-1 bg-gray-100/80 rounded-xl">
            {([['table', Table2, 'Table'], ['kanban', LayoutGrid, 'Kanban']] as const).map(([v, Icon, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${view === v ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            {view === 'kanban' ? 'Click badge to change status' : `${projects.length} project${projects.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {view === 'table' ? (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 min-h-0 bg-white/70 backdrop-blur-3xl border border-white rounded-[28px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col"
            >
              <div className="overflow-x-auto flex-1 min-h-0 overflow-y-auto">
                <table className="w-full text-left text-sm text-gray-600 border-collapse min-w-[680px]">
                  <thead className="sticky top-0 bg-white/95 backdrop-blur-md text-xs uppercase text-gray-400 border-b border-gray-100 z-10">
                    <tr>
                      <th className="px-6 py-4 font-bold">Project</th>
                      <th className="px-6 py-4 font-bold">Category</th>
                      <th className="px-6 py-4 font-bold">Visibility</th>
                      <th className="px-6 py-4 font-bold">Status & Progress</th>
                      <th className="px-6 py-4 font-bold">Payment</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100/60">
                    {projects.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-8 py-20 text-center">
                          <p className="text-gray-400 font-semibold">No projects found.</p>
                          <p className="text-gray-300 text-xs mt-1">Create your first project to get started.</p>
                        </td>
                      </tr>
                    ) : (
                      projects.map((project, index) => (
                        <motion.tr
                          key={project._id}
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.04 }}
                          onClick={() => setSelected(project)}
                          className="hover:bg-blue-50/30 transition-colors duration-200 group cursor-pointer"
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900 text-[14px] hover:text-[#007AFF] transition-colors">
                            {project.title}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full bg-gray-100/80 text-gray-600 text-[11px] font-bold uppercase tracking-wider">
                              {project.category || '—'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {project.isPublic
                              ? <span className="px-2.5 py-1 rounded-full bg-blue-50/80 text-[#007AFF] border border-blue-100/50 text-[11px] font-bold">Public</span>
                              : <span className="px-2.5 py-1 rounded-full bg-gray-100/80 text-gray-400 border border-gray-200/50 text-[11px] font-bold">Private</span>
                            }
                          </td>
                          <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col gap-1.5">
                              <QuickStatusEdit id={project._id} initialStatus={project.status || 'Planning'} />
                              <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${project.progress || 0}%` }}
                                  transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.05 }}
                                  className={`h-full rounded-full ${project.status === 'Completed' ? 'bg-[#34C759]' : project.status === 'Cancelled' ? 'bg-[#FF3B30]' : 'bg-[#007AFF]'}`}
                                />
                              </div>
                              <span className="text-[10px] text-gray-400 font-semibold">{project.progress ?? 0}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${PAYMENT_STYLE[project.paymentStatus || 'Unpaid'] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                              {project.paymentStatus || 'Unpaid'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link
                                href={`/admin/projects/${project._id}/edit`}
                                className="p-2 bg-white rounded-xl text-gray-400 hover:text-[#007AFF] hover:shadow-md border border-gray-100 transition-all block"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Edit2 size={14} />
                              </Link>
                              <div onClick={(e) => e.stopPropagation()}>
                                <DeleteButton 
                                  id={project._id}
                                  label={project.title}
                                  onDelete={deleteProject}
                                />
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="kanban"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 min-h-0"
            >
              <KanbanBoard projects={projects.map(p => ({ ...p, category: p.category ?? '' }))} onSelect={setSelected} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide Panel */}
      <ProjectSlidePanel project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
