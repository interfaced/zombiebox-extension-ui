/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as template from 'generated/cutejs/ui/widgets/help-bar/help-bar.jst';
import AbstractCuteWidget from 'cutejs/widgets/abstract-widget';
import {remove} from 'zb/html';
import InputKey from 'zb/device/input/key';
import HelpBarItem, {Options as HelpBarItemOptions} from './help-bar-item';
import IHelpBarItem from './i-help-bar-item';


/**
 */
export default class HelpBar extends AbstractCuteWidget {
	/**
	 * @param {Input=} params
	 */
	constructor(params) {
		super();

		let itemClass = HelpBarItem;
		if (params && params.itemClass) {
			itemClass = params.itemClass;
		}
		this._itemClass = itemClass;

		this._items = [];
		this._itemsOrder = null;
	}

	/**
	 * @override
	 */
	isFocusable() {
		const hasItems = this._items.length > 0;
		if (hasItems) {
			return super.isFocusable();
		}
		return false;
	}

	/**
	 * @param {InputKey} zbKey
	 * @return {boolean}
	 */
	hasKey(zbKey) {
		return this._items.some((item) => item.hasKey(zbKey));
	}

	/**
	 * @param {InputKey} zbKey
	 * @param {KeyboardEvent|WheelEvent=} event
	 * @return {boolean}
	 */
	processHelpBarKey(zbKey, event) {
		let isHandled = false;

		if (this.getEnabled() && this.getVisible()) {
			isHandled = this._items.some((item) => item.processHelpBarKey(zbKey, event));
		}

		return isHandled;
	}

	/**
	 * @param {HelpBarItemOptions} options
	 * @return {IHelpBarItem}
	 */
	createItem(options) {
		return new this._itemClass(options);
	}

	/**
	 * @param {Array<?IHelpBarItem>} items
	 */
	setItems(items) {
		this.clear();

		// Exclude null items
		const filteredItems = items.filter((item) => item !== null);

		// Sort items by zbKeys
		if (this._itemsOrder) {
			this._sortItems(this._itemsOrder, filteredItems);
		}

		// Render items
		filteredItems.forEach(this._addItem, this);
	}

	/**
	 * @param {?Array<InputKey>} order
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
	 * @param {InputKey} zbKey
	 * @return {IHelpBarItem}
	 */
	getItem(zbKey) {
		for (let i = this._items.length; i--;) {
			if (this._items[i].hasKey(zbKey)) {
				return this._items[i];
			}
		}

		return null;
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return template.render(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @param {IHelpBarItem} item
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
		remove(item.getContainer());
		this._items.splice(index, 1);
	}

	/**
	 * Sort items by zbKey in order [...anyCustomKeysInAddOrder, ...commonKeysByDefinedOrder]
	 * @param {Array<InputKey>} order
	 * @param {Array<IHelpBarItem>} items
	 * @protected
	 */
	_sortItems(order, items) {
		/**
		 * @param {?IHelpBarItem} item
		 * @return {number}
		 */
		const getItemWeight = (item) => {
			const keys = item
				.getKeys()
				.map((zbKey) => order.indexOf(zbKey));

			return Math.max(...keys);
		};

		items.sort((itemA, itemB) => getItemWeight(itemA) - getItemWeight(itemB));
	}
}


/**
 * @type {template.Out}
 * @protected
 */
HelpBar.prototype._exported;


/**
 * @type {Function}
 * @protected
 */
HelpBar.prototype._itemClass;


/**
 * @type {Array<IHelpBarItem>}
 * @protected
 */
HelpBar.prototype._items;


/**
 * @type {?Array<InputKey>}
 * @protected
 */
HelpBar.prototype._itemsOrder;


/**
 * @typedef {{
 *     itemClass: (Function|undefined)
 * }}
 */
export let Input;
