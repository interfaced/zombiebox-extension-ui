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



zb.ui.ArrowList = class extends zb.ui.BaseList {
	/**
	 * @override
	 */
	constructor(opt_params) {
		super(opt_params);

		this.on(this.EVENT_AFTER_MOVE, this._updateArrows.bind(this));
	}


	/**
	 * @override
	 */
	mouseClick(e) {
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
				super.mouseClick(e);
		}
	}


	/**
	 * @override
	 */
	updateView() {
		super.updateView();

		this._updateArrows();
	}


	/**
	 * @override
	 */
	_renderTemplate() {
		return zb.ui.templates.arrowList(this._getTemplateData(), this._getTemplateOptions());
	}


	/**
	 * @protected
	 */
	_updateArrows() {
		const prevArr = this._isVertical ? this._exported.arrowUp : this._exported.arrowLeft;
		const nextArr = this._isVertical ? this._exported.arrowDown : this._exported.arrowRight;

		const showHide = (arrow, isVisible) => {
			zb.html.updateClassName(arrow, '_disabled', !isVisible);
		};

		if (this._wrapperSize >= this._sliderSize) {
			showHide(prevArr, false);
			showHide(nextArr, false);
			return;
		} else if (this._buffer.isCyclical()) {
			showHide(prevArr, true);
			showHide(nextArr, true);
			return;
		}

		const itemsSkipped = this._buffer.getLocalStart();
		const itemsSkippedSize = this._getSizeOfItems(itemsSkipped);
		const currPosition = this._position + itemsSkippedSize;

		const maxSliderSize = this._getSizeOfItems(this._buffer.getGlobalSize());
		const maxPosition = maxSliderSize - this._wrapperSize;

		const isPrevVisible = !(currPosition === 0 && this._buffer.isGlobalStart());
		showHide(prevArr, isPrevVisible);

		const isNextVisible = !(currPosition === maxPosition && this._buffer.isGlobalEnd());
		showHide(nextArr, isNextVisible);
	}
};


/**
 * @type {zb.ui.templates.ArrowListOut}
 * @protected
 */
zb.ui.ArrowList.prototype._exported;