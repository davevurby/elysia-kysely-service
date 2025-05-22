export class HttpException extends Error {
	constructor(
		public readonly message: string,
		public readonly statusCode: number,
	) {
		super(message);
	}
}
