/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import app from 'generated/app';
import InlineWidget from 'cutejs/widgets/inline-widget';
import InputKey from 'zb/device/input/key';
import IInputWidget from './i-input-widget';


/**
 * @abstract
 * @implements {IInputWidget}
 */
export default class AbstractInput extends InlineWidget {
	/**
	 * @param {HTMLElement} container
	 * @param {Params=} params
	 */
	constructor(container, params) {
		super(container);

		this._fireChange = this._fireChange.bind(this);

		this._exported = this._renderTemplate();
		this._firedValue = this.getValue();

		const type = (params && params.type) || Type.TEXT;
		this._setType(type);

		const placeholder = (params && params.placeholder) || '';
		this.setPlaceholder(placeholder);
	}

	/**
	 * @abstract
	 * @return {number}
	 */
	getCaretPosition() {}

	/**
	 * @abstract
	 * @param {number} position
	 * @return {boolean}
	 */
	setCaretPosition(position) {}

	/**
	 * @abstract
	 * @return {string}
	 */
	getValue() {}

	/**
	 * @abstract
	 * @param {string} placeholder
	 */
	setPlaceholder(placeholder) {}

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
	 * @param {boolean=} silent
	 */
	setValue(value, silent) {
		this._updateCurrentValue(value);
		this.setCaretPosition(value.length);

		if (!silent) {
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
	_processKey(zbKey, event) {
		let isHandled = false;

		switch (zbKey) {
			case InputKey.RIGHT:
				isHandled = this.moveCaretRight();
				break;
			case InputKey.ENTER:
				this._fireChange();
				this._fireFinish();
				isHandled = true;
				break;
			case InputKey.LEFT:
				isHandled = this.moveCaretLeft();
				break;
			case InputKey.BACKSPACE:
				this.backspace();
				isHandled = true;
				break;
			default:
				if (event && event instanceof KeyboardEvent) {
					isHandled = this._handlePrintableKey(event);
				}
				break;
		}

		return isHandled;
	}

	/**
	 * @abstract
	 * @return {Object}
	 * @protected
	 */
	_renderTemplate() {}

	/**
	 * @param {Type} type
	 * @protected
	 */
	_setType(type) {
		this._type = type;
	}

	/**
	 * Render current value to view and save value internally for getValue().
	 * @abstract
	 * @param {string} value
	 * @protected
	 */
	_updateCurrentValue(value) {}

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
}


/**
 * @type {Object}
 * @protected
 */
AbstractInput.prototype._exported;


/**
 * @type {Type}
 * @protected
 */
AbstractInput.prototype._type;


/**
 * @type {string}
 * @protected
 */
AbstractInput.prototype._firedValue;


/**
 * Fired with: {string} value
 * @const {string}
 */
AbstractInput.prototype.EVENT_CHANGE = 'change';


/**
 * Fired with: {string} value
 * @const {string}
 */
AbstractInput.prototype.EVENT_FINISH = 'finish';


/**
 * @typedef {{
 *     type: (Type|undefined),
 *     placeholder: (string|undefined)
 * }}
 */
export let Params;


/**
 * @enum {string}
 */
export const Type = {
	TEXT: 'text',
	PASSWORD: 'password'
};
