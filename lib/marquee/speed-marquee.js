goog.provide('zb.ui.SpeedMarquee');
goog.require('zb.ui.AbstractMarquee');



/**
 * @override
 * @param {zb.ui.SpeedMarquee.Input} params
 * @extends {zb.ui.AbstractMarquee}
 * @constructor
 */
zb.ui.SpeedMarquee = function(params) {
	this._speed = params.speed || this.SPEED;

	/** @type {zb.ui.AbstractMarquee.Input} */
	var baseParams = {
		container: params.container,
		slider: params.slider,
		delay: params.delay,
		isVertical: params.isVertical
	};

	goog.base(this, baseParams);

	this.on(this.EVENT_DELAY_ENDED, this._onDelayEnded.bind(this));
};
goog.inherits(zb.ui.SpeedMarquee, zb.ui.AbstractMarquee);


/**
 * @override
 */
zb.ui.SpeedMarquee.prototype.start = function() {
	this.stop();

	this._calculateSize();

	if (this._diff > 0) {
		this._startTime = Date.now();
		this._startAnimation();
	}
};


/**
 * @override
 */
zb.ui.SpeedMarquee.prototype.resume = function() {
	if (this._animationId || this._timeoutId) {
		return;
	}

	this._startTime = Date.now() - this._elapsedTime;
	this._startAnimation();
};


/**
 * @override
 */
zb.ui.SpeedMarquee.prototype._reset = function() {
	goog.base(this, '_reset');

	this._startTime = null;
	this._setElapsedTime(0);
};


/**
 * @override
 */
zb.ui.SpeedMarquee.prototype._doStep = function() {
	var elapsedTime = Date.now() - this._startTime;
	var duration = this._diff / this._speed;

	if (this._elapsedTime < duration && elapsedTime > duration) {
		elapsedTime = duration;
	}

	if (elapsedTime <= duration) {
		this._setElapsedTime(elapsedTime);
		this._startAnimation();
	} else {
		this._changeDirection();
	}
};


/**
 * @param {number} elapsedTime
 * @protected
 */
zb.ui.SpeedMarquee.prototype._setElapsedTime = function(elapsedTime) {
	var position = elapsedTime * this._speed;
	position = this._isForward ? position : this._diff - position;
	position = Math.min(position, this._diff);
	position = Math.max(position, 0);
	this._setPosition(position);

	this._elapsedTime = elapsedTime;
};


/**
 * @protected
 */
zb.ui.SpeedMarquee.prototype._onDelayEnded = function() {
	this._startTime = Date.now();
	this._elapsedTime = 0;
};


/**
 * @type {number}
 * @protected
 */
zb.ui.SpeedMarquee.prototype._speed;


/**
 * @type {?number}
 * @protected
 */
zb.ui.SpeedMarquee.prototype._startTime;


/**
 * @type {number}
 * @protected
 */
zb.ui.SpeedMarquee.prototype._elapsedTime;


/**
 * Pixels in millisecond
 * @const {number}
 */
zb.ui.SpeedMarquee.prototype.SPEED = 0.1;


/**
 * @typedef {{
 *     container: HTMLElement,
 *     slider: HTMLElement,
 *     speed: (number|undefined),
 *     delay: (number|undefined),
 *     isVertical: (boolean|undefined)
 * }}
 */
zb.ui.SpeedMarquee.Input;
