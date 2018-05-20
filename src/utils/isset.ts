/**
 * Is `value` empty?
 *
 * @export
 * @param {any} value A Value.
 * @returns {boolean}
 */
export default function isset(value: any): boolean {
	return (typeof value !== 'undefined') && (value != null);
}
