import { IsExternal } from 'rollup';
import validateNPMPackageName from 'validate-npm-package-name';

const nodeModulesRegex = /[\/\\]node_modules[\/\\]/;

/**
 * Create function to treat node modules as external to the bundle.
 *
 * @export
 * @returns {IsExternal}
 */
export default function nodeExternals(): IsExternal {
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

		return false;
	};
}
