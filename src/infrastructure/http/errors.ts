import { HttpStatus } from "./http-status";
import { HttpException } from "./http.exception";

/**
 * Create a bad request exception
 *
 * @param message - Error message
 * @returns - HttpException
 */
export function badRequest(message: string): HttpException {
	return new HttpException(message, HttpStatus.BAD_REQUEST);
}

/**
 * Create a not found exception
 *
 * @param message - Error message
 * @returns - HttpException
 */
export function notFound(message: string): HttpException {
	return new HttpException(message, HttpStatus.NOT_FOUND);
}

/**
 * Create a unauthorized exception
 *
 * @param message - Error message
 * @returns - HttpException
 */
export function unauthorized(message: string): HttpException {
	return new HttpException(message, HttpStatus.UNAUTHORIZED);
}
