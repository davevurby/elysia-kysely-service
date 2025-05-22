import { describe, expect, it } from "bun:test";
import { retry } from "./retry";

describe("retry", () => {
	it("should simply return the result of the function if it succeeds", async () => {
		const result = await retry(() => Promise.resolve(1), 3);
		expect(result).toBe(1);
	});

	it("throws the error if the function fails", async () => {
		expect(() =>
			retry(() => Promise.reject(new Error("test")), 3),
		).toThrowError("test");
	});

	it("should retry twice then succeed", async () => {
		const result = await retry(
			(attempt) =>
				attempt === 2 ? Promise.resolve(1) : Promise.reject(new Error("test")),
			3,
		);
		expect(result).toBe(1);
	});
});
