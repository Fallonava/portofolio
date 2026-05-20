'use server';

import { writeClient } from '@/sanity/lib/writeClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProjectStatus(id: string, status: string) {
  try {
    await writeClient.patch(id).set({ status }).commit();
    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating status:', error);
    return { error: error.message || 'Failed to update status.' };
  }
}



export async function createProject(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string;
    const link = formData.get('link') as string;
    const demoVideoUrl = formData.get('demoVideoUrl') as string;
    const techInput = formData.get('tech') as string;
    const color = formData.get('color') as string;
    const orderInput = formData.get('order') as string;
    const imageFile = formData.get('image') as File | null;
    
    // CRM Fields
    const isPublic = formData.get('isPublic') === 'on';
    const clientName = formData.get('clientName') as string;
    const status = formData.get('status') as string;
    const progressInput = formData.get('progress') as string;
    const paymentStatus = formData.get('paymentStatus') as string;
    const budgetInput = formData.get('budget') as string;
    const deadline = formData.get('deadline') as string;

    if (!title || !slug || !category || !description) {
      return { error: 'Please fill in all required fields.' };
    }

    // 1. Upload the image to Sanity first (if provided)
    let imageRef = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const imageAsset = await writeClient.assets.upload('image', buffer, {
        filename: imageFile.name,
        contentType: imageFile.type,
      });
      imageRef = imageAsset._id;
    }

    // 2. Parse tech stack into array
    const techArray = techInput ? techInput.split(',').map(t => t.trim()).filter(Boolean) : [];

    // 3. Create the document
    const projectDoc: any = {
      _type: 'project',
      title,
      id: {
        _type: 'slug',
        current: slug,
      },
      category,
      description,
      longDescription,
      link,
      demoVideoUrl: demoVideoUrl || undefined,
      tech: techArray,
      color,
      order: orderInput ? parseInt(orderInput, 10) : 0,
      
      // CRM Fields
      isPublic,
      clientName: clientName || undefined,
      status: status || 'Planning',
      progress: progressInput ? parseInt(progressInput, 10) : 0,
      paymentStatus: paymentStatus || 'Unpaid',
      budget: budgetInput ? parseInt(budgetInput, 10) : undefined,
      deadline: deadline || undefined,
    };

    if (imageRef) {
      projectDoc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageRef,
        },
      };
    }

    const newProject = await writeClient.create(projectDoc);

    revalidatePath('/admin/projects');
    return { success: true, id: newProject._id };
  } catch (error: any) {
    console.error('Error creating project:', error);
    return { error: error.message || 'Failed to create project.' };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string;
    const link = formData.get('link') as string;
    const demoVideoUrl = formData.get('demoVideoUrl') as string;
    const techInput = formData.get('tech') as string;
    const color = formData.get('color') as string;
    const orderInput = formData.get('order') as string;
    const imageFile = formData.get('image') as File | null;
    const isPublic = formData.get('isPublic') === 'on';
    const clientName = formData.get('clientName') as string;
    const status = formData.get('status') as string;
    const progressInput = formData.get('progress') as string;
    const paymentStatus = formData.get('paymentStatus') as string;
    const budgetInput = formData.get('budget') as string;
    const deadline = formData.get('deadline') as string;

    if (!title || !slug) return { error: 'Title and slug are required.' };

    const techArray = techInput ? techInput.split(',').map(t => t.trim()).filter(Boolean) : [];

    const updateData: Record<string, any> = {
      title,
      id: { _type: 'slug', current: slug },
      category,
      description,
      longDescription: longDescription || undefined,
      link: link || undefined,
      demoVideoUrl: demoVideoUrl || undefined,
      tech: techArray,
      color: color || undefined,
      order: orderInput ? parseInt(orderInput, 10) : 0,
      isPublic,
      clientName: clientName || undefined,
      status: status || 'Planning',
      progress: progressInput ? parseInt(progressInput, 10) : 0,
      paymentStatus: paymentStatus || 'Unpaid',
      budget: budgetInput ? parseFloat(budgetInput) : undefined,
      deadline: deadline || undefined,
    };

    // Only update image if a new one is uploaded
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const imageAsset = await writeClient.assets.upload('image', buffer, {
        filename: imageFile.name,
        contentType: imageFile.type,
      });
      updateData.image = {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      };
    }

    await writeClient.patch(id).set(updateData).commit();
    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating project:', error);
    return { error: error.message || 'Failed to update project.' };
  }
}

export async function deleteProject(id: string) {
  try {
    await writeClient.delete(id);
    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to delete project.' };
  }
}
