/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.BaseListItem');
goog.require('zb.html');
goog.require('zb.ui.IBaseListItem');



/**
 * @param {zb.ui.IBaseListItem.Input} params
 * @implements {zb.ui.IBaseListItem}
 * @constructor
 */
zb.ui.BaseListItem = function(params) {
	var data = (typeof params.data === 'undefined') ? null : params.data;
	this._setData(data);

	this._createContainer();

	this.setFocusClass(params.focusClass || '_active');
};


/**
 * @inheritDoc
 */
zb.ui.BaseListItem.prototype.beforeDOMShow = function() {};


/**
 * @inheritDoc
 */
zb.ui.BaseListItem.prototype.afterDOMShow = function() {};


/**
 * @inheritDoc
 */
zb.ui.BaseListItem.prototype.beforeDOMHide = function() {};


/**
 * @inheritDoc
 */
zb.ui.BaseListItem.prototype.afterDOMHide = function() {};


/**
 * @inheritDoc
 */
zb.ui.BaseListItem.prototype.setFocusClass = function(className) {
	this._focusClass = className;
};


/**
 * @inheritDoc
 */
zb.ui.BaseListItem.prototype.focus = function() {
	this._container.classList.add(this._focusClass);
};


/**
 * @inheritDoc
 */
zb.ui.BaseListItem.prototype.blur = function() {
	this._container.classList.remove(this._focusClass);
};


/**
 * @inheritDoc
 */
zb.ui.BaseListItem.prototype.setData = function(data) {
	this._setData(data);
	this._renderData();
};


/**
 * @inheritDoc
 */
zb.ui.BaseListItem.prototype.getData = function() {
	return this._data;
};


/**
 * @inheritDoc
 */
zb.ui.BaseListItem.prototype.getContainer = function() {
	return this._container;
};


/**
 * @param {*} data
 * @protected
 */
zb.ui.BaseListItem.prototype._setData = function(data) {
	this._data = data;
};


/**
 * @protected
 */
zb.ui.BaseListItem.prototype._createContainer = function() {
	this._container = zb.html.div('w-base-list__item');
	this._renderData();
};


/**
 * @protected
 */
zb.ui.BaseListItem.prototype._renderData = function() {
	var data = this._data === null ? '' : String(this._data);
	zb.html.text(this._container, data);
};


/**
 * @type {HTMLElement}
 * @protected
 */
zb.ui.BaseListItem.prototype._container;


/**
 * @type {*}
 * @protected
 */
zb.ui.BaseListItem.prototype._data;


/**
 * @type {string}
 * @protected
 */
zb.ui.BaseListItem.prototype._focusClass;
