import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { MotionDiv, MotionTr } from '@/components/ui/motion';

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
        <div className="overflow-x-auto flex-1 min-h-0 overflow-y-auto">
          <table className="w-full text-left text-sm text-gray-600 border-collapse min-w-[480px]">
            <thead className="bg-white/40 text-xs uppercase text-gray-400 border-b border-gray-100/50 backdrop-blur-md">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Client Name</th>
                <th scope="col" className="px-6 py-4 font-semibold">Designation</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/50">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-16 text-center">
                    <p className="text-gray-400 font-medium text-lg">No testimonials found.</p>
                    <p className="text-gray-400 text-sm mt-1">Add your first client review to get started.</p>
                  </td>
                </tr>
              ) : (
                testimonials.map((test: any, index: number) => (
                  <MotionTr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={test._id} 
                    className="hover:bg-white/50 transition-colors duration-300 group"
                  >
                    <td className="px-6 py-5 font-medium text-gray-900 tracking-tight text-[15px]">
                      {test.name}
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 rounded-full bg-gray-100/80 text-gray-700 text-xs font-semibold backdrop-blur-sm">
                        {test.designation}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white rounded-xl text-gray-400 hover:text-blue-600 hover:shadow-sm border border-gray-100 transition-all duration-300">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-white rounded-xl text-gray-400 hover:text-red-600 hover:shadow-sm border border-gray-100 transition-all duration-300">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </MotionTr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </MotionDiv>
    </div>
  );
}
