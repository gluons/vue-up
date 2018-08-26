import { resolve } from 'path';

/**
 * Resolve path with current working directory.
 *
 * @export
 * @param {string} path Path
 * @returns {string}
 */
export default function resolveCwd(path: string): string {
	// Don't resolve empty path
	if (!path) {
		return path;
	}

	return resolve(process.cwd(), path);
}
