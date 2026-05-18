'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

export function ExportButton({ type = 'projects' }: { type?: 'projects' | 'experience' }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/export?type=${type}`);
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2.5 bg-white/80 border border-gray-200/60 text-gray-600 hover:text-gray-900 hover:border-gray-300 font-semibold rounded-2xl transition-all duration-200 hover:shadow-sm text-sm disabled:opacity-60"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
      Export CSV
    </button>
  );
}
