import type { CollectionConfig } from 'payload'

const slugify = (text: string): string =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')

// Role helpers
const isAdmin = (user: any) => user?.role === 'administrator'
const isManagerOrAbove = (user: any) => ['manager', 'administrator'].includes(user?.role)

export const Estates: CollectionConfig = {
  slug: 'estates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'assignedTo',
      'propertyType',
      'transactionType',
      'price',
      'updatedAt',
    ],
  },
  access: {
    // Anyone can read estates (public frontend)
    read: () => true,

    // Any authenticated user can create estates
    create: ({ req: { user } }) => !!user,

    // Employee: only own estates | Manager: any estate | Admin: any estate
    update: ({ req: { user } }) => {
      if (!user) return false
      if (isManagerOrAbove(user)) return true
      // Employee: can only update estates assigned to them
      return {
        assignedTo: { equals: user.id },
      }
    },

    // Only managers and admins can delete
    delete: ({ req: { user } }) => {
      if (!user) return false
      if (isManagerOrAbove(user)) return true
      return false
    },
  },
  hooks: {
    beforeValidate: [
      ({ data, req, operation }) => {
        if (data && !data.slug && data.title) {
          data.slug = slugify(data.title)
        }
        if (operation === 'create' && req.user && !data?.assignedTo) {
          data!.assignedTo = req.user.id
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier. Auto-generated from title if left empty.',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'The user responsible for this estate',
      },
      access: {
        // Only managers and admins can change the assigned user
        update: ({ req: { user } }) => isManagerOrAbove(user),
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
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
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          required: true,
          index: true,
          admin: {
            description: 'Numeric price value (e.g. 1200000)',
          },
        },
        {
          name: 'currency',
          type: 'select',
          required: true,
          defaultValue: 'EUR',
          options: [
            { label: '€ EUR', value: 'EUR' },
            { label: '$ USD', value: 'USD' },
            { label: '£ GBP', value: 'GBP' },
          ],
        },
      ],
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
