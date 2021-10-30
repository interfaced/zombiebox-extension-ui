import path from 'path';

import {AbstractExtension} from 'zombiebox';


/**
 */
class Extension extends AbstractExtension {
	/**
	 * @override
	 */
	getName() {
		return 'ui';
	}

	/**
	 * @override
	 */
	getSourcesDir() {
		return (new URL('lib', import.meta.url)).pathname;
	}

	/**
	 * @override
	 */
	getConfig() {
		return {};
	}

	/**
	 * @override
	 */
	buildCLI(yargs, application) {
		return undefined;
	}

	/**
	 * @override
	 */
	generateCode(projectConfig) {
		return {};
	}
}


export default Extension;
