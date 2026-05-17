'use client';

import { motion } from 'framer-motion';
import { FolderKanban, Briefcase, MessageSquareQuote, Clock } from 'lucide-react';

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  project:     { label: 'Project',     color: 'text-[#007AFF]', bg: 'bg-blue-50',   icon: FolderKanban },
  experience:  { label: 'Experience',  color: 'text-[#AF52DE]', bg: 'bg-purple-50', icon: Briefcase },
  testimonial: { label: 'Testimonial', color: 'text-[#FF9500]', bg: 'bg-orange-50', icon: MessageSquareQuote },
};

const STATUS_COLOR: Record<string, string> = {
  'Completed':   'bg-[#34C759]/15 text-[#34C759]',
  'In Progress': 'bg-[#007AFF]/15 text-[#007AFF]',
  'In Review':   'bg-[#AF52DE]/15 text-[#AF52DE]',
  'Planning':    'bg-[#FF9500]/15 text-[#FF9500]',
  'Cancelled':   'bg-[#FF3B30]/15 text-[#FF3B30]',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export interface ActivityItem {
  _id: string;
  _type: 'project' | 'experience' | 'testimonial';
  _updatedAt: string;
  _createdAt: string;
  title?: string;
  name?: string;
  status?: string;
}

export function ActivityFeed({ activities }: { activities: ActivityItem[] }) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-8">
        <Clock size={28} className="text-gray-200" />
        <p className="text-gray-400 text-sm font-medium">No activity yet</p>
        <p className="text-gray-300 text-xs">Your recent changes will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 overflow-y-auto h-full overscroll-contain pr-1">
      {activities.map((item, i) => {
        const cfg = TYPE_CONFIG[item._type] ?? TYPE_CONFIG.project;
        const Icon = cfg.icon;
        const displayName = item.title ?? item.name ?? 'Untitled';
        const isNew = Date.now() - new Date(item._createdAt).getTime() < 60_000 * 10; // < 10 min

        return (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50/80 transition-colors duration-200 group cursor-default"
          >
            {/* Icon */}
            <div className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center ${cfg.bg}`}>
              <Icon size={15} className={cfg.color} strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-semibold text-gray-900 truncate">{displayName}</p>
                {isNew && (
                  <span className="shrink-0 text-[9px] font-black text-[#007AFF] bg-[#007AFF]/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">New</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
                {item.status && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${STATUS_COLOR[item.status] ?? 'bg-gray-100 text-gray-500'}`}>
                    {item.status}
                  </span>
                )}
              </div>
            </div>

            {/* Time */}
            <span className="shrink-0 text-[11px] font-medium text-gray-400 mt-0.5">{timeAgo(item._updatedAt)}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
