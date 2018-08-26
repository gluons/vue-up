/**
 * Get error message from error instance.
 *
 * @export
 * @param {any} err An error.
 * @returns {string}
 */
export default function getErrorMessage(err: any): string {
	if (err.message) {
		return err.message;
	} else {
		return err.toString();
	}
}
