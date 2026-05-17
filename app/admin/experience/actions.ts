'use server';

import { writeClient } from '@/sanity/lib/writeClient';
import { revalidatePath } from 'next/cache';

export async function createExperience(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const company = formData.get('company') as string;
    const year = formData.get('year') as string;
    const description = formData.get('description') as string;
    const techInput = formData.get('tech') as string;
    const orderInput = formData.get('order') as string;

    if (!title || !company || !year || !description) {
      return { error: 'Please fill in all required fields.' };
    }

    const techArray = techInput ? techInput.split(',').map(t => t.trim()).filter(Boolean) : [];

    const newExp = await writeClient.create({
      _type: 'experience',
      title,
      company,
      year,
      description,
      tech: techArray,
      order: orderInput ? parseInt(orderInput, 10) : 0,
    });

    revalidatePath('/admin/experience');
    return { success: true, id: newExp._id };
  } catch (error: any) {
    console.error('Error creating experience:', error);
    return { error: error.message || 'Failed to create experience.' };
  }
}
