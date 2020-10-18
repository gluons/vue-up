/**
 * Check whether given object is non-empty string.
 *
 * @export
 * @param {unknown} obj An object
 * @returns {boolean}
 */
export default function isNonEmptyStr(obj: unknown): boolean {
	return typeof obj === 'string' && obj.length > 0;
}
