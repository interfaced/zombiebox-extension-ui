import * as template from 'generated/cutejs/ui/widgets/help-bar/help-bar.jst';
import AbstractCuteWidget from 'cutejs/widgets/abstract-widget';
import {remove} from 'zb/html';
import InputKeys from 'zb/device/input/keys';
import HelpBarItem, {Options as HelpBarItemOptions} from './help-bar-item';
import IHelpBarItem from './i-help-bar-item';


/**
 */
export default class HelpBar extends AbstractCuteWidget {
	/**
	 * @param {Input=} opt_params
	 */
	constructor(opt_params) {
		super();

		let itemClass = HelpBarItem;
		if (opt_params && opt_params.itemClass) {
			itemClass = opt_params.itemClass;
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
		} else {
			return false;
		}
	}

	/**
	 * @param {InputKeys} zbKey
	 * @return {boolean}
	 */
	hasKey(zbKey) {
		return this._items.some((item) => item.hasKey(zbKey));
	}

	/**
	 * @param {InputKeys} zbKey
	 * @param {KeyboardEvent|WheelEvent=} opt_event
	 * @return {boolean}
	 */
	processHelpBarKey(zbKey, opt_event) {
		let isHandled = false;

		if (this.getEnabled() && this.getVisible()) {
			isHandled = this._items.some((item) => item.processHelpBarKey(zbKey, opt_event));
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
	 * @param {?Array<InputKeys>} order
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
	 * @param {InputKeys} zbKey
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
	 * @param {Array<InputKeys>} order
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
 * @type {?Array<InputKeys>}
 * @protected
 */
HelpBar.prototype._itemsOrder;


/**
 * @typedef {{
 *     itemClass: (Function|undefined)
 * }}
 */
export let Input;
