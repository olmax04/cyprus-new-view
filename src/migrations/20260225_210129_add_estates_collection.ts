import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_estates_property_type" AS ENUM('villa', 'apartment', 'townhouse', 'penthouse');
  CREATE TYPE "public"."enum_estates_transaction_type" AS ENUM('sale', 'rent');
  CREATE TABLE "estates_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "estates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"property_type" "enum_estates_property_type" NOT NULL,
  	"transaction_type" "enum_estates_transaction_type" NOT NULL,
  	"rooms" numeric,
  	"area" numeric,
  	"price_value" numeric,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "estates_locales" (
  	"title" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"description" varchar,
  	"price" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "estates_id" integer;
  ALTER TABLE "estates_gallery" ADD CONSTRAINT "estates_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "estates_gallery" ADD CONSTRAINT "estates_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."estates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "estates" ADD CONSTRAINT "estates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "estates_locales" ADD CONSTRAINT "estates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."estates"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "estates_gallery_order_idx" ON "estates_gallery" USING btree ("_order");
  CREATE INDEX "estates_gallery_parent_id_idx" ON "estates_gallery" USING btree ("_parent_id");
  CREATE INDEX "estates_gallery_image_idx" ON "estates_gallery" USING btree ("image_id");
  CREATE INDEX "estates_price_value_idx" ON "estates" USING btree ("price_value");
  CREATE INDEX "estates_image_idx" ON "estates" USING btree ("image_id");
  CREATE INDEX "estates_updated_at_idx" ON "estates" USING btree ("updated_at");
  CREATE INDEX "estates_created_at_idx" ON "estates" USING btree ("created_at");
  CREATE UNIQUE INDEX "estates_locales_locale_parent_id_unique" ON "estates_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_estates_fk" FOREIGN KEY ("estates_id") REFERENCES "public"."estates"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_estates_id_idx" ON "payload_locked_documents_rels" USING btree ("estates_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "estates_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "estates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "estates_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "estates_gallery" CASCADE;
  DROP TABLE "estates" CASCADE;
  DROP TABLE "estates_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_estates_fk";
  
  DROP INDEX "payload_locked_documents_rels_estates_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "estates_id";
  DROP TYPE "public"."enum_estates_property_type";
  DROP TYPE "public"."enum_estates_transaction_type";`)
}
