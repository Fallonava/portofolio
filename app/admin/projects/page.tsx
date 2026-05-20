import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { MotionDiv } from '@/components/ui/motion';
import { ProjectsView } from '@/components/admin/ViewToggle';
import { ExportButton } from '@/components/admin/ExportButton';

export const metadata = { title: 'Projects | Admin Dashboard' };
export const revalidate = 30;

export default async function ProjectsAdminPage() {
  const projects = await client.fetch(`*[_type == "project"] | order(order asc) {
    _id,
    title,
    category,
    description,
    longDescription,
    link,
    demoVideoUrl,
    isPublic,
    status,
    progress,
    paymentStatus,
    budget,
    clientName,
    deadline,
    tech,
    "slug": id.current,
    "imageUrl": image.asset->url
  }`);

  return (
    <div className="flex flex-col gap-5 h-full">

      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between shrink-0"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
          <p className="text-gray-400 mt-0.5 font-medium text-sm">
            {projects.length} project{projects.length !== 1 ? 's' : ''} in your portfolio
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton type="projects" />
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Project
          </Link>
        </div>
      </MotionDiv>

      {/* Table / Kanban toggle — client component */}
      <ProjectsView projects={projects} />
    </div>
  );
}
