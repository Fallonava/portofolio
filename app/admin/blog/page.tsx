import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Plus, Edit2, FileText, Globe, EyeOff, Calendar, Clock, BookOpen } from 'lucide-react';
import { MotionDiv } from '@/components/ui/motion';
import { ExportButton } from '@/components/admin/ExportButton';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deletePost } from './actions';

export const metadata = { title: 'Blog Management | Admin Dashboard' };
export const revalidate = 30;

export default async function BlogAdminPage() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    isPublic,
    publishedAt,
    readTime,
    tags,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Blog Posts</h1>
          <p className="text-gray-400 mt-0.5 font-medium text-sm">
            {posts.length} article{posts.length !== 1 ? 's' : ''} in your blog
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Post
          </Link>
        </div>
      </MotionDiv>

      {/* Table Section */}
      <MotionDiv
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 min-h-0 bg-white/70 backdrop-blur-3xl border border-white rounded-[28px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col"
      >
        <div className="overflow-x-auto flex-1 min-h-0 overflow-y-auto">
          <table className="w-full text-left text-sm text-gray-600 border-collapse min-w-[680px]">
            <thead className="sticky top-0 bg-white/95 backdrop-blur-md text-xs uppercase text-gray-400 border-b border-gray-100 z-10">
              <tr>
                <th className="px-6 py-4 font-bold">Image & Article</th>
                <th className="px-6 py-4 font-bold">Tags</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Published At</th>
                <th className="px-6 py-4 font-bold">Read Time</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/60">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-400 font-semibold">No articles found.</p>
                    <p className="text-gray-300 text-xs mt-1">Create your first blog post to get started.</p>
                  </td>
                </tr>
              ) : (
                posts.map((post: any) => (
                  <tr
                    key={post._id}
                    className="hover:bg-blue-50/30 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.imageUrl ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 shrink-0 border border-gray-200 flex items-center justify-center text-gray-400">
                            <FileText size={20} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-[14px] leading-tight truncate max-w-[240px]">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-[240px] mt-0.5">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {post.tags && post.tags.length > 0 ? (
                          post.tags.map((t: string) => (
                            <span key={t} className="px-2 py-0.5 rounded-full bg-gray-150 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                              {t}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {post.isPublic ? (
                        <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-full bg-blue-50/80 text-[#007AFF] border border-blue-100/50 text-[11px] font-bold">
                          <Globe size={11} /> Public
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-full bg-gray-100/80 text-gray-400 border border-gray-200/50 text-[11px] font-bold">
                          <EyeOff size={11} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-gray-400" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-gray-400" />
                        {post.readTime || 5} mins
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/blog/${post._id}/edit`}
                          className="p-2 bg-white rounded-xl text-gray-400 hover:text-[#007AFF] hover:shadow-md border border-gray-100 transition-all block"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <div>
                          <DeleteButton
                            id={post._id}
                            label={post.title}
                            onDelete={deletePost}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </MotionDiv>
    </div>
  );
}
