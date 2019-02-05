goog.provide('zb.ui.DataList');
goog.require('zb.events.EventPublisher');
goog.require('zb.ui.IDataList');


/**
 * @template ItemType
 * @implements {zb.ui.IDataList}
 */
zb.ui.DataList = class extends zb.events.EventPublisher {
	/**
	 * @param {Array.<!ItemType>=} opt_items
	 */
	constructor(opt_items) {
		super();

		this._items = [];
		this._currentIndex = NaN;
		this._autoSelect = true;
		if (opt_items) {
			this.setItems(opt_items);
		}
	}


	/**
	 * @override
	 */
	isLoading() {
		return false;
	}


	/**
	 * @override
	 */
	preload() {
		return /** @type {IThenable.<zb.ui.IDataList>} */(Promise.resolve(this));
	}


	/**
	 * @override
	 */
	getBufferStart() {
		return 0;
	}


	/**
	 * @override
	 */
	clear() {
		this.selectAt(NaN);
		this._items.splice(0, this._items.length);
		this._fireEvent(this.EVENT_CLEAR);
	}


	/**
	 * @param {boolean} value
	 */
	setAutoSelect(value) {
		this._autoSelect = value;
	}


	/**
	 * @return {number}
	 */
	size() {
		return this._items.length;
	}


	/**
	 * @param {Array.<!ItemType>} items
	 */
	addItems(items) {
		this.addItemsAt(items, this.size());
	}


	/**
	 * @param {Array.<!ItemType>} items
	 * @param {number} index
	 */
	addItemsAt(items, index) {
		for (let i = 0; i < items.length; i++) {
			this._addAt(items[i], index + i);
		}
		this._fireEvent(this.EVENT_ITEMS_ADDED, items, index);
	}


	/**
	 * @override
	 */
	removeItems(items) {
		let isSomeoneRemoved = false;
		const reallyRemovedItems = [];

		for (let i = 0; i < items.length; i++) {
			if (this._removeAt(this.indexOf(items[i]))) {
				isSomeoneRemoved = true;
				reallyRemovedItems.push(items[i]);
			}
		}

		this._fireEvent(this.EVENT_ITEMS_REMOVED, reallyRemovedItems);

		return isSomeoneRemoved;
	}


	/**
	 * @param {Array.<!ItemType>} items
	 */
	setItems(items) {
		this.clear();
		this.addItems(items);
		this._fireEvent(this.EVENT_ITEMS_CHANGED, items);
	}


	/**
	 * @param {!ItemType} item
	 */
	add(item) {
		this.addAt(item, this.size());
	}


	/**
	 * @param {!ItemType} item
	 * @param {number} index
	 */
	addAt(item, index) {
		this.addItemsAt([item], index);
	}


	/**
	 * @param {!ItemType} item
	 * @return {boolean}
	 */
	remove(item) {
		return this.removeAt(this.indexOf(item));
	}


	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	removeAt(index) {
		return this.removeItems([this._items[index]]);
	}


	/**
	 * @param {!ItemType} item
	 * @return {boolean}
	 */
	select(item) {
		return this.selectAt(this.indexOf(item));
	}


	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	selectAt(index) {
		if (this.isValidIndex(index) || isNaN(index)) {
			if (index !== this._currentIndex) {
				const prevItem = this.current();
				const prevIndex = this.currentIndex();
				this._currentIndex = index;
				this._fireEvent(this.EVENT_ITEM_SELECTED, this.current(), this.currentIndex(), prevItem, prevIndex);
			}
			return true;
		}
		return false;
	}


	/**
	 * @param {!ItemType} item
	 * @return {number} -1 if not found
	 */
	indexOf(item) {
		return this._items.indexOf(item);
	}


	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	isValidIndex(index) {
		return index >= 0 && index < this._items.length;
	}


	/**
	 * @return {?ItemType}
	 */
	current() {
		return this.itemAt(this.currentIndex());
	}


	/**
	 * @return {number}
	 */
	currentIndex() {
		return this._currentIndex;
	}


	/**
	 * @param {number} index
	 * @return {?ItemType}
	 */
	itemAt(index) {
		if (!this.isValidIndex(index)) {
			return null;
		}
		return this._items[index];
	}


	/**
	 * @param {number=} opt_step Default 1.
	 * @return {boolean}
	 */
	selectNextItem(opt_step) {
		const step = isNaN(opt_step) ? 1 : (opt_step < 1 ? 1 : opt_step);
		return this.selectAt(this.currentIndex() + step);
	}


	/**
	 * @param {number=} opt_step Default 1.
	 * @return {boolean}
	 */
	selectPrevItem(opt_step) {
		const step = isNaN(opt_step) ? 1 : (opt_step < 1 ? 1 : opt_step);
		return this.selectAt(this.currentIndex() - step);
	}


	/**
	 * Select first item.
	 * @return {boolean}
	 */
	selectFirst() {
		return this.selectAt(0);
	}


	/**
	 * Select last item.
	 * @return {boolean}
	 */
	selectLast() {
		return this.selectAt(this.size() - 1);
	}


	/**
	 * @return {Array.<ItemType>}
	 */
	toArray() {
		return this._items;
	}


	/**
	 * @param {!ItemType} item
	 * @param {number} index
	 * @protected
	 */
	_addAt(item, index) {
		const currentIndex = this.currentIndex();
		let changedIndex = null;
		let fireSelectAt = false;

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
	}


	/**
	 * @param {number} index
	 * @return {boolean}
	 * @protected
	 */
	_removeAt(index) {
		if (!this.isValidIndex(index)) {
			return false;
		}

		const currentIndex = this.currentIndex();
		const removedItem = this._items.splice(index, 1)[0];

		let changedIndex = null;
		let fireSelectAt = false;

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
	}
};


/**
 * @type {Array.<ItemType>}
 * @protected
 */
zb.ui.DataList.prototype._items;


/**
 * @type {number}
 * @protected
 */
zb.ui.DataList.prototype._currentIndex;


/**
 * @type {boolean}
 * @protected
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
