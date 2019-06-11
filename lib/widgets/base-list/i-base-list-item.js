import IFocusable from 'zb/interfaces/i-focusable';


/**
 * @extends {IFocusable}
 * @interface
 */
export default class IBaseListItem {
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
}


/**
 * @typedef {{
 *     data: *
 * }}
 */
export let Input;
