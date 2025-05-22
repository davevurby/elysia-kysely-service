import type Database from "@/@generated/Database";
import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";
import { config } from "../config";

export const pg = postgres(config.POSTGRES_DSN);

export const db = new Kysely<Database>({
	dialect: new PostgresJSDialect({
		postgres: pg,
	}),
});
