'use server';

import { writeClient } from '@/sanity/lib/writeClient';
import { revalidatePath } from 'next/cache';

export async function createTestimonial(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const designation = formData.get('designation') as string;
    const content = formData.get('content') as string;
    const orderInput = formData.get('order') as string;

    if (!name || !designation || !content) {
      return { error: 'Please fill in all required fields.' };
    }

    const newTestimonial = await writeClient.create({
      _type: 'testimonial',
      name, designation, content,
      order: orderInput ? parseInt(orderInput, 10) : 0,
    });

    revalidatePath('/admin/testimonials');
    return { success: true, id: newTestimonial._id };
  } catch (error: any) {
    return { error: error.message || 'Failed to create testimonial.' };
  }
}

export async function updateTestimonial(id: string, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const designation = formData.get('designation') as string;
    const content = formData.get('content') as string;
    const orderInput = formData.get('order') as string;

    if (!name || !designation || !content) {
      return { error: 'Please fill in all required fields.' };
    }

    await writeClient.patch(id).set({
      name, designation, content,
      order: orderInput ? parseInt(orderInput, 10) : 0,
    }).commit();

    revalidatePath('/admin/testimonials');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to update testimonial.' };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await writeClient.delete(id);
    revalidatePath('/admin/testimonials');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to delete.' };
  }
}
