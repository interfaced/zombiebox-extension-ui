/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.IDataList');
goog.require('zb.events.IEventPublisher');



/**
 * @interface
 * @param {Array.<!ItemType>=} opt_items
 * @extends {zb.events.IEventPublisher}
 * @template ItemType
 */
zb.ui.IDataList = function(opt_items) {};


/**
 * @return {boolean}
 */
zb.ui.IDataList.prototype.isLoading = function() {};


/**
 * @return {IThenable}
 */
zb.ui.IDataList.prototype.preload = function() {};


/**
 * @return {number}
 */
zb.ui.IDataList.prototype.getBufferStart = function() {};


/**
 * @param {boolean} value
 */
zb.ui.IDataList.prototype.setAutoSelect = function(value) {};


/**
 * Clear data.
 */
zb.ui.IDataList.prototype.clear = function() {};


/**
 * @return {number}
 */
zb.ui.IDataList.prototype.size = function() {};


/**
 * @param {Array.<!ItemType>} items
 */
zb.ui.IDataList.prototype.addItems = function(items) {};


/**
 * @param {Array.<!ItemType>} items
 * @param {number} index
 */
zb.ui.IDataList.prototype.addItemsAt = function(items, index) {};


/**
 * @param {Array.<!ItemType>} items
 * @return {boolean}
 */
zb.ui.IDataList.prototype.removeItems = function(items) {};


/**
 * @param {Array.<!ItemType>} items
 */
zb.ui.IDataList.prototype.setItems = function(items) {};


/**
 * @param {!ItemType} item
 */
zb.ui.IDataList.prototype.add = function(item) {};


/**
 * @param {!ItemType} item
 * @param {number} index
 */
zb.ui.IDataList.prototype.addAt = function(item, index) {};


/**
 * @param {!ItemType} item
 * @return {boolean}
 */
zb.ui.IDataList.prototype.remove = function(item) {};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.IDataList.prototype.removeAt = function(index) {};


/**
 * @param {!ItemType} item
 * @return {boolean}
 */
zb.ui.IDataList.prototype.select = function(item) {};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.IDataList.prototype.selectAt = function(index) {};


/**
 * @param {!ItemType} item
 * @return {number} -1 if not found
 */
zb.ui.IDataList.prototype.indexOf = function(item) {};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.IDataList.prototype.isValidIndex = function(index) {};


/**
 * @return {?ItemType}
 */
zb.ui.IDataList.prototype.current = function() {};


/**
 * @return {number}
 */
zb.ui.IDataList.prototype.currentIndex = function() {};


/**
 * @param {number} index
 * @return {?ItemType}
 */
zb.ui.IDataList.prototype.itemAt = function(index) {};


/**
 * @param {number=} opt_step Default 1.
 * @return {boolean}
 */
zb.ui.IDataList.prototype.selectNextItem = function(opt_step) {};


/**
 * @param {number=} opt_step Default 1.
 * @return {boolean}
 */
zb.ui.IDataList.prototype.selectPrevItem = function(opt_step) {};


/**
 * @return {Array.<ItemType>}
 */
zb.ui.IDataList.prototype.toArray = function() {};


/**
 * @type {Array.<ItemType>}
 * @protected
 */
zb.ui.IDataList.prototype._items;


/**
 * @type {number}
 * @protected
 */
zb.ui.IDataList.prototype._currentIndex;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.IDataList.prototype._autoSelect;


/**
 * @const {string} Fired with args: item, index, prevItem, prevIndex
 */
zb.ui.IDataList.prototype.EVENT_ITEM_SELECTED;


/**
 * @const {string} Fired without args.
 */
zb.ui.IDataList.prototype.EVENT_CLEAR;


/**
 * @const {string} Fired with args: item
 */
zb.ui.IDataList.prototype.EVENT_FIRST_ITEM_ADDED;


/**
 * @const {string} Fired with args: item, index
 */
zb.ui.IDataList.prototype.EVENT_ITEM_ADDED;


/**
 * @const {string} Fired with args: Array.<!ItemType>
 */
zb.ui.IDataList.prototype.EVENT_ITEMS_ADDED;


/**
 * @const {string} Fired with args: item, index
 */
zb.ui.IDataList.prototype.EVENT_ITEM_REMOVED;


/**
 * @const {string} Fired with args: Array.<!ItemType>
 */
zb.ui.IDataList.prototype.EVENT_ITEMS_REMOVED;


/**
 * @const {string} Fired with args: Array.<!ItemType>
 */
zb.ui.IDataList.prototype.EVENT_ITEMS_CHANGED;
