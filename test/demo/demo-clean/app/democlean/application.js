goog.provide('democlean.Application');
goog.require('democlean.BaseApplication');


/**
 */
democlean.Application = class extends democlean.BaseApplication {
	/**
	 */
	constructor() {
		super();

		zb.console.setLevel(zb.console.Level.ALL);
	}

	/**
	 * @override
	 */
	onReady() {
		this.setHomeScene('home');
	}

	/**
	 * @override
	 */
	onStart() {
		// Login, splashscreen, timeout, etc.
		this.home();
	}
};

