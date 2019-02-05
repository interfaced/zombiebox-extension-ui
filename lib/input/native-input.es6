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
 * @implements {zb.ui.IInputWidget}
 */
zb.ui.NativeInput = class extends zb.ui.AbstractInput {
	constructor(container, opt_params) {
		super(container, opt_params);

		this._internalFocus = false;
		this._detectChangeIntervalId = NaN;

		this._input = /** @type {HTMLInputElement} */(container);

		this._input.addEventListener('focus', this._onFocusInput.bind(this), false);
		this._input.addEventListener('keydown', this._onKeyDown.bind(this), false);
	}


	/**
	 * @override
	 */
	getCaretPosition() {
		return this._input.selectionStart;
	}


	/**
	 * @override
	 */
	setCaretPosition(position) {
		if (position < 0 || position > this._input.value.length) {
			return false;
		}

		// Samsung platform has some strange behavior with selection change. If input enabled and not focused, after
		// selection range changed input will be focused. Prevent it via disable input while changing selection.
		const oldInputDisableState = this._input.disabled;
		this._input.disabled = true;

		if (this._input.setSelectionRange) {
			this._input.setSelectionRange(position, position);
		} else {
			this._input.selectionStart = position;
			this._input.selectionEnd = position;
		}

		// revert disable state
		this._input.disabled = oldInputDisableState;

		return true;
	}


	/**
	 * @override
	 */
	getValue() {
		return this._input.value;
	}


	/**
	 * @override
	 */
	focus(fromRect) {
		this.focusInput();
		return super.focus(fromRect);
	}


	/**
	 * @override
	 */
	blur() {
		this.blurInput();
		return super.blur();
	}


	/**
	 * Focus input element
	 */
	focusInput() {
		if (this._internalFocus) {
			return;
		}
		this._internalFocus = true;
		setTimeout(() => {
			this._input.focus();
		}, 0);
		this._detectChangeIntervalId = setInterval(this._fireChange, 300);
	}


	/**
	 * Blur input element
	 */
	blurInput() {
		this._input.blur();
		clearInterval(this._detectChangeIntervalId);
	}


	/**
	 * @override
	 */
	setPlaceholder(placeholder) {
		this._input.setAttribute('placeholder', placeholder);
	}


	/**
	 * @override
	 */
	_updateCurrentValue(value) {
		this._input.value = value;
	}


	/**
	 * @override
	 */
	_setType(type) {
		let inputType = '';

		switch (type) {
			case zb.ui.AbstractInput.Type.TEXT:
				inputType = 'text';
				break;
			case zb.ui.AbstractInput.Type.PASSWORD:
				inputType = 'password';
				break;
			default:
				inputType = 'text';
				break;
		}

		this._input.type = inputType;

		super._setType(type);
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return {};
	}


	/**
	 * @protected
	 */
	_onFocusInput() {
		if (this._internalFocus) {
			this._internalFocus = false;
		} else if (!this.isFocused()) {
			this._fireEvent(this.EVENT_WANT_FOCUS, this);
		}
	}


	/**
	 * Blocked default behaviour with input symbols
	 * @param {Event} event
	 * @protected
	 */
	_onKeyDown(event) {
		event.preventDefault();
	}
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
