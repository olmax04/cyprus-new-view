import type { GlobalConfig } from 'payload'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  label: 'About Us',
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
              name: 'description',
              type: 'textarea',
              required: true,
              localized: true,
              label: 'Description',
            },
            {
              name: 'features',
              type: 'array',
              label: 'Features',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon (lucide icon name)',
                  admin: {
                    description: 'Name of the Lucide icon (e.g., "Home", "Users", "Award")',
                  },
                },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Statistics',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                },
              ],
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Main Image',
            },
            {
              name: 'buttonLabel',
              type: 'text',
              localized: true,
              label: 'Button Label',
            },
          ],
        },
      ],
    },
  ],
}
