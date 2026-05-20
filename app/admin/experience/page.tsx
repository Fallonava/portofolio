import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { MotionDiv } from '@/components/ui/motion';
import { ExperienceTable } from '@/components/admin/ExperienceTable';

export const metadata = {
  title: 'Experience | Admin Dashboard',
};

export const revalidate = 30;

export default async function ExperienceAdminPage() {
  const experiences = await client.fetch(`*[_type == "experience"] | order(order asc) {
    _id,
    title,
    company,
    year
  }`);

  return (
    <div className="flex flex-col gap-6 h-full">
      <MotionDiv 
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between shrink-0"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Experience</h1>
          <p className="text-gray-400 mt-0.5 font-medium text-sm">Manage your work history and roles.</p>
        </div>
        <Link
          href="/admin/experience/new"
          className="flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Role
        </Link>
      </MotionDiv>

      <MotionDiv 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 min-h-0 bg-white/70 backdrop-blur-3xl border border-white rounded-[28px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col"
      >
        <ExperienceTable experiences={experiences} />
      </MotionDiv>
    </div>
  );
}
