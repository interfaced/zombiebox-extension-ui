/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.IHelpBarItem');
goog.require('zb.device.input.Keys');
goog.require('zb.widgets.IWidget');



/**
 * @interface
 * @extends {zb.widgets.IWidget}
 */
zb.ui.IHelpBarItem = class {
	constructor() {}


	/**
	 * @param {zb.device.input.Keys} zbKey
	 * @param {KeyboardEvent|WheelEvent=} opt_event
	 * @return {boolean}
	 */
	processHelpBarKey(zbKey, opt_event) {}


	/**
	 * Checks should this item handle zbKey
	 * @param {zb.device.input.Keys} zbKey
	 * @return {boolean}
	 */
	hasKey(zbKey) {}


	/**
	 * @param {Array.<zb.device.input.Keys>} keys
	 */
	setKeys(keys) {}


	/**
	 * @return {Array.<zb.device.input.Keys>}
	 */
	getKeys() {}


	/**
	 * @param {string} label
	 */
	setLabel(label) {}
};


/**
 * Fired with {zb.device.input.Keys, zb.widgets.IWidget}
 * @const {string}
 */
zb.ui.IHelpBarItem.prototype.EVENT_CLICK;
