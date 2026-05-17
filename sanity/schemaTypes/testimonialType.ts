import { defineField, defineType } from 'sanity'
import { MessageSquareQuote } from 'lucide-react'

export const testimonialType = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    icon: MessageSquareQuote,
    fields: [
        defineField({
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'designation',
            title: 'Designation / Company',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'designation',
        },
    },
})
