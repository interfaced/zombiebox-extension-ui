/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.IBaseListItem');



/**
 * @param {zb.ui.IBaseListItem.Input} params
 * @interface
 */
zb.ui.IBaseListItem = function(params) {};


/**
 * Called by BaseList
 */
zb.ui.IBaseListItem.prototype.beforeDOMShow = function() {};


/**
 * Called by BaseList
 */
zb.ui.IBaseListItem.prototype.afterDOMShow = function() {};


/**
 * Called by BaseList
 */
zb.ui.IBaseListItem.prototype.beforeDOMHide = function() {};


/**
 * Called by BaseList
 */
zb.ui.IBaseListItem.prototype.afterDOMHide = function() {};


/**
 * @param {string} className
 */
zb.ui.IBaseListItem.prototype.setFocusClass = function(className) {};


/**
 * Focus item
 */
zb.ui.IBaseListItem.prototype.focus = function() {};


/**
 * Blur item
 */
zb.ui.IBaseListItem.prototype.blur = function() {};


/**
 * @param {*} data
 */
zb.ui.IBaseListItem.prototype.setData = function(data) {};


/**
 * @return {*}
 */
zb.ui.IBaseListItem.prototype.getData = function() {};


/**
 * Returns item container
 * @return {HTMLElement}
 */
zb.ui.IBaseListItem.prototype.getContainer = function() {};


/**
 * @typedef {{
 *     data: *,
 *     focusClass: string
 * }}
 */
zb.ui.IBaseListItem.Input;
