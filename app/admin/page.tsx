import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import {
  Briefcase, FolderKanban, MessageSquareQuote,
  TrendingUp, DollarSign, AlertCircle, CheckCircle2,
  Plus, ArrowRight, Zap, Clock3, BarChart2
} from 'lucide-react';
import { MotionDiv } from '@/components/ui/motion';
import { AnimatedCounter } from '@/components/admin/AnimatedCounter';
import { ActivityFeed } from '@/components/admin/ActivityFeed';
import type { ActivityItem } from '@/components/admin/ActivityFeed';

export const metadata = { title: 'Overview | Admin Dashboard' };
export const revalidate = 30;

// Helper: greeting by hour
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default async function AdminDashboard() {
  const [projects, experiences, testimonials, recentActivity] = await Promise.all([
    client.fetch(`*[_type == "project"] | order(order asc) {
      _id, title, category, isPublic, status, progress, paymentStatus, budget, deadline
    }`),
    client.fetch(`*[_type == "experience"] | order(order asc) { _id }`),
    client.fetch(`*[_type == "testimonial"] | order(order asc) { _id }`),
    client.fetch<ActivityItem[]>(`
      *[_type in ["project", "experience", "testimonial"]] | order(_updatedAt desc) [0...8] {
        _id, _type, _updatedAt, _createdAt, title, name, status
      }
    `),
  ]);

  const now            = new Date();
  const totalProjects  = projects.length;
  const activeProjects = projects.filter((p: any) => p.status === 'In Progress').length;
  const inReview       = projects.filter((p: any) => p.status === 'In Review').length;
  const overdue        = projects.filter((p: any) => p.deadline && new Date(p.deadline) < now && p.status !== 'Completed').length;
  const unpaidCount    = projects.filter((p: any) => p.paymentStatus === 'Unpaid' || !p.paymentStatus).length;
  const totalBudget    = projects.reduce((s: number, p: any) => s + (p.budget ?? 0), 0);
  const paidRevenue    = projects.filter((p: any) => p.paymentStatus === 'Paid').reduce((s: number, p: any) => s + (p.budget ?? 0), 0);

  // Pinned = In Progress projects sorted by progress desc
  const pinnedProjects = projects
    .filter((p: any) => p.status === 'In Progress' || p.status === 'In Review')
    .slice(0, 4);

  const STATUS_COLOR: Record<string, string> = {
    'Planning':    'bg-gray-100 text-gray-600',
    'In Progress': 'bg-[#007AFF]/10 text-[#007AFF]',
    'In Review':   'bg-[#AF52DE]/10 text-[#AF52DE]',
    'Completed':   'bg-[#34C759]/10 text-[#34C759]',
    'Cancelled':   'bg-red-50 text-red-500',
  };

  return (
    <div className="h-full flex flex-col gap-4">

      {/* ── Greeting Header ── */}
      <MotionDiv
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-start justify-between shrink-0"
      >
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
            {getGreeting()} 👋
          </p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Command Center</h1>
          <p className="text-gray-400 text-sm font-medium mt-0.5">
            {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/analytics"
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-gray-600 bg-white/70 border border-gray-200/60 rounded-xl hover:border-gray-300 transition-all hover:shadow-sm">
            <BarChart2 size={14} /> Analytics
          </Link>
          <Link href="/admin/projects/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <Plus size={14} strokeWidth={2.5} /> New Project
          </Link>
        </div>
      </MotionDiv>

      {/* ── iOS Bento Status Tiles (3 live tiles) ── */}
      <div className="grid grid-cols-3 gap-3 shrink-0">

        {/* Tile 1: Active Now */}
        <MotionDiv initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}>
          <Link href="/admin/projects" className="group block">
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-[#007AFF]/10 text-[#007AFF] rounded-xl flex items-center justify-center">
                  <Zap size={17} strokeWidth={2} />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#34C759] bg-[#34C759]/10 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-[#34C759] rounded-full animate-pulse" />LIVE
                </span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Now</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight leading-none mt-1">
                <AnimatedCounter target={activeProjects} duration={900} />
              </p>
              <p className="text-[11px] text-gray-400 font-medium mt-1">{inReview} in review</p>
            </div>
          </Link>
        </MotionDiv>

        {/* Tile 2: Overdue */}
        <MotionDiv initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          <div className={`rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 ${overdue > 0 ? 'bg-[#FF3B30]/5 border border-[#FF3B30]/15' : 'bg-white/80 backdrop-blur-xl border border-white'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${overdue > 0 ? 'bg-[#FF3B30]/10 text-[#FF3B30]' : 'bg-[#34C759]/10 text-[#34C759]'}`}>
                {overdue > 0 ? <AlertCircle size={17} strokeWidth={2} /> : <CheckCircle2 size={17} strokeWidth={2} />}
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Overdue</p>
            <p className={`text-3xl font-black tracking-tight leading-none mt-1 ${overdue > 0 ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
              <AnimatedCounter target={overdue} duration={800} />
            </p>
            <p className="text-[11px] text-gray-400 font-medium mt-1">{overdue > 0 ? 'Needs attention' : 'All on schedule ✓'}</p>
          </div>
        </MotionDiv>

        {/* Tile 3: Unpaid */}
        <MotionDiv initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
          <Link href="/admin/analytics" className="group block">
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-[#FF9500]/10 text-[#FF9500] rounded-xl flex items-center justify-center">
                  <DollarSign size={17} strokeWidth={2} />
                </div>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Unpaid</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight leading-none mt-1">
                <AnimatedCounter target={unpaidCount} duration={850} />
              </p>
              <p className="text-[11px] text-gray-400 font-medium mt-1">
                ${paidRevenue.toLocaleString()} collected
              </p>
            </div>
          </Link>
        </MotionDiv>
      </div>

      {/* ── Main Content: Pinned Projects + Activity Feed ── */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Pinned Active Projects (3/5) */}
        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="lg:col-span-3 bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col min-h-0"
        >
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">In Progress</p>
              <h3 className="text-[15px] font-bold text-gray-900">Active Projects</h3>
            </div>
            <Link href="/admin/projects" className="flex items-center gap-1 text-[11px] font-bold text-[#007AFF] hover:opacity-70 transition-opacity">
              See all <ArrowRight size={11} />
            </Link>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-2">
            {pinnedProjects.length > 0 ? pinnedProjects.map((p: any) => (
              <Link key={p._id} href={`/admin/projects`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50/60 hover:bg-gray-50 border border-gray-100/50 transition-all group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLOR[p.status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {p.status}
                    </span>
                    {p.category && <span className="text-[10px] text-gray-400 font-semibold">{p.category}</span>}
                  </div>
                  <p className="text-[13px] font-bold text-gray-900 truncate group-hover:text-[#007AFF] transition-colors">{p.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#007AFF] rounded-full transition-all duration-700"
                        style={{ width: `${p.progress ?? 0}%` }} />
                    </div>
                    <span className="text-[11px] font-bold text-[#007AFF] w-8 text-right">{p.progress ?? 0}%</span>
                  </div>
                </div>
                {p.budget && (
                  <div className="shrink-0 text-right">
                    <p className="text-[12px] font-bold text-gray-900">${p.budget.toLocaleString()}</p>
                    <p className={`text-[10px] font-bold mt-0.5 ${p.paymentStatus === 'Paid' ? 'text-[#34C759]' : p.paymentStatus === 'Partial / DP' ? 'text-[#FF9500]' : 'text-gray-400'}`}>
                      {p.paymentStatus ?? 'Unpaid'}
                    </p>
                  </div>
                )}
              </Link>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-3">
                  <FolderKanban size={22} className="text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm font-semibold">No active projects</p>
                <Link href="/admin/projects/new" className="mt-3 text-[12px] font-bold text-[#007AFF] hover:opacity-70 transition-opacity flex items-center gap-1">
                  <Plus size={12} /> Create first project
                </Link>
              </div>
            )}
          </div>

          {/* Quick stats footer */}
          <div className="shrink-0 mt-3 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2">
            {[
              { label: 'Projects', count: totalProjects, href: '/admin/projects', icon: FolderKanban },
              { label: 'Career',   count: experiences.length,  href: '/admin/experience',  icon: Briefcase },
              { label: 'Reviews',  count: testimonials.length, href: '/admin/testimonials', icon: MessageSquareQuote },
            ].map(item => (
              <Link key={item.label} href={item.href}
                className="flex flex-col items-center gap-0.5 py-2 rounded-xl hover:bg-gray-50 transition-colors group">
                <item.icon size={13} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                <span className="text-sm font-bold text-gray-900">{item.count}</span>
                <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{item.label}</span>
              </Link>
            ))}
          </div>
        </MotionDiv>

        {/* Activity Stream (2/5) */}
        <MotionDiv
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col min-h-0"
        >
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live</p>
              <h3 className="text-[15px] font-bold text-gray-900 flex items-center gap-1.5">
                Activity
                <span className="w-1.5 h-1.5 bg-[#34C759] rounded-full animate-pulse" />
              </h3>
            </div>
            <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center">
              <Clock3 size={14} className="text-gray-400" />
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ActivityFeed activities={recentActivity} />
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
