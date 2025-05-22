import { BatchSpanProcessor, type Span } from "@opentelemetry/sdk-trace-node";

/**
 * A secure batch span processor.
 *
 * It hides sensitive information from the spans.
 */
export class SecureBatchSpanProcessor extends BatchSpanProcessor {
	/**
	 * Sanitizes a span.
	 *
	 * It hides sensitive information from the span.
	 *
	 * @param span - The span to sanitize.
	 */
	_sanitizeSpan(span: Span) {
		const attributes = span.attributes;

		if (
			attributes["http.request.body"] &&
			(attributes["http.request.body"] as string).includes(`"password"`)
		) {
			span.attributes["http.request.body"] = JSON.stringify({
				...JSON.parse(attributes["http.request.body"] as string),
				password: "******",
			});
		}
	}

	/**
	 * Called when a span is ended.
	 *
	 * @param span - The span that ended.
	 */
	onEnd(span: Span) {
		this._sanitizeSpan(span);
		super.onEnd(span);
	}
}
