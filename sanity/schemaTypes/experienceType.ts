import { defineField, defineType } from 'sanity'
import { Briefcase } from 'lucide-react'

export const experienceType = defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    icon: Briefcase,
    fields: [
        defineField({
            name: 'year',
            title: 'Year / Duration',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Job Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tech',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'company',
        },
    },
})
