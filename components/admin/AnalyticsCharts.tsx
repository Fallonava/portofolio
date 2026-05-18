'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const CAT_COLORS = ['#007AFF', '#34C759', '#AF52DE', '#FF9500', '#FF3B30', '#5AC8FA'];

const AppleTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-xl px-3 py-2 shadow-lg">
        {label && <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>}
        <p className="text-[14px] font-bold text-gray-900">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function AnalyticsCharts({
  catData,
  timelineData,
}: {
  catData: { name: string; value: number }[];
  timelineData: { name: string; count: number }[];
}) {
  return (
    <>
      {/* Category Distribution */}
      <div className="flex-1 min-h-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Categories</p>
        <h3 className="text-[15px] font-bold text-gray-900 mb-3">By Type</h3>

        {catData.length > 0 ? (
          <div className="space-y-2">
            {catData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: CAT_COLORS[i % CAT_COLORS.length] }}
                />
                <span className="text-[12px] font-semibold text-gray-600 flex-1">{item.name}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(item.value / Math.max(...catData.map(d => d.value))) * 100}%`,
                      background: CAT_COLORS[i % CAT_COLORS.length],
                    }}
                  />
                </div>
                <span className="text-[12px] font-bold text-gray-900 w-4 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-24">
            <p className="text-gray-300 text-sm font-medium">No data</p>
          </div>
        )}
      </div>

      {/* Monthly Timeline */}
      {timelineData.length > 1 && (
        <div className="shrink-0 border-t border-gray-100 pt-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Timeline</p>
          <h3 className="text-[14px] font-bold text-gray-900 mb-3">Projects Created</h3>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData} barSize={12} margin={{ left: -20, right: 4, top: 4, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<AppleTooltip />} cursor={{ fill: 'rgba(0,122,255,0.05)', radius: 8 }} />
                <Bar dataKey="count" fill="#007AFF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
