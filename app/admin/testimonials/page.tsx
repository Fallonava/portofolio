import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { MotionDiv } from '@/components/ui/motion';
import { TestimonialsTable } from '@/components/admin/TestimonialsTable';

export const metadata = {
  title: 'Testimonials | Admin Dashboard',
};

export const revalidate = 30;

export default async function TestimonialsAdminPage() {
  const testimonials = await client.fetch(`*[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    designation,
    content
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Testimonials</h1>
          <p className="text-gray-400 mt-0.5 font-medium text-sm">Manage client reviews and feedback.</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Testimonial
        </Link>
      </MotionDiv>

      <MotionDiv 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 min-h-0 bg-white/70 backdrop-blur-3xl border border-white rounded-[28px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col"
      >
        <TestimonialsTable testimonials={testimonials} />
      </MotionDiv>
    </div>
  );
}
