/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.Button');
goog.require('zb.html');
goog.require('zb.widgets.InlineWidget');



zb.ui.Button = class extends zb.widgets.InlineWidget {
	/**
	 * @param {(HTMLElement|*)=} opt_container
	 * @param {*=} opt_data
	 */
	constructor(opt_container, opt_data) {
		if (typeof opt_container === 'undefined') {
			opt_container = zb.html.div();
		} else if (!(opt_container instanceof HTMLElement)) {
			opt_data = /** @type {*} */(opt_container);
			opt_container = zb.html.div();
		}

		opt_container.classList.add('w-zbui-button');

		super(opt_container);

		this.setData(opt_data);
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
	_processKey(zbKey, opt_e) {
		let isHandled = false;

		if (zbKey === zb.device.input.Keys.ENTER) {
			this._fireEvent(this.EVENT_CLICK, this._data);
			isHandled = true;
		}

		return isHandled;
	}
};


/**
 * @type {*}
 * @protected
 */
zb.ui.Button.prototype._data;


/**
 * Fired with: data {*}
 * @type {string}
 */
zb.ui.Button.prototype.EVENT_CLICK = 'click';
