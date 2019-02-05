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



zb.ui.MatrixDataList = class extends zb.ui.DataList {
	constructor() {
		super();

		this._width = 1;
		this.setupNavigationStrategy({
			switchLineOnFirstLastColumn: false,
			switchNextLineWithoutColumn: false
		});
	}


	/**
	 * @param {number} width
	 */
	setWidth(width) {
		this._width = width;
	}


	/**
	 * @return {number}
	 */
	getWidth() {
		return this._width;
	}


	/**
	 * @return {number}
	 */
	getHeight() {
		return Math.ceil(this.size() / this._width);
	}


	/**
	 * @return {number}
	 */
	getCol() {
		return this._indexToCol(this.currentIndex());
	}


	/**
	 * @return {number}
	 */
	getRow() {
		return this._indexToRow(this.currentIndex());
	}


	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	setCol(index) {
		const currentCol = this.getCol();
		const diff = index - currentCol;
		if (diff == 0) {
			return true;
		}
		if (diff > 0) {
			return this.selectNextItem(diff);
		} else {
			return this.selectPrevItem(-diff);
		}
	}


	/**
	 * @param {number} index
	 * @return {boolean}
	 */
	setRow(index) {
		if (index < 0 || index >= this.getHeight()) {
			return false;
		}
		const currentCol = this.getCol();
		let result = this.selectAt(this._width * index + currentCol);
		if (!result) {
			result = this.selectAt(this._width * index);
		}
		return result;
	}


	/**
	 * @return {boolean}
	 */
	selectNextRow() {
		const step = 1;
		const currentIndex = this.currentIndex();
		const currentRow = this._indexToRow(currentIndex);
		const nextItemRow = this._indexToRow(currentIndex + step * this._width);
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
	}


	/**
	 * @return {boolean}
	 */
	selectPrevRow() {
		const step = 1;
		const currentIndex = this.currentIndex();
		const currentRow = this._indexToRow(currentIndex);
		const nextItemRow = this._indexToRow(currentIndex - step * this._width);
		if (currentRow != nextItemRow) {
			return this.selectAt(currentIndex - step * this._width);
		}
		return false;
	}


	/**
	 * @return {boolean}
	 */
	selectNextCol() {
		const step = 1;
		const currentIndex = this.currentIndex();
		const currentRow = this._indexToRow(currentIndex);
		const nextItemRow = this._indexToRow(currentIndex + step);
		if (currentRow == nextItemRow || this._strategy.switchLineOnFirstLastColumn) {
			return this.selectAt(currentIndex + step);
		}
		return false;
	}


	/**
	 * @return {boolean}
	 */
	selectPrevCol() {
		const step = 1;
		const currentIndex = this.currentIndex();
		const currentRow = this._indexToRow(currentIndex);
		const nextItemRow = this._indexToRow(currentIndex - step);
		if (currentRow == nextItemRow || this._strategy.switchLineOnFirstLastColumn) {
			return this.selectAt(currentIndex - step);
		}
		return false;
	}


	/**
	 * @param {zb.ui.MatrixDataList.NavigationStrategy} strategy
	 */
	setupNavigationStrategy(strategy) {
		this._strategy = strategy;
	}


	/**
	 * @param {number} index
	 * @return {number}
	 * @private
	 */
	_indexToRow(index) {
		return Math.floor(index / this._width);
	}


	/**
	 * @param {number} index
	 * @return {number}
	 * @private
	 */
	_indexToCol(index) {
		return index % this._width;
	}
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
 *     switchLineOnFirstLastColumn: boolean,
 *     switchNextLineWithoutColumn: boolean
 * }}
 */
zb.ui.MatrixDataList.NavigationStrategy;
