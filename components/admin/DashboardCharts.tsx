'use client';

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

// ───────── Custom Tooltip ─────────
const AppleTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        {label && <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</p>}
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-[15px] font-bold" style={{ color: entry.color || '#007AFF' }}>
            {typeof entry.value === 'number' && entry.name === 'budget'
              ? `$${entry.value.toLocaleString()}`
              : entry.value}
            {entry.name === 'progress' ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ───────── Status Distribution (Donut) ─────────
const STATUS_COLORS: Record<string, string> = {
  'Completed': '#34C759',
  'In Progress': '#007AFF',
  'In Review': '#AF52DE',
  'Planning': '#FF9500',
  'Cancelled': '#FF3B30',
};

export function StatusDonut({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="w-full h-56 relative">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? '#8E8E93'} />
            ))}
          </Pie>
          <Tooltip content={<AppleTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-gray-900">{total}</span>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Projects</span>
      </div>
    </div>
  );
}

// ───────── Progress Bar Chart ─────────
export function ProgressBars({ data }: { data: { title: string; progress: number; status: string }[] }) {
  const chartData = data.slice(0, 6).map(p => ({
    name: p.title.length > 14 ? p.title.slice(0, 14) + '…' : p.title,
    progress: p.progress ?? 0,
    fill: STATUS_COLORS[p.status] ?? '#007AFF',
  }));

  return (
    <div className="w-full h-52">
      <ResponsiveContainer>
        <BarChart data={chartData} layout="vertical" barSize={10} margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12, fontWeight: 600, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <Tooltip content={<AppleTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
          <Bar dataKey="progress" radius={[0, 6, 6, 0]} background={{ fill: '#f3f4f6', radius: 6 }}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ───────── Payment Status Area ─────────
export function BudgetArea({ data }: { data: { title: string; budget?: number; paymentStatus?: string }[] }) {
  const chartData = data
    .filter(p => (p.budget ?? 0) > 0)
    .slice(0, 6)
    .map(p => ({
      name: p.title.length > 12 ? p.title.slice(0, 12) + '…' : p.title,
      budget: p.budget ?? 0,
    }));

  if (chartData.length === 0) {
    return (
      <div className="w-full h-52 flex items-center justify-center">
        <p className="text-gray-400 text-sm font-medium">No budget data yet</p>
      </div>
    );
  }

  return (
    <div className="w-full h-52">
      <ResponsiveContainer>
        <AreaChart data={chartData} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="budgetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#007AFF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 600, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<AppleTooltip />} />
          <Area type="monotone" dataKey="budget" stroke="#007AFF" strokeWidth={2.5} fill="url(#budgetGrad)" dot={{ fill: '#007AFF', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ───────── Legend Pill ─────────
export function StatusLegend({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {data.map(d => (
        <div key={d.name} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
          <span className="w-2 h-2 rounded-full" style={{ background: STATUS_COLORS[d.name] ?? '#8E8E93' }} />
          <span className="text-[12px] font-semibold text-gray-600">{d.name}</span>
          <span className="text-[12px] font-bold text-gray-900">{d.value}</span>
        </div>
      ))}
    </div>
  );
}
