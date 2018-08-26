/**
 * Get error message from error instance.
 *
 * @export
 * @template T Error type
 * @param {T} err An error
 * @returns {string}
 */
export default function getErrorMessage<T extends Error>(err: T): string {
	if (err.message) {
		return err.message;
	} else {
		return err.toString();
	}
}
