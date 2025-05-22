const { makeKyselyHook } = require("kanel-kysely");

module.exports = {
	connection: {
		connectionString:
			process.env.POSTGRES_DSN ??
			"postgres://postgres:postgres@localhost:5432/postgres",
	},
	schemas: ["public"],
	preRenderHooks: [makeKyselyHook()],
	outputPath: "src/@generated",
};
