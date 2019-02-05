goog.provide('zb.ui.data.IList');
goog.require('zb.events.IEventPublisher');


/**
 * @interface
 * @template ItemType
 * @extends {zb.events.IEventPublisher}
 */
zb.ui.data.IList = class {
	/**
	 * @return {boolean}
	 */
	isLoading() {}

	/**
	 * @return {IThenable<zb.ui.data.IList>}
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
	 * @param {Array<!ItemType>} items
	 */
	addItems(items) {}

	/**
	 * @param {Array<!ItemType>} items
	 * @param {number} index
	 */
	addItemsAt(items, index) {}

	/**
	 * @param {Array<!ItemType>} items
	 * @return {boolean}
	 */
	removeItems(items) {}

	/**
	 * @param {Array<!ItemType>} items
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
	 * @return {Array<ItemType>}
	 */
	toArray() {}
};


/**
 * @type {Array<ItemType>}
 * @protected
 */
zb.ui.data.IList.prototype._items;


/**
 * @type {number}
 * @protected
 */
zb.ui.data.IList.prototype._currentIndex;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.data.IList.prototype._autoSelect;


/**
 * @const {string} Fired with args: item, index, prevItem, prevIndex
 */
zb.ui.data.IList.prototype.EVENT_ITEM_SELECTED;


/**
 * @const {string} Fired without args.
 */
zb.ui.data.IList.prototype.EVENT_CLEAR;


/**
 * @const {string} Fired with args: item
 */
zb.ui.data.IList.prototype.EVENT_FIRST_ITEM_ADDED;


/**
 * @const {string} Fired with args: item, index
 */
zb.ui.data.IList.prototype.EVENT_ITEM_ADDED;


/**
 * @const {string} Fired with args: Array<!ItemType>
 */
zb.ui.data.IList.prototype.EVENT_ITEMS_ADDED;


/**
 * @const {string} Fired with args: item, index
 */
zb.ui.data.IList.prototype.EVENT_ITEM_REMOVED;


/**
 * @const {string} Fired with args: Array<!ItemType>
 */
zb.ui.data.IList.prototype.EVENT_ITEMS_REMOVED;


/**
 * @const {string} Fired with args: Array<!ItemType>
 */
zb.ui.data.IList.prototype.EVENT_ITEMS_CHANGED;
