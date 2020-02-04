/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import InlineWidget from 'cutejs/widgets/inline-widget';
import {div} from 'zb/html';
import Block from 'zb/block';


/**
 */
export default class Throbber extends InlineWidget {
	/**
	 * @param {(HTMLElement|Input)=} container
	 * @param {Input=} params
	 */
	constructor(container, params) {
		let fixedContainer = container;
		let fixedParams = params;

		if (typeof container === 'undefined') {
			fixedContainer = div();
		} else if (!(container instanceof HTMLElement)) {
			fixedContainer = div();
			fixedParams = /** @type {Input} */ (container);
		}

		fixedContainer.classList.add('w-zbui-throbber');

		super(/** @type {HTMLElement} */ (fixedContainer));

		this._block = new Block();
		this._block.on(this._block.EVENT_BLOCK, this._start.bind(this));
		this._block.on(this._block.EVENT_UNBLOCK, this._stop.bind(this));

		this._width = (fixedParams && fixedParams.width) || this.WIDTH;
		this._step = (fixedParams && fixedParams.step) || this.STEP;
		this._stepInterval = (fixedParams && fixedParams.stepInterval) || this.STEP_INTERVAL;

		this._animationFrameCallback = this._animationFrameCallback.bind(this);
		this._animationFrameId = null;

		this._updatePosition(0);
	}

	/**
	 * @override
	 */
	isFocusable() {
		return false;
	}

	/**
	 * @param {Promise} promise
	 */
	wait(promise) {
		this._block.block(promise);
	}

	/**
	 * @protected
	 */
	_start() {
		this._fireEvent(this.EVENT_START);

		this._updatePosition(0);
		this._requestAnimationFrame();
	}

	/**
	 * @protected
	 */
	_stop() {
		if (this._animationFrameId !== null) {
			cancelAnimationFrame(this._animationFrameId);
			this._animationFrameId = null;
		}

		this._fireEvent(this.EVENT_STOP);
	}

	/**
	 * @protected
	 */
	_requestAnimationFrame() {
		this._animationFrameId = requestAnimationFrame(this._animationFrameCallback);
	}

	/**
	 * @protected
	 */
	_animationFrameCallback() {
		if (Date.now() - this._positionChangeTime >= this._stepInterval) {
			this._updatePosition(this._position + this._step);
		}

		this._requestAnimationFrame();
	}

	/**
	 * @param {number} position
	 * @protected
	 */
	_updatePosition(position) {
		this._setPosition(position);
		this._positionChangeTime = Date.now();
	}

	/**
	 * @param {number} position
	 * @protected
	 */
	_setPosition(position) {
		let fixedPosition = position;

		if (position > this._width - this._step) {
			fixedPosition = 0;
		}

		this._container.style.backgroundPosition = `${-fixedPosition}px 0`;
		this._position = fixedPosition;
	}
}


/**
 * @type {Block}
 * @protected
 */
Throbber.prototype._block;


/**
 * @type {number}
 * @protected
 */
Throbber.prototype._step;


/**
 * @type {number}
 * @protected
 */
Throbber.prototype._stepInterval;


/**
 * @type {number}
 * @protected
 */
Throbber.prototype._width;


/**
 * @type {number}
 * @protected
 */
Throbber.prototype._position;


/**
 * @type {number}
 * @protected
 */
Throbber.prototype._positionChangeTime;


/**
 * @type {?number}
 * @protected
 */
Throbber.prototype._animationFrameId;


/**
 * Fired with: nothing
 * @const {string}
 */
Throbber.prototype.EVENT_START = 'start';


/**
 * Fired with: nothing
 * @const {string}
 */
Throbber.prototype.EVENT_STOP = 'stop';


/**
 * @const {number}
 */
Throbber.prototype.STEP = 88;


/**
 * @const {number}
 */
Throbber.prototype.WIDTH = 2112;


/**
 * @const {number}
 */
Throbber.prototype.STEP_INTERVAL = 100;


/**
 * @typedef {{
 *     step: (number|undefined),
 *     width: (number|undefined),
 *     stepInterval: (number|undefined)
 * }}
 */
export let Input;
