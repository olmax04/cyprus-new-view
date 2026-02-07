import type { GlobalConfig } from 'payload'

export const Testimonials: GlobalConfig = {
  slug: 'testimonials',
  label: 'Testimonials',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              localized: true,
              label: 'Heading',
            },
            {
              name: 'subheading',
              type: 'text',
              localized: true,
              label: 'Subheading',
            },
            {
              name: 'items',
              type: 'array',
              label: 'Testimonials',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: 'Client Name',
                },
                {
                  name: 'role',
                  type: 'text',
                  localized: true,
                  label: 'Role/Position',
                },
                {
                  name: 'country',
                  type: 'text',
                  localized: true,
                  label: 'Country',
                },
                {
                  name: 'content',
                  type: 'textarea',
                  required: true,
                  localized: true,
                  label: 'Testimonial Text',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Client Photo',
                },
                {
                  name: 'rating',
                  type: 'number',
                  min: 1,
                  max: 5,
                  label: 'Rating (1-5)',
                  defaultValue: 5,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
