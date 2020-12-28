/**
 * Check whether TypeScript is installed.
 *
 * @exports
 * @returns {boolean}
 */
export default function hasTypeScript(): boolean {
	try {
		require('typescript');

		return true;
	} catch (_) {
		return false;
	}
}
