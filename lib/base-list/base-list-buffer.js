/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.BaseListBuffer');
goog.require('zb.ui.BaseListUtils');
goog.require('zb.ui.IDataList');



/**
 * @param {function(Array.<*>)} changeCallback
 * @param {function(*, number, *, number)} selectCallback
 * @constructor
 */
zb.ui.BaseListBuffer = function(changeCallback, selectCallback) {
	this._changeCallback = changeCallback;
	this._selectCallback = selectCallback;

	this._reset();
	this._resetCache();
};


/**
 * @param {zb.ui.BaseListBuffer.Source} source
 * @param {zb.ui.BaseListBuffer.Options=} opt_options
 */
zb.ui.BaseListBuffer.prototype.setSource = function(source, opt_options) {
	this._reset();

	this._source = source;
	this._setOptions(opt_options || {});
};


/**
 * @return {zb.ui.BaseListBuffer.Source}
 */
zb.ui.BaseListBuffer.prototype.getSource = function() {
	return this._source;
};


/**
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.isEmpty = function() {
	return !this.getSource();
};


/**
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.isLoading = function() {
	throw new Error('not implemented');
};


/**
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.isGlobalStart = function() {
	throw new Error('not implemented');
};


/**
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.isGlobalEnd = function() {
	throw new Error('not implemented');
};


/**
 * Возвращает начало буфера источника данных в глобальных терминах
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getSourceStart = function() {
	throw new Error('not implemented');
};


/**
 * Возвращает конец буфера источника данных в глобальных терминах
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getSourceEnd = function() {
	// Получаем глобальный размер данных
	var sourceSize = this.getSourceStart() + this.getSourceSize();
	// Переводим размер в конец буфера
	return zb.ui.BaseListUtils.sizeToEnd(sourceSize);
};


/**
 * @param {number} globalIndex
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.isSourceIndex = function(globalIndex) {
	return globalIndex >= this.getSourceStart() && globalIndex <= this.getSourceEnd();
};


/**
 * Возвращает размер буфера источника данных
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getSourceSize = function() {
	throw new Error('not implemented');
};


/**
 * Возвращает текущий индекс в терминах источника данных
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getSourceIndex = function() {
	throw new Error('not implemented');
};


/**
 * @return {?*}
 */
zb.ui.BaseListBuffer.prototype.getSourceItem = function() {
	throw new Error('not implemented');
};


/**
 * @param {*} item
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getSourceItemIndex = function(item) {
	throw new Error('not implemented');
};


/**
 * @param {number} from
 * @param {number} to
 * @return {Array.<*>}
 */
zb.ui.BaseListBuffer.prototype.getSourceItems = function(from, to) {
	throw new Error('not implemented');
};


/**
 * @param {number} globalIndex
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.isLocalIndex = function(globalIndex) {
	return globalIndex >= this.getLocalStart() && globalIndex <= this.getLocalEnd();
};


/**
 * Возвращает начало буфера в глобальных терминах
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getLocalStart = function() {
	var lineSize = this._options.lineSize;
	var globalCenterLineStart = zb.ui.BaseListUtils.getLineStart(this._globalCenter, lineSize);
	var paddingItems = this.getItemsByLines(this._options.padding);

	var localStart = globalCenterLineStart - paddingItems;
	var sourceStart = this.getSourceStart();

	if (localStart < sourceStart) {
		if (this.isGlobalStart()) {
			localStart = sourceStart;
		} else {
			localStart = zb.ui.BaseListUtils.getLineStart(sourceStart, lineSize);
			// Если sourceStart не в начале строки, выбираем следующую строку
			if (localStart !== sourceStart) {
				localStart += lineSize;
			}
		}
	} else if (isNaN(sourceStart)) {
		localStart = sourceStart;
	}

	return localStart;
};


/**
 * Возвращает конец буфера в глобальных терминах
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getLocalEnd = function() {
	var lineSize = this._options.lineSize;
	var globalCenterLineEnd = zb.ui.BaseListUtils.getLineEnd(this._globalCenter, lineSize);
	var paddingItems = this.getItemsByLines(this._options.padding);

	var localEnd = globalCenterLineEnd + paddingItems;
	var sourceEnd = this.getSourceEnd();

	if (localEnd > sourceEnd) {
		if (this.isGlobalEnd()) {
			localEnd = sourceEnd;
		} else {
			localEnd = zb.ui.BaseListUtils.getLineEnd(sourceEnd, lineSize);
			// Если sourceEnd не в конце строки, выбираем предыдущую строку
			if (localEnd !== sourceEnd) {
				localEnd -= lineSize;
			}
		}
	} else if (isNaN(sourceEnd)) {
		localEnd = sourceEnd;
	}

	return localEnd;
};


/**
 * Возвращает размер буфера
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getLocalSize = function() {
	// Получаем конец буфера в локальных терминах
	var localEnd = this.getLocalEnd() - this.getLocalStart();
	// Переводим конец буфера в размер
	return zb.ui.BaseListUtils.endToSize(localEnd);
};


/**
 * Возвращает текущий индекс в локальных терминах
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getLocalIndex = function() {
	return this.getGlobalIndex() - this.getLocalStart();
};


/**
 * @return {Array.<*>}
 */
