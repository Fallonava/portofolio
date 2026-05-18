import { client } from '@/sanity/lib/client';
import { MotionDiv } from '@/components/ui/motion';
import {
  DollarSign, TrendingUp, AlertCircle, CheckCircle2,
  Clock, ArrowUpRight, ArrowDownRight, Minus
} from 'lucide-react';
import { StatusDonut, StatusLegend } from '@/components/admin/DashboardCharts';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { ExportButton } from '@/components/admin/ExportButton';

export const metadata = { title: 'Analytics | Admin Dashboard' };
export const revalidate = 30;

export default async function AnalyticsPage() {
  const projects = await client.fetch(`*[_type == "project"] | order(_createdAt asc) {
    _id, title, category, status, progress, paymentStatus, budget, deadline, _createdAt
  }`);

  const now = new Date();

  // ── Revenue ──────────────────────────────────────
  const totalBudget    = projects.reduce((s: number, p: any) => s + (p.budget ?? 0), 0);
  const paid           = projects.filter((p: any) => p.paymentStatus === 'Paid');
  const partial        = projects.filter((p: any) => p.paymentStatus === 'Partial / DP');
  const unpaid         = projects.filter((p: any) => !p.paymentStatus || p.paymentStatus === 'Unpaid');
  const paidRevenue    = paid.reduce((s: number, p: any) => s + (p.budget ?? 0), 0);
  const partialRev     = partial.reduce((s: number, p: any) => s + (p.budget ?? 0), 0);
  const unpaidRev      = unpaid.reduce((s: number, p: any) => s + (p.budget ?? 0), 0);
  const collectionRate = totalBudget > 0 ? Math.round((paidRevenue / totalBudget) * 100) : 0;

  // ── Pipeline ─────────────────────────────────────
  const statusCounts: Record<string, number> = {};
  for (const p of projects) {
    const k = (p as any).status || 'Planning';
    statusCounts[k] = (statusCounts[k] ?? 0) + 1;
  }
  const donutData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  const overdue      = projects.filter((p: any) => p.deadline && new Date(p.deadline) < now && p.status !== 'Completed');
  const completedPct = projects.length > 0 ? Math.round((statusCounts['Completed'] ?? 0) / projects.length * 100) : 0;
  const avgProgress  = projects.length > 0 ? Math.round(projects.reduce((s: number, p: any) => s + (p.progress ?? 0), 0) / projects.length) : 0;

  // ── Category ─────────────────────────────────────
  const catCounts: Record<string, number> = {};
  for (const p of projects) {
    const k = (p as any).category || 'Other';
    catCounts[k] = (catCounts[k] ?? 0) + 1;
  }
  const catData = Object.entries(catCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  // ── Monthly ──────────────────────────────────────
  const monthlyData: Record<string, number> = {};
  for (const p of projects) {
    const d = new Date((p as any)._createdAt);
    const month = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    monthlyData[month] = (monthlyData[month] ?? 0) + 1;
  }
  const timelineData = Object.entries(monthlyData).map(([name, count]) => ({ name, count }));

  // ── Best month ───────────────────────────────────
  const bestMonth = timelineData.reduce((best, cur) => cur.count > (best?.count ?? 0) ? cur : best, timelineData[0]);

  // ── This month vs last month ──────────────────────
  const thisMonthKey = now.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  const lastMonthDate = new Date(now); lastMonthDate.setMonth(now.getMonth() - 1);
  const lastMonthKey = lastMonthDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  const thisMonthCount = monthlyData[thisMonthKey] ?? 0;
  const lastMonthCount = monthlyData[lastMonthKey] ?? 0;
  const growthDir = thisMonthCount > lastMonthCount ? 'up' : thisMonthCount < lastMonthCount ? 'down' : 'flat';

  const paymentBreakdown = [
    { label: 'Paid',        value: paidRevenue, count: paid.length,    color: '#34C759', pct: totalBudget > 0 ? (paidRevenue / totalBudget * 100) : 0 },
    { label: 'Partial / DP', value: partialRev, count: partial.length, color: '#FF9500', pct: totalBudget > 0 ? (partialRev / totalBudget * 100) : 0 },
    { label: 'Unpaid',      value: unpaidRev,  count: unpaid.length,   color: '#FF3B30', pct: totalBudget > 0 ? (unpaidRev / totalBudget * 100) : 0 },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* ── Header ── */}
      <MotionDiv initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between shrink-0">
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Business Insights</p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Intelligence Report</h1>
        </div>
        <ExportButton type="projects" />
      </MotionDiv>

      {/* ── Top Row: 4 Metric Rings ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">

        {/* Revenue Collected — Hero tile */}
        <MotionDiv initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="md:col-span-2 bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,122,255,0.25)] text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Revenue Collected</p>
              <p className="text-3xl font-black tracking-tight mt-1">${paidRevenue.toLocaleString()}</p>
              <p className="text-sm font-bold text-white/70 mt-1">of ${totalBudget.toLocaleString()} total</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-3">
              <DollarSign size={22} strokeWidth={2} />
            </div>
          </div>
          {/* Progress ring (flat bar version) */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-[11px] font-bold text-white/60">Collection Rate</span>
              <span className="text-[13px] font-black text-white">{collectionRate}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${collectionRate}%` }} />
            </div>
          </div>
        </MotionDiv>

        {/* Completion rate */}
        <MotionDiv initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl border border-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <div className="w-9 h-9 bg-[#34C759]/10 text-[#34C759] rounded-xl flex items-center justify-center mb-3">
            <CheckCircle2 size={17} strokeWidth={2} />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Completed</p>
          <p className="text-3xl font-black text-gray-900 tracking-tight leading-none mt-1">{completedPct}<span className="text-lg font-bold text-gray-400">%</span></p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">{statusCounts['Completed'] ?? 0} of {projects.length} projects</p>
        </MotionDiv>

        {/* Overdue */}
        <MotionDiv initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className={`rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)] ${overdue.length > 0 ? 'bg-[#FF3B30]/5 border border-[#FF3B30]/15' : 'bg-white/80 backdrop-blur-xl border border-white'}`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${overdue.length > 0 ? 'bg-[#FF3B30]/10 text-[#FF3B30]' : 'bg-[#34C759]/10 text-[#34C759]'}`}>
            {overdue.length > 0 ? <AlertCircle size={17} strokeWidth={2} /> : <CheckCircle2 size={17} strokeWidth={2} />}
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Overdue</p>
          <p className={`text-3xl font-black tracking-tight leading-none mt-1 ${overdue.length > 0 ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>{overdue.length}</p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">{overdue.length > 0 ? 'Need attention' : 'All on track ✓'}</p>
        </MotionDiv>
      </div>

      {/* ── Main Bento Grid ── */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Payment breakdown — 4 cols */}
        <MotionDiv initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="md:col-span-4 bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col min-h-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5 shrink-0">Revenue</p>
          <h3 className="text-[15px] font-bold text-gray-900 mb-4 shrink-0">Payment Breakdown</h3>

          {totalBudget > 0 ? (
            <div className="space-y-4 flex-1 min-h-0 overflow-y-auto">
              {paymentBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                      <span className="text-[12px] font-semibold text-gray-700">{item.label}</span>
                      <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-1.5 py-0.5 rounded-md">{item.count}</span>
                    </div>
                    <span className="text-[12px] font-bold text-gray-900">${item.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.pct}%`, background: item.color }} />
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5 text-right">{Math.round(item.pct)}%</p>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[11px] font-bold text-gray-500">Collection Rate</span>
                <span className="text-[17px] font-black text-gray-900">{collectionRate}%</span>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-300 text-sm font-medium text-center">No budget data yet</p>
            </div>
          )}
        </MotionDiv>

        {/* Pipeline donut — 3 cols */}
        <MotionDiv initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.33 }}
          className="md:col-span-3 bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col min-h-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5 shrink-0">Pipeline</p>
          <h3 className="text-[15px] font-bold text-gray-900 mb-1 shrink-0">Status Split</h3>
          <div className="flex-1 min-h-0">
            {donutData.length > 0
              ? <><StatusDonut data={donutData} /><StatusLegend data={donutData} /></>
              : <div className="flex items-center justify-center h-full"><p className="text-gray-300 text-sm">No data</p></div>
            }
          </div>
        </MotionDiv>

        {/* Category + Timeline — 5 cols */}
        <MotionDiv initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-5 bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col gap-4 min-h-0">

          {/* Velocity badge */}
          <div className="flex items-center justify-between shrink-0">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">This Month</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[20px] font-black text-gray-900">{thisMonthCount}</span>
                <span className="text-[11px] font-bold text-gray-400">projects</span>
                {growthDir === 'up' && <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#34C759] bg-[#34C759]/10 px-2 py-0.5 rounded-full"><ArrowUpRight size={10} />+{thisMonthCount - lastMonthCount}</span>}
                {growthDir === 'down' && <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#FF3B30] bg-[#FF3B30]/10 px-2 py-0.5 rounded-full"><ArrowDownRight size={10} />{thisMonthCount - lastMonthCount}</span>}
                {growthDir === 'flat' && <span className="flex items-center gap-0.5 text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full"><Minus size={10} />Same</span>}
              </div>
            </div>
            {bestMonth && (
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Best Month</p>
                <p className="text-[13px] font-black text-gray-900">{bestMonth.name}</p>
                <p className="text-[10px] text-gray-400">{bestMonth.count} projects</p>
              </div>
            )}
          </div>

          <div className="flex-1 min-h-0">
            <AnalyticsCharts catData={catData} timelineData={timelineData} />
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
