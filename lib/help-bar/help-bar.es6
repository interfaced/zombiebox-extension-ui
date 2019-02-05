/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.HelpBar');
goog.require('zb.html');
goog.require('zb.ui.HelpBarItem');
goog.require('zb.ui.IHelpBarItem');
goog.require('zb.ui.templates.helpBar');
goog.require('zb.widgets.CuteWidget');



zb.ui.HelpBar = class extends zb.widgets.CuteWidget {
	/**
	 * @param {zb.ui.HelpBar.Input=} opt_params
	 */
	constructor(opt_params) {
		super();

		let itemClass = zb.ui.HelpBarItem;
		if (opt_params && opt_params.itemClass) {
			itemClass = opt_params.itemClass;
		}
		this._itemClass = itemClass;

		this._items = [];
		this._itemsOrder = null;
	}


	/**
	 * @param {zb.device.input.Keys} zbKey
	 * @param {KeyboardEvent|WheelEvent=} opt_event
	 * @return {boolean}
	 */
	processHelpBarKey(zbKey, opt_event) {
		let isHandled = false;

		if (this.getEnabled() && this.getVisible()) {
			isHandled = this._items.some(item => item.processHelpBarKey(zbKey, opt_event));
		}

		return isHandled;
	}


	/**
	 * @param {zb.ui.HelpBarItem.Options} options
	 * @return {zb.ui.IHelpBarItem}
	 */
	createItem(options) {
		return new this._itemClass(options);
	}


	/**
	 * @param {Array.<?zb.ui.IHelpBarItem>} items
	 */
	setItems(items) {
		this.clear();

		// exclude null items
		items = items
			.filter(item => item !== null);

		// sort items by zbKeys
		if (this._itemsOrder) {
			this._sortItems(this._itemsOrder, items);
		}

		// render items
		items.forEach(this._addItem, this);
	}


	/**
	 * @param {?Array.<zb.device.input.Keys>} order
	 */
	setOrder(order) {
		this._itemsOrder = order;
	}


	/**
	 *
	 */
	clear() {
		while (this._items.length) {
			this._removeItem(0);
		}
	}


	/**
	 * @param {zb.device.input.Keys} zbKey
	 * @return {zb.ui.IHelpBarItem}
	 */
	getItem(zbKey) {
		for (let i = this._items.length; i--;) {
			if (this._items[i].isMyKey(zbKey)) {
				return this._items[i];
			}
		}

		return null;
	}


	/**
	 * @override
	 */
	isFocusable() {
		const hasItems = this._items.length > 0;
		if (hasItems) {
			return super.isFocusable();
		} else {
			return false;
		}
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return zb.ui.templates.helpBar(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @param {zb.ui.IHelpBarItem} item
	 * @protected
	 */
	_addItem(item) {
		this.appendWidget(item);
		this._exported.items.appendChild(item.getContainer());
		this._items.push(item);
	}


	/**
	 * @param {number} index
	 * @protected
	 */
	_removeItem(index) {
		const item = this._items[index];
		this.removeWidget(item);
		zb.html.remove(item.getContainer());
		this._items.splice(index, 1);
	}


	/**
	 * Sort items by zbKey in order [...anyCustomKeysInAddOrder, ...commonKeysByDefinedOrder]
	 * @param {Array.<zb.device.input.Keys>} order
	 * @param {Array.<zb.ui.IHelpBarItem>} items
	 */
	_sortItems(order, items) {
		/**
		 * @param {?zb.ui.IHelpBarItem} item
		 * @return {number}
		 */
		const getItemWeight = item => {
			const keys = item.getKeys();
			return Math.max.apply(null, keys.map(zbKey => order.indexOf(zbKey)));
		};

		items.sort((itemA, itemB) => getItemWeight(itemA) - getItemWeight(itemB));
	}
};


/**
 * @type {zb.ui.templates.HelpBarOut}
 * @protected
 */
zb.ui.HelpBar.prototype._exported;


/**
 * @type {Function}
 * @protected
 */
zb.ui.HelpBar.prototype._itemClass;


/**
 * @type {Array.<zb.ui.IHelpBarItem>}
 * @protected
 */
zb.ui.HelpBar.prototype._items;


/**
 * @type {?Array.<zb.device.input.Keys>}
 * @protected
 */
zb.ui.HelpBar.prototype._itemsOrder;


/**
 * @typedef {{
 *     itemClass: (Function|undefined)
 * }}
 */
zb.ui.HelpBar.Input;
