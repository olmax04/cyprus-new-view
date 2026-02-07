import type { GlobalConfig } from 'payload'

export const FAQ: GlobalConfig = {
  slug: 'faq',
  label: 'FAQ',
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
              label: 'FAQ Items',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
