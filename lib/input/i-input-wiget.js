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
zb.ui.IInputWidget = function() {};


/**
 * @return {boolean}
 */
zb.ui.IInputWidget.prototype.moveCaretLeft = function() {};


/**
 * @return {boolean}
 */
zb.ui.IInputWidget.prototype.moveCaretRight = function() {};


/**
 * @return {number}
 */
zb.ui.IInputWidget.prototype.getCaretPosition = function() {};


/**
 * @param {number} pos
 * @return {boolean}
 */
zb.ui.IInputWidget.prototype.setCaretPosition = function(pos) {};


/**
 * @return {string}
 */
zb.ui.IInputWidget.prototype.getValue = function() {};


/**
 * @param {string} placeholderText
 */
zb.ui.IInputWidget.prototype.setPlaceholder = function(placeholderText) {};


/**
 * @param {string} str
 * @param {boolean=} opt_silent
 */
zb.ui.IInputWidget.prototype.setValue = function(str, opt_silent) {};


/**
 * Put given string to caret position.
 * @param {string} str
 */
zb.ui.IInputWidget.prototype.putStr = function(str) {};


/**
 * Remove char left of caret
 */
zb.ui.IInputWidget.prototype.backspace = function() {};


/**
 * Fire finish event
 */
zb.ui.IInputWidget.prototype.fireFinish = function() {};


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
