import { IsExternal } from 'rollup';
import validateNPMPackageName from 'validate-npm-package-name';

const nodeModulesRegex = /[\/\\]node_modules[\/\\]/;

/**
 * Options of `nodeExternals`.
 *
 * @export
 * @interface NodeExternalsOptions
 */
export interface NodeExternalsOptions {
	/**
	 * List of additional module RegEx to exclude from bundle
	 *
	 * @type {RegExp[]}
	 * @memberof NodeExternalsOptions
	 */
	extra?: RegExp[];
}

/**
 * Create function to treat node modules as external to the bundle.
 *
 * @export
 * @returns {IsExternal}
 */
export default function nodeExternals(options: NodeExternalsOptions = {}): IsExternal {
	const { extra } = options;

	return (id: string): boolean => {
		// Node package name
		const validateResult = validateNPMPackageName(id);
		const isNPMPackage: boolean = validateResult.validForNewPackages;
		if (isNPMPackage) {
			return true;
		}

		// In `node_modules` directory
		const isInNodeModules = nodeModulesRegex.test(id);
		if (isInNodeModules) {
			return true;
		}

		if (
			Array.isArray(extra) &&
			extra.length > 0 &&
			extra.some(extraRegex => extraRegex.test(id))
		) {
			return true;
		}

		return false;
	};
}
