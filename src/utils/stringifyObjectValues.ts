/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * Stringify (via `JSON.stringify`) all values in object.
 *
 * @export
 * @param {Record<string, any>} obj An object
 * @returns {Record<string, string>}
 */
export default function stringifyObjectValues(
	obj: Record<string, any>
): Record<string, string> {
	const newObj: Record<string, string> = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const value = obj[key];

			newObj[key] = JSON.stringify(value);
		}
	}

	return newObj;
}
