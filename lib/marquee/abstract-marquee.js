goog.provide('zb.ui.AbstractMarquee');
goog.require('zb.events.EventPublisher');
goog.require('zb.html');



/**
 * @param {zb.ui.AbstractMarquee.Input} params
 * @extends {zb.events.EventPublisher}
 * @constructor
 */
zb.ui.AbstractMarquee = function(params) {
	goog.base(this);

	this._container = params.container;
	this._slider = params.slider;
	this._delay = params.delay || this.DELAY;
	this._isVertical = !!params.isVertical;

	this._diff = 0;

	this._reset();

	this._container.classList.add('w-abstract-marquee');
	this._slider.classList.add('w-abstract-marquee__slider');
	zb.html.updateClassName(this._container, '_is-vertical', this._isVertical);

	this._doStep = this._doStep.bind(this);
};
goog.inherits(zb.ui.AbstractMarquee, zb.events.EventPublisher);


/**
 *
 */
zb.ui.AbstractMarquee.prototype.start = function() {
	throw new Error('not implemented');
};


/**
 *
 */
zb.ui.AbstractMarquee.prototype.stop = function() {
	this._stopAnimation();
	this._stopTimeout();

	this._reset();
};


/**
 *
 */
zb.ui.AbstractMarquee.prototype.pause = function() {
	this._stopAnimation();
	this._stopTimeout();
};


/**
 *
 */
zb.ui.AbstractMarquee.prototype.resume = function() {
	throw new Error('not implemented');
};


/**
 * @protected
 */
zb.ui.AbstractMarquee.prototype._calculateSize = function() {
	var containerSize = this._isVertical ? this._container.offsetHeight : this._container.offsetWidth;
	var sliderSize = this._isVertical ? this._slider.offsetHeight : this._slider.offsetWidth;
	this._diff = sliderSize - containerSize;
};


/**
 * @protected
 */
zb.ui.AbstractMarquee.prototype._startAnimation = function() {
	this._animationId = window.requestAnimationFrame(this._doStep);
};


/**
 * @protected
 */
zb.ui.AbstractMarquee.prototype._stopAnimation = function() {
	if (this._animationId) {
		window.cancelAnimationFrame(this._animationId);
	}
	this._animationId = null;
};


/**
 * @protected
 */
zb.ui.AbstractMarquee.prototype._stopTimeout = function() {
	if (this._timeoutId) {
		window.clearTimeout(this._timeoutId);
	}
	this._timeoutId = null;
};


/**
 * @protected
 */
zb.ui.AbstractMarquee.prototype._reset = function() {
	this._stopAnimation();
	this._stopTimeout();

	this._isForward = true;
};


/**
 * @protected
 */
zb.ui.AbstractMarquee.prototype._doStep = function() {
	throw new Error('not implemented');
};


/**
 * @protected
 */
zb.ui.AbstractMarquee.prototype._changeDirection = function() {
	this._fireEvent(this.EVENT_DELAY_STARTED);

	this._timeoutId = window.setTimeout(function() {
		this._stopTimeout();

		this._isForward = !this._isForward;

		this._fireEvent(this.EVENT_DELAY_ENDED);
		this._startAnimation();
	}.bind(this), this._delay);
};


/**
 * @param {number} position
 * @protected
 */
zb.ui.AbstractMarquee.prototype._setPosition = function(position) {
	var sliderStyle = this._slider.style;
	if (this._isVertical) {
		sliderStyle.top = -position + 'px';
	} else {
		sliderStyle.left = -position + 'px';
	}

	this._position = position;
};


/**
 * @type {HTMLElement}
 * @protected
 */
zb.ui.AbstractMarquee.prototype._container;


/**
 * @type {HTMLElement}
 * @protected
 */
zb.ui.AbstractMarquee.prototype._slider;


/**
 * @type {number}
 * @protected
 */
zb.ui.AbstractMarquee.prototype._delay;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.AbstractMarquee.prototype._isVertical;


/**
 * @type {number}
 * @protected
 */
zb.ui.AbstractMarquee.prototype._diff;


/**
 * @type {number}
 * @protected
 */
zb.ui.AbstractMarquee.prototype._position;


/**
 * @type {?number}
 * @protected
 */
zb.ui.AbstractMarquee.prototype._animationId;


/**
 * @type {?number}
 * @protected
 */
zb.ui.AbstractMarquee.prototype._timeoutId;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.AbstractMarquee.prototype._isForward;


/**
 * In milliseconds
 * @const {number}
 */
zb.ui.AbstractMarquee.prototype.DELAY = 500;


/**
 * Fired with: nothing
 * @const {string}
 */
zb.ui.AbstractMarquee.prototype.EVENT_DELAY_STARTED = 'delay-started';


/**
 * Fired with: nothing
 * @const {string}
 */
zb.ui.AbstractMarquee.prototype.EVENT_DELAY_ENDED = 'delay-ended';


/**
 * @typedef {{
 *     container: HTMLElement,
 *     slider: HTMLElement,
 *     delay: (number|undefined),
 *     isVertical: (boolean|undefined)
 * }}
 */
zb.ui.AbstractMarquee.Input;
