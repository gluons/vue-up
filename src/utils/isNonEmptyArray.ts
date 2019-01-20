/**
 * Check whether given array is non-empty array.
 *
 * @export
 * @param {any} arr An array
 * @returns {boolean}
 */
export default function isNonEmptyArray(arr: any): boolean {
	return Array.isArray(arr) && arr.length > 0;
}
