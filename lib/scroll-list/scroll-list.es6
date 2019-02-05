/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.ScrollList');
goog.require('zb.html');
goog.require('zb.ui.BaseList');
goog.require('zb.ui.ScrollBar');
goog.require('zb.ui.templates.scrollList');



zb.ui.ScrollList = class extends zb.ui.BaseList {
	/**
	 * @override
	 */
	constructor(opt_params) {
		super(opt_params);

		if (this._exported.bar instanceof zb.ui.ScrollBar && typeof this._exported.thumb !== 'undefined') {
			this._exported.bar.setThumb(this._exported.thumb);
		}
	}


	/**
	 * TODO: Return separate rects of scrollbar and items. Needs only for ScrollList.
	 * @override
	 */
	getFocusableRects() {
		return [this.getContainerRect()];
	}


	/**
	 * @override
	 */
	updateView() {
		super.updateView();

		this._updateThumbSize();
	}


	/**
	 * @param {number} globalEnd
	 */
	setGlobalEnd(globalEnd) {
		this._buffer.setGlobalEnd(globalEnd);
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return zb.ui.templates.scrollList(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @override
	 */
	_setVertical(isVertical) {
		super._setVertical(isVertical);

		this._exported.bar.setVertical(isVertical);
	}


	/**
	 * @override
	 */
	_setPosition(sliderPositionPx) {
		super._setPosition(sliderPositionPx);

		this._updateThumbPosition();
	}


	/**
	 * @protected
	 */
	_updateThumbSize() {
		let thumbSizePc = this._wrapperSize * 100 / this._getMaxSliderSize();

		// Для случая, если размер всех элементов в сумме меньше, чем wrapperSize
		thumbSizePc = Math.min(thumbSizePc, 100);

		this._exported.bar.setThumbSize(thumbSizePc);
	}


	/**
	 * @protected
	 */
	_updateThumbPosition() {
		const itemsSkipped = this._buffer.getLocalStart();
		const itemsSkippedSize = this._getSizeOfItems(itemsSkipped);

		const sliderPositionPx = this._position + itemsSkippedSize;
		const maxSliderPositionPx = this._getMaxSliderSize() - this._wrapperSize;

		const thumbPositionPc = sliderPositionPx * 100 / maxSliderPositionPx;
		this._exported.bar.setThumbPosition(thumbPositionPc);
	}
};


/**
 * @type {zb.ui.templates.ScrollListOut}
 * @protected
 */
zb.ui.ScrollList.prototype._exported;