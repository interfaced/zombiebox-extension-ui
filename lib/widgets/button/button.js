/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import InlineWidget from 'cutejs/widgets/inline-widget';
import {div} from 'zb/html';
import InputKey from 'zb/device/input/key';


/**
 */
export default class Button extends InlineWidget {
	/**
	 * @param {(HTMLElement|*)=} container
	 * @param {*=} data
	 */
	constructor(container, data) {
		let fixedContainer = container;
		let fixedData = data;

		if (typeof container === 'undefined') {
			fixedContainer = div();
		} else if (!(container instanceof HTMLElement)) {
			fixedContainer = div();
			fixedData = /** @type {*} */ (container);
		}

		fixedContainer.classList.add('w-zbui-button');

		super(/** @type {HTMLElement} */ (fixedContainer));

		this.setData(fixedData);
	}

	/**
	 * @param {*} data
	 */
	setData(data) {
		this._data = data;
	}

	/**
	 * @return {*}
	 */
	getData() {
		return this._data;
	}

	/**
	 * @param {function(string, *)} callback
	 */
	onClick(callback) {
		this.on(this.EVENT_CLICK, callback);
	}

	/**
	 * @param {function(string, *)} callback
	 */
	offClick(callback) {
		this.off(this.EVENT_CLICK, callback);
	}

	/**
	 * Handles user-controlled key event
	 * @override
	 */
	_processKey(zbKey, event) {
		let isHandled = false;

		if (zbKey === InputKey.ENTER) {
			this._fireEvent(this.EVENT_CLICK, this._data);
			isHandled = true;
		}

		return isHandled;
	}
}


/**
 * @type {*}
 * @protected
 */
Button.prototype._data;


/**
 * Fired with: data {*}
 * @type {string}
 */
Button.prototype.EVENT_CLICK = 'click';