zb.ui.BaseListBuffer.prototype.getLocalItems = function() {
	var sourceStart = this.getSourceStart();
	var sourceEnd = this.getSourceEnd();

	var sourceFrom = Math.max(this.getLocalStart() - sourceStart, 0);
	var sourceTo = Math.min(this.getLocalEnd() - sourceStart, sourceEnd);

	return this.getSourceItems(sourceFrom, sourceTo);
};


/**
 * @param {number} globalIndex
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.isGlobalIndex = function(globalIndex) {
	return globalIndex >= this.getGlobalStart() && globalIndex <= this.getGlobalEnd();
};


/**
 * Возвращает глобальное начало данных в глобальных терминах
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getGlobalStart = function() {
	if (!this.isEmpty() && this.getSourceSize()) {
		return 0;
	} else {
		return NaN;
	}
};


/**
 * @param {number} globalEnd
 */
zb.ui.BaseListBuffer.prototype.setGlobalEnd = function(globalEnd) {
	this._globalEnd = globalEnd;
};


/**
 * Возвращает глобальный конец данных в глобальных терминах
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getGlobalEnd = function() {
	return this.isEmpty() ? NaN : this._globalEnd;
};


/**
 * Возвращет глобальный размер данных
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getGlobalSize = function() {
	// Нужно, чтобы в случае, когда globalEnd = 0, globalSize был равен 0, а не 1.
	return zb.ui.BaseListUtils.endToSize(this.getGlobalEnd());
};


/**
 * Возвращает текущий индекс в глобальных терминах
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getGlobalIndex = function() {
	return this.getSourceStart() + this.getSourceIndex();
};


/**
 * @param {number} line
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getItemsByLines = function(line) {
	return zb.ui.BaseListUtils.getItemsByLines(line, this._options.lineSize);
};


/**
 * @param {number} items
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getLinesByItems = function(items) {
	return zb.ui.BaseListUtils.getLinesByItems(items, this._options.lineSize);
};


/**
 * @param {number} index
 * @return {number}
 */
zb.ui.BaseListBuffer.prototype.getLineByIndex = function(index) {
	return zb.ui.BaseListUtils.getLineByIndex(index, this._options.lineSize);
};


