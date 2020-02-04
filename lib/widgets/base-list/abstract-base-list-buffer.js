/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import IList from '../../data/i-list';
import {
	getPrevIndex,
	getPrevLine,
	getNextIndex,
	getNextLine,
	getLineByIndex,
	getLinesByItems,
	getItemsByLines,
	endToSize,
	getLineStart,
	getLineEnd,
	sizeToEnd
} from './base-list-utils';


/**
 * @abstract
 */
export default class AbstractBaseListBuffer {
	/**
	 * @param {Options} options
	 * @param {function(Array<*>)} changeCallback
	 * @param {function(*, number, *, number)} selectCallback
	 */
	constructor(options, changeCallback, selectCallback) {
		this._setOptions(options);

		this._changeCallback = changeCallback;
		this._selectCallback = selectCallback;

		this._reset();
		this._resetCache();
	}

	/**
	 * @param {Source} source
	 */
	setSource(source) {
		this._reset();
		this._source = source;
	}

	/**
	 * @return {Source}
	 */
	getSource() {
		return this._source;
	}

	/**
	 * @return {boolean}
	 */
	hasSource() {
		return !!this.getSource();
	}

	/**
	 * @return {boolean}
	 */
	isCyclical() {
		return false;
	}

	/**
	 * @return {boolean}
	 */
	isDynamic() {
		return false;
	}

	/**
	 * @abstract
	 * @return {boolean}
	 */
	isLoading() {}

	/**
	 * @abstract
	 * @return {boolean}
	 */
	isGlobalStart() {}

	/**
	 * @abstract
	 * @return {boolean}
	 */
	isGlobalEnd() {}

	/**
	 * Returns the start of the data source relative to total items
	 * @abstract
	 * @return {number}
	 */
	getSourceStart() {}

	/**
	 * Returns the end of the data source relative to total items
	 * @return {number}
	 */
	getSourceEnd() {
		// Получаем глобальный размер данных
		const sourceSize = this.getSourceStart() + this.getSourceSize();
		// Переводим размер в конец буфера
		return sizeToEnd(sourceSize);
	}

	/**
	 * @param {number} globalIndex
	 * @return {boolean}
	 */
	isSourceIndex(globalIndex) {
		return globalIndex >= this.getSourceStart() && globalIndex <= this.getSourceEnd();
	}

	/**
	 * Returns the size of the data source
	 * @abstract
	 * @return {number}
	 */
	getSourceSize() {}

	/**
	 * Returns the current index relative to the data source
	 * @abstract
	 * @return {number}
	 */
	getSourceIndex() {}

	/**
	 * @abstract
	 * @return {?*}
	 */
	getSourceItem() {}

	/**
	 * @abstract
	 * @param {*} item
	 * @return {number}
	 */
	getSourceItemIndex(item) {}

	/**
	 * @abstract
	 * @param {number} from
	 * @param {number} to
	 * @return {Array<*>}
	 */
	getSourceItems(from, to) {}

	/**
	 * @param {number} globalIndex
	 * @return {boolean}
	 */
	isLocalIndex(globalIndex) {
		return globalIndex >= this.getLocalStart() && globalIndex <= this.getLocalEnd();
	}

	/**
	 * Returns the start of the rendered items relative to total items
	 * @return {number}
	 */
	getLocalStart() {
		const lineSize = this._options.lineSize;
		const globalCenterLineStart = getLineStart(this._globalCenter, lineSize);
		const paddingItems = this.getItemsByLines(this._options.padding);

		let localStart = globalCenterLineStart - paddingItems;
		const sourceStart = this.getSourceStart();

		if (localStart < sourceStart) {
			if (this.isGlobalStart()) {
				localStart = sourceStart;
			} else {
				localStart = getLineStart(sourceStart, lineSize);
				// Если sourceStart не в начале строки, выбираем следующую строку
				if (localStart !== sourceStart) {
					localStart += lineSize;
				}
			}
		} else if (isNaN(sourceStart)) {
			localStart = sourceStart;
		}

		return localStart;
	}

