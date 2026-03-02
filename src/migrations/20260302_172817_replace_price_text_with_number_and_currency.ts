import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_estates_currency" AS ENUM('EUR', 'USD', 'GBP');
  ALTER TABLE "estates" RENAME COLUMN "price_value" TO "price";
  DROP INDEX "estates_price_value_idx";
  ALTER TABLE "estates" ADD COLUMN "currency" "enum_estates_currency" DEFAULT 'EUR' NOT NULL;
  CREATE INDEX "estates_price_idx" ON "estates" USING btree ("price");
  ALTER TABLE "estates_locales" DROP COLUMN "price";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "estates_price_idx";
  ALTER TABLE "estates" ADD COLUMN "price_value" numeric;
  ALTER TABLE "estates_locales" ADD COLUMN "price" varchar NOT NULL;
  CREATE INDEX "estates_price_value_idx" ON "estates" USING btree ("price_value");
  ALTER TABLE "estates" DROP COLUMN "price";
  ALTER TABLE "estates" DROP COLUMN "currency";
  DROP TYPE "public"."enum_estates_currency";`)
}
