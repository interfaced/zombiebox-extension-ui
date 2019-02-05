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



/**
 * @inheritDoc
 * @param {HTMLElement=} opt_container
 * @param {*=} opt_data
 * @extends {zb.widgets.InlineWidget}
 * @constructor
 */
zb.ui.Button = function(opt_container, opt_data) {
	if (!(opt_container instanceof HTMLElement)) {
		opt_data = /** @type {*} */(opt_container);
		opt_container = zb.html.div();
	}

	opt_container.classList.add('w-zbui-button');
	this.setData(opt_data);

	goog.base(this, opt_container);
};
goog.inherits(zb.ui.Button, zb.widgets.InlineWidget);


/**
 * Handles user-controlled key event
 * @inheritDoc
 */
zb.ui.Button.prototype._processKey = function(zbKey, opt_e) {
	var isHandled = false;

	if (zbKey === zb.device.input.Keys.ENTER) {
		this._fireEvent(this.EVENT_CLICK, this._data);
		isHandled = true;
	}

	return isHandled;
};


/**
 * @param {*} data
 */
zb.ui.Button.prototype.setData = function(data) {
	this._data = data;
};


/**
 * @return {*}
 */
zb.ui.Button.prototype.getData = function() {
	return this._data;
};


/**
 * @param {function(string, *)} callback
 */
zb.ui.Button.prototype.onClick = function(callback) {
	this.on(this.EVENT_CLICK, callback);
};


/**
 * @param {function(string, *)} callback
 */
zb.ui.Button.prototype.offClick = function(callback) {
	this.off(this.EVENT_CLICK, callback);
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
