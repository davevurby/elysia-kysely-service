import Elysia, { status } from "elysia";
import { logger } from "../logger";
import { getCurrentTraceId } from "../opentelemetry";
import { db } from "../postgres";
import { HttpException } from "./http.exception";

/**
 * Handles HTTP exceptions by logging errors and returning a response with the appropriate status code.
 *
 * @param err - The HTTP exception to handle.
 * @returns A response with the error details.
 */
export const handleHttpException = (err: HttpException) => {
	// Get trace ID for tracing the error with OpenTelemetry
	const traceId = getCurrentTraceId();

	if (err.statusCode >= 500) {
		logger.error(err);
	}

	return status(err.statusCode, {
		message: err.message,
		status_code: err.statusCode,
		trace_id: traceId,
	});
};

/**
 * Base Elysia instance with error handling and dependency injection.
 *
 * This instance is used as a starting point for all API routes.
 *
 * You can extend this instance with your own decorators and plugins.
 *
 * @returns Base Elysia instance
 */
export const baseElysia = new Elysia()
	.error({
		HttpException,
	})
	.onError({ as: "global" }, ({ code, error }) => {
		switch (code) {
			case "HttpException":
				return handleHttpException(error);

			default:
				// This is some unhandled error, log it and return a 500 error
				logger.error(error);
				return new Response("Internal server error", { status: 500 });
		}
	})
	.decorate(() => ({ db }));
