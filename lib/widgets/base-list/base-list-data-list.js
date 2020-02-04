/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import CyclicalList from '../../data/cyclical-list';
import DynamicList from '../../data/dynamic-list';
import AbstractBaseListBuffer from './abstract-base-list-buffer';


/**
 */
export default class BaseListDataList extends AbstractBaseListBuffer {
	/**
	 * @override
	 */
	constructor(options, changeCallback, selectCallback) {
		super(options, changeCallback, selectCallback);

		this._onItemSelected = this._onItemSelected.bind(this);
		this._onItemsAddedRemoved = this._onItemsAddedRemoved.bind(this);
		this._onItemsChanged = this._onItemsChanged.bind(this);
		this._onClear = this._onClear.bind(this);
	}

	/**
	 * @override
	 */
	setSource(source) {
		if (this._source === source) {
			return;
		}

		if (this._source) {
			this._unbindEvents();
		}

		super.setSource(source);

		if (this._source) {
			// Устанавливаем autoSelect = false, чтобы не вызывались события EVENT_ITEM_SELECTED
			// при добавлении каждого элемента.
			this._source.setAutoSelect(false);

			this._source
				.preload()
				.then(() => {
					this._bindEvents();
					this._changeItems();
				});
		} else {
			this._clearItems();
			this._resetCache();
		}
	}

	/**
	 * @override
	 */
	isDynamic() {
		return this._source instanceof DynamicList;
	}

	/**
	 * @override
	 */
	isCyclical() {
		return this._source instanceof CyclicalList;
	}

	/**
	 * @override
	 */
	isLoading() {
		return this.hasSource() ? this._source.isLoading() : false;
	}

	/**
	 * @override
	 */
	isGlobalStart() {
		return this.isDynamic() ? /** @type {DynamicList} */(this._source).isStartReached() : true;
	}

	/**
	 * @override
	 */
	isGlobalEnd() {
		return this.isDynamic() ? /** @type {DynamicList} */(this._source).isEndReached() : true;
	}

	/**
	 * @override
	 */
	getSourceStart() {
		if (this.hasSource() && this.getSourceSize()) {
			return this._source.getBufferStart();
		}
		return NaN;
	}

	/**
	 * @override
	 */
	getSourceSize() {
		return this.hasSource() ? this._source.size() : 0;
	}

	/**
	 * @override
	 */
	getSourceIndex() {
		return this.hasSource() ? this._source.currentIndex() : NaN;
	}

	/**
	 * @override
	 */
	getSourceItem() {
		return this.hasSource() ? this._source.current() : null;
	}

	/**
	 * @override
	 */
	getSourceItems(from, to) {
		if (!this.hasSource()) {
			return [];
		}

		// +1, чтобы slice выдавал до to _включительно_.
		return this._source.toArray().slice(from, to + 1);
	}

	/**
	 * @override
	 */
	getSourceItemIndex(item) {
		return this.hasSource() ? this._source.indexOf(item) : NaN;
	}

	/**
	 * @override
	 */
	_setSourceIndex(index) {
		return this.hasSource() ? this._source.selectAt(index) : false;
	}

	/**
	 * @override
	 */
	_changeItems() {
		// Если никакой элемент не выбран, то выбираем нулевой.
		// Нужно, т.к. autoSelect = false.
		if (this._source && isNaN(this.getSourceIndex())) {
			this._source.off(this._source.EVENT_ITEM_SELECTED, this._onItemSelected);
			this.setGlobalIndex(0);
			this._source.on(this._source.EVENT_ITEM_SELECTED, this._onItemSelected);
		}

		super._changeItems();
	}

	/**
	 * @private
	 */
	_unbindEvents() {
		this._source.off(this._source.EVENT_ITEM_SELECTED, this._onItemSelected);

		this._source.off(this._source.EVENT_ITEMS_ADDED, this._onItemsAddedRemoved);
		this._source.off(this._source.EVENT_ITEMS_REMOVED, this._onItemsAddedRemoved);

		this._source.off(this._source.EVENT_ITEMS_CHANGED, this._onItemsChanged);
		this._source.off(this._source.EVENT_CLEAR, this._onClear);
	}

	/**
	 * @private
	 */
	_bindEvents() {
		this._source.on(this._source.EVENT_ITEM_SELECTED, this._onItemSelected);

		this._source.on(this._source.EVENT_ITEMS_ADDED, this._onItemsAddedRemoved);
		this._source.on(this._source.EVENT_ITEMS_REMOVED, this._onItemsAddedRemoved);

		this._source.on(this._source.EVENT_ITEMS_CHANGED, this._onItemsChanged);
		this._source.on(this._source.EVENT_CLEAR, this._onClear);
	}

	/**
	 * @param {string} eventName
	 * @param {*} newItem
	 * @param {number} newSourceIndex
	 * @param {*} oldItem
	 * @param {number} oldSourceIndex
	 * @private
	 */
	_onItemSelected(eventName, newItem, newSourceIndex, oldItem, oldSourceIndex) {
		this._selectItem(newItem, newSourceIndex, oldItem, oldSourceIndex);
	}

	/**
	 * @private
	 */
	_onItemsAddedRemoved() {
		// Если это DynamicList, то данные не добавляются и не удаляются из произвольного места.
		// Соответственно не нужно ничего вызывать.
		if (this.isDynamic()) {
			return;
		}

		this._changeItems();
	}

	/**
	 * @private
	 */
	_onItemsChanged() {
		this._changeItems();
	}

	/**
	 * @private
	 */
	_onClear() {
		this._clearItems();
	}
}
