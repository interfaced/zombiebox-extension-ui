/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.IBaseListItem');
goog.require('zb.IFocusable');



/**
 * @extends {zb.IFocusable}
 * @interface
 */
zb.ui.IBaseListItem = class {
	/**
	 * @param {zb.ui.IBaseListItem.Input} params
	 */
	constructor(params) {}


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
zb.ui.IBaseListItem.Input;
