import { type Span, context, trace } from "@opentelemetry/api";

/**
 * Gets the current trace ID.
 *
 * @returns The current trace ID or null if there is no active span.
 */
export function getCurrentTraceId(): string | null {
	return trace.getSpan(context.active())?.spanContext().traceId ?? null;
}

/**
 * Gets the current span.
 *
 * @returns The current span or null if there is no active span.
 */
export function getCurrentSpan(): Span | null {
	return trace.getSpan(context.active()) ?? null;
}
