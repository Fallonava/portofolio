import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { MotionDiv, MotionTr } from '@/components/ui/motion';
import { QuickStatusEdit } from '@/components/admin/QuickStatusEdit';

export const metadata = {
  title: 'Projects | Admin Dashboard',
};

// Disable caching for admin routes to always show fresh data
export const revalidate = 30;

export default async function ProjectsAdminPage() {
  const projects = await client.fetch(`*[_type == "project"] | order(order asc) {
    _id,
    title,
    category,
    isPublic,
    status,
    progress,
    paymentStatus,
    "slug": id.current,
    "imageUrl": image.asset->url
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
          <p className="text-gray-400 mt-0.5 font-medium text-sm">Manage and track your portfolio projects.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm"
        >
          <Plus size={16} strokeWidth={2.5} />
          New Project
        </Link>
      </MotionDiv>

      <MotionDiv 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 min-h-0 bg-white/70 backdrop-blur-3xl border border-white rounded-[28px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col"
      >
        {/* Sticky header */}
        <div className="overflow-x-auto flex-1 min-h-0 overflow-y-auto">
          <table className="w-full text-left text-sm text-gray-600 border-collapse min-w-[680px]">
            <thead className="bg-white/40 text-xs uppercase text-gray-400 border-b border-gray-100/50 backdrop-blur-md">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Project</th>
                <th scope="col" className="px-6 py-4 font-semibold">Category</th>
                <th scope="col" className="px-6 py-4 font-semibold">Visibility</th>
                <th scope="col" className="px-6 py-4 font-semibold">Status & Progress</th>
                <th scope="col" className="px-6 py-4 font-semibold">Payment</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/50">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-16 text-center">
                    <p className="text-gray-400 font-medium text-lg">No projects found.</p>
                    <p className="text-gray-400 text-sm mt-1">Create your first project to get started.</p>
                  </td>
                </tr>
              ) : (
                projects.map((project: any, index: number) => (
                  <MotionTr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={project._id} 
                    className="hover:bg-white/50 transition-colors duration-300 group"
                  >
                    <td className="px-6 py-5 font-medium text-gray-900 flex items-center gap-4">
                      {project.imageUrl ? (
                        <div className="relative overflow-hidden rounded-[14px] w-12 h-12 shadow-sm border border-gray-100/50 group-hover:scale-105 transition-transform duration-500">
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200/50 flex items-center justify-center shadow-inner" />
                      )}
                      <div>
                        <div className="text-[15px] tracking-tight">{project.title}</div>
                        <div className="font-mono text-[11px] text-gray-400 mt-0.5 tracking-tight">/{project.slug}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 rounded-full bg-gray-100/80 text-gray-700 text-xs font-semibold backdrop-blur-sm">
                        {project.category || 'None'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {project.isPublic ? (
                        <span className="px-3 py-1.5 rounded-full bg-blue-50/80 text-blue-600 border border-blue-100/50 text-[11px] font-bold uppercase tracking-wider">Public</span>
                      ) : (
                        <span className="px-3 py-1.5 rounded-full bg-gray-100/80 text-gray-500 border border-gray-200/50 text-[11px] font-bold uppercase tracking-wider">Private</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <QuickStatusEdit id={project._id} initialStatus={project.status || 'Planning'} />
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <MotionDiv
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress || 0}%` }}
                            transition={{ duration: 1, ease: 'easeOut', delay: index * 0.05 }}
                            className={`h-full rounded-full ${
                              project.status === 'Completed' ? 'bg-[#34C759]' :
                              project.status === 'Cancelled' ? 'bg-[#FF3B30]' :
                              'bg-[#007AFF]'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 font-semibold">{project.progress ?? 0}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        project.paymentStatus === 'Paid' ? 'bg-green-50/80 text-green-600 border border-green-100/50' :
                        project.paymentStatus === 'Partial / DP' ? 'bg-orange-50/80 text-orange-600 border border-orange-100/50' :
                        'bg-red-50/80 text-red-500 border border-red-100/50'
                      }`}>
                        {project.paymentStatus || 'Unpaid'}
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
