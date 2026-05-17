import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import {
  Briefcase, FolderKanban, MessageSquareQuote,
  TrendingUp, DollarSign, CheckCircle2, Clock, Plus, Activity
} from 'lucide-react';
import { MotionDiv } from '@/components/ui/motion';
import { StatusDonut, ProgressBars, BudgetArea, StatusLegend } from '@/components/admin/DashboardCharts';
import { AnimatedCounter } from '@/components/admin/AnimatedCounter';
import { ActivityFeed } from '@/components/admin/ActivityFeed';
import type { ActivityItem } from '@/components/admin/ActivityFeed';

export const metadata = { title: 'Overview | Admin Dashboard' };
export const revalidate = 30;

export default async function AdminDashboard() {
  const [projects, experiences, testimonials, recentActivity] = await Promise.all([
    client.fetch(`*[_type == "project"] | order(order asc) {
      _id, title, category, isPublic, status, progress, paymentStatus, budget
    }`),
    client.fetch(`*[_type == "experience"] | order(order asc) { _id }`),
    client.fetch(`*[_type == "testimonial"] | order(order asc) { _id }`),
    client.fetch<ActivityItem[]>(`
      *[_type in ["project", "experience", "testimonial"]] | order(_updatedAt desc) [0...12] {
        _id, _type, _updatedAt, _createdAt, title, name, status
      }
    `),
  ]);

  const totalProjects  = projects.length;
  const publicProjects = projects.filter((p: any) => p.isPublic).length;
  const completedCount = projects.filter((p: any) => p.status === 'Completed').length;
  const totalBudget    = projects.reduce((s: number, p: any) => s + (p.budget ?? 0), 0);
  const paidRevenue    = projects.filter((p: any) => p.paymentStatus === 'Paid').reduce((s: number, p: any) => s + (p.budget ?? 0), 0);
  const avgProgress    = totalProjects > 0 ? Math.round(projects.reduce((s: number, p: any) => s + (p.progress ?? 0), 0) / totalProjects) : 0;
  const completionRate = totalProjects > 0 ? Math.round((completedCount / totalProjects) * 100) : 0;

  const statusCounts: Record<string, number> = {};
  for (const p of projects) {
    const k = (p as any).status || 'Planning';
    statusCounts[k] = (statusCounts[k] ?? 0) + 1;
  }
  const donutData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  const kpis = [
    { label: 'Projects',     value: totalProjects,  suffix: '',  sub: `${publicProjects} public`,             icon: FolderKanban,   color: 'text-[#007AFF]', bg: 'bg-blue-50',   href: '/admin/projects' },
    { label: 'Revenue',      value: paidRevenue,    prefix: '$', sub: `of $${totalBudget.toLocaleString()}`,  icon: DollarSign,     color: 'text-[#34C759]', bg: 'bg-green-50',  href: '/admin/projects' },
    { label: 'Avg Progress', value: avgProgress,    suffix: '%', sub: `${completedCount} completed`,          icon: TrendingUp,     color: 'text-[#AF52DE]', bg: 'bg-purple-50', href: '/admin/projects' },
    { label: 'Completion',   value: completionRate, suffix: '%', sub: `${experiences.length} career records`, icon: CheckCircle2,   color: 'text-[#FF9500]', bg: 'bg-orange-50', href: '/admin/experience' },
  ];

  return (
    <div className="h-full flex flex-col gap-4">

      {/* ── Header ── */}
      <MotionDiv
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between shrink-0"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Overview</h1>
          <p className="text-gray-400 text-sm font-medium mt-0.5">Real-time analytics from Sanity CMS</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-xl rounded-xl border border-gray-200/60 shadow-sm">
            <Clock size={12} className="text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Live</span>
            <span className="w-1.5 h-1.5 bg-[#34C759] rounded-full animate-pulse" />
          </div>
          <Link href="/admin/projects/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <Plus size={14} strokeWidth={2.5} />New Project
          </Link>
        </div>
      </MotionDiv>

      {/* ── KPI Strip — Animated Counters ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
        {kpis.map((k, i) => (
          <MotionDiv
            key={k.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={k.href} className="group block h-full">
              <div className="h-full bg-white/80 backdrop-blur-xl border border-white rounded-[22px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3">
                <div className={`w-9 h-9 shrink-0 ${k.bg} ${k.color} rounded-xl flex items-center justify-center`}>
                  <k.icon size={17} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{k.label}</p>
                  <p className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
                    <AnimatedCounter
                      target={k.value}
                      prefix={k.prefix ?? ''}
                      suffix={k.suffix ?? ''}
                      duration={1200 + i * 100}
                    />
                  </p>
                  <p className="text-[11px] text-gray-400 font-medium truncate">{k.sub}</p>
                </div>
              </div>
            </Link>
          </MotionDiv>
        ))}
      </div>

      {/* ── Main Content: Charts + Activity Feed ── */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Charts col (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">

          {/* Top charts row */}
          <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">

            {/* Donut */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col min-h-0"
            >
              <div className="shrink-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</p>
                <h3 className="text-[14px] font-bold text-gray-900">Pipeline</h3>
              </div>
              <div className="flex-1 min-h-0 mt-1">
                {donutData.length > 0
                  ? <><StatusDonut data={donutData} /><StatusLegend data={donutData} /></>
                  : <div className="h-full flex items-center justify-center"><p className="text-gray-400 text-xs">No data yet</p></div>
                }
              </div>
            </MotionDiv>

            {/* Progress Bars */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.40 }}
              className="bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col min-h-0"
            >
              <div className="shrink-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Progress</p>
                <h3 className="text-[14px] font-bold text-gray-900">Completion</h3>
              </div>
              <div className="flex-1 min-h-0 mt-1">
                {projects.length > 0
                  ? <ProgressBars data={projects} />
                  : <div className="h-full flex items-center justify-center"><p className="text-gray-400 text-xs">No data yet</p></div>
                }
              </div>
            </MotionDiv>
          </div>

          {/* Budget area */}
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            className="bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col"
            style={{ height: '160px', minHeight: '160px' }}
          >
            <div className="shrink-0">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Financial</p>
              <h3 className="text-[14px] font-bold text-gray-900">Budget Overview</h3>
            </div>
            <div className="flex-1 min-h-0 mt-1">
              <BudgetArea data={projects} />
            </div>
          </MotionDiv>
        </div>

        {/* Activity Feed col (1/3) */}
        <MotionDiv
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col min-h-0"
        >
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Updates</p>
              <h3 className="text-[14px] font-bold text-gray-900 flex items-center gap-1.5">
                Activity Feed
                {recentActivity.length > 0 && (
                  <span className="w-5 h-5 bg-[#007AFF] text-white text-[10px] font-black rounded-full flex items-center justify-center">{Math.min(recentActivity.length, 9)}</span>
                )}
              </h3>
            </div>
            <div className="p-2 bg-gray-50 rounded-xl">
              <Activity size={14} className="text-gray-400" />
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ActivityFeed activities={recentActivity} />
          </div>

          {/* Quick nav footer */}
          <div className="shrink-0 mt-3 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2">
            {[
              { label: 'Projects', count: totalProjects, href: '/admin/projects', icon: FolderKanban },
              { label: 'Exp.', count: experiences.length, href: '/admin/experience', icon: Briefcase },
              { label: 'Reviews', count: testimonials.length, href: '/admin/testimonials', icon: MessageSquareQuote },
            ].map(item => (
              <Link key={item.label} href={item.href}
                className="flex flex-col items-center gap-0.5 p-2 rounded-xl hover:bg-gray-50 transition-colors group">
                <item.icon size={14} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                <span className="text-sm font-bold text-gray-900">{item.count}</span>
                <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{item.label}</span>
              </Link>
            ))}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
