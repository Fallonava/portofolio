import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { EditProjectForm } from './EditProjectForm';

export const metadata = { title: 'Edit Project | Admin' };

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await client.fetch(`
    *[_type == "project" && _id == $id][0] {
      _id, title, category, description, longDescription, link, tech,
      color, order, isPublic, clientName, status, progress,
      paymentStatus, budget, deadline,
      "slug": id.current,
      "imageUrl": image.asset->url
    }
  `, { id: params.id });

  if (!project) notFound();

  return <EditProjectForm project={project} />;
}
