/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.ScrollText');
goog.require('zb.widgets.InlineWidget');



/**
 * @param {HTMLElement} container
 * @param {zb.ui.ScrollText.Input=} opt_params
 * @extends {zb.widgets.InlineWidget}
 * @constructor
 */
zb.ui.ScrollText = function(container, opt_params) {
	goog.base(this, container);

	this._slider = null;
	this._bar = null;

	this._containerSize = 0;
	this._sliderSize = 0;
	this._diff = 0;
	this._position = 0;

	var step = (opt_params && opt_params.step) || this.STEP;
	this.setStep(step);
};
goog.inherits(zb.ui.ScrollText, zb.widgets.InlineWidget);


/**
 * @inheritDoc
 */
zb.ui.ScrollText.prototype.afterDOMShow = function() {
	var base = goog.base(this, 'afterDOMShow');

	this._calculateSize();

	return base;
};


/**
 * @inheritDoc
 */
zb.ui.ScrollText.prototype.isFocusable = function() {
	return this.isScrollable();
};


/**
 * @param {HTMLElement} slider
 * @param {zb.ui.ScrollBar=} opt_bar
 */
zb.ui.ScrollText.prototype.setNodes = function(slider, opt_bar) {
	this._slider = slider;
	this._bar = opt_bar || null;

	this._setPosition(0);
};


/**
 * @param {number} step
 */
zb.ui.ScrollText.prototype.setStep = function(step) {
	this._step = step;
};


/**
 * @return {boolean}
 */
zb.ui.ScrollText.prototype.moveUp = function() {
	if (this.getPosition() === 0) {
		return false;
	}

	this._moveTo(this._position - this._step);

	return true;
};


/**
 * @return {boolean}
 */
zb.ui.ScrollText.prototype.moveDown = function() {
	if (this.getPosition() === 100) {
		return false;
	}

	this._moveTo(this._position + this._step);

	return true;
};


/**
 * @return {number}
 */
zb.ui.ScrollText.prototype.getPosition = function() {
	return this._diff ? this._position * 100 / this._diff : 0;
};


/**
 * @return {boolean}
 */
zb.ui.ScrollText.prototype.isScrollable = function() {
	return this._diff > 0;
};


/**
 * @inheritDoc
 */
zb.ui.ScrollText.prototype._processKey = function(zbKey, e) {
	var isHandled = false;

	if (this.isScrollable()) {
		var keys = zb.device.input.Keys;
		switch (zbKey) {
			case keys.UP:
				isHandled = this.moveUp();
				break;
			case keys.DOWN:
				isHandled = this.moveDown();
				break;
		}
	}

	return isHandled || goog.base(this, '_processKey', zbKey, e);
};


/**
 * @protected
 */
zb.ui.ScrollText.prototype._calculateSize = function() {
	this._containerSize = this._container.offsetHeight;
	this._sliderSize = this._slider.offsetHeight;
	this._diff = Math.max(this._sliderSize - this._containerSize, 0);

	this._bar.calculateSize();
	this._updateThumbSize();
};


/**
 * @param {number} position
 * @protected
 */
zb.ui.ScrollText.prototype._moveTo = function(position) {
	this._setPosition(position);
	this._fireEvent(this.EVENT_MOVE, this.getPosition());
};


/**
 * @param {number} position
 * @protected
 */
zb.ui.ScrollText.prototype._setPosition = function(position) {
	position = Math.min(position, this._diff);
	position = Math.max(position, 0);

	this._slider.style.top = -position + 'px';
	this._position = position;

	this._updateThumbPosition();
};


/**
 * @protected
 */
zb.ui.ScrollText.prototype._updateThumbSize = function() {
	if (this._bar) {
		var thumbSizePc = this._containerSize * 100 / this._sliderSize;
		thumbSizePc = Math.min(thumbSizePc, 100);
		this._bar.setThumbSize(thumbSizePc);
	}
};


/**
 * @protected
 */
zb.ui.ScrollText.prototype._updateThumbPosition = function() {
	if (this._bar) {
		this._bar.setThumbPosition(this.getPosition());
	}
};


/**
 * @type {?HTMLElement}
 * @protected
 */
zb.ui.ScrollText.prototype._slider;


/**
 * @type {?zb.ui.ScrollBar}
 * @protected
 */
zb.ui.ScrollText.prototype._bar;


/**
 * @type {number}
 * @protected
 */
zb.ui.ScrollText.prototype._containerSize;


/**
 * @type {number}
 * @protected
 */
zb.ui.ScrollText.prototype._sliderSize;


/**
 * @type {number}
 * @protected
 */
zb.ui.ScrollText.prototype._diff;


/**
 * @type {number}
 * @protected
 */
zb.ui.ScrollText.prototype._step;


/**
 * @type {number}
 * @protected
 */
zb.ui.ScrollText.prototype._position;


/**
 * @const {number}
 */
zb.ui.ScrollText.prototype.STEP = 50;


/**
 * Fired with: {number} percent
 * @const {string}
 */
zb.ui.ScrollText.prototype.EVENT_MOVE = 'move';


/**
 * @typedef {{
 *     step: number
 * }}
 */
zb.ui.ScrollText.Input;