	/**
	 * Returns the end of the rendered items relative to total items
	 * @return {number}
	 */
	getLocalEnd() {
		const lineSize = this._options.lineSize;
		const globalCenterLineEnd = getLineEnd(this._globalCenter, lineSize);
		const paddingItems = this.getItemsByLines(this._options.padding);

		let localEnd = globalCenterLineEnd + paddingItems;
		const sourceEnd = this.getSourceEnd();

		if (localEnd > sourceEnd) {
			if (this.isGlobalEnd()) {
				localEnd = sourceEnd;
			} else {
				localEnd = getLineEnd(sourceEnd, lineSize);
				// Если sourceEnd не в конце строки, выбираем предыдущую строку
				if (localEnd !== sourceEnd) {
					localEnd -= lineSize;
				}
			}
		} else if (isNaN(sourceEnd)) {
			localEnd = sourceEnd;
		}

		return localEnd;
	}

	/**
	 * Returns the size of the rendered items
	 * @return {number}
	 */
	getLocalSize() {
		// Получаем конец буфера в локальных терминах
		const localEnd = this.getLocalEnd() - this.getLocalStart();
		// Переводим конец буфера в размер
		return endToSize(localEnd);
	}

	/**
	 * Returns the current index relative to the rendered items
	 * @return {number}
	 */
	getLocalIndex() {
		return this.getGlobalIndex() - this.getLocalStart();
	}

	/**
	 * @return {Array<*>}
	 */
	getLocalItems() {
		const sourceStart = this.getSourceStart();
		const sourceEnd = this.getSourceEnd();

		const sourceFrom = Math.max(this.getLocalStart() - sourceStart, 0);
		const sourceTo = Math.min(this.getLocalEnd() - sourceStart, sourceEnd);

		return this.getSourceItems(sourceFrom, sourceTo);
	}

	/**
	 * @param {number} globalIndex
	 * @return {boolean}
	 */
	isGlobalIndex(globalIndex) {
		return globalIndex >= this.getGlobalStart() && globalIndex <= this.getGlobalEnd();
	}

	/**
	 * Returns the start of the total items
	 * @return {number}
	 */
	getGlobalStart() {
		if (this.hasSource() && this.getSourceSize()) {
			return 0;
		}
		return NaN;
	}

	/**
	 * @param {number} globalEnd
	 */
	setGlobalEnd(globalEnd) {
		this._globalEnd = globalEnd;
	}

	/**
	 * Returns the end of the total items
	 * @return {number}
	 */
	getGlobalEnd() {
		return this.hasSource() ? this._globalEnd : NaN;
	}

	/**
	 * Returns the size of the total items
	 * @return {number}
	 */
	getGlobalSize() {
		// Нужно, чтобы в случае, когда globalEnd = 0, globalSize был равен 0, а не 1.
		return endToSize(this.getGlobalEnd());
	}

	/**
	 * Returns the current index relative to the total items
	 * @return {number}
	 */
	getGlobalIndex() {
		return this.getSourceStart() + this.getSourceIndex();
	}

	/**
	 * @param {number} line
	 * @return {number}
	 */
	getItemsByLines(line) {
		return getItemsByLines(line, this._options.lineSize);
	}

	/**
	 * @param {number} items
	 * @return {number}
	 */
	getLinesByItems(items) {
		return getLinesByItems(items, this._options.lineSize);
	}

	/**
	 * @param {number} index
	 * @return {number}
	 */
	getLineByIndex(index) {
		return getLineByIndex(index, this._options.lineSize);
	}

