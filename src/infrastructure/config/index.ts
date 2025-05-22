import { z } from "zod";

const configSchema = z.object({
	// App config
	VERSION: z.string().default("1.0.0"),
	LOGGER_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

	// HTTP config
	PORT: z.coerce.number().default(3000),
	IDLE_TIMEOUT: z.coerce.number().default(30),
	MAX_FILE_SIZE: z.coerce.number().default(50 * 1024 * 1024),
	OPENAPI_HOST: z.string().default("http://localhost:3000"),

	// Postgres config
	POSTGRES_DSN: z
		.string()
		.default("postgres://postgres:postgres@localhost:5432/postgres"),
});

export const config = configSchema.parse(Bun.env);
