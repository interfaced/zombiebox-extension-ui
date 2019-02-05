/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.CyclicalDataList');
goog.require('zb.ui.DataList');



/**
 * @template ItemType
 */
zb.ui.CyclicalDataList = class extends zb.ui.DataList {
	/**
	 * @param {Array.<!ItemType>=} opt_items
	 */
	constructor(opt_items) {
		super(opt_items);
	}


	/**
	 * @override
	 */
	itemAt(index) {
		index = index % this.size();
		if (index < 0) {
			index = this.size() + index;
		}
		return super.itemAt(index);
	}


	/**
	 * @override
	 */
	selectNextItem(opt_step) {
		opt_step = isNaN(opt_step) ? 1 : (opt_step < 1 ? 1 : opt_step);
		let index = this.currentIndex() + opt_step;
		if (index > this.size() - 1) {
			index = index - this.size();
		}
		return this.selectAt(index);
	}


	/**
	 * @override
	 */
	selectPrevItem(opt_step) {
		opt_step = isNaN(opt_step) ? 1 : (opt_step < 1 ? 1 : opt_step);
		let index = this.currentIndex() - opt_step;
		if (index < 0) {
			index = this.size() + index;
		}
		return this.selectAt(index);
	}
};
