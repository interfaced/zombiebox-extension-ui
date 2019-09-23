import * as template from 'generated/cutejs/ui/widgets/scroll-list/scroll-list.jst';
import BaseList from '../base-list/base-list';
import ScrollBar from '../scroll-bar/scroll-bar';


/**
 */
export default class ScrollList extends BaseList {
	/**
	 * @override
	 */
	constructor(params) {
		super(params);

		if (this._exported.bar instanceof ScrollBar && typeof this._exported.thumb !== 'undefined') {
			this._exported.bar.setThumb(this._exported.thumb);
		}
	}

	/**
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
		return template.render(this._getTemplateData(), this._getTemplateOptions());
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
}


/**
 * @type {template.Out}
 * @protected
 */
ScrollList.prototype._exported;
