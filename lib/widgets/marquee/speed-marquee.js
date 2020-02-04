/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import AbstractMarquee, {Input as AbstractMarqueeInput} from './abstract-marquee';


/**
 */
export default class SpeedMarquee extends AbstractMarquee {
	/**
	 * @param {Input} params
	 */
	constructor(params) {
		/** @type {AbstractMarqueeInput} */
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
}


/**
 * @type {number}
 * @protected
 */
SpeedMarquee.prototype._speed;


/**
 * @type {?number}
 * @protected
 */
SpeedMarquee.prototype._startTime;


/**
 * @type {number}
 * @protected
 */
SpeedMarquee.prototype._elapsedTime;


/**
 * Pixels in millisecond
 * @const {number}
 */
SpeedMarquee.prototype.SPEED = 0.1;


/**
 * @typedef {{
 *     container: HTMLElement,
 *     slider: HTMLElement,
 *     speed: (number|undefined),
 *     delay: (number|undefined),
 *     isVertical: (boolean|undefined)
 * }}
 */
export let Input;
