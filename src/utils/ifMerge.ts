import R from 'ramda';

/**
 * If first object is not nil, it'll merge with second object. (First over second)
 * Otherwise, it'll return second object.
 *
 * @template T Object type
 * @param {T | Partial<T>} first First object
 * @param {T | Partial<T>} second Second object
 */
const ifMerge: <T>(first: T | Partial<T>, second: T | Partial<T>) => T = R.ifElse(
	R.isNil,
	R.nthArg(1),
	R.flip(R.merge(R.__))
);

export default ifMerge;
