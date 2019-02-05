goog.provide('democlean.scenes.Home');
goog.require('democlean.scenes.templates.home');
goog.require('zb.layers.CuteScene');


/**
 */
democlean.scenes.Home = class extends zb.layers.CuteScene {
	/**
	 */
	constructor() {
		super();
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return democlean.scenes.templates.home(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @abstract
	 * @type {democlean.scenes.templates.HomeOut}
	 * @protected
	 */
	_templateResult() {}
};