	/**
	 * @return {boolean}
	 */
	selectNextLine() {
		const currGlobalIndex = this.getGlobalIndex();
		let nextGlobalIndex = getNextLine(currGlobalIndex, this._options.lineSize);
		const lastGlobalIndex = this.getGlobalEnd();

		// Воркэраунд для циклических списков
		if (this.isCyclical() && nextGlobalIndex > lastGlobalIndex) {
			const firstGlobalIndex = this.getGlobalStart();
			const firstGlobalLineEnd = getLineEnd(firstGlobalIndex, this._options.lineSize);
			const nextGlobalLineEnd = getLineEnd(nextGlobalIndex, this._options.lineSize);

			nextGlobalIndex = firstGlobalLineEnd - (nextGlobalLineEnd - nextGlobalIndex);

			// Воркэраунд для последней неполной строки элементов:
			// Если на сервере больше нет данных и новый индекс выходит за пределы,
			// То попробуем выбрать не строку, а элемент со следующим индексом
		} else if (this.isGlobalEnd() && !this.isLocalIndex(nextGlobalIndex)) {
			const possibleNextGlobalIndex = getNextIndex(currGlobalIndex);

			if (this.isLocalIndex(possibleNextGlobalIndex)) {
				nextGlobalIndex = possibleNextGlobalIndex;
			}
		}

		return this.setGlobalIndex(nextGlobalIndex);
	}

	/**
	 * @return {boolean}
	 */
	selectPrevLine() {
		const currGlobalIndex = this.getGlobalIndex();
		let prevGlobalIndex = getPrevLine(currGlobalIndex, this._options.lineSize);

		if (this.isCyclical() && prevGlobalIndex < 0) {
			const lastGlobalIndex = this.getGlobalEnd();
			const lastGlobalLineEnd = getLineEnd(lastGlobalIndex, this._options.lineSize);
			const prevGlobalLineEnd = getLineEnd(prevGlobalIndex, this._options.lineSize);

			prevGlobalIndex = lastGlobalLineEnd - (prevGlobalLineEnd - prevGlobalIndex);

			if (prevGlobalIndex > lastGlobalIndex) {
				prevGlobalIndex = getPrevLine(prevGlobalIndex, this._options.lineSize);
			}
		}

		return this.setGlobalIndex(prevGlobalIndex);
	}

	/**
	 * @return {boolean}
	 */
	selectNextIndex() {
		if (this._options.lineSize === 1) {
			return false;
		}

		const currGlobalIndex = this.getGlobalIndex();
		const lastGlobalIndex = this.getGlobalEnd();
		let nextGlobalIndex;

		if (this.isCyclical() && currGlobalIndex === lastGlobalIndex) {
			nextGlobalIndex = 0;
		} else {
			nextGlobalIndex = getNextIndex(currGlobalIndex);
		}

		return this.setGlobalIndex(nextGlobalIndex);
	}

	/**
	 * @return {boolean}
	 */
	selectPrevIndex() {
		if (this._options.lineSize === 1) {
			return false;
		}

		const currGlobalIndex = this.getGlobalIndex();
		const lastGlobalIndex = this.getGlobalEnd();
		let prevGlobalIndex;

		if (this.isCyclical() && currGlobalIndex === 0) {
			prevGlobalIndex = lastGlobalIndex;
		} else {
			prevGlobalIndex = getPrevIndex(currGlobalIndex);
		}

		return this.setGlobalIndex(prevGlobalIndex);
	}

	/**
	 * @param {*} item
	 * @return {boolean}
	 */
	setIndexByItem(item) {
		const sourceIndex = this.getSourceItemIndex(item);
		const globalIndex = this.getSourceStart() + sourceIndex;

		return this.setGlobalIndex(globalIndex);
	}

	/**
	 * @param {number} globalIndex
	 * @return {boolean}
	 */
	setGlobalIndex(globalIndex) {
		if (!this.hasSource()) {
			return false;
		}

		if (this._isBlocked && this.isLoading()) {
			return true;
		}
		this._isBlocked = false;


		let isSelected = false;

		// Выбрать NaN можно только программно через source,
		// пользовательские действия не могут привести к выбору NaN
		if (!isNaN(globalIndex)) {
			const sourceIndex = globalIndex - this.getSourceStart();
			isSelected = this._setSourceIndex(sourceIndex);
		}

		if (!isSelected && this.isLoading()) {
			this._isBlocked = true;
			return true;
		}

		return isSelected;
	}

	/**
	 * @abstract
	 * @param {number} index
	 * @return {boolean}
	 * @protected
	 */
	_setSourceIndex(index) {}

