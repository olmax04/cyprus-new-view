import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Hero } from './globals/Hero'
import { AboutUs } from './globals/AboutUs'
import { Testimonials } from './globals/Testimonials'
import { FAQ } from './globals/FAQ'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  globals: [Hero, AboutUs, Testimonials, FAQ, Footer],
  editor: lexicalEditor(),
  localization: {
    locales: ['en', 'ru', 'sk'],
    defaultLocale: 'en',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional - defaults to true
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
