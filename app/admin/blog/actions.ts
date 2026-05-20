'use server';

import { writeClient } from '@/sanity/lib/writeClient';
import { revalidatePath } from 'next/cache';

// Helper to convert Markdown textarea string to Sanity Portable Text blocks
function parseMarkdownToBlocks(markdown: string) {
  if (!markdown) return [];
  const lines = markdown.split(/\r?\n/);
  const blocks: any[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Header 1
    if (line.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: line.substring(2) }],
        markDefs: [],
      });
      continue;
    }

    // Header 2
    if (line.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.substring(3) }],
        markDefs: [],
      });
      continue;
    }

    // Header 3
    if (line.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: line.substring(4) }],
        markDefs: [],
      });
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      blocks.push({
        _type: 'block',
        style: 'blockquote',
        children: [{ _type: 'span', text: line.substring(2) }],
        markDefs: [],
      });
      continue;
    }

    // Bullet List
    if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [{ _type: 'span', text: line.substring(2) }],
        markDefs: [],
      });
      continue;
    }

    // Numbered List
    const numMatch = line.match(/^(\d+)\.\s(.*)/);
    if (numMatch) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        level: 1,
        children: [{ _type: 'span', text: numMatch[2] }],
        markDefs: [],
      });
      continue;
    }

    // Standard paragraph
    blocks.push({
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: line }],
      markDefs: [],
    });
  }

  return blocks;
}

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const contentMarkdown = formData.get('content') as string;
    const readTimeInput = formData.get('readTime') as string;
    const tagsInput = formData.get('tags') as string;
    const imageFile = formData.get('mainImage') as File | null;
    const isPublic = formData.get('isPublic') === 'on';

    if (!title || !slug || !excerpt || !contentMarkdown) {
      return { error: 'Please fill in all required fields.' };
    }

    // 1. Upload the main image to Sanity (required)
    let imageRef = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const imageAsset = await writeClient.assets.upload('image', buffer, {
        filename: imageFile.name,
        contentType: imageFile.type,
      });
      imageRef = imageAsset._id;
    }

    if (!imageRef) {
      return { error: 'Please upload a main featured image.' };
    }

    // 2. Parse tags and readTime
    const tagsArray = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];
    const readTime = readTimeInput ? parseInt(readTimeInput, 10) : 5;

    // 3. Convert markdown content to Portable Text blocks
    const contentBlocks = parseMarkdownToBlocks(contentMarkdown);

    // 4. Create the document
    const postDoc: any = {
      _type: 'post',
      title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      isPublic,
      publishedAt: new Date().toISOString(),
      excerpt,
      readTime,
      tags: tagsArray,
      content: contentBlocks,
      mainImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageRef,
        },
      },
    };

    const newPost = await writeClient.create(postDoc);

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true, id: newPost._id };
  } catch (error: any) {
    console.error('Error creating post:', error);
    return { error: error.message || 'Failed to create blog post.' };
  }
}

export async function updatePost(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const contentMarkdown = formData.get('content') as string;
    const readTimeInput = formData.get('readTime') as string;
    const tagsInput = formData.get('tags') as string;
    const imageFile = formData.get('mainImage') as File | null;
    const isPublic = formData.get('isPublic') === 'on';

    if (!title || !slug || !excerpt || !contentMarkdown) {
      return { error: 'Please fill in all required fields.' };
    }

    const tagsArray = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];
    const readTime = readTimeInput ? parseInt(readTimeInput, 10) : 5;
    const contentBlocks = parseMarkdownToBlocks(contentMarkdown);

    const updateData: Record<string, any> = {
      title,
      slug: { _type: 'slug', current: slug },
      excerpt,
      readTime,
      tags: tagsArray,
      content: contentBlocks,
      isPublic,
    };

    // Only upload and update image if a new one is selected
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const imageAsset = await writeClient.assets.upload('image', buffer, {
        filename: imageFile.name,
        contentType: imageFile.type,
      });
      updateData.mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      };
    }

    await writeClient.patch(id).set(updateData).commit();

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error updating post:', error);
    return { error: error.message || 'Failed to update blog post.' };
  }
}

export async function deletePost(id: string) {
  try {
    await writeClient.delete(id);
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return { error: error.message || 'Failed to delete blog post.' };
  }
}
