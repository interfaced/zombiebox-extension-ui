/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.BaseList');
goog.require('zb.html');
goog.require('zb.ui.BaseListBuffer');
goog.require('zb.ui.BaseListDataList');
goog.require('zb.ui.BaseListItem');
goog.require('zb.ui.IBaseListItem');
goog.require('zb.ui.templates.baseList');
goog.require('zb.widgets.CuteWidget');



/**
 * @param {zb.ui.BaseList.Input=} opt_params
 * @param {zb.ui.BaseListBuffer.Options=} opt_options
 * @extends {zb.widgets.CuteWidget}
 * @constructor
 */
zb.ui.BaseList = function(opt_params, opt_options) {
	goog.base(this);

	var itemClass = zb.ui.BaseListItem;
	if (opt_params && opt_params.itemClass) {
		itemClass = opt_params.itemClass;
	}
	this._itemClass = itemClass;

	var isVertical = false;
	if (opt_params && typeof opt_params.isVertical !== 'undefined') {
		isVertical = opt_params.isVertical;
	}
	this._setVertical(isVertical);

	this._buffer = new zb.ui.BaseListDataList(this._setItems.bind(this), this._selectItem.bind(this));
	this._items = [];

	this._wrapperSize = 0;
	this._sliderSize = 0;
	this._itemSize = 0;
	this._position = 0;

	this._visibleIndex = 0;
	this._lastData = null;

	var source = null;
	if (opt_params && opt_params.source) {
		source = opt_params.source;
	}
	this.setSource(source, opt_options);
};
goog.inherits(zb.ui.BaseList, zb.widgets.CuteWidget);


/**
 * @deprecated Use constructor params.
 * @param {Function} itemClass
 */
zb.ui.BaseList.prototype.setItemClass = function(itemClass) {
	this._itemClass = itemClass;
};


/**
 * @deprecated Use constructor params.
 * @param {boolean} isVertical
 */
zb.ui.BaseList.prototype.setVertical = function(isVertical) {
	this._setVertical(isVertical);
};


/**
 * @deprecated Use this.setSource() instead.
 * @param {zb.ui.BaseListBuffer.Source} source
 * @param {zb.ui.BaseListBuffer.Options=} opt_options
 */
zb.ui.BaseList.prototype.setDataList = function(source, opt_options) {
	this.setSource(source, opt_options);
};


/**
 * @deprecated Use this.getSource().current() instead.
 * @return {?*}
 */
zb.ui.BaseList.prototype.getCurrentData = function() {
	return this._buffer.getSourceItem();
};


/**
 * @deprecated Use this.getSource().size() instead.
 * @return {number}
 */
zb.ui.BaseList.prototype.getGlobalSize = function() {
	return this._buffer.getGlobalSize();
};


/**
 * @deprecated Use this.getSource().currentIndex() instead.
 * @return {number}
 */
zb.ui.BaseList.prototype.getGlobalIndex = function() {
	return this._buffer.getGlobalIndex();
};


/**
 * @inheritDoc
 */
zb.ui.BaseList.prototype.beforeDOMShow = function() {
	this._items.forEach(function(item) {
		item.beforeDOMShow();
	});

	goog.base(this, 'beforeDOMShow');
};


/**
 * @inheritDoc
 */
zb.ui.BaseList.prototype.afterDOMShow = function() {
	goog.base(this, 'afterDOMShow');

	this._items.forEach(function(item) {
		item.afterDOMShow();
	});

	this.updateView();
};


/**
 * @inheritDoc
 */
zb.ui.BaseList.prototype.beforeDOMHide = function() {
	this._items.forEach(function(item) {
		item.beforeDOMHide();
	});

	goog.base(this, 'beforeDOMHide');
};


/**
 * @inheritDoc
 */
zb.ui.BaseList.prototype.afterDOMHide = function() {
	this._items.forEach(function(item) {
		item.afterDOMHide();
	});

	goog.base(this, 'afterDOMHide');
};


