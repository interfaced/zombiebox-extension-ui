goog.provide('zb.ui.widgets.HelpBar');
goog.require('zb.device.input.Keys');
goog.require('zb.html');
goog.require('zb.ui.widgets.HelpBarItem');
goog.require('zb.ui.widgets.IHelpBarItem');
goog.require('zb.ui.widgets.templates.helpBar.HelpBarOut');
goog.require('zb.ui.widgets.templates.helpBar.helpBar');
goog.require('zb.widgets.CuteWidget');


/**
 */
zb.ui.widgets.HelpBar = class extends zb.widgets.CuteWidget {
	/**
	 * @param {zb.ui.widgets.HelpBar.Input=} opt_params
	 */
	constructor(opt_params) {
		super();

		let itemClass = zb.ui.widgets.HelpBarItem;
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
	 * @param {zb.device.input.Keys} zbKey
	 * @return {boolean}
	 */
	hasKey(zbKey) {
		return this._items.some((item) => item.hasKey(zbKey));
	}

	/**
	 * @param {zb.device.input.Keys} zbKey
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
	 * @param {zb.ui.widgets.HelpBarItem.Options} options
	 * @return {zb.ui.widgets.IHelpBarItem}
	 */
	createItem(options) {
		return new this._itemClass(options);
	}

	/**
	 * @param {Array<?zb.ui.widgets.IHelpBarItem>} items
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
	 * @param {?Array<zb.device.input.Keys>} order
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
	 * @return {zb.ui.widgets.IHelpBarItem}
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
		return zb.ui.widgets.templates.helpBar.helpBar(this._getTemplateData(), this._getTemplateOptions());
	}

	/**
	 * @param {zb.ui.widgets.IHelpBarItem} item
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
	 * @param {Array<zb.device.input.Keys>} order
	 * @param {Array<zb.ui.widgets.IHelpBarItem>} items
	 * @protected
	 */
	_sortItems(order, items) {
		/**
		 * @param {?zb.ui.widgets.IHelpBarItem} item
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
};


/**
 * @type {zb.ui.widgets.templates.helpBar.HelpBarOut}
 * @protected
 */
zb.ui.widgets.HelpBar.prototype._exported;


/**
 * @type {Function}
 * @protected
 */
zb.ui.widgets.HelpBar.prototype._itemClass;


/**
 * @type {Array<zb.ui.widgets.IHelpBarItem>}
 * @protected
 */
zb.ui.widgets.HelpBar.prototype._items;


/**
 * @type {?Array<zb.device.input.Keys>}
 * @protected
 */
zb.ui.widgets.HelpBar.prototype._itemsOrder;


/**
 * @typedef {{
 *     itemClass: (Function|undefined)
 * }}
 */
zb.ui.widgets.HelpBar.Input;
