import type { CollectionConfig, FieldAccess } from 'payload'

// Helper: check if user has a specific role or higher
const isAdmin = (user: any) => user?.role === 'administrator'
const isManagerOrAbove = (user: any) => ['manager', 'administrator'].includes(user?.role)

// Only admins can change the role field
const adminOnlyField: FieldAccess = ({ req: { user } }) => isAdmin(user)

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'createdAt'],
  },
  auth: true,
  access: {
    // Anyone can read users (needed for relationships)
    read: () => true,
    // Only admins can create users
    create: ({ req: { user } }) => isAdmin(user),
    // Employees can update themselves, managers can update non-admins, admins can update anyone
    update: ({ req: { user }, id }) => {
      if (!user) return false
      if (isAdmin(user)) return true
      if (isManagerOrAbove(user)) return true
      // Employees can only update their own profile
      return user.id === id
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => isAdmin(user),
    // Only managers and admins can access admin panel
    admin: ({ req: { user } }) => {
      if (!user) return false
      return ['employee', 'manager', 'administrator'].includes(user?.role)
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'employee',
      options: [
        { label: 'Employee', value: 'employee' },
        { label: 'Manager', value: 'manager' },
        { label: 'Administrator', value: 'administrator' },
      ],
      access: {
        // Only admins can change roles
        update: adminOnlyField,
      },
      admin: {
        position: 'sidebar',
        description: 'User role determines access permissions',
      },
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Display name of the user',
      },
    },
  ],
}
