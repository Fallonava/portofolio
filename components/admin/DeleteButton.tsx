'use client';

import { useState, useTransition } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DeleteButtonProps {
  id: string;
  label?: string;
  onDelete: (id: string) => Promise<{ success?: boolean; error?: string }>;
  onSuccess?: () => void;
  size?: 'sm' | 'md';
}

export function DeleteButton({ id, label = 'item', onDelete, onSuccess, size = 'sm' }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [confirm, setConfirm] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm) {
      setConfirm(true);
      // auto-reset after 3s
      setTimeout(() => setConfirm(false), 3000);
      return;
    }
    startTransition(async () => {
      const result = await onDelete(id);
      if (result.error) {
        toast.error(`Failed: ${result.error}`);
      } else {
        toast.success(`${label} deleted.`);
        onSuccess?.();
      }
      setConfirm(false);
    });
  };

  const base = size === 'sm'
    ? 'p-2 rounded-xl text-xs font-bold transition-all duration-200 border'
    : 'px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 border flex items-center gap-1.5';

  if (confirm) {
    return (
      <button
        onClick={handleClick}
        disabled={isPending}
        className={`${base} bg-red-50 text-[#FF3B30] border-red-200 animate-pulse`}
      >
        {isPending ? <Loader2 size={14} className="animate-spin" /> : size === 'sm' ? <Trash2 size={14} /> : 'Confirm?'}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`${base} bg-white text-gray-400 hover:text-[#FF3B30] hover:shadow-md border-gray-100`}
    >
      {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
    </button>
  );
}
