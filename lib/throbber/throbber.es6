/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.require('zb.Block');
goog.require('zb.Timeout');
goog.provide('zb.ui.Throbber');
goog.require('zb.html');
goog.require('zb.widgets.InlineWidget');



zb.ui.Throbber = class extends zb.widgets.InlineWidget {
	/**
	 * @param {(HTMLElement|zb.ui.Throbber.Input)=} opt_container
	 * @param {zb.ui.Throbber.Input=} opt_params
	 */
	constructor(opt_container, opt_params) {
		if (typeof opt_container === 'undefined') {
			opt_container = zb.html.div();
		} else if (!(opt_container instanceof HTMLElement)) {
			opt_params = /** @type {zb.ui.Throbber.Input} */(opt_container);
			opt_container = zb.html.div();
		}

		opt_container.classList.add('w-zbui-throbber');

		super(opt_container);

		this._block = new zb.Block;
		this._block.on(this._block.EVENT_BLOCK, this._start.bind(this));
		this._block.on(this._block.EVENT_UNBLOCK, this._stop.bind(this));

		this._step = (opt_params && opt_params.step) || this.STEP;
		this._width = (opt_params && opt_params.width) || this.WIDTH;

		const stepInterval = (opt_params && opt_params.stepInterval) || this.STEP_INTERVAL;
		this._timer = new zb.Timeout(this._update.bind(this), stepInterval);

		this._setPosition(0);
	}


	/**
	 * @param {IThenable} promise
	 */
	wait(promise) {
		this._block.block(promise);
	}


	/**
	 * @protected
	 */
	_start() {
		this._fireEvent(this.EVENT_START);

		this._update();
	}


	/**
	 * @protected
	 */
	_stop() {
		this._timer.stop();

		this._fireEvent(this.EVENT_STOP);
	}


	/**
	 * @protected
	 */
	_update() {
		this._setPosition(this._position + this._step);
		this._timer.restart();
	}


	/**
	 * @param {number} position
	 * @protected
	 */
	_setPosition(position) {
		if (position >= this._width - this._step) {
			position = 0;
		}

		this._container.style.backgroundPosition = `${-position}px 0`;
		this._position = position;
	}
};


/**
 * @type {zb.Block}
 * @protected
 */
zb.ui.Throbber.prototype._block;


/**
 * @type {zb.Timeout}
 * @protected
 */
zb.ui.Throbber.prototype._timer;


/**
 * @type {number}
 * @protected
 */
zb.ui.Throbber.prototype._step;


/**
 * @type {number}
 * @protected
 */
zb.ui.Throbber.prototype._width;


/**
 * @type {number}
 * @protected
 */
zb.ui.Throbber.prototype._position;


/**
 * @const {string}
 */
zb.ui.Throbber.prototype.EVENT_START = 'start';


/**
 * @const {string}
 */
zb.ui.Throbber.prototype.EVENT_STOP = 'stop';


/**
 * @const {number}
 */
zb.ui.Throbber.prototype.STEP = 88;


/**
 * @const {number}
 */
zb.ui.Throbber.prototype.WIDTH = 2112;


/**
 * @const {number}
 */
zb.ui.Throbber.prototype.STEP_INTERVAL = 100;


/**
 * @typedef {{
 *     step: (number|undefined),
 *     width: (number|undefined),
 *     stepInterval: (number|undefined)
 * }}
 */
zb.ui.Throbber.Input;
