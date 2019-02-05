/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.HelpBarItem');
goog.require('zb.ui.IHelpBarItem');
goog.require('zb.ui.templates.helpBarItem');
goog.require('zb.widgets.CuteWidget');



/**
 * @param {zb.ui.HelpBarItem.Options} options
 * @extends {zb.widgets.CuteWidget}
 * @implements {zb.ui.IHelpBarItem}
 * @constructor
 */
zb.ui.HelpBarItem = function(options) {
	this._label = options.label;
	this._keys = options.keys;
	this._cssClass = options.cssClass;

	goog.base(this);
};
goog.inherits(zb.ui.HelpBarItem, zb.widgets.CuteWidget);


/**
 * @inheritDoc
 */
zb.ui.HelpBarItem.prototype.processHelpBarKey = function(zbKey, e) {
	return this._handleKey(this.isMyKey(zbKey), zbKey);
};


/**
 * @inheritDoc
 */
zb.ui.HelpBarItem.prototype.isMyKey = function(zbKey) {
	return this._keys.indexOf(zbKey) !== -1;
};


/**
 * @param {Array.<zb.device.input.Keys>} keys
 */
zb.ui.HelpBarItem.prototype.setKeys = function(keys) {
	this._keys = keys;
};


/**
 * @return {Array.<zb.device.input.Keys>}
 */
zb.ui.HelpBarItem.prototype.getKeys = function() {
	return this._keys;
};


/**
 * @inheritDoc
 */
zb.ui.HelpBarItem.prototype._processKey = function(zbKey, e) {
	return this._handleKey(zbKey === zb.device.input.Keys.ENTER, zbKey);
};


/**
 * @inheritDoc
 */
zb.ui.HelpBarItem.prototype._renderTemplate = function() {
	return zb.ui.templates.helpBarItem(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @inheritDoc
 * @return {zb.ui.templates.HelpBarItemIn}
 */
zb.ui.HelpBarItem.prototype._getTemplateData = function() {
	return {
		label: this._label,
		cssClass: this._cssClass
	};
};


/**
 * @param {boolean} isHandled
 * @param {zb.device.input.Keys} zbKey
 * @return {boolean}
 * @protected
 */
zb.ui.HelpBarItem.prototype._handleKey = function(isHandled, zbKey) {
	if (this.isFocusable() && isHandled) {
		this._fireEvent(this.EVENT_CLICK, zbKey, this);
		return true;
	}
	return false;
};


/**
 * @type {zb.ui.templates.HelpBarItemOut}
 * @protected
 */
zb.ui.HelpBarItem.prototype._exported;


/**
 * @type {string}
 * @protected
 */
zb.ui.HelpBarItem.prototype._label;


/**
 * @type {Array.<zb.device.input.Keys>}
 * @protected
 */
zb.ui.HelpBarItem.prototype._keys;


/**
 * @type {string}
 * @protected
 */
zb.ui.HelpBarItem.prototype._cssClass;


/**
 * Fired with: {zb.device.input.Keys} zbKey, {zb.ui.HelpBarItem} item
 * @const {string}
 */
zb.ui.HelpBarItem.prototype.EVENT_CLICK = 'click';


/**
 * @typedef {{
 *     label: string,
 *     keys: Array.<zb.device.input.Keys>,
 *     cssClass: string
 * }}
 */
zb.ui.HelpBarItem.Options;
