goog.provide('zb.ui.ExtendedList');
goog.require('zb.html');
goog.require('zb.ui.BaseList');
goog.require('zb.ui.templates.extendedList.ExtendedListOut');
goog.require('zb.ui.templates.extendedList.extendedList');


zb.ui.ExtendedList = class extends zb.ui.BaseList {
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

		this._updateThumbSize();
		// Вызываем еще раз обновление позиции бегунка, т.к. его размер изменился
		this._updateThumbPosition();

		this._updateArrows();
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
		return zb.ui.templates.extendedList.extendedList(this._getTemplateData(), this._getTemplateOptions());
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
		this._updateArrows();
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
	 * @return {number}
	 * @protected
	 */
	_getGlobalPosition() {
		const itemsSkipped = this._buffer.getLocalStart();
		const itemsSkippedSize = this._getSizeOfItems(itemsSkipped);

		return this._position + itemsSkippedSize;
	}


	/**
	 * @return {number}
	 * @protected
	 */
	_getMaxGlobalPosition() {
		return this._getMaxSliderSize() - this._wrapperSize;
	}


	/**
	 * @protected
	 */
	_updateThumbPosition() {
		const globalPositionPx = this._getGlobalPosition();
		const maxGlobalPositionPx = this._getMaxGlobalPosition();

		const thumbPositionPc = globalPositionPx * 100 / maxGlobalPositionPx;

		this._exported.bar.setThumbPosition(thumbPositionPc);
	}


	/**
	 * @protected
	 */
	_updateArrows() {
		const prevArr = this._isVertical ? this._exported.arrowUp : this._exported.arrowLeft;
		const nextArr = this._isVertical ? this._exported.arrowDown : this._exported.arrowRight;

		const setEnabled = function(arrow, isVisible) {
			zb.html.updateClassName(arrow, '_disabled', !isVisible);
		};

		if (this._wrapperSize >= this._sliderSize) {
			setEnabled(prevArr, false);
			setEnabled(nextArr, false);
			return;
		} else if (this._buffer.isCyclical()) {
			setEnabled(prevArr, true);
			setEnabled(nextArr, true);
			return;
		}

		const globalPositionPx = this._getGlobalPosition();
		const maxGlobalPositionPx = this._getMaxGlobalPosition();

		const isPrevVisible = !(globalPositionPx === 0 && this._buffer.isGlobalStart());
		setEnabled(prevArr, isPrevVisible);

		const isNextVisible = !(globalPositionPx === maxGlobalPositionPx && this._buffer.isGlobalEnd());
		setEnabled(nextArr, isNextVisible);
	}
};


/**
 * @type {zb.ui.templates.extendedList.ExtendedListOut}
 * @protected
 */
zb.ui.ExtendedList.prototype._exported;
