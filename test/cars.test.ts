import { describe, expect, it } from "bun:test";
import type { CarsAPI } from "@/adapters/api/cars";
import { edenTreaty } from "@elysiajs/eden";

const api = edenTreaty<CarsAPI>("http://localhost:3000");

describe("cars (e2e)", () => {
	it("should return all cars", async () => {
		const result = await api.cars.get({
			$query: {
				page: 1,
				limit: 10,
			},
		});

		expect(result.data?.items).toBeDefined();
		expect(result.data?.total).toBeDefined();
	});

	it("throw error when limit is 69", async () => {
		const result = await api.cars.get({
			$query: {
				page: 1,
				limit: 69,
			},
		});

		expect(result.status).toBe(400);
	});
});
