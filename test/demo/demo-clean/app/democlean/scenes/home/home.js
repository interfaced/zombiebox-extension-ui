goog.provide('democlean.scenes.Home');
goog.require('zb.layers.CuteScene');
goog.require('democlean.scenes.templates.home');



/**
 * @constructor
 * @extends {zb.layers.CuteScene}
 */
democlean.scenes.Home = function() {
	goog.base(this);
};
goog.inherits(democlean.scenes.Home, zb.layers.CuteScene);


/**
 * @inheritDoc
 */
democlean.scenes.Home.prototype._renderTemplate = function() {
	return democlean.scenes.templates.home(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @type {democlean.scenes.templates.HomeOut}
 * @protected
 */
democlean.scenes.Home.prototype._templateResult;