/**
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.selectNextLine = function() {
	var currGlobalIndex = this.getGlobalIndex();
	var nextGlobalIndex = zb.ui.BaseListUtils.getNextLine(currGlobalIndex, this._options.lineSize);
	var lastGlobalIndex = this.getGlobalEnd();

	// Воркэраунд для циклических списков
	if (this.isCyclical() && nextGlobalIndex > lastGlobalIndex) {
		var firstGlobalIndex = this.getGlobalStart();
		var firstGlobalLineEnd = zb.ui.BaseListUtils.getLineEnd(firstGlobalIndex, this._options.lineSize);
		var nextGlobalLineEnd = zb.ui.BaseListUtils.getLineEnd(nextGlobalIndex, this._options.lineSize);

		nextGlobalIndex = firstGlobalLineEnd - (nextGlobalLineEnd - nextGlobalIndex);

	// Воркэраунд для последней неполной строки элементов:
	// Если на сервере больше нет данных и новый индекс выходит за пределы,
	// То попробуем выбрать не строку, а элемент со следующим индексом
	} else if (this.isGlobalEnd() && !this.isLocalIndex(nextGlobalIndex)) {
		var possibleNextGlobalIndex = zb.ui.BaseListUtils.getNextIndex(currGlobalIndex);

		if (this.isLocalIndex(possibleNextGlobalIndex)) {
			nextGlobalIndex = possibleNextGlobalIndex;
		}
	}

	return this.setGlobalIndex(nextGlobalIndex);
};


/**
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.selectPrevLine = function() {
	var currGlobalIndex = this.getGlobalIndex();
	var prevGlobalIndex = zb.ui.BaseListUtils.getPrevLine(currGlobalIndex, this._options.lineSize);

	if (this.isCyclical() && prevGlobalIndex < 0) {
		var lastGlobalIndex = this.getGlobalEnd();
		var lastGlobalLineEnd = zb.ui.BaseListUtils.getLineEnd(lastGlobalIndex, this._options.lineSize);
		var prevGlobalLineEnd = zb.ui.BaseListUtils.getLineEnd(prevGlobalIndex, this._options.lineSize);

		prevGlobalIndex = lastGlobalLineEnd - (prevGlobalLineEnd - prevGlobalIndex);

		if (prevGlobalIndex > lastGlobalIndex) {
			prevGlobalIndex = zb.ui.BaseListUtils.getPrevLine(prevGlobalIndex, this._options.lineSize);
		}
	}

	return this.setGlobalIndex(prevGlobalIndex);
};


/**
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.selectNextIndex = function() {
	if (this._options.lineSize === 1) {
		return false;
	}

	var currGlobalIndex = this.getGlobalIndex();
	var lastGlobalIndex = this.getGlobalEnd();
	var nextGlobalIndex;

	if (this.isCyclical() && currGlobalIndex === lastGlobalIndex) {
		nextGlobalIndex = 0;
	} else {
		nextGlobalIndex = zb.ui.BaseListUtils.getNextIndex(currGlobalIndex);
	}

	return this.setGlobalIndex(nextGlobalIndex);
};


/**
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.selectPrevIndex = function() {
	if (this._options.lineSize === 1) {
		return false;
	}

	var currGlobalIndex = this.getGlobalIndex();
	var lastGlobalIndex = this.getGlobalEnd();
	var prevGlobalIndex;

	if (this.isCyclical() && currGlobalIndex === 0) {
		prevGlobalIndex = lastGlobalIndex;
	} else {
		prevGlobalIndex = zb.ui.BaseListUtils.getPrevIndex(currGlobalIndex);
	}

	return this.setGlobalIndex(prevGlobalIndex);
};


/**
 * @param {*} item
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.setIndexByItem = function(item) {
	var sourceIndex = this.getSourceItemIndex(item);
	var globalIndex = this.getSourceStart() + sourceIndex;

	return this.setGlobalIndex(globalIndex);
};


/**
 * @param {number} globalIndex
 * @return {boolean}
 */
zb.ui.BaseListBuffer.prototype.setGlobalIndex = function(globalIndex) {
	if (this.isEmpty()) {
		return false;
	}

	if (this._isBlocked && this.isLoading()) {
		return true;
	} else {
		this._isBlocked = false;
	}

	var isSelected = false;

	// Выбрать NaN можно только программно через source,
	// пользовательские действия не могут привести к выбору NaN
	if (!isNaN(globalIndex)) {
		var sourceIndex = globalIndex - this.getSourceStart();
		isSelected = this._setSourceIndex(sourceIndex);
	}

	if (!isSelected && this.isLoading()) {
		this._isBlocked = true;
		return true;
	}

	return isSelected;
};


/**
 * @param {number} index
 * @return {boolean}
 * @protected
 */
zb.ui.BaseListBuffer.prototype._setSourceIndex = function(index) {
	throw new Error('not implemented');
};


/**
 * @protected
 */
zb.ui.BaseListBuffer.prototype._updateGlobalCenter = function() {
	// globalIndex может быть NaN, когда установлен пустой DataList.
	var globalIndex = this.getGlobalIndex();
	this._globalCenter = isNaN(globalIndex) ? 0 : globalIndex;
};


