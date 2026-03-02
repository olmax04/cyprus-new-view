import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // 1. Change description from text to jsonb (richText)
  await db.execute(sql`
    ALTER TABLE "estates_locales" ALTER COLUMN "description" SET DATA TYPE jsonb USING NULL;
  `)

  // 2. Add slug column as nullable first
  await db.execute(sql`
    ALTER TABLE "estates" ADD COLUMN "slug" varchar;
  `)

  // 3. Populate slug from existing titles
  const existingEstates = await db.execute(sql`
    SELECT e.id, el.title
    FROM "estates" e
    LEFT JOIN "estates_locales" el ON e.id = el._parent_id AND el._locale = 'en'
  `)

  for (const row of existingEstates.rows) {
    if (row.title) {
      const slug = String(row.title)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')

      await db.execute(sql`
        UPDATE "estates" SET "slug" = ${slug} WHERE "id" = ${row.id}
      `)
    } else {
      await db.execute(sql`
        UPDATE "estates" SET "slug" = ${`estate-${row.id}`} WHERE "id" = ${row.id}
      `)
    }
  }

  // 4. Set NOT NULL and create unique index
  await db.execute(sql`
    ALTER TABLE "estates" ALTER COLUMN "slug" SET NOT NULL;
    CREATE UNIQUE INDEX "estates_slug_idx" ON "estates" USING btree ("slug");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "estates_slug_idx";
    ALTER TABLE "estates_locales" ALTER COLUMN "description" SET DATA TYPE varchar;
    ALTER TABLE "estates" DROP COLUMN "slug";
  `)
}