/**
 * @inheritDoc
 */
zb.ui.BaseList.prototype.mouseOver = function(e) {
	goog.base(this, 'mouseOver', e);

	var item = this._getItemByNode(/** @type {HTMLElement} */(e.target));

	if (item) {
		this._buffer.setIndexByItem(item.getData());
	}
};


/**
 * @inheritDoc
 */
zb.ui.BaseList.prototype.mouseClick = function(e) {
	var item = this._getItemByNode(/** @type {HTMLElement} */(e.target));

	if (item) {
		this._fireEvent(this.EVENT_CLICK, item.getData());
	}
};


/**
 * @return {zb.ui.BaseList.State}
 * @inheritDoc
 */
zb.ui.BaseList.prototype.saveState = function() {
	return {
		index: this._buffer.getGlobalIndex(),
		visibleIndex: this._visibleIndex
	};
};


/**
 * @param {zb.ui.BaseList.State} state
 * @inheritDoc
 */
zb.ui.BaseList.prototype.loadState = function(state) {
	if (this.isEmpty()) {
		return;
	}

	var isSelected = this._buffer.setGlobalIndex(state.index);

	if (isSelected) {
		this._visibleIndex = state.visibleIndex;
		this._adjustPosition();
	}
};


/**
 * @param {zb.ui.BaseListBuffer.Source} source
 * @param {zb.ui.BaseListBuffer.Options=} opt_options
 */
zb.ui.BaseList.prototype.setSource = function(source, opt_options) {
	this._buffer.setSource(source, opt_options);
};


/**
 * @return {zb.ui.BaseListBuffer.Source}
 */
zb.ui.BaseList.prototype.getSource = function() {
	return this._buffer.getSource();
};


/**
 * @return {boolean}
 */
zb.ui.BaseList.prototype.isEmpty = function() {
	return this._buffer.isEmpty();
};


// TODO: переименовать методы в getSize и getCurrentIndex
/**
 * @return {number}
 */
zb.ui.BaseList.prototype.getLocalSize = function() {
	return this._buffer.getLocalSize();
};


/**
 * @return {number}
 */
zb.ui.BaseList.prototype.getLocalIndex = function() {
	return this._buffer.getLocalIndex();
};


/**
 * @return {?zb.ui.IBaseListItem}
 */
zb.ui.BaseList.prototype.getCurrentItem = function() {
	return this._items[this.getLocalIndex()] || null;
};


/**
 */
zb.ui.BaseList.prototype.updateView = function() {
	this._calculateSize();
	this._adjustPosition();
};


/**
 * @inheritDoc
 */
