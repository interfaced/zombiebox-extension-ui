/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.DataList');
goog.require('zb.events.EventPublisher');
goog.require('zb.ui.IDataList');



/**
 * @param {Array.<!ItemType>=} opt_items
 * @constructor
 * @implements {zb.ui.IDataList}
 * @extends {zb.events.EventPublisher}
 * @template ItemType
 */
zb.ui.DataList = function(opt_items) {
	goog.base(this);

	this._items = [];
	this._currentIndex = NaN;
	this._autoSelect = true;
	if (opt_items) {
		this.setItems(opt_items);
	}
};
goog.inherits(zb.ui.DataList, zb.events.EventPublisher);


/**
 * @inheritDoc
 */
zb.ui.DataList.prototype.isLoading = function() {
	return false;
};


/**
 * @inheritDoc
 */
zb.ui.DataList.prototype.preload = function() {
	return Promise.resolve();
};


/**
 * @inheritDoc
 */
zb.ui.DataList.prototype.getBufferStart = function() {
	return 0;
};


/**
 * @param {boolean} value
 */
zb.ui.DataList.prototype.setAutoSelect = function(value) {
	this._autoSelect = value;
};


/**
 * Empty data
 */
zb.ui.DataList.prototype.clear = function() {
	this.selectAt(NaN);
	this._items.splice(0, this._items.length);
	this._fireEvent(this.EVENT_CLEAR);
};


/**
 * @return {number}
 */
zb.ui.DataList.prototype.size = function() {
	return this._items.length;
};


/**
 * @param {Array.<!ItemType>} items
 */
zb.ui.DataList.prototype.addItems = function(items) {
	this.addItemsAt(items, this.size());
};


/**
 * @param {Array.<!ItemType>} items
 * @param {number} index
 */
zb.ui.DataList.prototype.addItemsAt = function(items, index) {
	for (var i = 0; i < items.length; i++) {
		this._addAt(items[i], index + i);
	}
	this._fireEvent(this.EVENT_ITEMS_ADDED, items, index);
};


/**
 * @inheritDoc
 */
zb.ui.DataList.prototype.removeItems = function(items) {
	var isSomeoneRemoved = false;
	var reallyRemovedItems = [];

	for (var i = 0; i < items.length; i++) {
		if (this._removeAt(this.indexOf(items[i]))) {
			isSomeoneRemoved = true;
			reallyRemovedItems.push(items[i]);
		}
	}

	this._fireEvent(this.EVENT_ITEMS_REMOVED, reallyRemovedItems);

	return isSomeoneRemoved;
};


/**
 * @param {Array.<!ItemType>} items
 */
zb.ui.DataList.prototype.setItems = function(items) {
	this.clear();
	this.addItems(items);
	this._fireEvent(this.EVENT_ITEMS_CHANGED, items);
};


/**
 * @param {!ItemType} item
 */
zb.ui.DataList.prototype.add = function(item) {
	this.addAt(item, this.size());
};


/**
 * @param {!ItemType} item
 * @param {number} index
 */
zb.ui.DataList.prototype.addAt = function(item, index) {
	this.addItemsAt([item], index);
};


/**
 * @param {!ItemType} item
 * @return {boolean}
 */
zb.ui.DataList.prototype.remove = function(item) {
	return this.removeAt(this.indexOf(item));
};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.DataList.prototype.removeAt = function(index) {
	return this.removeItems([this._items[index]]);
};


/**
 * @param {!ItemType} item
 * @return {boolean}
 */
zb.ui.DataList.prototype.select = function(item) {
	return this.selectAt(this.indexOf(item));
};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.DataList.prototype.selectAt = function(index) {
	if (this.isValidIndex(index) || isNaN(index)) {
		if (index !== this._currentIndex) {
			var prevItem = this.current();
			var prevIndex = this.currentIndex();
			this._currentIndex = index;
			this._fireEvent(this.EVENT_ITEM_SELECTED, this.current(), this.currentIndex(), prevItem, prevIndex);
		}
		return true;
	}
	return false;
};


/**
 * @param {!ItemType} item
 * @return {number} -1 if not found
 */
zb.ui.DataList.prototype.indexOf = function(item) {
	return this._items.indexOf(item);
};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.DataList.prototype.isValidIndex = function(index) {
	return index >= 0 && index < this._items.length;
};


/**
 * @return {?ItemType}
 */
zb.ui.DataList.prototype.current = function() {
	return this.itemAt(this.currentIndex());
};


/**
 * @return {number}
 */
zb.ui.DataList.prototype.currentIndex = function() {
	return this._currentIndex;
};


/**
 * @param {number} index
 * @return {?ItemType}
 */
zb.ui.DataList.prototype.itemAt = function(index) {
	if (!this.isValidIndex(index)) {
		return null;
	}
	return this._items[index];
};


/**
 * @param {number=} opt_step Default 1.
 * @return {boolean}
 */
