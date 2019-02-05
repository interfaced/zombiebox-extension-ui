goog.provide('zb.ui.widgets.IBaseListItem');
goog.require('zb.IFocusable');


/**
 * @extends {zb.IFocusable}
 * @interface
 */
zb.ui.widgets.IBaseListItem = class {
	/**
	 * Called by BaseList
	 */
	beforeDOMShow() {}

	/**
	 * Called by BaseList
	 */
	afterDOMShow() {}

	/**
	 * Called by BaseList
	 */
	beforeDOMHide() {}

	/**
	 * Called by BaseList
	 */
	afterDOMHide() {}

	/**
	 * @param {*} data
	 */
	setData(data) {}

	/**
	 * @return {*}
	 */
	getData() {}

	/**
	 * Returns item container
	 * @return {HTMLElement}
	 */
	getContainer() {}
};


/**
 * @typedef {{
 *     data: *
 * }}
 */
zb.ui.widgets.IBaseListItem.Input;
