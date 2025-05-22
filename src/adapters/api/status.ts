import Elysia from "elysia";

export const status = new Elysia().get(
	"/__status",
	() => {
		return {
			status: "ok",
		};
	},
	{
		tags: ["Info"],
	},
);
