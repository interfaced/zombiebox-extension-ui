/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.require('zb.ui.IInputWidget');
goog.provide('zb.ui.Keyboard');
goog.require('zb.ui.KeyboardLayout');
goog.require('zb.widgets.CuteWidget');



/**
 * @param {zb.ui.Keyboard.Input=} opt_params
 * @extends {zb.widgets.CuteWidget}
 * @constructor
 */
zb.ui.Keyboard = function(opt_params) {
	goog.base(this);

	this._layouts = [];

	this.setInput((opt_params && opt_params.input) || null);
	this.setCaps((opt_params && opt_params.isCaps) || false);
};
goog.inherits(zb.ui.Keyboard, zb.widgets.CuteWidget);


/**
 * @param {?zb.ui.IInputWidget} input
 */
zb.ui.Keyboard.prototype.setInput = function(input) {
	this._input = input;
};


/**
 * @param {zb.ui.Keyboard.Type} type
 */
zb.ui.Keyboard.prototype.setType = function(type) {
	this.setOptions(type, this._layout.getLang());
};


/**
 * @param {zb.ui.Keyboard.Lang=} opt_lang
 */
zb.ui.Keyboard.prototype.setLang = function(opt_lang) {
	this.setOptions(this._layout.getType(), opt_lang);
};


/**
 * @param {zb.ui.Keyboard.Type} type
 * @param {zb.ui.Keyboard.Lang=} opt_lang
 */
zb.ui.Keyboard.prototype.setOptions = function(type, opt_lang) {
	var layout = this._getLayout(type, opt_lang);

	if (layout) {
		this._setLayout(layout);
	}
};


/**
 * @param {boolean} isCaps
 */
zb.ui.Keyboard.prototype.setCaps = function(isCaps) {
	this._isCaps = isCaps;
	zb.html.updateClassName(this._container, '_caps', this._isCaps);
};


/**
 * @param {zb.ui.KeyboardLayout} layout
 * @param {Array.<HTMLElement>} items
 * @protected
 */
zb.ui.Keyboard.prototype._addLayout = function(layout, items) {
	layout.setItems(items);
	layout.on(layout.EVENT_CLICK, this._onItemClicked.bind(this));

	this._layouts.push(layout);
};


/**
 * @param {zb.ui.KeyboardLayout} layout
 * @protected
 */
zb.ui.Keyboard.prototype._setLayout = function(layout) {
	this._layout = layout;

	this._layouts.forEach(function(item) {
		item.setVisible(item === layout);
	});

	this.activateWidget(layout);
};


/**
 * @param {zb.ui.Keyboard.Type} type
 * @param {zb.ui.Keyboard.Lang=} opt_lang
 * @return {zb.ui.KeyboardLayout|undefined}
 */
zb.ui.Keyboard.prototype._getLayout = function(type, opt_lang) {
	return this._layouts.filter(function(layout) {
		return layout.isEquals(type, opt_lang);
	})[0];
};


/**
 * @param {string} eventName
 * @param {zb.ui.Keyboard.Data} data
 * @protected
 */
zb.ui.Keyboard.prototype._onItemClicked = function(eventName, data) {
	this._handleClick(data) || this._setSymbol(data);
};


/**
 * @param {zb.ui.Keyboard.Data} data
 * @return {boolean}
 * @protected
 */
zb.ui.Keyboard.prototype._handleClick = function(data) {
	zb.console.debug('_handleClick try', data);

	return false;
};


/**
 * @param {string} symbol
 * @protected
 */
zb.ui.Keyboard.prototype._setSymbol = function(symbol) {
	if (this._isCaps) {
		symbol = symbol.toUpperCase();
	}

	zb.console.debug('_setSymbol', symbol);

	if (this._input) {
		this._input.putStr(symbol);
	}
};


/**
 * @type {zb.ui.IInputWidget}
 * @protected
 */
zb.ui.Keyboard.prototype._input;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.Keyboard.prototype._isCaps;


/**
 * @type {Array.<zb.ui.KeyboardLayout>}
 * @protected
 */
zb.ui.Keyboard.prototype._layouts;


/**
 * @type {zb.ui.KeyboardLayout}
 * @protected
 */
zb.ui.Keyboard.prototype._layout;


/**
 * @typedef {string}
 */
zb.ui.Keyboard.Type;


/**
 * @typedef {string}
 */
zb.ui.Keyboard.Lang;


/**
 * @typedef {string}
 */
zb.ui.Keyboard.Action;


/**
 * @typedef {string|zb.ui.Keyboard.Action}
 */
zb.ui.Keyboard.Data;


/**
 * @typedef {{
 *     input: (zb.ui.IInputWidget|undefined),
 *     isCaps: (boolean|undefined)
 * }}
 */
zb.ui.Keyboard.Input;
