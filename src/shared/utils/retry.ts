/**
 * Retries an async function.
 *
 * @param fn - The function to retry with the current attempt number.
 * @param retries - The number of retries.
 */
export async function retry<T>(
	fn: (iteration: number) => Promise<T> | T,
	retries: number,
): Promise<T> {
	let attempt = 0;
	while (true) {
		try {
			return await fn(attempt);
		} catch (error) {
			attempt++;
			if (attempt > retries) {
				throw error;
			}
		}
	}
}
