goog.provide('zb.ui.data.DynamicList');
goog.require('zb.ui.data.IList');
goog.require('zb.ui.data.List');


/**
 * @template ItemType
 * @extends {zb.ui.data.List<ItemType>}
 */
zb.ui.data.DynamicList = class extends zb.ui.data.List {
	/**
	 * @param {function(number, number): IThenable} queryFunction Take from, to numbers and return IThenable.
	 * IThenable will be resolved with array of data. On data end resolved with empty array.
	 * @param {zb.ui.data.DynamicList.Options=} opt_options
	 * @throws {Error}
	 */
	constructor(queryFunction, opt_options) {
		super();

		this._queryFunction = queryFunction;
		this._onSelectionChanged = this._onSelectionChanged.bind(this);
		this._reset();

		this._dlDefaultOptions = this._dlDefaultOptions || {
			startFrom: 0,
			startLoadingOnItemsLeft: 5,
			bufferSize: 20,
			initialBufferSize: 20,
			frameSize: 10
		};

		this._configure(opt_options);
	}

	/**
	 * @override
	 */
	isLoading() {
		return !!this._query;
	}

	/**
	 * @override
	 */
	preload() {
		if (!this._preloadQuery) {
			const from = this._dlOptions.startFrom || 0;
			const to = from + this._dlOptions.initialBufferSize - 1;

			this._preloadQuery = this.loadItems(from, to, false);
		}

		return /** @type {IThenable<zb.ui.data.IList>} */ (this._preloadQuery);
	}

	/**
	 * @override
	 */
	getBufferStart() {
		return this._bufferStart;
	}

	/**
	 * @override
	 */
	clear() {
		super.clear();

		this._reset();
	}

	/**
	 * @return {boolean}
	 */
	isStartReached() {
		return this._isStartReached;
	}

	/**
	 * @return {boolean}
	 */
	isEndReached() {
		return this._isEndReached;
	}

	/**
	 * @param {number} from
	 * @param {number} to
	 * @param {boolean=} opt_prepend
	 * @return {IThenable<!zb.ui.data.DynamicList>}
	 */
	loadItems(from, to, opt_prepend) {
		this._query = this
			._queryFunction(from, to)
			.then((items) => {
				const previousIndex = this.currentIndex();
				this.off(this.EVENT_ITEM_SELECTED, this._onSelectionChanged);

				const currentSize = this.size();
				const newItemsSize = items.length;
				const bufferStart = isNaN(this._bufferStart) ? 0 : this._bufferStart;
				const bufferSize = this._dlOptions.bufferSize;
				const bufferOverflow = currentSize + newItemsSize - bufferSize;
				const isNotEnoughData = newItemsSize === 0 || newItemsSize < to - from + 1;

				this.addItemsAt(items, opt_prepend ? 0 : currentSize);

				if (bufferOverflow > 0) {
					const newBufferStart = bufferStart + (!opt_prepend ? 1 : -1) * bufferOverflow;
					const removeFrom = !opt_prepend ? 0 : bufferSize;
					const removeTo = removeFrom + bufferOverflow;

					const itemsToRemove = this._items.slice(removeFrom, removeTo);
					this.removeItems(itemsToRemove);

					this._bufferStart = newBufferStart;
				} else {
					this._bufferStart = bufferStart;
				}

				if (!opt_prepend) {
					this._isEndReached = isNotEnoughData;

					if (bufferOverflow > 0) {
						this._isStartReached = false;
					}
				} else {
					this._isStartReached = isNotEnoughData || from === 0;

					if (bufferOverflow > 0) {
						this._isEndReached = false;
					}
				}

				this._query = null;

				this._fireEvent(this.EVENT_ITEMS_CHANGED, this._items);

				this.on(this.EVENT_ITEM_SELECTED, this._onSelectionChanged);

				if (this.currentIndex() !== previousIndex) {
					return this._maybeLoadMoreItems();
				}

				return this;
			});

		return this._query;
	}

	/**
	 * @return {IThenable<!zb.ui.data.DynamicList>}
	 */
	loadNextFrame() {
		if (this._query) {
			return this._query;
		}

		if (this._isEndReached) {
			return Promise.resolve(this);
		}

		const from = this._bufferStart + this.size();
		const to = from + this._dlOptions.frameSize - 1;

		const query = this.loadItems(from, to, false);
		this._fireEvent(this.EVENT_LOADING_DATA, query);

		return query;
	}

	/**
	 * @return {IThenable<!zb.ui.data.DynamicList>}
	 */
	loadPrevFrame() {
		if (this._query) {
			return this._query;
		}

		if (this._isStartReached) {
			return Promise.resolve(this);
		}

		const to = this._bufferStart - 1;
		const from = Math.max(0, to - this._dlOptions.frameSize + 1);

		const query = this.loadItems(from, to, true);
		this._fireEvent(this.EVENT_LOADING_DATA, query);

		return query;
	}

	/**
	 * @return {number}
	 */
	getSize() {
		const bufferStart = isNaN(this._bufferStart) ? 0 : this._bufferStart;
		return bufferStart + this._items.length;
	}

	/**
	 * @param {zb.ui.data.DynamicList.Options=} opt_options
	 * @throws {Error}
	 * @protected
	 */
	_configure(opt_options) {
		this._dlOptions = /** @type {zb.ui.data.DynamicList.Options} */ ({});

		for (const p in this._dlDefaultOptions) {
			if (this._dlDefaultOptions.hasOwnProperty(p)) {
				if (opt_options && typeof opt_options[p] !== 'undefined') {
					this._dlOptions[p] = opt_options[p];
				} else {
					this._dlOptions[p] = this._dlDefaultOptions[p];
				}
			}
		}

		this._dlOptions.initialBufferSize = Math.min(this._dlOptions.initialBufferSize, this._dlOptions.bufferSize);
		this._isStartReached = this._dlOptions.startFrom === 0;

		const {startLoadingOnItemsLeft, frameSize, initialBufferSize, bufferSize} = this._dlOptions;

		if (startLoadingOnItemsLeft <= 0) {
			throw Error('startLoadingOnItemsLeft should be greater than zero');
		}
		if (isNaN(startLoadingOnItemsLeft)) {
			throw Error('startLoadingOnItemsLeft should not be NaN');
		}

		if (frameSize <= 0) {
			throw Error('frameSize should be greater than zero');
		}
		if (isNaN(frameSize)) {
			throw Error('frameSize should not be NaN');
		}

		if (initialBufferSize <= 0) {
			throw Error('initialBufferSize should be greater than zero');
		}
		if (isNaN(initialBufferSize)) {
			throw Error('initialBufferSize should not be NaN');
		}

		if (bufferSize <= 0) {
			throw Error('bufferSize should be greater than zero');
		}
		if (isNaN(bufferSize)) {
			throw Error('bufferSize should not be NaN');
		}

		if (frameSize < startLoadingOnItemsLeft) {
			throw Error('frameSize should be equal or greater than startLoadingOnItemsLeft');
		}
		if (initialBufferSize < frameSize) {
			throw Error('initialBufferSize should be equal or greater than frameSize');
		}
		if (bufferSize < frameSize) {
			throw Error('bufferSize should be equal or greater than frameSize');
		}
		if (bufferSize - startLoadingOnItemsLeft * 2 < frameSize) {
			throw Error(
				'This options combination causes recursion: bufferSize - startLoadingOnItemsLeft * 2 < frameSize'
			);
		}
	}

	/**
	 * @protected
	 */
	_reset() {
		this._isEndReached = false;
		this._isStartReached = true;
		this._query = null;
		this._preloadQuery = null;
		this._bufferStart = NaN;
	}

	/**
	 * @param {string} eventName
	 * @param {?ItemType} newItem
	 * @param {number} newIndex
	 * @param {?ItemType} oldItem
	 * @param {number} oldIndex
	 * @protected
	 */
	_onSelectionChanged(eventName, newItem, newIndex, oldItem, oldIndex) {
		if (newIndex !== oldIndex) {
			this._maybeLoadMoreItems();
		}
	}

	/**
	 * @return {IThenable<!zb.ui.data.DynamicList>}
	 * @protected
	 */
	_maybeLoadMoreItems() {
		const index = this.currentIndex();

		if (!this._isEndReached && this.size() - index <= this._dlOptions.startLoadingOnItemsLeft) {
			return this.loadNextFrame();
		}

		if (!this._isStartReached && index < this._dlOptions.startLoadingOnItemsLeft) {
			return this.loadPrevFrame();
		}

		return Promise.resolve(this);
	}
};


