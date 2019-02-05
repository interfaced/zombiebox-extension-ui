goog.provide('zb.ui.BaseListBuffer');
goog.require('zb.ui.BaseListUtils');
goog.require('zb.ui.IDataList');


zb.ui.BaseListBuffer = class {
	/**
	 * @param {zb.ui.BaseListBuffer.Options} options
	 * @param {function(Array.<*>)} changeCallback
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
	 * @param {zb.ui.BaseListBuffer.Source} source
	 */
	setSource(source) {
		this._reset();
		this._source = source;
	}


	/**
	 * @return {zb.ui.BaseListBuffer.Source}
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


	// eslint-disable-next-line valid-jsdoc
	/**
	 * @return {boolean}
	 */
	isLoading() {
		throw new Error('not implemented');
	}


	// eslint-disable-next-line valid-jsdoc
	/**
	 * @return {boolean}
	 */
	isGlobalStart() {
		throw new Error('not implemented');
	}


	// eslint-disable-next-line valid-jsdoc
	/**
	 * @return {boolean}
	 */
	isGlobalEnd() {
		throw new Error('not implemented');
	}


	// eslint-disable-next-line valid-jsdoc
	/**
	 * Возвращает начало буфера источника данных в глобальных терминах
	 * @return {number}
	 */
	getSourceStart() {
		throw new Error('not implemented');
	}


	/**
	 * Возвращает конец буфера источника данных в глобальных терминах
	 * @return {number}
	 */
	getSourceEnd() {
		// Получаем глобальный размер данных
		const sourceSize = this.getSourceStart() + this.getSourceSize();
		// Переводим размер в конец буфера
		return zb.ui.BaseListUtils.sizeToEnd(sourceSize);
	}


	/**
	 * @param {number} globalIndex
	 * @return {boolean}
	 */
	isSourceIndex(globalIndex) {
		return globalIndex >= this.getSourceStart() && globalIndex <= this.getSourceEnd();
	}


	// eslint-disable-next-line valid-jsdoc
	/**
	 * Возвращает размер буфера источника данных
	 * @return {number}
	 */
	getSourceSize() {
		throw new Error('not implemented');
	}


	// eslint-disable-next-line valid-jsdoc
	/**
	 * Возвращает текущий индекс в терминах источника данных
	 * @return {number}
	 */
	getSourceIndex() {
		throw new Error('not implemented');
	}


	// eslint-disable-next-line valid-jsdoc
	/**
	 * @return {?*}
	 */
	getSourceItem() {
		throw new Error('not implemented');
	}


	// eslint-disable-next-line valid-jsdoc
	/**
	 * @param {*} item
	 * @return {number}
	 */
	getSourceItemIndex(item) {
		throw new Error('not implemented');
	}


	// eslint-disable-next-line valid-jsdoc
	/**
	 * @param {number} from
	 * @param {number} to
	 * @return {Array.<*>}
	 */
	getSourceItems(from, to) {
		throw new Error('not implemented');
	}


	/**
	 * @param {number} globalIndex
	 * @return {boolean}
	 */
	isLocalIndex(globalIndex) {
		return globalIndex >= this.getLocalStart() && globalIndex <= this.getLocalEnd();
	}


	/**
	 * Возвращает начало буфера в глобальных терминах
	 * @return {number}
	 */
	getLocalStart() {
		const lineSize = this._options.lineSize;
		const globalCenterLineStart = zb.ui.BaseListUtils.getLineStart(this._globalCenter, lineSize);
		const paddingItems = this.getItemsByLines(this._options.padding);

		let localStart = globalCenterLineStart - paddingItems;
		const sourceStart = this.getSourceStart();

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
	}


	/**
	 * Возвращает конец буфера в глобальных терминах
	 * @return {number}
	 */
	getLocalEnd() {
		const lineSize = this._options.lineSize;
		const globalCenterLineEnd = zb.ui.BaseListUtils.getLineEnd(this._globalCenter, lineSize);
		const paddingItems = this.getItemsByLines(this._options.padding);

		let localEnd = globalCenterLineEnd + paddingItems;
		const sourceEnd = this.getSourceEnd();

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
	}


	/**
	 * Возвращает размер буфера
	 * @return {number}
	 */
	getLocalSize() {
		// Получаем конец буфера в локальных терминах
		const localEnd = this.getLocalEnd() - this.getLocalStart();
		// Переводим конец буфера в размер
		return zb.ui.BaseListUtils.endToSize(localEnd);
	}


	/**
	 * Возвращает текущий индекс в локальных терминах
	 * @return {number}
	 */
	getLocalIndex() {
		return this.getGlobalIndex() - this.getLocalStart();
	}


	/**
	 * @return {Array.<*>}
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
	 * Возвращает глобальное начало данных в глобальных терминах
	 * @return {number}
	 */
	getGlobalStart() {
		if (this.hasSource() && this.getSourceSize()) {
			return 0;
		} else {
			return NaN;
		}
	}


	/**
	 * @param {number} globalEnd
	 */
	setGlobalEnd(globalEnd) {
		this._globalEnd = globalEnd;
	}


	/**
	 * Возвращает глобальный конец данных в глобальных терминах
	 * @return {number}
	 */
	getGlobalEnd() {
		return this.hasSource() ? this._globalEnd : NaN;
	}


	/**
	 * Возвращет глобальный размер данных
	 * @return {number}
	 */
	getGlobalSize() {
		// Нужно, чтобы в случае, когда globalEnd = 0, globalSize был равен 0, а не 1.
		return zb.ui.BaseListUtils.endToSize(this.getGlobalEnd());
	}


	/**
	 * Возвращает текущий индекс в глобальных терминах
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
		return zb.ui.BaseListUtils.getItemsByLines(line, this._options.lineSize);
	}


	/**
	 * @param {number} items
	 * @return {number}
	 */
	getLinesByItems(items) {
		return zb.ui.BaseListUtils.getLinesByItems(items, this._options.lineSize);
	}


	/**
	 * @param {number} index
	 * @return {number}
	 */
	getLineByIndex(index) {
		return zb.ui.BaseListUtils.getLineByIndex(index, this._options.lineSize);
	}


	/**
	 * @return {boolean}
	 */
	selectNextLine() {
		const currGlobalIndex = this.getGlobalIndex();
		let nextGlobalIndex = zb.ui.BaseListUtils.getNextLine(currGlobalIndex, this._options.lineSize);
		const lastGlobalIndex = this.getGlobalEnd();

		// Воркэраунд для циклических списков
		if (this.isCyclical() && nextGlobalIndex > lastGlobalIndex) {
			const firstGlobalIndex = this.getGlobalStart();
			const firstGlobalLineEnd = zb.ui.BaseListUtils.getLineEnd(firstGlobalIndex, this._options.lineSize);
			const nextGlobalLineEnd = zb.ui.BaseListUtils.getLineEnd(nextGlobalIndex, this._options.lineSize);

			nextGlobalIndex = firstGlobalLineEnd - (nextGlobalLineEnd - nextGlobalIndex);

			// Воркэраунд для последней неполной строки элементов:
			// Если на сервере больше нет данных и новый индекс выходит за пределы,
			// То попробуем выбрать не строку, а элемент со следующим индексом
		} else if (this.isGlobalEnd() && !this.isLocalIndex(nextGlobalIndex)) {
			const possibleNextGlobalIndex = zb.ui.BaseListUtils.getNextIndex(currGlobalIndex);

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
		let prevGlobalIndex = zb.ui.BaseListUtils.getPrevLine(currGlobalIndex, this._options.lineSize);

		if (this.isCyclical() && prevGlobalIndex < 0) {
			const lastGlobalIndex = this.getGlobalEnd();
			const lastGlobalLineEnd = zb.ui.BaseListUtils.getLineEnd(lastGlobalIndex, this._options.lineSize);
			const prevGlobalLineEnd = zb.ui.BaseListUtils.getLineEnd(prevGlobalIndex, this._options.lineSize);

			prevGlobalIndex = lastGlobalLineEnd - (prevGlobalLineEnd - prevGlobalIndex);

			if (prevGlobalIndex > lastGlobalIndex) {
				prevGlobalIndex = zb.ui.BaseListUtils.getPrevLine(prevGlobalIndex, this._options.lineSize);
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
			nextGlobalIndex = zb.ui.BaseListUtils.getNextIndex(currGlobalIndex);
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
			prevGlobalIndex = zb.ui.BaseListUtils.getPrevIndex(currGlobalIndex);
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
		} else {
			this._isBlocked = false;
		}

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


	// eslint-disable-next-line valid-jsdoc
	/**
	 * @param {number} index
	 * @return {boolean}
	 * @protected
	 */
	_setSourceIndex(index) {
		throw new Error('not implemented');
	}


	/**
	 * @protected
	 */
	_updateGlobalCenter() {
		// globalIndex может быть NaN, когда установлен пустой DataList.
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
	 * @param {zb.ui.BaseListBuffer.Options} options
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

		const globalIndexLineStart = zb.ui.BaseListUtils.getLineStart(globalIndex, lineSize);
		let loadOnLeftStart = globalIndexLineStart - loadOnLeftItems;
		loadOnLeftStart = Math.max(globalStart, loadOnLeftStart);

		const globalIndexLineEnd = zb.ui.BaseListUtils.getLineEnd(globalIndex, lineSize);
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
	 * @param {Array.<*>} newDataItems
	 * @param {Array.<*>} oldDataItems
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
	 * @param {Array.<*>} items
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
