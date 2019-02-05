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
 * @extends {zb.events.IEventPublisher}
 * @template ItemType
 */
zb.ui.IDataList = class {
	/**
	 * @param {Array.<!ItemType>=} opt_items
	 */
	constructor(opt_items) {}


	/**
	 * @return {boolean}
	 */
	isLoading() {}


	/**
	 * @return {IThenable.<zb.ui.IDataList>}
	 */
	preload() {}


	/**
	 * @return {number}
	 */
	getBufferStart() {}


	/**
	 * @param {boolean} value
	 */
	setAutoSelect(value) {}


	/**
	 * Clear data.
	 */
	clear() {}


	/**
	 * @return {number}
	 */
	size() {}


	/**
	 * @param {Array.<!ItemType>} items
	 */
	addItems(items) {}


	/**
	 * @param {Array.<!ItemType>} items
	 * @param {number} index
	 */
	addItemsAt(items, index) {}


	/**
	 * @param {Array.<!ItemType>} items
	 * @return {boolean}
	 */
	removeItems(items) {}


	/**
	 * @param {Array.<!ItemType>} items
	 */
	setItems(items) {}


	/**
	 * @param {!ItemType} item
	 */
	add(item) {}


	/**
	 * @param {!ItemType} item
	 * @param {number} index
	 */
	addAt(item, index) {}


	/**
	 * @param {!ItemType} item
	 * @return {boolean}
	 */
	remove(item) {}


	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	removeAt(index) {}


	/**
	 * @param {!ItemType} item
	 * @return {boolean}
	 */
	select(item) {}


	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	selectAt(index) {}


	/**
	 * @param {!ItemType} item
	 * @return {number} -1 if not found
	 */
	indexOf(item) {}


	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	isValidIndex(index) {}


	/**
	 * @return {?ItemType}
	 */
	current() {}


	/**
	 * @return {number}
	 */
	currentIndex() {}


	/**
	 * @param {number} index
	 * @return {?ItemType}
	 */
	itemAt(index) {}


	/**
	 * @param {number=} opt_step Default 1.
	 * @return {boolean}
	 */
	selectNextItem(opt_step) {}


	/**
	 * @param {number=} opt_step Default 1.
	 * @return {boolean}
	 */
	selectPrevItem(opt_step) {}


	/**
	 * @return {Array.<ItemType>}
	 */
	toArray() {}
};


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
