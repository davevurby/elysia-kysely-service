import { defineConfig } from "kysely-ctl";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";

const pg = postgres(
	process.env.POSTGRES_DSN ??
		"postgres://postgres:postgres@localhost:5432/postgres",
);

export default defineConfig({
	dialect: new PostgresJSDialect({
		postgres: pg,
	}),
	seeds: {
		seedFolder: "seeds",
	},
	migrations: {
		migrationFolder: "migrations",
	},
});