	/**
	 * @protected
	 */
	_updateGlobalCenter() {
		// Переменная globalIndex может быть NaN, когда установлен пустой List.
		const globalIndex = this.getGlobalIndex();
		this._globalCenter = isNaN(globalIndex) ? 0 : globalIndex;
	}

	/**
	 * @protected
	 */
	_updateGlobalEnd() {
		let globalEnd;
		const sourceEnd = this.getSourceEnd();

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
	}

	/**
	 * @protected
	 */
	_reset() {
		this._source = null;

		this._globalCenter = 0;
		this._globalEnd = NaN;
		this._isBlocked = false;
	}

	/**
	 * @protected
	 */
	_resetCache() {
		this._localItems = [];
		this._currentItem = null;
	}

	/**
	 * @param {Options} options
	 * @protected
	 */
	_setOptions(options) {
		this._options = {
			padding: options.padding || 5,
			loadOnLeft: options.loadOnLeft || 1,
			lineSize: options.lineSize || 1
		};
	}

	/**
	 * @param {number} sourceIndex
	 * @return {boolean}
	 * @protected
	 */
	_isChangeNeeded(sourceIndex) {
		const globalIndex = this.getSourceStart() + sourceIndex;

		if (!this.isLocalIndex(globalIndex)) {
			return true;
		}

		const lineSize = this._options.lineSize;
		const loadOnLeftItems = this.getItemsByLines(this._options.loadOnLeft);

		const globalStart = this.getGlobalStart();
		const globalEnd = this.getGlobalEnd();
		const localStart = this.getLocalStart();
		const localEnd = this.getLocalEnd();

		const globalIndexLineStart = getLineStart(globalIndex, lineSize);
		let loadOnLeftStart = globalIndexLineStart - loadOnLeftItems;
		loadOnLeftStart = Math.max(globalStart, loadOnLeftStart);

		const globalIndexLineEnd = getLineEnd(globalIndex, lineSize);
		let loadOnLeftEnd = globalIndexLineEnd + loadOnLeftItems;
		loadOnLeftEnd = Math.min(globalEnd, loadOnLeftEnd);

		const isLocalStartOverflow = (loadOnLeftStart < localStart) && (localStart > globalStart);
		const isLocalEndOverflow = (loadOnLeftEnd > localEnd) && (localEnd < globalEnd);

		// После проверки того, что новый индекс не входит в буфер, нужно измененять буфер.
		// Однако, если элементов в даталисте больше нет, то изменение буфера вызывать не нужно.
		return (isLocalStartOverflow || isLocalEndOverflow);
	}

	/**
	 * @param {*} newItem
	 * @param {number} newSourceIndex
	 * @param {*} oldItem
	 * @param {number} oldSourceIndex
	 * @protected
	 */
	_selectItem(newItem, newSourceIndex, oldItem, oldSourceIndex) {
		if (this._isChangeNeeded(newSourceIndex) || this._isItemsChanged(this._localItems, this.getLocalItems())) {
			this._doChangeItems();
		}

		this._doSelectItem(newItem, newSourceIndex, oldItem, oldSourceIndex);
	}

	/**
	 * @param {*} newItem
	 * @param {number} newSourceIndex
	 * @param {*} oldItem
	 * @param {number} oldSourceIndex
	 * @protected
	 */
	_doSelectItem(newItem, newSourceIndex, oldItem, oldSourceIndex) {
		const sourceStart = this.getSourceStart();
		const localStart = this.getLocalStart();

		const newGlobalIndex = newSourceIndex + sourceStart;
		const oldGlobalIndex = oldSourceIndex + sourceStart;

		const newLocalIndex = newGlobalIndex - localStart;
		let oldLocalIndex = oldGlobalIndex - localStart;

		let changedOldItem = oldItem;

		// Подменяем предыдущий итем и индекс, чтобы не блюрить элемент, который не входит в буфер.
		if (!this.isLocalIndex(oldGlobalIndex)) {
			changedOldItem = null;
			oldLocalIndex = NaN;
		}

		const isItemsEqual = newItem === changedOldItem;
		const isIndexesEqual = newGlobalIndex === oldGlobalIndex || (isNaN(newGlobalIndex) && isNaN(oldGlobalIndex));
		const isEmpty = !this.getLocalSize();

		// Не вызывать селект, если элементы и их глобальные индексы совпадают.
		// Не вызывать селект, если элементов нет.
		if ((isItemsEqual && isIndexesEqual) || isEmpty) {
			return;
		}

		this._fireItemSelected(newItem, newLocalIndex, changedOldItem, oldLocalIndex);
	}

