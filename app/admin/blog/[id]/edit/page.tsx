import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { EditPostForm } from './EditPostForm';

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = { title: 'Edit Blog Post | Admin Dashboard' };

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  // Fetch the blog post details
  const post = await client.fetch(
    `*[_type == "post" && _id == $id][0] {
      _id,
      title,
      excerpt,
      isPublic,
      readTime,
      tags,
      content,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url
    }`,
    { id }
  );

  if (!post) {
    notFound();
  }

  return <EditPostForm post={post} />;
}
