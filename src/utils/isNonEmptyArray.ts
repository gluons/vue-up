/**
 * Check whether given array is non-empty array.
 *
 * @export
 * @param {unknown} arr An array
 * @returns {boolean}
 */
export default function isNonEmptyArray(arr: unknown): boolean {
	return Array.isArray(arr) && arr.length > 0;
}
