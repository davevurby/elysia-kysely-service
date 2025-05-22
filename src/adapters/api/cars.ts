import { getAllCars } from "@/business/cars/services/get-all-cars";
import { carCollectionResponseSchema } from "@/business/cars/types";
import { carCollectionQuerySchema } from "@/business/cars/types";
import { baseElysia } from "@/infrastructure/http";

export const cars = baseElysia
	.model("car.collection.query", carCollectionQuerySchema)
	.model("car.collection.response", carCollectionResponseSchema)
	.get(
		"/cars",
		({ db, query }) => {
			return getAllCars(db, query);
		},
		{
			tags: ["Cars"],
			detail: {
				summary: "Get all cars",
				description: "Get all cars from the database",
			},
			query: "car.collection.query",
			response: "car.collection.response",
		},
	);

export type CarsAPI = typeof cars;
