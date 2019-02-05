/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.ArrowList');
goog.require('zb.html');
goog.require('zb.ui.BaseList');
goog.require('zb.ui.templates.arrowList');



/**
 * @param {zb.ui.BaseList.Input=} opt_params
 * @param {zb.ui.BaseListBuffer.Options=} opt_options
 * @extends {zb.ui.BaseList}
 * @constructor
 */
zb.ui.ArrowList = function(opt_params, opt_options) {
	goog.base(this, opt_params, opt_options);

	this.on(this.EVENT_AFTER_MOVE, this._updateArrows.bind(this));
};
goog.inherits(zb.ui.ArrowList, zb.ui.BaseList);


/**
 * @inheritDoc
 */
zb.ui.ArrowList.prototype.mouseClick = function(e) {
	switch (e.target) {
		case this._exported.arrowUp:
			this._moveUp();
			break;
		case this._exported.arrowDown:
			this._moveDown();
			break;
		case this._exported.arrowLeft:
			this._moveLeft();
			break;
		case this._exported.arrowRight:
			this._moveRight();
			break;
		default:
			goog.base(this, 'mouseClick', e);
	}
};


/**
 * @inheritDoc
 */
zb.ui.ArrowList.prototype.updateView = function() {
	goog.base(this, 'updateView');

	this._updateArrows();
};


/**
 * @inheritDoc
 */
zb.ui.ArrowList.prototype._renderTemplate = function() {
	return zb.ui.templates.arrowList(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @protected
 */
zb.ui.ArrowList.prototype._updateArrows = function() {
	var prevArr = this._isVertical ? this._exported.arrowUp : this._exported.arrowLeft;
	var nextArr = this._isVertical ? this._exported.arrowDown : this._exported.arrowRight;

	var showHide = function(arrow, isVisible) {
		zb.html.updateClassName(arrow, '_disabled', !isVisible);
	};

	if (this._wrapperSize >= this._sliderSize) {
		showHide(prevArr, false);
		showHide(nextArr, false);
		return;
	}

	var itemsSkipped = this._buffer.getLocalStart();
	var itemsSkippedSize = this._getSizeOfItems(itemsSkipped);
	var currPosition = this._position + itemsSkippedSize;

	var maxSliderSize = this._getSizeOfItems(this._buffer.getGlobalSize());
	var maxPosition = maxSliderSize - this._wrapperSize;

	var isPrevVisible = !(currPosition === 0 && this._buffer.isGlobalStart());
	showHide(prevArr, isPrevVisible);

	var isNextVisible = !(currPosition === maxPosition && this._buffer.isGlobalEnd());
	showHide(nextArr, isNextVisible);
};


/**
 * @type {zb.ui.templates.ArrowListOut}
 * @protected
 */
zb.ui.ArrowList.prototype._exported;
