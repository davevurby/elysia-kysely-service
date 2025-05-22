import type Database from "@/@generated/Database";
import { badRequest } from "@/infrastructure/http";
import type { Kysely } from "kysely";
import { ERRORS } from "../errors";
import type { CarCollectionQuery, CarCollectionResponse } from "../types";
/**
 * Get all cars according to the criteria.
 *
 * @param db - Kysely database instance
 * @param query - Car collection query
 * @returns Car collection response
 */
export async function getAllCars(
	db: Kysely<Database>,
	query: CarCollectionQuery,
): Promise<CarCollectionResponse> {
	const { page, limit } = query;

	if (limit === 69) {
		throw badRequest(ERRORS.KEEP_YOUR_NUMBER_FOR_EVENING);
	}

	const cars = await db
		.selectFrom("car as c")
		.selectAll("c")
		.limit(limit)
		.offset((page - 1) * limit)
		.execute();

	const total = await db
		.selectFrom("car as c")
		.select(({ fn }) => [fn.count("c.id").as("total")])
		.executeTakeFirstOrThrow();

	return {
		items: cars,
		total: Number(total.total),
	};
}
