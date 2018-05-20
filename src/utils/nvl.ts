import isset from './isset';

/**
 * Get a `fallbackValue` when `value` is empty.
 * Otherwise, get `value`.
 *
 * @export
 * @template T Type.
 * @param {T} value Value.
 * @param {T} fallbackValue Fallback value.
 * @returns {T}
 */
export default function nvl<T>(value: T, fallbackValue: T): T {
	return isset(value) ? value : fallbackValue;
}
