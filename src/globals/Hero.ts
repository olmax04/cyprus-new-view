import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero',
  fields: [
    {
      type: 'group',
      name: 'nav',
      label: 'Navigation',
      fields: [
        { name: 'aboutLabel', type: 'text', required: true, localized: true },
        { name: 'faqLabel', type: 'text', required: true, localized: true },
        { name: 'contactLabel', type: 'text', required: true, localized: true },
        { name: 'whatsappLabel', type: 'text', required: true, localized: true },
        { name: 'whatsappUrl', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'title',
      label: 'Title',
      fields: [
        { name: 'line1', type: 'text', required: true, localized: true },
        { name: 'line2', type: 'text', required: true, localized: true },
        { name: 'line3', type: 'text', required: true, localized: true },
      ],
    },
    {
      type: 'array',
      name: 'stats',
      label: 'Stats',
      fields: [
        { name: 'value', type: 'text', required: true, localized: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      type: 'array',
      name: 'categories',
      label: 'Categories',
      fields: [{ name: 'label', type: 'text', required: true, localized: true }],
    },
    {
      type: 'group',
      name: 'buttons',
      label: 'Buttons',
      fields: [
        { name: 'primaryLabel', type: 'text', required: true, localized: true },
        { name: 'secondaryLabel', type: 'text', required: true, localized: true },
        { name: 'searchLabel', type: 'text', required: true, localized: true },
      ],
    },
    {
      type: 'array',
      name: 'galleryCards',
      label: 'Gallery Cards',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
