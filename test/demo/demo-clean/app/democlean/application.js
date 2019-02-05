goog.provide('democlean.Application');
goog.require('democlean.BaseApplication');



/**
 * @constructor
 * @extends {democlean.BaseApplication}
 */
democlean.Application = function() {
	zb.console.setLevel(zb.console.Level.ALL);
	goog.base(this);
};
goog.inherits(democlean.Application, democlean.BaseApplication);


/**
 * @inheritDoc
 */
democlean.Application.prototype.onReady = function() {
	this.setHomeScene('home');
};


/**
 * @inheritDoc
 */
democlean.Application.prototype.onStart = function() {
	// login, splashscreen, timeout, etc.
	this.home();
};
