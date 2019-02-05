/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.IHelpBarItem');
goog.require('zb.widgets.IWidget');



/**
 * @interface
 * @extends {zb.widgets.IWidget}
 */
zb.ui.IHelpBarItem = function() {};


/**
 * @param {zb.device.input.Keys} zbKey
 * @param {KeyboardEvent|WheelEvent=} opt_event
 * @return {boolean}
 */
zb.ui.IHelpBarItem.prototype.processHelpBarKey = function(zbKey, opt_event) {};


/**
 * Checks should this item handle zbKey
 * @param {zb.device.input.Keys} zbKey
 * @return {boolean}
 */
zb.ui.IHelpBarItem.prototype.isMyKey = function(zbKey) {};


/**
 * @param {Array.<zb.device.input.Keys>} keys
 */
zb.ui.IHelpBarItem.prototype.setKeys = function(keys) {};


/**
 * @return {Array.<zb.device.input.Keys>}
 */
zb.ui.IHelpBarItem.prototype.getKeys = function() {};


/**
 * @param {string} label
 */
zb.ui.IHelpBarItem.prototype.setLabel = function(label) {};


/**
 * Fired with {zb.device.input.Keys, zb.widgets.IWidget}
 * @const {string}
 */
zb.ui.IHelpBarItem.prototype.EVENT_CLICK;
