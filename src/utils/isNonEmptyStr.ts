/**
 * Check whether given object is non-empty string.
 *
 * @export
 * @param {any} obj An object
 * @returns {boolean}
 */
export default function isNonEmptyStr(obj: any): boolean {
	return typeof obj === 'string' && obj.length > 0;
}
