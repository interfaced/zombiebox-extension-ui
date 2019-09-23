import InlineWidget from 'cutejs/widgets/inline-widget';
import InputKeys from 'zb/device/input/keys';
import ScrollBar from '../scroll-bar/scroll-bar';


/**
 */
export default class ScrollText extends InlineWidget {
	/**
	 * @param {HTMLElement} container
	 * @param {Input=} params
	 */
	constructor(container, params) {
		container.classList.add('w-zbui-scroll-text');

		super(container);

		this._slider = null;
		this._bar = null;

		this._containerSize = 0;
		this._sliderSize = 0;
		this._diff = 0;
		this._position = 0;

		const step = (params && params.step) || this.STEP;
		this.setStep(step);
	}

	/**
	 * @override
	 */
	afterDOMShow() {
		super.afterDOMShow();

		this.updateView();
	}

	/**
	 * @override
	 */
	isFocusable() {
		return this.isScrollable();
	}

	/**
	 * @param {HTMLElement} slider
	 * @param {ScrollBar=} bar
	 */
	setNodes(slider, bar) {
		slider.classList.add('w-zbui-scroll-text__slider');

		this._slider = slider;
		this._bar = bar || null;

		this._setPosition(0);
	}

	/**
	 * @param {number} step
	 */
	setStep(step) {
		this._step = step;
	}

	/**
	 * @return {boolean}
	 */
	moveUp() {
		if (this.getPosition() === 0) {
			return false;
		}

		this._moveTo(this._position - this._step);

		return true;
	}

	/**
	 * @return {boolean}
	 */
	moveDown() {
		if (this.getPosition() === 100) {
			return false;
		}

		this._moveTo(this._position + this._step);

		return true;
	}

	/**
	 * @return {number} in percents
	 */
	getPosition() {
		return this._diff ? this._position * 100 / this._diff : 0;
	}

	/**
	 * @param {number} position in percents
	 */
	setPosition(position) {
		this._setPosition(position * this._diff / 100);
	}

	/**
	 *
	 */
	updateView() {
		this._calculateSize();
		this._updateThumbSize();

		this._setPosition(this._position);
	}

	/**
	 * @return {boolean}
	 */
	isScrollable() {
		return this._diff > 0;
	}

	/**
	 * @override
	 */
	_processKey(zbKey, e) {
		let isHandled = false;

		if (this.isScrollable()) {
			switch (zbKey) {
				case InputKeys.UP:
					isHandled = this.moveUp();
					break;
				case InputKeys.DOWN:
					isHandled = this.moveDown();
					break;
			}
		}

		return isHandled || super._processKey(zbKey, e);
	}

	/**
	 * @protected
	 */
	_calculateSize() {
		this._containerSize = this._container.offsetHeight;
		this._sliderSize = this._slider.offsetHeight;
		this._diff = Math.max(this._sliderSize - this._containerSize, 0);

		if (this._bar) {
			this._bar.calculateSize();
		}
	}

	/**
	 * @param {number} position
	 * @protected
	 */
	_moveTo(position) {
		this._setPosition(position);
		this._fireEvent(this.EVENT_MOVE, this.getPosition());
	}

	/**
	 * @param {number} position
	 * @protected
	 */
	_setPosition(position) {
		let fixedPosition = position;

		fixedPosition = Math.min(fixedPosition, this._diff);
		fixedPosition = Math.max(fixedPosition, 0);

		this._slider.style.top = `${-fixedPosition}px`;
		this._position = fixedPosition;

		this._updateThumbPosition();
	}

	/**
	 * @protected
	 */
	_updateThumbSize() {
		if (this._bar) {
			let thumbSizePc = this._containerSize * 100 / this._sliderSize;
			thumbSizePc = Math.min(thumbSizePc, 100);
			this._bar.setThumbSize(thumbSizePc);
		}
	}

	/**
	 * @protected
	 */
	_updateThumbPosition() {
		if (this._bar) {
			this._bar.setThumbPosition(this.getPosition());
		}
	}
}


/**
 * @type {?HTMLElement}
 * @protected
 */
ScrollText.prototype._slider;


/**
 * @type {?ScrollBar}
 * @protected
 */
ScrollText.prototype._bar;


/**
 * @type {number}
 * @protected
 */
ScrollText.prototype._containerSize;


/**
 * @type {number}
 * @protected
 */
ScrollText.prototype._sliderSize;


/**
 * @type {number}
 * @protected
 */
ScrollText.prototype._diff;


/**
 * @type {number}
 * @protected
 */
ScrollText.prototype._step;


/**
 * @type {number}
 * @protected
 */
ScrollText.prototype._position;


/**
 * @const {number}
 */
ScrollText.prototype.STEP = 50;


/**
 * Fired with: {number} percent
 * @const {string}
 */
ScrollText.prototype.EVENT_MOVE = 'move';


/**
 * @typedef {{
 *     step: number
 * }}
 */
export let Input;
