import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { cars } from "./adapters/api/cars";
import { status } from "./adapters/api/status";
import { config } from "./infrastructure/config";
import { logger } from "./infrastructure/logger";

const port = config.PORT;
const version = config.VERSION;
const readableServiceName = "Service Name";

new Elysia({
	serve: {
		// Seconds to timeout idle connections
		idleTimeout: config.IDLE_TIMEOUT,
	},
})
	.use(
		cors({
			origin: "*",
		}),
	)
	.use(
		swagger({
			path: "/docs",
			documentation: {
				info: {
					title: readableServiceName,
					version: version,
				},
				servers: [
					{
						url: config.OPENAPI_HOST,
					},
				],
			},
		}),
	)
	.use(status)
	.use(cars)
	.listen(port, () => {
		logger.info(
			`🚀 ${readableServiceName} is running on http://localhost:${port}`,
		);
		logger.info(
			`📖 You can find documentation on http://localhost:${port}/docs`,
		);
	});