/**
 * @protected
 */
zb.ui.BaseListBuffer.prototype._updateGlobalEnd = function() {
	var globalEnd;
	var sourceEnd = this.getSourceEnd();

	if (isNaN(this._globalEnd)) {
		globalEnd = sourceEnd;
	} else if (isNaN(sourceEnd)) {
		globalEnd = this._globalEnd;
	} else if (this.isDynamic()) {
		globalEnd = Math.max(sourceEnd, this._globalEnd);
	} else {
		globalEnd = sourceEnd;
	}

	this.setGlobalEnd(globalEnd);
};


/**
 * @protected
 */
zb.ui.BaseListBuffer.prototype._reset = function() {
	this._source = null;
	this._setOptions({});

	this._globalCenter = 0;
	this._globalEnd = NaN;
	this._isBlocked = false;
};


/**
 * @protected
 */
zb.ui.BaseListBuffer.prototype._resetCache = function() {
	this._localItems = [];
	this._currentItem = null;
};


/**
 * @param {zb.ui.BaseListBuffer.Options} options
 * @protected
 */
zb.ui.BaseListBuffer.prototype._setOptions = function(options) {
	this._options = {
		padding: options.padding || 5,
		loadOnLeft: options.loadOnLeft || 1,
		lineSize: options.lineSize || 1
	};
};


/**
 * @param {number} sourceIndex
 * @protected
 */
zb.ui.BaseListBuffer.prototype._isChangeNeeded = function(sourceIndex) {
	var globalIndex = this.getSourceStart() + sourceIndex;

	if (!this.isLocalIndex(globalIndex)) {
		return true;
	}

	var loadOnLeftItems = this.getItemsByLines(this._options.loadOnLeft);

	var isGlobalStart = globalIndex - loadOnLeftItems < this.getGlobalStart();
	var isGlobalEnd = globalIndex + loadOnLeftItems > this.getGlobalEnd();

	var isLocalStart = globalIndex - loadOnLeftItems < this.getLocalStart();
	var isLocalEnd = globalIndex + loadOnLeftItems > this.getLocalEnd();

	var isOnlyLocalStart = isLocalStart && !isGlobalStart;
	var isOnlyLocalEnd = isLocalEnd && !isGlobalEnd;

	// После проверки того, что новый индекс не входит в буфер, происходит изменение буфера.
	// Однако, если элементов в даталисте больше нет, то изменение буфера вызывать не нужно.
	return (isOnlyLocalStart || isOnlyLocalEnd);
};


/**
 * @param {*} newItem
 * @param {number} newSourceIndex
 * @param {*} oldItem
 * @param {number} oldSourceIndex
 * @protected
 */
zb.ui.BaseListBuffer.prototype._selectItem = function(newItem, newSourceIndex, oldItem, oldSourceIndex) {
	if (this._isChangeNeeded(newSourceIndex) || this._isItemsChanged(this._localItems, this.getLocalItems())) {
		this._doChangeItems();
	}

	this._doSelectItem(newItem, newSourceIndex, oldItem, oldSourceIndex);
};


/**
 * @param {*} newItem
 * @param {number} newSourceIndex
 * @param {*} oldItem
 * @param {number} oldSourceIndex
 * @protected
 */
zb.ui.BaseListBuffer.prototype._doSelectItem = function(newItem, newSourceIndex, oldItem, oldSourceIndex) {
	var sourceStart = this.getSourceStart();
	var localStart = this.getLocalStart();

	var newGlobalIndex = newSourceIndex + sourceStart;
	var oldGlobalIndex = oldSourceIndex + sourceStart;

	var newLocalIndex = newGlobalIndex - localStart;
	var oldLocalIndex = oldGlobalIndex - localStart;

	// Подменяем предыдущий итем и индекс, чтобы не блюрить элемент, который не входит в буфер.
	if (!this.isLocalIndex(oldGlobalIndex)) {
		oldItem = null;
		oldLocalIndex = NaN;
	}

	var isItemsEqual = newItem === oldItem;
	var isIndexesEqual = newGlobalIndex === oldGlobalIndex || (isNaN(newGlobalIndex) && isNaN(oldGlobalIndex));
	var isEmpty = !this.getLocalSize();

	// Не вызывать селект, если элементы и их глобальные индексы совпадают.
	// Не вызывать селект, если элементов нет.
	if ((isItemsEqual && isIndexesEqual) || isEmpty) {
		return;
	}

	this._fireItemSelected(newItem, newLocalIndex, oldItem, oldLocalIndex);
};


