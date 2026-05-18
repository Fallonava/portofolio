'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ExternalLink, Globe, EyeOff, DollarSign,
  TrendingUp, Calendar, Tag, Code2, FileText, Copy, Check, Edit2
} from 'lucide-react';
import { QuickStatusEdit } from '@/components/admin/QuickStatusEdit';
import { MilestoneTracker } from '@/components/admin/MilestoneTracker';
import Link from 'next/link';

const PAYMENT_STYLE: Record<string, string> = {
  'Paid':         'bg-[#34C759]/15 text-[#34C759]',
  'Partial / DP': 'bg-[#FF9500]/15 text-[#FF9500]',
  'Unpaid':       'bg-[#FF3B30]/15 text-[#FF3B30]',
};

export interface ProjectDetail {
  _id: string;
  title: string;
  slug?: string;
  category?: string;
  description?: string;
  longDescription?: string;
  status?: string;
  progress?: number;
  paymentStatus?: string;
  budget?: number;
  deadline?: string;
  clientName?: string;
  link?: string;
  isPublic?: boolean;
  tech?: string[];
  imageUrl?: string;
}

interface Props {
  project: ProjectDetail | null;
  onClose: () => void;
}

export function ProjectSlidePanel({ project, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const copyProposalLink = () => {
    if (!project) return;
    const slug = (project as any).slug || project._id;
    const url = `${window.location.origin}/proposal/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] z-50 flex flex-col"
          >
            <div className="h-full bg-white/95 backdrop-blur-3xl border-l border-gray-200/60 shadow-[−20px_0_60px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden">

              {/* Header */}
              <div className="shrink-0 p-6 border-b border-gray-100 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-lg">
                      {project.category || 'Web'}
                    </span>
                    {project.isPublic ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#007AFF] bg-blue-50 px-2 py-1 rounded-lg">
                        <Globe size={9} /> Public
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                        <EyeOff size={9} /> Private
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">{project.title}</h2>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/projects/${project._id}/edit`}
                    onClick={onClose}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-[#007AFF]/10 text-gray-400 hover:text-[#007AFF] border border-gray-200/60 transition-all"
                    title="Edit project"
                  >
                    <Edit2 size={14} />
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">

                {/* Image */}
                {project.imageUrl && (
                  <div className="w-full h-48 bg-gray-100 overflow-hidden">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-6 space-y-6">

                  {/* Status + Progress */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</p>
                    <QuickStatusEdit id={project._id} initialStatus={project.status || 'Planning'} />
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[11px] font-semibold text-gray-500">Progress</span>
                        <span className="text-[11px] font-bold text-[#007AFF]">{project.progress ?? 0}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress ?? 0}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                          className="h-full rounded-full bg-[#007AFF]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CRM Info */}
                  <div className="grid grid-cols-2 gap-3">
                    {project.budget ? (
                      <div className="bg-gray-50 rounded-2xl p-3.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <DollarSign size={12} className="text-[#34C759]" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Budget</span>
                        </div>
                        <p className="text-[15px] font-bold text-gray-900">${project.budget.toLocaleString()}</p>
                      </div>
                    ) : null}

                    {project.paymentStatus && (
                      <div className="bg-gray-50 rounded-2xl p-3.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <TrendingUp size={12} className="text-[#FF9500]" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Payment</span>
                        </div>
                        <span className={`text-[12px] font-bold px-2 py-1 rounded-full ${PAYMENT_STYLE[project.paymentStatus] ?? ''}`}>
                          {project.paymentStatus}
                        </span>
                      </div>
                    )}

                    {project.clientName && (
                      <div className="bg-gray-50 rounded-2xl p-3.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Tag size={12} className="text-[#AF52DE]" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Client</span>
                        </div>
                        <p className="text-[13px] font-bold text-gray-900">{project.clientName}</p>
                      </div>
                    )}

                    {project.deadline && (
                      <div className="bg-gray-50 rounded-2xl p-3.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Calendar size={12} className="text-[#FF3B30]" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deadline</span>
                        </div>
                        <p className="text-[13px] font-bold text-gray-900">
                          {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {project.description && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <FileText size={12} className="text-gray-400" />
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</p>
                      </div>
                      <p className="text-[13px] text-gray-600 leading-relaxed font-medium">{project.description}</p>
                    </div>
                  )}

                  {/* Tech Stack */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <Code2 size={12} className="text-gray-400" />
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tech Stack</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="px-3 py-1.5 bg-gray-900 text-white text-[11px] font-bold rounded-xl">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Milestone Tracker */}
                  <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-4">
                    <MilestoneTracker projectId={project._id} />
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="shrink-0 p-5 border-t border-gray-100 flex flex-col gap-2">
                {/* Copy Proposal Link */}
                <button
                  onClick={copyProposalLink}
                  className={`w-full flex items-center justify-center gap-2 py-3 font-bold rounded-2xl transition-all text-sm ${
                    copied
                      ? 'bg-[#34C759]/15 text-[#34C759] border border-[#34C759]/20'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200/60'
                  }`}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? 'Link Copied!' : 'Copy Proposal Link'}
                </button>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99] text-sm"
                  >
                    <ExternalLink size={15} />
                    View Live Project
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
