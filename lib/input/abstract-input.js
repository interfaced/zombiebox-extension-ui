/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.AbstractInput');
goog.require('zb.ui.IInputWidget');
goog.require('zb.widgets.InlineWidget');



/**
 * @param {HTMLElement} container
 * @param {zb.ui.AbstractInput.Params=} opt_params
 * @extends {zb.widgets.InlineWidget}
 * @implements {zb.ui.IInputWidget}
 * @constructor
 */
zb.ui.AbstractInput = function(container, opt_params) {
	goog.base(this, container);

	this._fireChange = this._fireChange.bind(this);

	this._firedValue = '';

	this._setupInput();

	if (opt_params) {
		this.setPlaceholder(opt_params.placeholder || '');
	}
};
goog.inherits(zb.ui.AbstractInput, zb.widgets.InlineWidget);


/**
 * @return {number}
 */
zb.ui.AbstractInput.prototype.getCaretPosition = function() {
	throw new Error('not implemented');
};


/**
 * @param {number} pos
 * @return {boolean}
 */
zb.ui.AbstractInput.prototype.setCaretPosition = function(pos) {
	throw new Error('not implemented');
};


/**
 * @return {string}
 */
zb.ui.AbstractInput.prototype.getValue = function() {
	throw new Error('not implemented');
};


/**
 * @param {string} placeholderText
 */
zb.ui.AbstractInput.prototype.setPlaceholder = function(placeholderText) {
	throw new Error('not implemented');
};


/**
 * @return {boolean}
 */
zb.ui.AbstractInput.prototype.moveCaretLeft = function() {
	return this.setCaretPosition(this.getCaretPosition() - 1);
};


/**
 * @return {boolean}
 */
zb.ui.AbstractInput.prototype.moveCaretRight = function() {
	return this.setCaretPosition(this.getCaretPosition() + 1);
};


/**
 * @param {string} str
 * @param {boolean=} opt_silent
 */
zb.ui.AbstractInput.prototype.setValue = function(str, opt_silent) {
	this._updateCurrentValue(str);

	this.setCaretPosition(str.length);

	if (!opt_silent) {
		this._fireChange();
	}
};


/**
 * Put given string to caret position.
 * @param {string} str
 */
zb.ui.AbstractInput.prototype.putStr = function(str) {
	var val = this.getValue();
	var pos = this.getCaretPosition();

	val =
		val.substr(0, pos) +
		str +
		val.substr(pos);
	this._updateCurrentValue(val);
	this.setCaretPosition(pos + str.length);

	this._fireChange();
};


/**
 * Remove char left of caret
 */
zb.ui.AbstractInput.prototype.backspace = function() {
	var val = this.getValue();
	var pos = this.getCaretPosition();

	val =
		val.substr(0, pos - 1) +
		val.substr(pos);
	this._updateCurrentValue(val);
	this.setCaretPosition(pos - 1);

	this._fireChange();
};


/**
 * Fire finish event
 */
zb.ui.AbstractInput.prototype.fireFinish = function() {
	this._fireEvent(this.EVENT_FINISH, this.getValue());
};


/**
 * Handles user-controlled key event
 * @inheritDoc
 */
zb.ui.AbstractInput.prototype._processKey = function(zbKey, opt_e) {
	var isHandled = false;
	var keys = zb.device.input.Keys;
	switch (zbKey) {
		case keys.RIGHT:
			isHandled = this.moveCaretRight();
			break;
		case keys.ENTER:
			this._fireChange();
			this.fireFinish();
			isHandled = true;
			break;
		case keys.LEFT:
			isHandled = this.moveCaretLeft();
			break;
		case keys.BACKSPACE:
			this.backspace();
			isHandled = true;
			break;
		default:
			isHandled = !!opt_e && this._handlePrintableKey(opt_e);
			break;
	}
	return isHandled;
};


/**
 * Setup input and events.
 * @protected
 */
zb.ui.AbstractInput.prototype._setupInput = function() {
	// setup DOM nodes in child implementatation
	this._firedValue = this.getValue();
};


/**
 * Render current value to view and save value internally for getValue().
 * @param {string} value
 * @protected
 */
zb.ui.AbstractInput.prototype._updateCurrentValue = function(value) {
	throw new Error('not implemented');
};


/**
 * @protected
 */
zb.ui.AbstractInput.prototype._fireChange = function() {
	var currentValue = this.getValue();
	if (this._firedValue !== currentValue) {
		this._firedValue = currentValue;
		this._fireEvent(this.EVENT_CHANGE, this._firedValue);
	}
};


/**
 * Allowed only digit keys due to problems with unprintable symbols on certain platforms.
 * PC platform pass all keys except LEFT/RIGHT as development platform.
 * @param {KeyboardEvent} event
 * @return {boolean}
 * @protected
 */
zb.ui.AbstractInput.prototype._handlePrintableKey = function(event) {
	var keyChar = app.device.input.eventToPrintableChar(event);

	if (keyChar !== null) {
		event.preventDefault();
		this.putStr(keyChar);
		return true;
	}
	return false;
};


/**
 * @typedef {{
 *     placeholder: (string|undefined)
 * }}
 */
zb.ui.AbstractInput.Params;


/**
 * @type {string}
 * @protected
 */
zb.ui.AbstractInput.prototype._firedValue;


/**
 * Fired with {string} value
 * @const {string}
 */
zb.ui.AbstractInput.prototype.EVENT_CHANGE = 'change';


/**
 * Fired with {string} value
 * @const {string}
 */
zb.ui.AbstractInput.prototype.EVENT_FINISH = 'finish';
