import { t } from "elysia";

export const carSchema = t.Object({
	id: t.String(),
	brand_name: t.String(),
	model_name: t.String(),
	year: t.String(),
	color: t.String(),
});

export const carCollectionQuerySchema = t.Object({
	page: t.Number({ minimum: 1, default: 1 }),
	limit: t.Number({ minimum: 1, default: 10 }),
});

export const carCollectionResponseSchema = t.Object({
	items: t.Array(carSchema),
	total: t.Number(),
});

export type Car = typeof carSchema.static;
export type CarCollectionQuery = typeof carCollectionQuerySchema.static;
export type CarCollectionResponse = typeof carCollectionResponseSchema.static;