zb.ui.BaseList.prototype._renderTemplate = function() {
	return zb.ui.templates.baseList(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @inheritDoc
 */
zb.ui.BaseList.prototype._processKey = function(zbKey) {
	var isHandled = false;
	var keys = zb.device.input.Keys;

	switch (zbKey) {
		case keys.UP:
			isHandled = this._moveUp();
			break;
		case keys.DOWN:
			isHandled = this._moveDown();
			break;
		case keys.LEFT:
			isHandled = this._moveLeft();
			break;
		case keys.RIGHT:
			isHandled = this._moveRight();
			break;
		case keys.ENTER:
			var data = this._buffer.getSourceItem();
			if (data) {
				this._fireEvent(this.EVENT_CLICK, data);
				isHandled = true;
			}
			break;
	}

	return isHandled;
};


/**
 * @return {boolean}
 * @protected
 */
zb.ui.BaseList.prototype._moveUp = function() {
	return this._isVertical ? this._buffer.selectPrevLine() : this._buffer.selectPrevIndex();
};


/**
 * @return {boolean}
 * @protected
 */
zb.ui.BaseList.prototype._moveDown = function() {
	return this._isVertical ? this._buffer.selectNextLine() : this._buffer.selectNextIndex();
};


/**
 * @return {boolean}
 * @protected
 */
zb.ui.BaseList.prototype._moveLeft = function() {
	return this._isVertical ? this._buffer.selectPrevIndex() : this._buffer.selectPrevLine();
};


/**
 * @return {boolean}
 * @protected
 */
zb.ui.BaseList.prototype._moveRight = function() {
	return this._isVertical ? this._buffer.selectNextIndex() : this._buffer.selectNextLine();
};


/**
 * @param {boolean} isVertical
 * @protected
 */
zb.ui.BaseList.prototype._setVertical = function(isVertical) {
	this._isVertical = isVertical;
	zb.html.updateClassName(this._container, '_is-vertical', isVertical);
};


/**
 * @param {Array.<*>} newDataItems
 * @protected
 */
zb.ui.BaseList.prototype._setItems = function(newDataItems) {
	this._updateItemsIfNeeded(newDataItems);

	// Если пришел пустой массив, очищаем.
	if (!newDataItems.length) {
		this._clear();
	}

	if (this.isDOMVisible()) {
		this.updateView();
	}
};


/**
 * @param {Array.<*>} newDataItems
 * @protected
 */
zb.ui.BaseList.prototype._updateItemsIfNeeded = function(newDataItems) {
	var getDiff = function(arr1, arr2) {
		return arr1.filter(function(item) {
			return arr2.indexOf(item) === -1;
		});
	};

	var oldDataItems = this._getItemsData();

	var addedDataItems = getDiff(newDataItems, oldDataItems);
	var removedDataItems = getDiff(oldDataItems, newDataItems);

	if (!addedDataItems.length && !removedDataItems.length) {
		return;
	}

	removedDataItems.forEach(function(item, index) {
		this._removeItem(oldDataItems.indexOf(item) - index);
	}, this);

	addedDataItems.forEach(function(item) {
		this._addItem(item, newDataItems.indexOf(item));
	}, this);
};


/**
 * @protected
 */
zb.ui.BaseList.prototype._clear = function() {
	this._visibleIndex = 0;
	this._lastData = null;
};


/**
 * @param {*} data
 * @param {number} index
 * @return {zb.ui.IBaseListItem}
 * @protected
 */
zb.ui.BaseList.prototype._addItem = function(data, index) {
	var nextItem = this._items[index];
	var nextItemContainer = nextItem ? nextItem.getContainer() : null;

	var item = new this._itemClass({data: data});
	var itemContainer = item.getContainer();
	var isVisible = this.isDOMVisible();

	if (isVisible) {
		item.beforeDOMShow();
	}

	this._items.splice(index, 0, item);
	this._exported.slider.insertBefore(itemContainer, nextItemContainer);

	if (isVisible) {
		item.afterDOMShow();
	}

	return item;
};


/**
 * @param {number} index
 * @return {zb.ui.IBaseListItem}
 * @protected
 */
zb.ui.BaseList.prototype._removeItem = function(index) {
	var item = this._items[index];
	var itemContainer = item.getContainer();
	var isVisible = this.isDOMVisible();

	if (isVisible) {
		item.beforeDOMHide();
	}

	this._exported.slider.removeChild(itemContainer);
	this._items.splice(index, 1);

	if (isVisible) {
		item.afterDOMHide();
	}

	return item;
};


/**
 * @protected
 */
zb.ui.BaseList.prototype._adjustPosition = function() {
	var lastDataIndex = this._getLastDataIndex();
	var itemsSkipped = lastDataIndex - this._visibleIndex;
	var itemsSkippedSize = this._getSizeOfItems(itemsSkipped);

	this._setPosition(itemsSkippedSize);
};


/**
 * @param {number} position
 * @protected
 */
zb.ui.BaseList.prototype._setPosition = function(position) {
	// Проверяем, чтобы не было пустого места.
	// Нужно для CircularDataList при прыжке из начала в конец списка.
	var maxPosition = this._sliderSize - this._wrapperSize;
	position = Math.min(maxPosition, position);

	// Позиция не может быть меньше нуля.
	position = Math.max(0, position);

	var sliderStyle = this._exported.slider.style;
	if (this._isVertical) {
		sliderStyle.top = -position + 'px';
	} else {
		sliderStyle.left = -position + 'px';
	}

	this._position = position;
};


/**
 * @param {*} newItem
 * @param {number} newLocalIndex
 * @param {*} oldItem
 * @param {number} oldLocalIndex
 * @protected
 */
zb.ui.BaseList.prototype._selectItem = function(newItem, newLocalIndex, oldItem, oldLocalIndex) {
	if (isNaN(newLocalIndex)) {
		return;
	}

	this._fireBeforeMove.apply(this, arguments);

	var position = this._getPositionByIndex(newLocalIndex);
	this._setPosition(position);

	this._lastData = newItem;
	this._calculateVisibleIndex(newLocalIndex);

	this._fireAfterMove.apply(this, arguments);
};


/**
 * @param {*} newData
 * @param {number} newIndex
 * @param {*} oldData
 * @param {number} oldIndex
 * @protected
 */
zb.ui.BaseList.prototype._fireBeforeMove = function(newData, newIndex, oldData, oldIndex) {
	if (!isNaN(oldIndex)) {
		this._items[oldIndex].blur();
	}

	this._fireEvent(this.EVENT_BEFORE_MOVE, newData, newIndex, oldData, oldIndex);
};


/**
 * @param {*} newData
 * @param {number} newIndex
 * @param {*} oldData
 * @param {number} oldIndex
 * @protected
 */
zb.ui.BaseList.prototype._fireAfterMove = function(newData, newIndex, oldData, oldIndex) {
	if (!isNaN(newIndex)) {
		this._items[newIndex].focus();
	}

	this._fireEvent(this.EVENT_AFTER_MOVE, newData, newIndex, oldData, oldIndex);
};


/**
 * @protected
 */
zb.ui.BaseList.prototype._calculateSize = function() {
	var exp = this._exported;

	this._wrapperSize = this._isVertical ? exp.wrapper.offsetHeight : exp.wrapper.offsetWidth;
	this._sliderSize = this._isVertical ? exp.slider.offsetHeight : exp.slider.offsetWidth;
	this._itemSize = 0;

	if (this._items.length) {
		var firstItemContainer = this._items[0].getContainer();
		this._itemSize = this._isVertical ? firstItemContainer.offsetHeight : firstItemContainer.offsetWidth;
	}
};


/**
 * @param {number} index
 * @protected
 */
zb.ui.BaseList.prototype._calculateVisibleIndex = function(index) {
	// Защита от еще не определенного this._itemSize.
	if (!this._itemSize) {
		return;
	}

	var linesSkipped = this._position / this._itemSize;
	var itemsSkipped = this._buffer.getItemsByLines(linesSkipped);

	this._visibleIndex = index - itemsSkipped;
};


/**
 * @param {number} index
 * @return {number}
 * @protected
 */
zb.ui.BaseList.prototype._getPositionByIndex = function(index) {
	var beforeItem = this._getPositionBeforeItem(index);
	var afterItem = this._getPositionAfterItem(index);
	var beforeView = this._position;
	var afterView = beforeView + this._wrapperSize;

	if (beforeItem < beforeView) {
		beforeView = beforeItem;
	} else if (afterItem > afterView) {
		beforeView = afterItem - this._wrapperSize;
	}

	return beforeView;
};


/**
 * @param {number} index
 * @return {number}
 * @protected
 */
zb.ui.BaseList.prototype._getPositionBeforeItem = function(index) {
	var line = this._buffer.getLineByIndex(index);
	return line * this._itemSize;
};


/**
 * @param {number} index
 * @return {number}
 * @protected
 */
zb.ui.BaseList.prototype._getPositionAfterItem = function(index) {
	var before = this._getPositionBeforeItem(index);
	return before + this._itemSize;
};


/**
 * @param {number} items
 * @return {number}
 * @protected
 */
zb.ui.BaseList.prototype._getSizeOfItems = function(items) {
	var lines = this._buffer.getLinesByItems(items);
	return lines * this._itemSize;
};


/**
 * @return {number}
 * @protected
 */
zb.ui.BaseList.prototype._getMaxSliderSize = function() {
	return this._getSizeOfItems(this._buffer.getGlobalSize());
};


/**
 * @return {Array.<*>}
 * @protected
 */
zb.ui.BaseList.prototype._getItemsData = function() {
	return this._items.map(function(item) {
		return item.getData();
	});
};


/**
 * @return {Array.<HTMLElement>}
 * @protected
 */
zb.ui.BaseList.prototype._getItemsContainers = function() {
	return this._items.map(function(item) {
		return item.getContainer();
	});
};


/**
 * @return {number}
 * @protected
 */
zb.ui.BaseList.prototype._getLastDataIndex = function() {
	var itemsData = this._getItemsData();

	var lastDataIndex = itemsData.indexOf(this._lastData);
	lastDataIndex = lastDataIndex === -1 ? 0 : lastDataIndex;

	return lastDataIndex;
};


/**
 * @param {HTMLElement} node
 * @return {zb.ui.IBaseListItem}
 * @protected
 */
zb.ui.BaseList.prototype._getItemByNode = function(node) {
	return this._items.filter(function(item) {
		return item.getContainer().contains(node);
	})[0];
};


/**
 * @type {zb.ui.templates.BaseListOut}
 * @protected
 */
zb.ui.BaseList.prototype._exported;


/**
 * @type {Function}
 * @protected
 */
zb.ui.BaseList.prototype._itemClass;


/**
 * @type {zb.ui.BaseListBuffer}
 * @protected
 */
zb.ui.BaseList.prototype._buffer;


/**
 * @type {Array.<zb.ui.IBaseListItem>}
 * @protected
 */
zb.ui.BaseList.prototype._items;


/**
 * @type {number}
 * @protected
 */
zb.ui.BaseList.prototype._wrapperSize;


/**
 * @type {number}
 * @protected
 */
zb.ui.BaseList.prototype._sliderSize;


/**
 * @type {number}
 * @protected
 */
zb.ui.BaseList.prototype._itemSize;


/**
 * @type {number}
 * @protected
 */
zb.ui.BaseList.prototype._position;


/**
 * @type {number}
 * @protected
 */
zb.ui.BaseList.prototype._visibleIndex;


/**
 * @type {?*}
 * @protected
 */
zb.ui.BaseList.prototype._lastData;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.BaseList.prototype._isVertical;


/**
 * Fired when item clicked.
 * Fired with: data {*}
 * @const {string}
 */
zb.ui.BaseList.prototype.EVENT_CLICK = 'click';


/**
 * Fired before slider position changed.
 * Fired with: newData {*}, newIndex {number}, oldData {*}, oldIndex {number}
 * @const {string}
 */
zb.ui.BaseList.prototype.EVENT_BEFORE_MOVE = 'before-move';


/**
 * Fired after slider position changed.
 * Fired with: newData {*}, newIndex {number}, oldData {*}, oldIndex {number}
 * @const {string}
 */
zb.ui.BaseList.prototype.EVENT_AFTER_MOVE = 'after-move';


/**
 * @typedef {{
 *     itemClass: (Function|undefined),
 *     source: (zb.ui.BaseListBuffer.Source|undefined),
 *     isVertical: (boolean|undefined)
 * }}
 */
zb.ui.BaseList.Input;


/**
 * @typedef {{
 *     index: number,
 *     visibleIndex: number
 * }}
 */
zb.ui.BaseList.State;
