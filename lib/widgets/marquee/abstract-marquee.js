import {updateClassName} from 'zb/html';
import EventPublisher from 'zb/events/event-publisher';


/**
 * @abstract
 */
export default class AbstractMarquee extends EventPublisher {
	/**
	 * @param {Input} params
	 */
	constructor(params) {
		super();

		this._container = params.container;
		this._slider = params.slider;
		this._delay = params.delay || this.DELAY;
		this._isVertical = !!params.isVertical;

		this._diff = 0;

		this._reset();

		this._container.classList.add('w-zbui-abstract-marquee');
		this._slider.classList.add('w-zbui-abstract-marquee__slider');
		updateClassName(this._container, '_is-vertical', this._isVertical);

		this._doStep = this._doStep.bind(this);
	}

	/**
	 *
	 */
	start() {
		throw new Error('not implemented');
	}

	/**
	 *
	 */
	stop() {
		this._stopAnimation();
		this._stopTimeout();

		this._reset();
	}

	/**
	 *
	 */
	pause() {
		this._stopAnimation();
		this._stopTimeout();
	}

	/**
	 *
	 */
	resume() {
		throw new Error('not implemented');
	}

	/**
	 * @protected
	 */
	_calculateSize() {
		const containerSize = this._isVertical ? this._container.offsetHeight : this._container.offsetWidth;
		const sliderSize = this._isVertical ? this._slider.offsetHeight : this._slider.offsetWidth;
		this._diff = sliderSize - containerSize;
	}

	/**
	 * @protected
	 */
	_startAnimation() {
		this._animationId = window.requestAnimationFrame(this._doStep);
	}

	/**
	 * @protected
	 */
	_stopAnimation() {
		if (this._animationId) {
			window.cancelAnimationFrame(this._animationId);
		}
		this._animationId = null;
	}

	/**
	 * @protected
	 */
	_stopTimeout() {
		if (this._timeoutId) {
			window.clearTimeout(this._timeoutId);
		}
		this._timeoutId = null;
	}

	/**
	 * @protected
	 */
	_reset() {
		this._stopAnimation();
		this._stopTimeout();

		this._isForward = true;
	}

	/**
	 * @protected
	 */
	_doStep() {
		throw new Error('not implemented');
	}

	/**
	 * @protected
	 */
	_changeDirection() {
		this._fireEvent(this.EVENT_DELAY_STARTED);

		this._timeoutId = window.setTimeout(() => {
			this._stopTimeout();

			this._isForward = !this._isForward;

			this._fireEvent(this.EVENT_DELAY_ENDED);
			this._startAnimation();
		}, this._delay);
	}

	/**
	 * @param {number} position
	 * @protected
	 */
	_setPosition(position) {
		const sliderStyle = this._slider.style;
		if (this._isVertical) {
			sliderStyle.top = `${-position}px`;
		} else {
			sliderStyle.left = `${-position}px`;
		}

		this._position = position;
	}
}


/**
 * @type {HTMLElement}
 * @protected
 */
AbstractMarquee.prototype._container;


/**
 * @type {HTMLElement}
 * @protected
 */
AbstractMarquee.prototype._slider;


/**
 * @type {number}
 * @protected
 */
AbstractMarquee.prototype._delay;


/**
 * @type {boolean}
 * @protected
 */
AbstractMarquee.prototype._isVertical;


/**
 * @type {number}
 * @protected
 */
AbstractMarquee.prototype._diff;


/**
 * @type {number}
 * @protected
 */
AbstractMarquee.prototype._position;


/**
 * @type {?number}
 * @protected
 */
AbstractMarquee.prototype._animationId;


/**
 * @type {?number}
 * @protected
 */
AbstractMarquee.prototype._timeoutId;


/**
 * @type {boolean}
 * @protected
 */
AbstractMarquee.prototype._isForward;


/**
 * In milliseconds
 * @const {number}
 */
AbstractMarquee.prototype.DELAY = 500;


/**
 * Fired with: nothing
 * @const {string}
 */
AbstractMarquee.prototype.EVENT_DELAY_STARTED = 'delay-started';


/**
 * Fired with: nothing
 * @const {string}
 */
AbstractMarquee.prototype.EVENT_DELAY_ENDED = 'delay-ended';


/**
 * @typedef {{
 *     container: HTMLElement,
 *     slider: HTMLElement,
 *     delay: (number|undefined),
 *     isVertical: (boolean|undefined)
 * }}
 */
export let Input;
