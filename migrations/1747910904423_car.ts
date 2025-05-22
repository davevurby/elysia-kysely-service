import type Database from "@/@generated/Database";
import { type Kysely, sql } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<Database>): Promise<void> {
	await db.schema
		.createTable("car")
		.addColumn("id", "text", (col) =>
			col.notNull().primaryKey().defaultTo(sql`generate_ulid('car')`),
		)
		.addColumn("created_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("brand_name", "text", (col) => col.notNull())
		.addColumn("model_name", "text", (col) => col.notNull())
		.addColumn("year", "text", (col) => col.notNull())
		.addColumn("color", "text", (col) => col.notNull())
		.execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<Database>): Promise<void> {
	await db.schema.dropTable("car").execute();
}
