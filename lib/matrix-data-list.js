/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.MatrixDataList');
goog.require('zb.ui.DataList');



/**
 * @constructor
 * @extends {zb.ui.DataList}
 */
zb.ui.MatrixDataList = function() {
	goog.base(this);

	this._width = 1;
	this.setupNavigationStrategy({
		switchLineOnFirstLastColumn: false,
		switchNextLineWithoutColumn: false
	});
};
goog.inherits(zb.ui.MatrixDataList, zb.ui.DataList);


/**
 * @param {number} width
 */
zb.ui.MatrixDataList.prototype.setWidth = function(width) {
	this._width = width;
};


/**
 * @return {number}
 */
zb.ui.MatrixDataList.prototype.getWidth = function() {
	return this._width;
};


/**
 * @return {number}
 */
zb.ui.MatrixDataList.prototype.getHeight = function() {
	return Math.ceil(this.size() / this._width);
};


/**
 * @return {number}
 */
zb.ui.MatrixDataList.prototype.getCol = function() {
	return this._indexToCol(this.currentIndex());
};


/**
 * @return {number}
 */
zb.ui.MatrixDataList.prototype.getRow = function() {
	return this._indexToRow(this.currentIndex());
};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.MatrixDataList.prototype.setCol = function(index) {
	var currentCol = this.getCol();
	var diff = index - currentCol;
	if (diff == 0) {
		return true;
	}
	if (diff > 0) {
		return this.selectNextItem(diff);
	} else {
		return this.selectPrevItem(-diff);
	}
};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.MatrixDataList.prototype.setRow = function(index) {
	if (index < 0 || index >= this.getHeight()) {
		return false;
	}
	var currentCol = this.getCol();
	var result = this.selectAt(this._width * index + currentCol);
	if (!result) {
		result = this.selectAt(this._width * index);
	}
	return result;
};


/**
 * @return {boolean}
 */
zb.ui.MatrixDataList.prototype.selectNextRow = function() {
	var step = 1;
	var currentIndex = this.currentIndex();
	var currentRow = this._indexToRow(currentIndex);
	var nextItemRow = this._indexToRow(currentIndex + step * this._width);
	if (currentRow != nextItemRow) {
		if (this.selectAt(currentIndex + step * this._width)) {
			return true;
		} else {
			if (this._strategy.switchNextLineWithoutColumn && nextItemRow == this.getHeight() - 1) {
				// go to last row if we try to move down to non exists column
				return this.selectAt(this.size() - 1);
			} else {
				return false;
			}
		}
	}
	return false;
};


/**
 * @return {boolean}
 */
zb.ui.MatrixDataList.prototype.selectPrevRow = function() {
	var step = 1;
	var currentIndex = this.currentIndex();
	var currentRow = this._indexToRow(currentIndex);
	var nextItemRow = this._indexToRow(currentIndex - step * this._width);
	if (currentRow != nextItemRow) {
		return this.selectAt(currentIndex - step * this._width);
	}
	return false;
};


/**
 * @return {boolean}
 */
zb.ui.MatrixDataList.prototype.selectNextCol = function() {
	var step = 1;
	var currentIndex = this.currentIndex();
	var currentRow = this._indexToRow(currentIndex);
	var nextItemRow = this._indexToRow(currentIndex + step);
	if (currentRow == nextItemRow || this._strategy.switchLineOnFirstLastColumn) {
		return this.selectAt(currentIndex + step);
	}
	return false;
};


/**
 * @return {boolean}
 */
zb.ui.MatrixDataList.prototype.selectPrevCol = function() {
	var step = 1;
	var currentIndex = this.currentIndex();
	var currentRow = this._indexToRow(currentIndex);
	var nextItemRow = this._indexToRow(currentIndex - step);
	if (currentRow == nextItemRow || this._strategy.switchLineOnFirstLastColumn) {
		return this.selectAt(currentIndex - step);
	}
	return false;
};


/**
 * @param {zb.ui.MatrixDataList.NavigationStrategy} strategy
 */
zb.ui.MatrixDataList.prototype.setupNavigationStrategy = function(strategy) {
	this._strategy = strategy;
};


/**
 * @param {number} index
 * @return {number}
 * @private
 */
zb.ui.MatrixDataList.prototype._indexToRow = function(index) {
	return Math.floor(index / this._width);
};


/**
 * @param {number} index
 * @return {number}
 * @private
 */
zb.ui.MatrixDataList.prototype._indexToCol = function(index) {
	return index % this._width;
};


/**
 * @type {number}
 * @protected
 */
zb.ui.MatrixDataList.prototype._width;


/**
 * @type {zb.ui.MatrixDataList.NavigationStrategy}
 * @protected
 */
zb.ui.MatrixDataList.prototype._strategy;


/**
 * @typedef {{
 *      switchLineOnFirstLastColumn: boolean,
 *      switchNextLineWithoutColumn: boolean
 * }}
 */
zb.ui.MatrixDataList.NavigationStrategy;
