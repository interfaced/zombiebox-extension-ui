/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.NativeInput');
goog.require('zb.ui.AbstractInput');
goog.require('zb.ui.IInputWidget');



/**
 * @inheritDoc
 * @extends {zb.ui.AbstractInput}
 * @implements {zb.ui.IInputWidget}
 * @constructor
 */
zb.ui.NativeInput = function(container, opt_params) {
	this._onFocus = this._onFocus.bind(this);
	this._onKeyDown = this._onKeyDown.bind(this);
	this._internalFocus = false;

	goog.base(this, container, opt_params);
};
goog.inherits(zb.ui.NativeInput, zb.ui.AbstractInput);


/**
 * @inheritDoc
 */
zb.ui.NativeInput.prototype.getCaretPosition = function() {
	return this._input.selectionStart;
};


/**
 * @inheritDoc
 */
zb.ui.NativeInput.prototype.setCaretPosition = function(pos) {
	if (pos < 0 || pos > this._input.value.length) {
		return false;
	}

	// Samsung platform has some strange behavior with selection change. If input enabled and not focused, after
	// selection range changed input will be focused. Prevent it via disable input while changing selection.
	var oldInputDisableState = this._input.disabled;
	this._input.disabled = true;

	if (this._input.setSelectionRange) {
		this._input.setSelectionRange(pos, pos);
	} else {
		this._input.selectionStart = pos;
		this._input.selectionEnd = pos;
	}

	// revert disable state
	this._input.disabled = oldInputDisableState;

	return true;
};


/**
 * @inheritDoc
 */
zb.ui.NativeInput.prototype.getValue = function() {
	return this._input.value;
};


/**
 * @inheritDoc
 */
zb.ui.NativeInput.prototype.focus = function(fromRect) {
	this.focusInput();
	return goog.base(this, 'focus', fromRect);
};


/**
 * @inheritDoc
 */
zb.ui.NativeInput.prototype.blur = function() {
	this.blurInput();
	return goog.base(this, 'blur');
};


/**
 * Focus input element
 */
zb.ui.NativeInput.prototype.focusInput = function() {
	if (this._internalFocus) {
		return;
	}
	this._internalFocus = true;
	setTimeout(function() {
		this._input.focus();
	}.bind(this), 0);
	this._detectChangeIntervalId = setInterval(this._fireChange, 300);
};


/**
 * Blur input element
 */
zb.ui.NativeInput.prototype.blurInput = function() {
	this._input.blur();
	clearInterval(this._detectChangeIntervalId);
};


/**
 * @inheritDoc
 */
zb.ui.NativeInput.prototype.setPlaceholder = function(placeholderText) {
	this._input.setAttribute('placeholder', placeholderText);
};


/**
 * @inheritDoc
 */
zb.ui.NativeInput.prototype._updateCurrentValue = function(value) {
	this._input.value = value;
};


/**
 * Setup input and events.
 * @inheritDoc
 */
zb.ui.NativeInput.prototype._setupInput = function() {
	var input = /** @type {HTMLInputElement} */(this._container);

	if (this._input) {
		this._input.removeEventListener('focus', this._onFocus);
		this._input.removeEventListener('keydown', this._onKeyDown);
	}

	this._input = input;
	this._input.addEventListener('focus', this._onFocus, false);
	this._input.addEventListener('keydown', this._onKeyDown, false);

	clearInterval(this._detectChangeIntervalId);
	this._detectChangeIntervalId = NaN;

	goog.base(this, '_setupInput');
};


/**
 * @protected
 */
zb.ui.NativeInput.prototype._onFocus = function() {
	if (this._internalFocus) {
		this._internalFocus = false;
	} else if (!this.isFocused()) {
		this._fireEvent(this.EVENT_WANT_FOCUS, this);
	}
};


/**
 * Blocked default behaviour with input symbols
 * @param {Event} event
 * @protected
 */
zb.ui.NativeInput.prototype._onKeyDown = function(event) {
	event.preventDefault();
};


/**
 * @type {HTMLInputElement}
 * @protected
 */
zb.ui.NativeInput.prototype._input;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.NativeInput.prototype._internalFocus;


/**
 * @type {number}
 * @protected
 */
zb.ui.NativeInput.prototype._detectChangeIntervalId;
