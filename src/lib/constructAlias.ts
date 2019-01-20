import resolveCwd from '../utils/resolveCwd';

/**
 * Construct alias for `rollup-plugin-alias`.
 *
 * @export
 * @param {Record<string, string>} alias User-provided alias
 * @returns {Record<string, string>}
 */
export default function constructAlias(
	alias: Record<string, string>
): Record<string, string> {
	const builtInAlias: Record<string, string> = {
		'@': resolveCwd('./src')
	};

	const finalAlias = Object.assign({}, builtInAlias, alias);

	return finalAlias;
}
