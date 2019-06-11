import {updateClassName} from 'zb/html';
import IVideo, {State as IVideoState} from 'zb/device/interfaces/i-video';
import Button from '../button/button';


/**
 */
export default class PlayerPlayPause extends Button {
	/**
	 * @override
	 */
	constructor(opt_container, opt_data) {
		super(opt_container, opt_data);

		this._container.classList.add('w-zbui-player-play-pause');

		this.setPlayer(null);

		this._onPause = this._onPause.bind(this);
		this._onPlay = this._onPlay.bind(this);
		this._onEnded = this._onEnded.bind(this);
		this._onStop = this._onStop.bind(this);
		this._onRateChange = this._onRateChange.bind(this);

		this.onClick(this._onClick.bind(this));
	}

	/**
	 * @param {?IVideo} player
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
				case IVideoState.INITED:
				case IVideoState.PAUSED:
				case IVideoState.STOPPED:
				case IVideoState.SEEKING:
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
		updateClassName(this._container, '_play', isPaused);
		updateClassName(this._container, '_pause', !isPaused);
	}
}


/**
 * @type {?IVideo}
 * @protected
 */
PlayerPlayPause.prototype._player;
