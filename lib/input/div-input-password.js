goog.provide('zb.ui.DivInputPassword');
goog.require('zb.ui.DivInput');
goog.require('zb.ui.IInputWidget');



/**
 * @inheritDoc
 * @extends {zb.ui.DivInput}
 * @implements {zb.ui.IInputWidget}
 * @constructor
 */
zb.ui.DivInputPassword = function(container, opt_params) {
	this._secretSymbol = '*';

	//TODO in the future remove this class and move this functionality to parent class
	goog.base(this, container, opt_params);
	container.classList.add('_password');
};
goog.inherits(zb.ui.DivInputPassword, zb.ui.DivInput);


/**
 * @inheritDoc
 */
zb.ui.DivInputPassword.prototype._valueToRenderValue = function() {
	var secretLength = this._value.length ? this._value.length + 1 : 0;

	return new Array(secretLength).join(this._secretSymbol);
};


/**
 * @type {string}
 * @private
 */
zb.ui.DivInputPassword.prototype._secretSymbol;
