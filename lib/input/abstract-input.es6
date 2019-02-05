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
 * @implements {zb.ui.IInputWidget}
 */
zb.ui.AbstractInput = class extends zb.widgets.InlineWidget {
	/**
	 * @param {HTMLElement} container
	 * @param {zb.ui.AbstractInput.Params=} opt_params
	 */
	constructor(container, opt_params) {
		super(container);

		this._fireChange = this._fireChange.bind(this);

		this._exported = this._renderTemplate();
		this._firedValue = this.getValue();

		const type = (opt_params && opt_params.type) || zb.ui.AbstractInput.Type.TEXT;
		this._setType(type);

		const placeholder = (opt_params && opt_params.placeholder) || '';
		this.setPlaceholder(placeholder);
	}


	/**
	 * @return {number}
	 */
	getCaretPosition() {
		throw new Error('not implemented');
	}


	/**
	 * @param {number} position
	 * @return {boolean}
	 */
	setCaretPosition(position) {
		throw new Error('not implemented');
	}


	/**
	 * @return {string}
	 */
	getValue() {
		throw new Error('not implemented');
	}


	/**
	 * @param {string} placeholder
	 */
	setPlaceholder(placeholder) {
		throw new Error('not implemented');
	}


	/**
	 * @return {boolean}
	 */
	moveCaretLeft() {
		return this.setCaretPosition(this.getCaretPosition() - 1);
	}


	/**
	 * @return {boolean}
	 */
	moveCaretRight() {
		return this.setCaretPosition(this.getCaretPosition() + 1);
	}


	/**
	 * @param {string} value
	 * @param {boolean=} opt_silent
	 */
	setValue(value, opt_silent) {
		this._updateCurrentValue(value);
		this.setCaretPosition(value.length);

		if (!opt_silent) {
			this._fireChange();
		}
	}


	/**
	 * Put given string to caret position.
	 * @param {string} str
	 */
	putStr(str) {
		let value = this.getValue();
		const position = this.getCaretPosition();

		value =
			value.substr(0, position) +
			str +
			value.substr(position);

		this._updateCurrentValue(value);
		this.setCaretPosition(position + str.length);

		this._fireChange();
	}


	/**
	 * Remove char left of caret
	 */
	backspace() {
		let value = this.getValue();
		const position = this.getCaretPosition();

		value =
			value.substr(0, position - 1) +
			value.substr(position);

		this._updateCurrentValue(value);
		this.setCaretPosition(position - 1);

		this._fireChange();
	}


	/**
	 * Handles user-controlled key event
	 * @override
	 */
	_processKey(zbKey, opt_e) {
		const keys = zb.device.input.Keys;
		let isHandled = false;

		switch (zbKey) {
			case keys.RIGHT:
				isHandled = this.moveCaretRight();
				break;
			case keys.ENTER:
				this._fireChange();
				this._fireFinish();
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
				if (opt_e && opt_e instanceof KeyboardEvent) {
					isHandled = this._handlePrintableKey(opt_e);
				}
				break;
		}

		return isHandled;
	}


	/**
	 * @return {Object}
	 * @protected
	 */
	_renderTemplate() {
		throw new Error('not implemented');
	}


	/**
	 * @param {zb.ui.AbstractInput.Type} type
	 * @protected
	 */
	_setType(type) {
		this._type = type;
	}


	/**
	 * Render current value to view and save value internally for getValue().
	 * @param {string} value
	 * @protected
	 */
	_updateCurrentValue(value) {
		throw new Error('not implemented');
	}


	/**
	 * @protected
	 */
	_fireChange() {
		const currentValue = this.getValue();
		if (this._firedValue !== currentValue) {
			this._firedValue = currentValue;
			this._fireEvent(this.EVENT_CHANGE, this._firedValue);
		}
	}


	/**
	 * @protected
	 */
	_fireFinish() {
		this._fireEvent(this.EVENT_FINISH, this.getValue());
	}


	/**
	 * Allowed only digit keys due to problems with unprintable symbols on certain platforms.
	 * PC platform pass all keys except LEFT/RIGHT as development platform.
	 * @param {KeyboardEvent} event
	 * @return {boolean}
	 * @protected
	 */
	_handlePrintableKey(event) {
		const keyChar = app.device.input.eventToPrintableChar(event);

		if (keyChar !== null) {
			event.preventDefault();
			this.putStr(keyChar);
			return true;
		}

		return false;
	}
};


/**
 * @type {Object}
 * @protected
 */
zb.ui.AbstractInput.prototype._exported;


/**
 * @type {zb.ui.AbstractInput.Type}
 * @protected
 */
zb.ui.AbstractInput.prototype._type;


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


/**
 * @enum {string}
 */
zb.ui.AbstractInput.Type = {
	TEXT: 'text',
	PASSWORD: 'password'
};


/**
 * @typedef {{
 *     type: (zb.ui.AbstractInput.Type|undefined),
 *     placeholder: (string|undefined)
 * }}
 */
zb.ui.AbstractInput.Params;
