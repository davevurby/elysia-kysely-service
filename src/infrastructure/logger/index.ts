import pino from "pino";
import { config } from "../config";
import { getCurrentTraceId } from "../opentelemetry";

const transports = pino.transport({
	targets: [{ target: "pino-pretty", level: "debug" }],
});

/**
 * Logger instance to log everything you need :)
 */
export const logger = pino(
	{
		level: config.LOGGER_LEVEL,
		hooks: {
			logMethod(args, method) {
				const traceId = getCurrentTraceId();
				if (traceId) {
					if (typeof args[0] === "object") {
						(args[0] as Record<string, string>).traceId = traceId;
					} else {
						args.unshift({ traceId });
					}
				}
				method.apply(this, args);
			},
		},
	},
	transports,
);
