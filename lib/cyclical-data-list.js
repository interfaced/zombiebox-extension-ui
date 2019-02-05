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
 * @param {Array.<!ItemType>=} opt_items
 * @constructor
 * @extends {zb.ui.DataList}
 * @template ItemType
 */
zb.ui.CyclicalDataList = function(opt_items) {
	goog.base(this, opt_items);
};
goog.inherits(zb.ui.CyclicalDataList, zb.ui.DataList);


/**
 * @inheritDoc
 */
zb.ui.CyclicalDataList.prototype.itemAt = function(index) {
	index = index % this.size();
	if (index < 0) {
		index = this.size() + index;
	}
	return goog.base(this, 'itemAt', index);
};


/**
 * @inheritDoc
 */
zb.ui.CyclicalDataList.prototype.selectNextItem = function(opt_step) {
	opt_step = isNaN(opt_step) ? 1 : (opt_step < 1 ? 1 : opt_step);
	var index = this.currentIndex() + opt_step;
	if (index > this.size() - 1) {
		index = index - this.size();
	}
	return this.selectAt(index);
};


/**
 * @inheritDoc
 */
zb.ui.CyclicalDataList.prototype.selectPrevItem = function(opt_step) {
	opt_step = isNaN(opt_step) ? 1 : (opt_step < 1 ? 1 : opt_step);
	var index = this.currentIndex() - opt_step;
	if (index < 0) {
		index = this.size() + index;
	}
	return this.selectAt(index);
};
