import { defineField, defineType } from 'sanity'
import { FolderKanban } from 'lucide-react'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    icon: FolderKanban,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'id',
            title: 'ID (Slug)',
            type: 'slug',
            options: {
                source: 'title',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'isPublic',
            title: 'Public Portfolio Project',
            description: 'Turn on to show this project on your public website. Keep off for internal/private tracking.',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'clientName',
            title: 'Client Name (Internal)',
            type: 'string',
        }),
        defineField({
            name: 'status',
            title: 'Project Status',
            type: 'string',
            options: {
                list: ['Planning', 'In Progress', 'In Review', 'Completed', 'Cancelled'],
            },
            initialValue: 'Planning',
        }),
        defineField({
            name: 'progress',
            title: 'Progress (%)',
            type: 'number',
            validation: (rule) => rule.min(0).max(100),
            initialValue: 0,
        }),
        defineField({
            name: 'paymentStatus',
            title: 'Payment Status',
            type: 'string',
            options: {
                list: ['Unpaid', 'Partial / DP', 'Paid'],
            },
            initialValue: 'Unpaid',
        }),
        defineField({
            name: 'budget',
            title: 'Project Budget / Value',
            type: 'number',
        }),
        defineField({
            name: 'deadline',
            title: 'Deadline',
            type: 'date',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: ['Web', 'Mobile', 'UI/UX', 'System'],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'longDescription',
            title: 'Long Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Project Link',
            type: 'url',
        }),
        defineField({
            name: 'demoVideoUrl',
            title: 'Demo Video URL',
            description: 'Optional: Direct link to a hosted MP4 video or YouTube/Vimeo link to demonstrate the project.',
            type: 'url',
        }),
        defineField({
            name: 'tech',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'color',
            title: 'Card Hover Color',
            type: 'string',
            options: {
                list: [
                    { title: 'Cyan', value: 'blue' },
                    { title: 'Pink', value: 'pink' }
                ],
            },
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Used to sort the projects. Lower numbers appear first.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'image',
        },
    },
})
