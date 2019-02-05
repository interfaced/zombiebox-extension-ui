/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.IInputWidget');



/**
 * @interface
 */
zb.ui.IInputWidget = class {
	constructor() {}


	/**
	 * @return {boolean}
	 */
	moveCaretLeft() {}


	/**
	 * @return {boolean}
	 */
	moveCaretRight() {}


	/**
	 * @return {number}
	 */
	getCaretPosition() {}


	/**
	 * @param {number} position
	 * @return {boolean}
	 */
	setCaretPosition(position) {}


	/**
	 * @param {string} placeholder
	 */
	setPlaceholder(placeholder) {}


	/**
	 * @param {string} str
	 * @param {boolean=} opt_silent
	 */
	setValue(str, opt_silent) {}


	/**
	 * @return {string}
	 */
	getValue() {}


	/**
	 * Put given string to caret position.
	 * @param {string} str
	 */
	putStr(str) {}


	/**
	 * Remove char left of caret
	 */
	backspace() {}
};


/**
 * Fired with: {string} value
 * @const {string}
 */
zb.ui.IInputWidget.prototype.EVENT_CHANGE;


/**
 * Fired with: {string} value
 * @const {string}
 */
zb.ui.IInputWidget.prototype.EVENT_FINISH;
