import type { CollectionConfig } from 'payload'

export const Estates: CollectionConfig = {
  slug: 'estates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'propertyType', 'transactionType', 'price', 'updatedAt'],
  },
  access: {
    read: () => true, // Anyone can read estates
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true, // Needs to support ru, en, sk
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'propertyType',
          type: 'select',
          required: true,
          options: [
            { label: { en: 'Villa', ru: 'Вилла', sk: 'Vila' }, value: 'villa' },
            { label: { en: 'Apartment', ru: 'Апартаменты', sk: 'Apartmán' }, value: 'apartment' },
            { label: { en: 'Townhouse', ru: 'Таунхаус', sk: 'Mestský dom' }, value: 'townhouse' },
            { label: { en: 'Penthouse', ru: 'Пентхаус', sk: 'Penthouse' }, value: 'penthouse' },
          ],
        },
        {
          name: 'transactionType',
          type: 'select',
          required: true,
          options: [
            { label: { en: 'For Sale', ru: 'Продажа', sk: 'Na predaj' }, value: 'sale' },
            { label: { en: 'For Rent', ru: 'Аренда', sk: 'Na prenájom' }, value: 'rent' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rooms',
          type: 'number',
          admin: {
            description: 'Number of bedrooms',
          },
        },
        {
          name: 'area',
          type: 'number',
          admin: {
            description: 'Area in square meters (m²)',
          },
        },
      ],
    },
    {
      name: 'price',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Formatted price for display, e.g., "€1,200,000"',
      },
    },
    {
      name: 'priceValue',
      type: 'number',
      admin: {
        description: 'Numeric price used specifically for filtering ranges (e.g. 1200000)',
      },
      index: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        description: 'Additional images for the estate page',
      },
    },
  ],
}
