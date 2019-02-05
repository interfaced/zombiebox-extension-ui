/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.ScrollBar');
goog.require('zb.html');
goog.require('zb.widgets.InlineWidget');



zb.ui.ScrollBar = class extends zb.widgets.InlineWidget {
	/**
	 * @param {HTMLElement=} opt_container
	 * @param {zb.ui.ScrollBar.Input=} opt_params
	 */
	constructor(opt_container, opt_params) {
		let thumb = null;

		if (!(opt_container instanceof HTMLElement)) {
			opt_params = /** @type {zb.ui.ScrollBar.Input} */(opt_container);
			opt_container = zb.html.div('w-scroll-bar');

			thumb = zb.html.div('w-scroll-bar__thumb');
			opt_container.appendChild(thumb);
		}

		super(opt_container);

		if (thumb) {
			this.setThumb(thumb);
		}

		this.disable();

		this._containerSize = 0;
		this._thumbSize = 0;

		const isVertical = (opt_params && opt_params.isVertical) || false;
		this.setVertical(isVertical);

		const minThumbSize = (opt_params && opt_params.minThumbSize) || 10;
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
		zb.html.updateClassName(this._container, '_is-vertical', isVertical);
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
};


/**
 * @type {boolean}
 * @protected
 */
zb.ui.ScrollBar.prototype._isVertical;


/**
 * @type {number}
 * @protected
 */
zb.ui.ScrollBar.prototype._containerSize;


/**
 * @type {HTMLElement}
 * @protected
 */
zb.ui.ScrollBar.prototype._thumb;


/**
 * @type {number} in pixels
 * @protected
 */
zb.ui.ScrollBar.prototype._thumbSize;


/**
 * @type {number} in pixels
 * @protected
 */
zb.ui.ScrollBar.prototype._minThumbSize;


/**
 * @typedef {{
 *     isVertical: (boolean|undefined),
 *     minThumbSize: (number|undefined)
 * }}
 */
zb.ui.ScrollBar.Input;
