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



/**
 * @param {zb.ui.BaseList.Input=} opt_params
 * @param {zb.ui.BaseListBuffer.Options=} opt_options
 * @extends {zb.ui.BaseList}
 * @constructor
 */
zb.ui.ScrollList = function(opt_params, opt_options) {
	goog.base(this, opt_params, opt_options);

	if (this._exported.bar instanceof zb.ui.ScrollBar && typeof this._exported.thumb !== 'undefined') {
		this._exported.bar.setThumb(this._exported.thumb);
	}
};
goog.inherits(zb.ui.ScrollList, zb.ui.BaseList);


/**
 * TODO: Return separate rects of scrollbar and items. Needs only for ScrollList.
 * @inheritDoc
 */
zb.ui.ScrollList.prototype.getFocusableRects = function() {
	return [this.getContainerRect()];
};


/**
 * @inheritDoc
 */
zb.ui.ScrollList.prototype.updateView = function() {
	goog.base(this, 'updateView');

	this._updateThumbSize();
};


/**
 * @param {number} globalEnd
 */
zb.ui.ScrollList.prototype.setGlobalEnd = function(globalEnd) {
	this._buffer.setGlobalEnd(globalEnd);
};


/**
 * @inheritDoc
 */
zb.ui.ScrollList.prototype._renderTemplate = function() {
	return zb.ui.templates.scrollList(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @inheritDoc
 */
zb.ui.ScrollList.prototype._setVertical = function(isVertical) {
	goog.base(this, '_setVertical', isVertical);

	this._exported.bar.setVertical(isVertical);
};


/**
 * @inheritDoc
 */
zb.ui.ScrollList.prototype._setPosition = function(sliderPositionPx) {
	goog.base(this, '_setPosition', sliderPositionPx);

	this._updateThumbPosition();
};


/**
 * @protected
 */
zb.ui.ScrollList.prototype._updateThumbSize = function() {
	var thumbSizePc = this._wrapperSize * 100 / this._getMaxSliderSize();

	// Для случая, если размер всех элементов в сумме меньше, чем wrapperSize
	thumbSizePc = Math.min(thumbSizePc, 100);

	this._exported.bar.setThumbSize(thumbSizePc);
};


/**
 * @protected
 */
zb.ui.ScrollList.prototype._updateThumbPosition = function() {
	var itemsSkipped = this._buffer.getLocalStart();
	var itemsSkippedSize = this._getSizeOfItems(itemsSkipped);

	var sliderPositionPx = this._position + itemsSkippedSize;
	var maxSliderPositionPx = this._getMaxSliderSize() - this._wrapperSize;

	var thumbPositionPc = sliderPositionPx * 100 / maxSliderPositionPx;
	this._exported.bar.setThumbPosition(thumbPositionPc);
};


/**
 * @type {zb.ui.templates.ScrollListOut}
 * @protected
 */
zb.ui.ScrollList.prototype._exported;
