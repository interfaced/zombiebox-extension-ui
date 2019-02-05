/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.KeyboardLayout');
goog.require('zb.ui.Button');
goog.require('zb.widgets.InlineWidget');



/**
 * @param {HTMLElement} container
 * @param {zb.ui.KeyboardLayout.Input} params
 * @extends {zb.widgets.InlineWidget}
 * @constructor
 */
zb.ui.KeyboardLayout = function(container, params) {
	goog.base(this, container);

	this._items = [];

	this._type = params.type;
	this._lang = params.lang;

	this._fireEventClick = this._fireEventClick.bind(this);
};
goog.inherits(zb.ui.KeyboardLayout, zb.widgets.InlineWidget);


/**
 * @param {Array.<HTMLElement>} containers
 */
zb.ui.KeyboardLayout.prototype.setItems = function(containers) {
	containers.forEach(this._addWidget.bind(this));
};


/**
 * @param {zb.ui.Keyboard.Type} type
 * @param {zb.ui.Keyboard.Lang=} opt_lang
 * @return {boolean}
 */
zb.ui.KeyboardLayout.prototype.isEquals = function(type, opt_lang) {
	var isTypeEquals = this._type === type;
	var isLangEquals = !this._lang || !opt_lang || (this._lang === opt_lang);

	return isTypeEquals && isLangEquals;
};


/**
 * @return {zb.ui.Keyboard.Type}
 */
zb.ui.KeyboardLayout.prototype.getType = function() {
	return this._type;
};


/**
 * @return {zb.ui.Keyboard.Lang|undefined}
 */
zb.ui.KeyboardLayout.prototype.getLang = function() {
	return this._lang;
};


/**
 * @param {HTMLElement} container
 * @protected
 */
zb.ui.KeyboardLayout.prototype._addWidget = function(container) {
	var action = container.getAttribute('data-keyboard-action');
	var symbol = container.getAttribute('data-keyboard-symbol') || container.textContent;

	var item = new zb.ui.Button(container, action || symbol);
	this.appendWidget(item);

	item.on(item.EVENT_CLICK, this._fireEventClick);

	this._items.push(item);
};


/**
 * @param {string} eventName
 * @param {zb.ui.Keyboard.Data} data
 * @protected
 */
zb.ui.KeyboardLayout.prototype._fireEventClick = function(eventName, data) {
	this._fireEvent(this.EVENT_CLICK, data);
};


/**
 * @type {Array.<zb.ui.Button>}
 * @protected
 */
zb.ui.KeyboardLayout.prototype._items;


/**
 * @type {zb.ui.Keyboard.Type}
 * @protected
 */
zb.ui.KeyboardLayout.prototype._type;


/**
 * @type {zb.ui.Keyboard.Lang|undefined}
 * @protected
 */
zb.ui.KeyboardLayout.prototype._lang;


/**
 * Fired with: {zb.ui.Keyboard.Data} data
 * @const {string}
 */
zb.ui.KeyboardLayout.prototype.EVENT_CLICK = 'click';


/**
 * @typedef {{
 *     type: zb.ui.Keyboard.Type,
 *     lang: (zb.ui.Keyboard.Lang|undefined)
 * }}
 */
zb.ui.KeyboardLayout.Input;