/**
 * @param {Array.<*>} newDataItems
 * @param {Array.<*>} oldDataItems
 * @return {boolean}
 * @protected
 */
zb.ui.BaseListBuffer.prototype._isItemsChanged = function(newDataItems, oldDataItems) {
	var getDiff = function(arr1, arr2) {
		return arr1.filter(function(item) {
			return arr2.indexOf(item) === -1;
		});
	};

	var addedDataItems = getDiff(newDataItems, oldDataItems);
	var removedDataItems = getDiff(oldDataItems, newDataItems);

	return !!(addedDataItems.length || removedDataItems.length);
};


/**
 * @protected
 */
zb.ui.BaseListBuffer.prototype._changeItems = function() {
	this._doChangeItems();

	// Если старый элемент не содержится в новом списке, выбираем новый элемент.
	if (this._localItems.indexOf(this._currentItem) === -1) {
		this._doSelectItem(this.getSourceItem(), this.getSourceIndex(), null, NaN);
	}
};


/**
 * @protected
 */
zb.ui.BaseListBuffer.prototype._doChangeItems = function() {
	this._updateGlobalEnd();
	this._updateGlobalCenter();

	var newLocalItems = this.getLocalItems();
	var oldLocalItems = this._localItems;

	if (this._isItemsChanged(newLocalItems, oldLocalItems)) {
		this._fireItemsChanged(newLocalItems);
	}
};


/**
 * @protected
 */
zb.ui.BaseListBuffer.prototype._clearItems = function() {
	// Вручную устанавливаем ноль, т.к. автоматически устанавливается только большее значение.
	this.setGlobalEnd(NaN);
	this._changeItems();
};


/**
 * @param {Array.<*>} items
 * @protected
 */
zb.ui.BaseListBuffer.prototype._fireItemsChanged = function(items) {
	this._localItems = items;
	this._changeCallback(items);
};


/**
 * @param {*} newItem
 * @param {number} newLocalIndex
 * @param {*} oldItem
 * @param {number} oldLocalIndex
 * @protected
 */
zb.ui.BaseListBuffer.prototype._fireItemSelected = function(newItem, newLocalIndex, oldItem, oldLocalIndex) {
	this._currentItem = newItem;
	this._selectCallback(newItem, newLocalIndex, oldItem, oldLocalIndex);
};


/**
 * @type {function(Array.<*>)}
 * @protected
 */
zb.ui.BaseListBuffer.prototype._changeCallback;


/**
 * @type {function(*, number, *, number)}
 * @protected
 */
zb.ui.BaseListBuffer.prototype._selectCallback;


/**
 * @type {zb.ui.BaseListBuffer.Source}
 * @protected
 */
zb.ui.BaseListBuffer.prototype._source;


/**
 * @type {{
 *     padding: number,
 *     loadOnLeft: number,
 *     lineSize: number
 * }}
 * @private
 */
zb.ui.BaseListBuffer.prototype._options;


/**
 * @type {number}
 * @private
 */
zb.ui.BaseListBuffer.prototype._globalCenter;


/**
 * @type {number}
 * @private
 */
zb.ui.BaseListBuffer.prototype._globalEnd;


/**
 * @type {boolean}
 * @private
 */
zb.ui.BaseListBuffer.prototype._isBlocked;


/**
 * @type {Array.<*>}
 * @private
 */
zb.ui.BaseListBuffer.prototype._localItems;


/**
 * @type {?*}
 * @private
 */
zb.ui.BaseListBuffer.prototype._currentItem;


/**
 * @typedef {{
 *     padding: (number|undefined),
 *     loadOnLeft: (number|undefined),
 *     lineSize: (number|undefined)
 * }}
 */
zb.ui.BaseListBuffer.Options;


/**
 * @typedef {zb.ui.IDataList|null}
 */
zb.ui.BaseListBuffer.Source;
