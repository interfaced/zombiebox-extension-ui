const path = require('path');


/**
 * @implements {IZBAddon}
 */
class Extension {
	/**
	 * @override
	 */
	getName() {
		return 'ui';
	}

	/**
	 * @override
	 */
	getPublicDir() {
		return path.join(__dirname, 'lib');
	}

	/**
	 * @override
	 */
	getConfig() {
		return {};
	}
}


/**
 * @type {IZBAddon}
 */
module.exports = Extension;
