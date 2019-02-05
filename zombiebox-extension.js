var path = require('path');


/**
 * @implements {IZBAddon}
 */
Extension = class {
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
};


/**
 * @type {IZBAddon}
 */
module.exports = Extension;
