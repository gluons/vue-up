import isNil from 'lodash.isnil';

/**
 * If first object is not nil, it'll merge with second object. (First over second)
 * Otherwise, it'll return second object.
 *
 * @export
 * @template T Object type
 * @param {(T | Partial<T>)} first First object
 * @param {(T | Partial<T>)} second Second object
 * @returns {(T | Partial<T>)}
 */
export default function ifMerge<T>(
	first: T | Partial<T>,
	second: T | Partial<T>
): T | Partial<T> {
	if (isNil(first)) {
		return second;
	}

	return Object.assign({}, second, first);
}
