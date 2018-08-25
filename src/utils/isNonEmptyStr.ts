import R from 'ramda';

/**
 * Check whether given object is non-empty string.
 *
 * @param {any} obj An object
 * @returns {boolean}
 */
const isNonEmptyStr: (obj: any) => boolean = R.allPass([
	R.compose(R.not, R.either(R.isNil, R.isEmpty)),
	R.is(String)
]);

export default isNonEmptyStr;
