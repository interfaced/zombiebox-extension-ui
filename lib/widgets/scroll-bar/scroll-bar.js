import InlineWidget from 'cutejs/widgets/inline-widget';
import {updateClassName, div} from 'zb/html';


/**
 */
export default class ScrollBar extends InlineWidget {
	/**
	 * @param {HTMLElement=} container
	 * @param {Input=} params
	 */
	constructor(container, params) {
		let fixedContainer = container;
		let fixedParams = params;
		let thumb = null;

		const createStructure = () => {
			fixedContainer = div();

			thumb = div('w-zbui-scroll-bar__thumb');
			fixedContainer.appendChild(thumb);
		};

		if (typeof container === 'undefined') {
			createStructure();
		} else if (!(container instanceof HTMLElement)) {
			createStructure();
			fixedParams = /** @type {Input} */ (container);
		}

		fixedContainer.classList.add('w-zbui-scroll-bar');

		super(/** @type {HTMLElement} */ (fixedContainer));

		if (thumb) {
			this.setThumb(thumb);
		}

		this.disable();

		this._containerSize = 0;
		this._thumbSize = 0;

		const isVertical = (fixedParams && fixedParams.isVertical) || false;
		this.setVertical(isVertical);

		const minThumbSize = (fixedParams && fixedParams.minThumbSize) || 10;
		this.setMinThumbSize(minThumbSize);
	}

	/**
	 * @override
	 */
	afterDOMShow() {
		this.calculateSize();

		return super.afterDOMShow();
	}

	/**
	 * @override
	 */
	setVisible(isVisible) {
		if (this._visible === isVisible) {
			return;
		}

		this._visible = isVisible;

		// Используется свойство visibility, т.к. если использовать display, не возможно получить размеры контейнера.
		if (this._visible) {
			this._container.style.visibility = 'visible';
		} else {
			this._container.style.visibility = 'hidden';
		}
	}

	/**
	 *
	 */
	calculateSize() {
		this._containerSize = this._isVertical ? this._container.offsetHeight : this._container.offsetWidth;
	}

	/**
	 * @param {boolean} isVertical
	 */
	setVertical(isVertical) {
		this._isVertical = isVertical;
		updateClassName(this._container, '_is-vertical', isVertical);
	}

	/**
	 * @param {number} minThumbSizePx in pixels
	 */
	setMinThumbSize(minThumbSizePx) {
		this._minThumbSize = minThumbSizePx;
	}

	/**
	 * @param {HTMLElement} thumb
	 */
	setThumb(thumb) {
		this._thumb = thumb;
	}

	/**
	 * @param {number} thumbSizePc in percents
	 */
	setThumbSize(thumbSizePc) {
		this.setVisible(thumbSizePc !== 100);

		let thumbSizePx = thumbSizePc * this._containerSize / 100;
		thumbSizePx = Math.max(this._minThumbSize, thumbSizePx);

		const thumbStyle = this._thumb.style;
		if (this._isVertical) {
			thumbStyle.height = `${thumbSizePx}px`;
		} else {
			thumbStyle.width = `${thumbSizePx}px`;
		}

		this._thumbSize = thumbSizePx;
	}

	/**
	 * @param {number} thumbPositionPc in percents
	 */
	setThumbPosition(thumbPositionPc) {
		const thumbPositionPx = thumbPositionPc * (this._containerSize - this._thumbSize) / 100;

		const thumbStyle = this._thumb.style;
		if (this._isVertical) {
			thumbStyle.top = `${thumbPositionPx}px`;
		} else {
			thumbStyle.left = `${thumbPositionPx}px`;
		}
	}
}


/**
 * @type {boolean}
 * @protected
 */
ScrollBar.prototype._isVertical;


/**
 * @type {number}
 * @protected
 */
ScrollBar.prototype._containerSize;


/**
 * @type {HTMLElement}
 * @protected
 */
ScrollBar.prototype._thumb;


/**
 * @type {number} in pixels
 * @protected
 */
ScrollBar.prototype._thumbSize;


/**
 * @type {number} in pixels
 * @protected
 */
ScrollBar.prototype._minThumbSize;


/**
 * @typedef {{
 *     isVertical: (boolean|undefined),
 *     minThumbSize: (number|undefined)
 * }}
 */
export let Input;