/**
 * @type {IThenable<!zb.ui.data.DynamicList>}
 * @protected
 */
zb.ui.data.DynamicList.prototype._query;


/**
 * @type {IThenable<!zb.ui.data.DynamicList>}
 * @protected
 */
zb.ui.data.DynamicList.prototype._preloadQuery;


/**
 * @type {function(number, number): IThenable}
 * @protected
 */
zb.ui.data.DynamicList.prototype._queryFunction;


/**
 * @type {zb.ui.data.DynamicList.Options}
 * @protected
 */
zb.ui.data.DynamicList.prototype._dlDefaultOptions;


/**
 * @type {zb.ui.data.DynamicList.Options}
 * @protected
 */
zb.ui.data.DynamicList.prototype._dlOptions;


/**
 * @type {number}
 * @protected
 */
zb.ui.data.DynamicList.prototype._bufferStart;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.data.DynamicList.prototype._isEndReached;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.data.DynamicList.prototype._isStartReached;


/**
 * Fired with: IThenable
 * @const {string}
 */
zb.ui.data.DynamicList.prototype.EVENT_LOADING_DATA = 'loading-data';


/**
 * @typedef {{
 *     startFrom: (number|undefined),
 *     startLoadingOnItemsLeft: (number|undefined),
 *     bufferSize: (number|undefined),
 *     initialBufferSize: (number|undefined),
 *     frameSize: (number|undefined)
 * }}
 */
zb.ui.data.DynamicList.Options;
