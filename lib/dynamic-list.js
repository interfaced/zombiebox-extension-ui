/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.DynamicList');
goog.require('zb.ui.DataList');



/**
 * @param {function(number,number):IThenable} queryFunction Take from,to numbers and return IThenable.
 *              IThenable will be resolved with array of data. On data end resolved with empty array.
 * @param {zb.ui.DynamicList.Options=} opt_options
 * @extends {zb.ui.DataList}
 * @constructor
 */
zb.ui.DynamicList = function(queryFunction, opt_options) {
	goog.base(this);

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
};
goog.inherits(zb.ui.DynamicList, zb.ui.DataList);


/**
 * @return {boolean}
 */
zb.ui.DynamicList.prototype.isLoading = function() {
	return !!this._query;
};


/**
 * @return {boolean}
 */
zb.ui.DynamicList.prototype.isStartReached = function() {
	return this._isStartReached;
};


/**
 * @return {boolean}
 */
zb.ui.DynamicList.prototype.isEndReached = function() {
	return this._isEndReached;
};


/**
 * @return {number}
 */
zb.ui.DynamicList.prototype.getBufferStart = function() {
	return this._bufferStart;
};


/**
 * @deprecated Candidate to remove as unused.
 * @return {number}
 */
zb.ui.DynamicList.prototype.getFrameSize = function() {
	return /** @type {number} */(this._dlOptions.frameSize);
};


/**
 * @inheritDoc
 */
zb.ui.DynamicList.prototype.preload = function() {
	if (!this._preloadQuery) {
		var from = this._dlOptions.startFrom || 0;
		var to = from + this._dlOptions.initialBufferSize - 1;

		this._preloadQuery = this.loadItems(from, to, false);
	}

	return /** @type {IThenable.<zb.ui.IDataList>} */(this._preloadQuery);
};


/**
 * @deprecated
 * @return {IThenable.<!zb.ui.DynamicList>}
 */
zb.ui.DynamicList.prototype.loadInitialBuffer = function() {
	if (this._preloadQuery) {
		throw new Error('Already initialized');
	}

	var from = this._dlOptions.startFrom || 0;
	var to = from + this._dlOptions.initialBufferSize - 1;

	this._preloadQuery = this.loadItems(from, to, false);

	return this._preloadQuery;
};


/**
 * @param {number} from
 * @param {number} to
 * @param {boolean=} opt_prepend
 * @return {IThenable.<!zb.ui.DynamicList>}
 */
zb.ui.DynamicList.prototype.loadItems = function(from, to, opt_prepend) {
	this._query = this._queryFunction(from, to);

	return this._query
		.then(function(items) {
			this.off(this.EVENT_ITEM_SELECTED, this._onSelectionChanged);

			var overflow = this.size() + items.length - this._dlOptions.bufferSize;
			var itemsToRemove;

			if (opt_prepend) {
				this._bufferStart = from;
			} else {
				this._bufferStart = from - this.size() + Math.max(0, overflow);
			}

			this.addItemsAt(items, opt_prepend ? 0 : this.size());

			if (overflow > 0) {
				var start = 0;

				if (opt_prepend) {
					start = this.size() - overflow;
				} else {
					this._isStartReached = false;
				}

				itemsToRemove = this._items.slice(start, start + overflow);
				this.removeItems(itemsToRemove);
			}

			var isFinal = items.length === 0 || items.length < to - from + 1;

			if (opt_prepend) {
				this._isStartReached = isFinal || from === 0;

				if (itemsToRemove && itemsToRemove.length) {
					this._isEndReached = false;
				}
			} else {
				this._isEndReached = isFinal;

				if (itemsToRemove && itemsToRemove.length) {
					this._isStartReached = false;
				}
			}

			this._query = null;

			this._fireEvent(this.EVENT_ITEMS_CHANGED, this._items);

			this.on(this.EVENT_ITEM_SELECTED, this._onSelectionChanged);
			this._onSelectionChanged();

			return this;
		}.bind(this));
};


/**
 * @return {boolean}
 */
zb.ui.DynamicList.prototype.loadNextFrame = function() {
	if (this._query || this._isEndReached) {
		return false;
	}

	var from = this._bufferStart + this.size();
	var to = from + this._dlOptions.frameSize - 1;
	this.loadItems(from, to, false);
	this._fireEvent(this.EVENT_LOADING_DATA, this._query);

	return true;
};


/**
 * @return {boolean}
 */
zb.ui.DynamicList.prototype.loadPrevFrame = function() {
	if (this._query || this._isStartReached) {
		return false;
	}

	var to = this._bufferStart - 1;
	var from = Math.max(0, to - this._dlOptions.frameSize + 1);
	this.loadItems(from, to, true);
	this._fireEvent(this.EVENT_LOADING_DATA, this._query);

	return true;
};


/**
 * @return {number}
 */
zb.ui.DynamicList.prototype.getSize = function() {
	var bufferStart = isNaN(this._bufferStart) ? 0 : this._bufferStart;
	return bufferStart + this._items.length;
};


/**
 * @inheritDoc
 */
zb.ui.DynamicList.prototype.clear = function() {
	goog.base(this, 'clear');

	this._reset();
};


/**
 * @param {zb.ui.DynamicList.Options=} opt_options
 * @protected
 */
zb.ui.DynamicList.prototype._configure = function(opt_options) {
	this._dlOptions = /** @type {zb.ui.DynamicList.Options} */({});

	for (var p in this._dlDefaultOptions) if (this._dlDefaultOptions.hasOwnProperty(p)) {
		if (opt_options && typeof opt_options[p] !== 'undefined') {
			this._dlOptions[p] = opt_options[p];
		} else {
			this._dlOptions[p] = this._dlDefaultOptions[p];
		}
	}

	this._dlOptions.initialBufferSize = Math.min(this._dlOptions.initialBufferSize, this._dlOptions.bufferSize);
	this._isStartReached = this._dlOptions.startFrom === 0;
};


/**
 * @protected
 */
zb.ui.DynamicList.prototype._reset = function() {
	this._isEndReached = false;
	this._isStartReached = true;
	this._query = null;
	this._preloadQuery = null;
	this._bufferStart = NaN;
};


/**
 * @protected
 */
zb.ui.DynamicList.prototype._onSelectionChanged = function() {
	var index = this.currentIndex();

	if (!this._isEndReached && this.size() - index <= this._dlOptions.startLoadingOnItemsLeft) {
		this.loadNextFrame();
	} else if (!this._isStartReached && index < this._dlOptions.startLoadingOnItemsLeft) {
		this.loadPrevFrame();
	}
};


/**
 * @type {IThenable}
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
