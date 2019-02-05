/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.BaseListDataList');
goog.require('zb.ui.BaseListBuffer');
goog.require('zb.ui.DynamicList');



/**
 * @param {function(Array.<*>)} changeCallback
 * @param {function(*, number, *, number)} selectCallback
 * @extends {zb.ui.BaseListBuffer}
 * @constructor
 */
zb.ui.BaseListDataList = function(changeCallback, selectCallback) {
	goog.base(this, changeCallback, selectCallback);

	this._onItemSelected = this._onItemSelected.bind(this);
	this._onItemsAddedRemoved = this._onItemsAddedRemoved.bind(this);
	this._onItemsChanged = this._onItemsChanged.bind(this);
	this._onClear = this._onClear.bind(this);
};
goog.inherits(zb.ui.BaseListDataList, zb.ui.BaseListBuffer);


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype.setSource = function(source, opt_options) {
	if (this._source === source) {
		return;
	}

	if (this._source) {
		this._unbindEvents();
	}

	goog.base(this, 'setSource', source, opt_options);

	if (this._source) {
		// Устанавливаем autoSelect = false, чтобы не вызывались события EVENT_ITEM_SELECTED при добавлении каждого элемента.
		this._source.setAutoSelect(false);

		this._source
			.preload()
			.then(function() {
				this._bindEvents();
				this._changeItems();
			}.bind(this));
	} else {
		this._clearItems();
		this._resetCache();
	}
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype.isLoading = function() {
	return this.isEmpty() ? false : this._source.isLoading();
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype.isGlobalStart = function() {
	return this.isDynamic() ? this._source.isStartReached() : true;
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype.isGlobalEnd = function() {
	return this.isDynamic() ? this._source.isEndReached() : true;
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype.getSourceStart = function() {
	if (!this.isEmpty() && this.getSourceSize()) {
		return this._source.getBufferStart();
	} else {
		return NaN;
	}
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype.getSourceSize = function() {
	return this.isEmpty() ? 0 : this._source.size();
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype.getSourceIndex = function() {
	return this.isEmpty() ? NaN : this._source.currentIndex();
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype.getSourceItem = function() {
	return this.isEmpty() ? null : this._source.current();
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype.getSourceItems = function(from, to) {
	if (this.isEmpty()) {
		return [];
	}

	// +1, чтобы slice выдавал до to _включительно_.
	return this._source.toArray().slice(from, to + 1);
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype.getSourceItemIndex = function(item) {
	return this.isEmpty() ? NaN : this._source.indexOf(item);
};


/**
 * @return {boolean}
 */
zb.ui.BaseListDataList.prototype.isDynamic = function() {
	return this._source instanceof zb.ui.DynamicList;
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype._setSourceIndex = function(index) {
	return this.isEmpty() ? false : this._source.selectAt(index);
};


/**
 * @inheritDoc
 */
zb.ui.BaseListDataList.prototype._changeItems = function() {
	// Если никакой элемент не выбран, то выбираем нулевой.
	// Нужно, т.к. autoSelect = false.
	if (this._source && isNaN(this.getSourceIndex())) {
		this._source.off(this._source.EVENT_ITEM_SELECTED, this._onItemSelected);
		this.setGlobalIndex(0);
		this._source.on(this._source.EVENT_ITEM_SELECTED, this._onItemSelected);
	}

	goog.base(this, '_changeItems');
};


/**
 * @private
 */
zb.ui.BaseListDataList.prototype._unbindEvents = function() {
	this._source.off(this._source.EVENT_ITEM_SELECTED, this._onItemSelected);

	this._source.off(this._source.EVENT_ITEMS_ADDED, this._onItemsAddedRemoved);
	this._source.off(this._source.EVENT_ITEMS_REMOVED, this._onItemsAddedRemoved);

	this._source.off(this._source.EVENT_ITEMS_CHANGED, this._onItemsChanged);
	this._source.off(this._source.EVENT_CLEAR, this._onClear);
};


/**
 * @private
 */
zb.ui.BaseListDataList.prototype._bindEvents = function() {
	this._source.on(this._source.EVENT_ITEM_SELECTED, this._onItemSelected);

	this._source.on(this._source.EVENT_ITEMS_ADDED, this._onItemsAddedRemoved);
	this._source.on(this._source.EVENT_ITEMS_REMOVED, this._onItemsAddedRemoved);

	this._source.on(this._source.EVENT_ITEMS_CHANGED, this._onItemsChanged);
	this._source.on(this._source.EVENT_CLEAR, this._onClear);
};


/**
 * @param {string} eventName
 * @param {*} newItem
 * @param {number} newSourceIndex
 * @param {*} oldItem
 * @param {number} oldSourceIndex
 * @private
 */
zb.ui.BaseListDataList.prototype._onItemSelected =
	function(eventName, newItem, newSourceIndex, oldItem, oldSourceIndex) {
		this._selectItem(newItem, newSourceIndex, oldItem, oldSourceIndex);
};


/**
 * @private
 */
zb.ui.BaseListDataList.prototype._onItemsAddedRemoved = function() {
	// Если это zb.ui.DynamicList, то данные не добавляются и не удаляются из произвольного места.
	// Соответственно не нужно ничего вызывать.
	if (this.isDynamic()) {
		return;
	}

	this._changeItems();
};


/**
 * @private
 */
zb.ui.BaseListDataList.prototype._onItemsChanged = function() {
	this._changeItems();
};


/**
 * @private
 */
zb.ui.BaseListDataList.prototype._onClear = function() {
	this._clearItems();
};
