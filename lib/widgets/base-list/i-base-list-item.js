/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