	/**
	 * @param {Array<*>} newDataItems
	 * @param {Array<*>} oldDataItems
	 * @return {boolean}
	 * @protected
	 */
	_isItemsChanged(newDataItems, oldDataItems) {
		const getDiff = (arr1, arr2) => arr1.filter((item) => arr2.indexOf(item) === -1);

		const addedDataItems = getDiff(newDataItems, oldDataItems);
		const removedDataItems = getDiff(oldDataItems, newDataItems);

		return !!(addedDataItems.length || removedDataItems.length);
	}

	/**
	 * @protected
	 */
	_changeItems() {
		this._doChangeItems();

		// Если старый элемент не содержится в новом списке, выбираем новый элемент.
		if (this._localItems.indexOf(this._currentItem) === -1) {
			this._doSelectItem(this.getSourceItem(), this.getSourceIndex(), null, NaN);
		}
	}

	/**
	 * @protected
	 */
	_doChangeItems() {
		this._updateGlobalEnd();
		this._updateGlobalCenter();

		const newLocalItems = this.getLocalItems();
		const oldLocalItems = this._localItems;

		if (this._isItemsChanged(newLocalItems, oldLocalItems)) {
			this._fireItemsChanged(newLocalItems);
		}
	}

	/**
	 * @protected
	 */
	_clearItems() {
		// Вручную устанавливаем ноль, т.к. автоматически устанавливается только большее значение.
		this.setGlobalEnd(NaN);
		this._changeItems();
	}

	/**
	 * @param {Array<*>} items
	 * @protected
	 */
	_fireItemsChanged(items) {
		this._localItems = items;
		this._changeCallback(items);
	}

	/**
	 * @param {*} newItem
	 * @param {number} newLocalIndex
	 * @param {*} oldItem
	 * @param {number} oldLocalIndex
	 * @protected
	 */
	_fireItemSelected(newItem, newLocalIndex, oldItem, oldLocalIndex) {
		this._currentItem = newItem;
		this._selectCallback(newItem, newLocalIndex, oldItem, oldLocalIndex);
	}
}


/**
 * @type {function(Array<*>)}
 * @protected
 */
AbstractBaseListBuffer.prototype._changeCallback;


/**
 * @type {function(*, number, *, number)}
 * @protected
 */
AbstractBaseListBuffer.prototype._selectCallback;


/**
 * @type {Source}
 * @protected
 */
AbstractBaseListBuffer.prototype._source;


/**
 * @type {{
 *     padding: number,
 *     loadOnLeft: number,
 *     lineSize: number
 * }}
 * @private
 */
AbstractBaseListBuffer.prototype._options;


/**
 * @type {number}
 * @private
 */
AbstractBaseListBuffer.prototype._globalCenter;


/**
 * @type {number}
 * @private
 */
AbstractBaseListBuffer.prototype._globalEnd;


/**
 * @type {boolean}
 * @private
 */
AbstractBaseListBuffer.prototype._isBlocked;


/**
 * @type {Array<*>}
 * @private
 */
AbstractBaseListBuffer.prototype._localItems;


/**
 * @type {?*}
 * @private
 */
AbstractBaseListBuffer.prototype._currentItem;


/**
 * @typedef {{
 *     padding: (number|undefined),
 *     loadOnLeft: (number|undefined),
 *     lineSize: (number|undefined)
 * }}
 */
export let Options;


/**
 * @typedef {?IList}
 */
export let Source;
