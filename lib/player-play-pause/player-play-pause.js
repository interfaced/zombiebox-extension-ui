goog.provide('zb.ui.PlayerPlayPause');
goog.require('zb.device.IVideo');
goog.require('zb.html');
goog.require('zb.ui.Button');


zb.ui.PlayerPlayPause = class extends zb.ui.Button {
	/**
	 * @override
	 */
	constructor(opt_container, opt_data) {
		super(opt_container, opt_data);

		this.setPlayer(null);

		this._onPause = this._onPause.bind(this);
		this._onPlay = this._onPlay.bind(this);
		this._onEnded = this._onEnded.bind(this);
		this._onStop = this._onStop.bind(this);
		this._onRateChange = this._onRateChange.bind(this);

		this.onClick(this._onClick.bind(this));
	}


	/**
	 * @param {?zb.device.IVideo} player
	 */
	setPlayer(player) {
		if (this._player) {
			this._unbindEvents();
		}

		this._player = player;
		this.updateView();

		if (this._player) {
			this._bindEvents();
		}
	}


	/**
	 */
	updateView() {
		if (this._player) {
			switch (this._player.getState()) {
				case zb.device.IVideo.State.INITED:
				case zb.device.IVideo.State.PAUSED:
				case zb.device.IVideo.State.STOPPED:
				case zb.device.IVideo.State.SEEKING:
					this._setPaused(true);
					break;
				default:
					this._setPaused(false);
			}
		} else {
			this._setPaused(true);
		}
	}


	/**
	 * @protected
	 */
	_bindEvents() {
		this._player.on(this._player.EVENT_PLAY, this._onPlay);
		this._player.on(this._player.EVENT_PAUSE, this._onPause);
		this._player.on(this._player.EVENT_ENDED, this._onEnded);
		this._player.on(this._player.EVENT_STOP, this._onStop);
		this._player.on(this._player.EVENT_RATE_CHANGE, this._onRateChange);
	}


	/**
	 * @protected
	 */
	_unbindEvents() {
		this._player.off(this._player.EVENT_PLAY, this._onPlay);
		this._player.off(this._player.EVENT_PAUSE, this._onPause);
		this._player.off(this._player.EVENT_ENDED, this._onEnded);
		this._player.off(this._player.EVENT_STOP, this._onStop);
		this._player.off(this._player.EVENT_RATE_CHANGE, this._onRateChange);
	}


	/**
	 * @protected
	 */
	_onPlay() {
		this._setPaused(false);
	}


	/**
	 * @protected
	 */
	_onPause() {
		this._setPaused(true);
	}


	/**
	 * @protected
	 */
	_onEnded() {
		this._setPaused(true);
	}


	/**
	 * @protected
	 */
	_onStop() {
		this._setPaused(true);
	}


	/**
	 * @protected
	 */
	_onRateChange() {
		this._setPaused(this._player.getPlaybackRate() !== 1);
	}


	/**
	 * @protected
	 */
	_onClick() {
		if (this._player) {
			this._player.togglePause();
		}
	}


	/**
	 * @param {boolean} isPaused
	 * @protected
	 */
	_setPaused(isPaused) {
		zb.html.updateClassName(this._container, '_play', isPaused);
		zb.html.updateClassName(this._container, '_pause', !isPaused);
	}
};


/**
 * @type {?zb.device.IVideo}
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._player;
