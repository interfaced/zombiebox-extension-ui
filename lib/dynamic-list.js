goog.provide('zb.ui.DynamicList');
goog.require('zb.ui.DataList');
goog.require('zb.ui.IDataList');


/**
 * @template ItemType
 * @extends {zb.ui.DataList<ItemType>}
 */
zb.ui.DynamicList = class extends zb.ui.DataList {
	/**
	 * @param {function(number,number):IThenable} queryFunction Take from,to numbers and return IThenable.
	 *              IThenable will be resolved with array of data. On data end resolved with empty array.
	 * @param {zb.ui.DynamicList.Options=} opt_options
	 */
	constructor(queryFunction, opt_options) {
		super();

		this._queryFunction = queryFunction;
		this._onSelectionChanged = this._onSelectionChanged.bind(this);
		this._reset();

		this._dlDefaultOptions = this._dlDefaultOptions || {
			startFrom: 0,
			startLoadingOnItemsLeft: 10,
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

		return /** @type {IThenable.<zb.ui.IDataList>} */(this._preloadQuery);
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
	 * @return {IThenable.<!zb.ui.DynamicList>}
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
	 * @return {IThenable.<!zb.ui.DynamicList>}
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
	 * @return {IThenable.<!zb.ui.DynamicList>}
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
	 * @param {zb.ui.DynamicList.Options=} opt_options
	 * @protected
	 */
	_configure(opt_options) {
		this._dlOptions = /** @type {zb.ui.DynamicList.Options} */({});

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
	 * @return {IThenable.<!zb.ui.DynamicList>}
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
 * @type {IThenable.<!zb.ui.DynamicList>}
 * @protected
 */
zb.ui.DynamicList.prototype._query;


/**
 * @type {IThenable.<!zb.ui.DynamicList>}
 * @protected
 */
zb.ui.DynamicList.prototype._preloadQuery;


/**
 * @type {function(number,number):IThenable}
 * @protected
 */
zb.ui.DynamicList.prototype._queryFunction;


/**
 * @type {zb.ui.DynamicList.Options}
 * @protected
 */
zb.ui.DynamicList.prototype._dlDefaultOptions;


/**
 * @type {zb.ui.DynamicList.Options}
 * @protected
 */
zb.ui.DynamicList.prototype._dlOptions;


/**
 * @type {number}
 * @protected
 */
zb.ui.DynamicList.prototype._bufferStart;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.DynamicList.prototype._isEndReached;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.DynamicList.prototype._isStartReached;


/**
 * Fired with: IThenable
 * @const {string}
 */
zb.ui.DynamicList.prototype.EVENT_LOADING_DATA = 'loading-data';


/**
 * @typedef {{
 *     startFrom: (number|undefined),
 *     startLoadingOnItemsLeft: (number|undefined),
 *     bufferSize: (number|undefined),
 *     initialBufferSize: (number|undefined),
 *     frameSize: (number|undefined)
 * }}
 */
zb.ui.DynamicList.Options;