zb.ui.DataList.prototype.selectNextItem = function(opt_step) {
	opt_step = isNaN(opt_step) ? 1 : (opt_step < 1 ? 1 : opt_step);
	return this.selectAt(this.currentIndex() + opt_step);
};


/**
 * @param {number=} opt_step Default 1.
 * @return {boolean}
 */
zb.ui.DataList.prototype.selectPrevItem = function(opt_step) {
	opt_step = isNaN(opt_step) ? 1 : (opt_step < 1 ? 1 : opt_step);
	return this.selectAt(this.currentIndex() - opt_step);
};


/**
 * Select first item.
 * @return {boolean}
 */
zb.ui.DataList.prototype.selectFirst = function() {
	return this.selectAt(0);
};


/**
 * Select last item.
 * @return {boolean}
 */
zb.ui.DataList.prototype.selectLast = function() {
	return this.selectAt(this.size() - 1);
};


/**
 * @return {Array.<ItemType>}
 */
zb.ui.DataList.prototype.toArray = function() {
	return this._items;
};


/**
 * @param {!ItemType} item
 * @param {number} index
 * @protected
 */
zb.ui.DataList.prototype._addAt = function(item, index) {
	var currentIndex = this.currentIndex();
	var changedIndex = null;
	var fireSelectAt = false;

	this._items.splice(index, 0, item);

	if (this._autoSelect && isNaN(currentIndex)) {
		fireSelectAt = true;

		changedIndex = 0;
	} else if (!isNaN(currentIndex) && currentIndex >= index) {
		if (this._autoSelect && currentIndex === index) {
			fireSelectAt = true;
		}

		changedIndex = currentIndex + 1;
	}

	this._currentIndex = changedIndex === null ? currentIndex : changedIndex;

	this._fireEvent(this.EVENT_ITEM_ADDED, item, index);

	if (this.size() === 1) {
		this._fireEvent(this.EVENT_FIRST_ITEM_ADDED, item);
	}

	this._currentIndex = currentIndex;

	if (changedIndex !== null) {
		if (fireSelectAt) {
			this.selectAt(changedIndex);
		} else {
			this._currentIndex = changedIndex;
		}
	}
};


/**
 * @param {number} index
 * @return {boolean}
 * @protected
 */
zb.ui.DataList.prototype._removeAt = function(index) {
	if (!this.isValidIndex(index)) {
		return false;
	}

	var currentIndex = this.currentIndex();
	var removedItem = this._items.splice(index, 1)[0];

	var changedIndex = null;
	var fireSelectAt = false;

	if (!isNaN(currentIndex)) {
		if (currentIndex === index) {

			this._currentIndex = NaN;
			changedIndex = NaN;

			if (this.isValidIndex(index)) {
				changedIndex = currentIndex;
			} else if (this.isValidIndex(index - 1)) {
				changedIndex = index - 1;
			}

			fireSelectAt = true;

		} else if (currentIndex > index) {
			changedIndex = currentIndex - 1;
		}
	}

	this._fireEvent(this.EVENT_ITEM_REMOVED, removedItem, index);

	if (changedIndex !== null) {
		if (fireSelectAt) {
			this.selectAt(changedIndex);
		} else {
			this._currentIndex = changedIndex;
		}
	}

	if (this.size() === 0) {
		this._fireEvent(this.EVENT_CLEAR);
	}

	return true;
};


/**
 * @type {Array.<ItemType>}
 * @protected
 */
zb.ui.DataList.prototype._items;


/**
 * @type {number}
 */
zb.ui.DataList.prototype._currentIndex;


/**
 * @type {boolean}
 */
zb.ui.DataList.prototype._autoSelect;


/**
 * @const {string} Fired with args: item, index, prevItem, prevIndex
 */
zb.ui.DataList.prototype.EVENT_ITEM_SELECTED = 'item-selected';


/**
 * @const {string} Fired without args.
 */
zb.ui.DataList.prototype.EVENT_CLEAR = 'clear';


/**
 * @const {string} Fired with args: item
 */
zb.ui.DataList.prototype.EVENT_FIRST_ITEM_ADDED = 'first-item-added';


/**
 * @const {string} Fired with args: item, index
 */
zb.ui.DataList.prototype.EVENT_ITEM_ADDED = 'item-added';


/**
 * @const {string} Fired with args: Array.<!ItemType>, index
 */
zb.ui.DataList.prototype.EVENT_ITEMS_ADDED = 'items-added';


/**
 * @const {string} Fired with args: item, index
 */
zb.ui.DataList.prototype.EVENT_ITEM_REMOVED = 'item-removed';


/**
 * @const {string} Fired with args: Array.<!ItemType>
 */
zb.ui.DataList.prototype.EVENT_ITEMS_REMOVED = 'items-removed';


/**
 * @const {string} Fired with args: Array.<!ItemType>
 */
zb.ui.DataList.prototype.EVENT_ITEMS_CHANGED = 'items-changed';
