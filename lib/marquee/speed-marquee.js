goog.provide('zb.ui.SpeedMarquee');
goog.require('zb.ui.AbstractMarquee');


zb.ui.SpeedMarquee = class extends zb.ui.AbstractMarquee {
	/**
	 * @param {zb.ui.SpeedMarquee.Input} params
	 */
	constructor(params) {
		/** @type {zb.ui.AbstractMarquee.Input} */
		const baseParams = {
			container: params.container,
			slider: params.slider,
			delay: params.delay,
			isVertical: params.isVertical
		};

		super(baseParams);

		this._speed = params.speed || this.SPEED;

		this.on(this.EVENT_DELAY_ENDED, this._onDelayEnded.bind(this));
	}

	/**
	 * @override
	 */
	start() {
		this.stop();

		this._calculateSize();

		if (this._diff > 0) {
			this._startTime = Date.now();
			this._startAnimation();
		}
	}

	/**
	 * @override
	 */
	resume() {
		if (this._animationId || this._timeoutId) {
			return;
		}

		this._startTime = Date.now() - this._elapsedTime;
		this._startAnimation();
	}

	/**
	 * @override
	 */
	_reset() {
		super._reset();

		this._startTime = null;
		this._setElapsedTime(0);
	}

	/**
	 * @override
	 */
	_doStep() {
		let elapsedTime = Date.now() - this._startTime;
		const duration = this._diff / this._speed;

		if (this._elapsedTime < duration && elapsedTime > duration) {
			elapsedTime = duration;
		}

		if (elapsedTime <= duration) {
			this._setElapsedTime(elapsedTime);
			this._startAnimation();
		} else {
			this._changeDirection();
		}
	}

	/**
	 * @param {number} elapsedTime
	 * @protected
	 */
	_setElapsedTime(elapsedTime) {
		let position = elapsedTime * this._speed;
		position = this._isForward ? position : this._diff - position;
		position = Math.min(position, this._diff);
		position = Math.max(position, 0);
		this._setPosition(position);

		this._elapsedTime = elapsedTime;
	}

	/**
	 * @protected
	 */
	_onDelayEnded() {
		this._startTime = Date.now();
		this._elapsedTime = 0;
	}
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
