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



/**
 * @param {HTMLElement=} opt_container
 * @param {zb.ui.ScrollBar.Input=} opt_params
 * @extends {zb.widgets.InlineWidget}
 * @constructor
 */
zb.ui.ScrollBar = function(opt_container, opt_params) {
	if (!(opt_container instanceof HTMLElement)) {
		opt_params = /** @type {zb.ui.ScrollBar.Input} */(opt_container);
		opt_container = zb.html.div('w-scroll-bar');

		var thumb = zb.html.div('w-scroll-bar__thumb');
		opt_container.appendChild(thumb);
		this.setThumb(thumb);
	}

	goog.base(this, opt_container);
	this.disable();

	this._containerSize = 0;
	this._thumbSize = 0;

	var isVertical = (opt_params && opt_params.isVertical) || false;
	this.setVertical(isVertical);

	var minThumbSize = (opt_params && opt_params.minThumbSize) || 10;
	this.setMinThumbSize(minThumbSize);
};
goog.inherits(zb.ui.ScrollBar, zb.widgets.InlineWidget);


/**
 * @inheritDoc
 */
zb.ui.ScrollBar.prototype.afterDOMShow = function() {
	this.calculateSize();

	return goog.base(this, 'afterDOMShow');
};


/**
 * @inheritDoc
 */
zb.ui.ScrollBar.prototype.setVisible = function(isVisible) {
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
};


/**
 *
 */
zb.ui.ScrollBar.prototype.calculateSize = function() {
	this._containerSize = this._isVertical ? this._container.offsetHeight : this._container.offsetWidth;
};


/**
 * @param {boolean} isVertical
 */
zb.ui.ScrollBar.prototype.setVertical = function(isVertical) {
	this._isVertical = isVertical;
	zb.html.updateClassName(this._container, '_is-vertical', isVertical);
};


/**
 * @param {number} minThumbSizePx in pixels
 */
zb.ui.ScrollBar.prototype.setMinThumbSize = function(minThumbSizePx) {
	this._minThumbSize = minThumbSizePx;
};


/**
 * @param {HTMLElement} thumb
 */
zb.ui.ScrollBar.prototype.setThumb = function(thumb) {
	this._thumb = thumb;
};


/**
 * @param {number} thumbSizePc in percents
 */
zb.ui.ScrollBar.prototype.setThumbSize = function(thumbSizePc) {
	this.setVisible(thumbSizePc !== 100);

	var thumbSizePx = thumbSizePc * this._containerSize / 100;
	thumbSizePx = Math.max(this._minThumbSize, thumbSizePx);

	var thumbStyle = this._thumb.style;
	if (this._isVertical) {
		thumbStyle.height = thumbSizePx + 'px';
	} else {
		thumbStyle.width = thumbSizePx + 'px';
	}

	this._thumbSize = thumbSizePx;
};


/**
 * @param {number} thumbPositionPc in percents
 */
zb.ui.ScrollBar.prototype.setThumbPosition = function(thumbPositionPc) {
	var thumbPositionPx = thumbPositionPc * (this._containerSize - this._thumbSize) / 100;

	var thumbStyle = this._thumb.style;
	if (this._isVertical) {
		thumbStyle.top = thumbPositionPx + 'px';
	} else {
		thumbStyle.left = thumbPositionPx + 'px';
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
