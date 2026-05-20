'use server'

import { writeClient } from '@/sanity/lib/writeClient'
import { revalidatePath } from 'next/cache'

const SETTINGS_ID = 'siteSettings'

// Ensure the singleton document exists
async function ensureSettingsDoc() {
  const existing = await writeClient.getDocument(SETTINGS_ID)
  if (!existing) {
    await writeClient.createOrReplace({ _id: SETTINGS_ID, _type: 'siteSettings' })
  }
}

export async function updateHeroSettings(formData: FormData) {
  try {
    await ensureSettingsDoc()

    const heroName            = formData.get('heroName') as string
    const heroTagline         = formData.get('heroTagline') as string
    const heroBio             = formData.get('heroBio') as string
    const heroCtaLabel        = formData.get('heroCtaLabel') as string
    const heroCtaUrl          = formData.get('heroCtaUrl') as string
    const heroBackgroundVideo = formData.get('heroBackgroundVideo') as string
    const aboutHeading        = formData.get('aboutHeading') as string
    const aboutText           = formData.get('aboutText') as string
    const aboutSkillsInput    = formData.get('aboutSkills') as string
    const marqueeText         = formData.get('marqueeText') as string
    const imageFile           = formData.get('profileImage') as File | null

    const aboutSkills = aboutSkillsInput ? aboutSkillsInput.split(',').map(s => s.trim()).filter(Boolean) : []

    const patch: Record<string, any> = {
      heroName,
      heroTagline,
      heroBio,
      heroCtaLabel,
      heroCtaUrl: heroCtaUrl || undefined,
      heroBackgroundVideo: heroBackgroundVideo || undefined,
      aboutHeading,
      aboutText,
      aboutSkills,
      marqueeText,
    }

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const asset  = await writeClient.assets.upload('image', buffer, { filename: imageFile.name, contentType: imageFile.type })
      patch.profileImage = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    }

    await writeClient.patch(SETTINGS_ID).set(patch).commit()
    revalidatePath('/')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function updateThemeSettings(formData: FormData) {
  try {
    await ensureSettingsDoc()
    await writeClient.patch(SETTINGS_ID).set({
      accentColor:    formData.get('accentColor') as string,
      darkModeDefault: formData.get('darkModeDefault') === 'on',
    }).commit()
    revalidatePath('/')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function updateSectionSettings(formData: FormData) {
  try {
    await ensureSettingsDoc()
    await writeClient.patch(SETTINGS_ID).set({
      showExperience:   formData.get('showExperience') === 'on',
      showProjects:     formData.get('showProjects') === 'on',
      showTestimonials: formData.get('showTestimonials') === 'on',
      showFeatures:     formData.get('showFeatures') === 'on',
      showBlog:         formData.get('showBlog') === 'on',
      maintenanceMode:  formData.get('maintenanceMode') === 'on',
      maintenanceMessage: formData.get('maintenanceMessage') as string,
    }).commit()
    revalidatePath('/')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function updateSocialLinks(links: Array<{ platform: string; url: string; visible: boolean }>) {
  try {
    await ensureSettingsDoc()
    await writeClient.patch(SETTINGS_ID).set({ socialLinks: links }).commit()
    revalidatePath('/')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}

export async function updateSeoSettings(formData: FormData) {
  try {
    await ensureSettingsDoc()
    const ogFile = formData.get('ogImage') as File | null
    const patch: Record<string, any> = {
      seoTitle:       formData.get('seoTitle') as string,
      seoDescription: formData.get('seoDescription') as string,
      resumeUrl:      formData.get('resumeUrl') as string || undefined,
    }
    if (ogFile && ogFile.size > 0) {
      const buffer = Buffer.from(await ogFile.arrayBuffer())
      const asset  = await writeClient.assets.upload('image', buffer, { filename: ogFile.name, contentType: ogFile.type })
      patch.ogImage = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    }
    await writeClient.patch(SETTINGS_ID).set(patch).commit()
    revalidatePath('/')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}
