import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, Code2, Calendar, CheckCircle2, Clock } from 'lucide-react';

export const revalidate = 60;

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: any }> = {
  'Completed':   { color: 'text-[#34C759]', bg: 'bg-[#34C759]/10', icon: CheckCircle2 },
  'In Progress': { color: 'text-[#007AFF]', bg: 'bg-[#007AFF]/10', icon: Clock },
  'In Review':   { color: 'text-[#AF52DE]', bg: 'bg-[#AF52DE]/10', icon: Clock },
  'Planning':    { color: 'text-[#FF9500]', bg: 'bg-[#FF9500]/10', icon: Clock },
};

export default async function ProposalPage({ params }: { params: { slug: string } }) {
  const project = await client.fetch(`
    *[_type == "project" && id.current == $slug][0] {
      _id, title, description, longDescription, category, status,
      progress, tech, link, deadline, clientName, budget, paymentStatus,
      "imageUrl": image.asset->url
    }
  `, { slug: params.slug });

  if (!project) notFound();

  const statusCfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG['Planning'];
  const StatusIcon = statusCfg.icon;

  return (
    <div className="min-h-screen bg-[#F5F5F7] selection:bg-gray-900 selection:text-white">

      {/* Ambient glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-blue-300/20 to-purple-400/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-pink-300/10 to-orange-300/10 blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-16">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-semibold text-sm mb-10 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Portfolio
        </Link>

        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-3xl border border-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] mb-6">

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
              {project.category || 'Web'}
            </span>
            <span className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full ${statusCfg.bg} ${statusCfg.color}`}>
              <StatusIcon size={11} />
              {project.status || 'Planning'}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3">{project.title}</h1>

          {project.description && (
            <p className="text-gray-500 text-lg leading-relaxed font-medium">{project.description}</p>
          )}

          {/* Progress */}
          {project.progress != null && (
            <div className="mt-6">
              <div className="flex justify-between text-sm font-semibold text-gray-500 mb-2">
                <span>Project Progress</span>
                <span className="text-[#007AFF] font-bold">{project.progress}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#007AFF] rounded-full transition-all duration-1000"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Hero Image */}
        {project.imageUrl && (
          <div className="rounded-[28px] overflow-hidden mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            <img src={project.imageUrl} alt={project.title} className="w-full object-cover" />
          </div>
        )}

        {/* Details Grid */}
        {(project.deadline || project.clientName) && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {project.deadline && (
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[22px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deadline</span>
                </div>
                <p className="text-[15px] font-bold text-gray-900">
                  {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            )}
            {project.clientName && (
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[22px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Client</span>
                </div>
                <p className="text-[15px] font-bold text-gray-900">{project.clientName}</p>
              </div>
            )}
          </div>
        )}

        {/* Long Description */}
        {project.longDescription && (
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-6 md:p-8 mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <h2 className="text-lg font-bold text-gray-900 mb-4">About This Project</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{project.longDescription}</p>
          </div>
        )}

        {/* Tech Stack */}
        {project.tech?.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-6 mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={16} className="text-gray-400" />
              <h2 className="text-[15px] font-bold text-gray-900">Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="px-4 py-2 bg-gray-900 text-white text-[12px] font-bold rounded-2xl">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-[22px] text-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <ExternalLink size={18} />
            View Live Project
          </a>
        )}

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs font-medium mt-8">
          Shared via <Link href="/" className="font-bold text-gray-600 hover:text-gray-900 transition-colors">Fallonava Portfolio</Link>
        </p>
      </div>
    </div>
  );
}
