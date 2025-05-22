import { describe, expect, it, mock } from "bun:test";
import type Database from "@/@generated/Database";
import type { Kysely } from "kysely";
import { ERRORS } from "../errors";
import { getAllCars } from "./get-all-cars";

describe("getAllCars", () => {
	it("should return all cars", async () => {
		// Mock data
		const mockCars = [
			{
				id: "car_1",
				brand_name: "Porsche",
				model_name: "911",
				year: "2022",
				color: "Black",
			},
			{
				id: "car_2",
				brand_name: "Koenigsegg",
				model_name: "Jesko",
				year: "2023",
				color: "Blue",
			},
		];

		const mockTotal = { total: "2" };

		// Mock Kysely instance
		const mockDb = {
			selectFrom: mock(() => ({
				selectAll: mock(() => ({
					limit: mock(() => ({
						offset: mock(() => ({
							execute: mock(() => Promise.resolve(mockCars)),
						})),
					})),
				})),
				select: mock(() => ({
					executeTakeFirstOrThrow: mock(() => Promise.resolve(mockTotal)),
				})),
			})),
		} as unknown as Kysely<Database>;

		const query = {
			page: 1,
			limit: 10,
		};

		const result = await getAllCars(mockDb, query);

		expect(result.items).toEqual(mockCars);
		expect(result.total).toBe(2);
	});

	it("should throw error when limit is 69", async () => {
		const query = {
			page: 1,
			limit: 69,
		};

		const mockDb = {} as Kysely<Database>;

		expect(getAllCars(mockDb, query)).rejects.toThrow(
			ERRORS.KEEP_YOUR_NUMBER_FOR_EVENING,
		);
	});
});
