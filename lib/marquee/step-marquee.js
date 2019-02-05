goog.provide('zb.ui.StepMarquee');
goog.require('zb.ui.AbstractMarquee');



/**
 * @override
 * @param {zb.ui.StepMarquee.Input} params
 * @extends {zb.ui.AbstractMarquee}
 * @constructor
 */
zb.ui.StepMarquee = function(params) {
	this._step = params.step || this.STEP;

	/** @type {zb.ui.AbstractMarquee.Input} */
	var baseParams = {
		container: params.container,
		slider: params.slider,
		delay: params.delay,
		isVertical: params.isVertical
	};

	goog.base(this, baseParams);
};
goog.inherits(zb.ui.StepMarquee, zb.ui.AbstractMarquee);


/**
 * @override
 */
zb.ui.StepMarquee.prototype.start = function() {
	this.stop();

	this._calculateSize();

	if (this._diff > 0) {
		this._startAnimation();
	}
};


/**
 * @override
 */
zb.ui.StepMarquee.prototype.resume = function() {
	if (this._animationId || this._timeoutId) {
		return;
	}

	this._startAnimation();
};


/**
 * @override
 */
zb.ui.StepMarquee.prototype._reset = function() {
	goog.base(this, '_reset');

	this._setPosition(0);
};


/**
 * @override
 */
zb.ui.StepMarquee.prototype._doStep = function() {
	var position = this._position + (this._isForward ? 1 : -1) * this._step;

	if (this._position < this._diff && position > this._diff) {
		position = this._diff;
	} else if (this._position > 0 && position < 0) {
		position = 0;
	}

	if (position >= 0 && position <= this._diff) {
		this._setPosition(position);
		this._startAnimation();
	} else {
		this._changeDirection();
	}
};


/**
 * @type {number}
 * @protected
 */
zb.ui.StepMarquee.prototype._step;


/**
 * In pixels
 * @const {number}
 */
zb.ui.StepMarquee.prototype.STEP = 1;


/**
 * @typedef {{
 *     container: HTMLElement,
 *     slider: HTMLElement,
 *     step: (number|undefined),
 *     delay: (number|undefined),
 *     isVertical: (boolean|undefined)
 * }}
 */
zb.ui.StepMarquee.Input;
