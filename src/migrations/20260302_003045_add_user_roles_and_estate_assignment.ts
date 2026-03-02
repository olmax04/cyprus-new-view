import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('employee', 'manager', 'administrator');
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'employee' NOT NULL;
  ALTER TABLE "users" ADD COLUMN "name" varchar;
  ALTER TABLE "estates" ADD COLUMN "assigned_to_id" integer NOT NULL;
  ALTER TABLE "estates" ADD CONSTRAINT "estates_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "estates_assigned_to_idx" ON "estates" USING btree ("assigned_to_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "estates" DROP CONSTRAINT "estates_assigned_to_id_users_id_fk";
  
  DROP INDEX "estates_assigned_to_idx";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "users" DROP COLUMN "name";
  ALTER TABLE "estates" DROP COLUMN "assigned_to_id";
  DROP TYPE "public"."enum_users_role";`)
}
