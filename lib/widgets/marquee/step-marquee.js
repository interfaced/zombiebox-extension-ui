import AbstractMarquee, {Input as AbstractMarqueeInput} from './abstract-marquee';


/**
 */
export default class StepMarquee extends AbstractMarquee {
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

		this._step = params.step || this.STEP;
	}

	/**
	 * @override
	 */
	start() {
		this.stop();

		this._calculateSize();

		if (this._diff > 0) {
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

		this._startAnimation();
	}

	/**
	 * @override
	 */
	_reset() {
		super._reset();

		this._setPosition(0);
	}

	/**
	 * @override
	 */
	_doStep() {
		let position = this._position + (this._isForward ? 1 : -1) * this._step;

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
	}
}


/**
 * @type {number}
 * @protected
 */
StepMarquee.prototype._step;


/**
 * In pixels
 * @const {number}
 */
StepMarquee.prototype.STEP = 1;


/**
 * @typedef {{
 *     container: HTMLElement,
 *     slider: HTMLElement,
 *     step: (number|undefined),
 *     delay: (number|undefined),
 *     isVertical: (boolean|undefined)
 * }}
 */
export let Input;
