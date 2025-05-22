import type Database from "@/@generated/Database";
import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<Database>): Promise<void> {
	await db.executeQuery(
		sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.compile(db),
	);
	await db.executeQuery(
		sql`
			CREATE OR REPLACE FUNCTION generate_ulid(prefix text) RETURNS text AS $$
			DECLARE
				new_uuid uuid;
			BEGIN
				-- Generate a new UUID
				new_uuid := uuid_generate_v4();
				
				-- Return the concatenated result
				RETURN prefix || '_' || new_uuid::text;
			END;
			$$ LANGUAGE plpgsql;
		`.compile(db),
	);
}

export async function down(db: Kysely<Database>): Promise<void> {
	await db.executeQuery(sql`DROP FUNCTION generate_ulid`.compile(db));

	await db.executeQuery(sql`DROP EXTENSION IF EXISTS "uuid-ossp"`.compile(db));
}
