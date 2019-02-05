goog.provide('zb.ui.widgets.PlayerProgress');
goog.require('zb.device.IVideo');
goog.require('zb.html');
goog.require('zb.ui.widgets.templates.playerProgress.PlayerProgressOut');
goog.require('zb.ui.widgets.templates.playerProgress.playerProgress');
goog.require('zb.widgets.CuteWidget');


/**
 */
zb.ui.widgets.PlayerProgress = class extends zb.widgets.CuteWidget {
	/**
	 * @override
	 */
	constructor() {
		super();

		this._player = null;

		this._onTimeUpdate = this._onTimeUpdate.bind(this);
		this._onDurationChange = this._onDurationChange.bind(this);
	}

	/**
	 * @override
	 */
	isFocusable() {
		return false;
	}

	/**
	 * @param {?zb.device.IVideo} player
	 */
	setPlayer(player) {
		if (this._player) {
			this._unbindEvents();
		}

		this._player = player;
		this._reset();

		if (this._player) {
			this._bindEvents();
			this._updateProgress();
			this._updateDuration();
		}
	}

	/**
	 * @override
	 */
	_renderTemplate() {
		return zb.ui.widgets.templates.playerProgress.playerProgress(
			this._getTemplateData(),
			this._getTemplateOptions()
		);
	}

	/**
	 * @protected
	 */
	_bindEvents() {
		this._player.on(this._player.EVENT_TIME_UPDATE, this._onTimeUpdate);
		this._player.on(this._player.EVENT_DURATION_CHANGE, this._onDurationChange);
	}

	/**
	 * @protected
	 */
	_unbindEvents() {
		this._player.off(this._player.EVENT_TIME_UPDATE, this._onTimeUpdate);
		this._player.off(this._player.EVENT_DURATION_CHANGE, this._onDurationChange);
	}

	/**
	 * @protected
	 */
	_onTimeUpdate() {
		this._updateProgress();
	}

	/**
	 * @param {string} eventName
	 * @param {number} duration
	 * @protected
	 */
	_onDurationChange(eventName, duration) {
		this._setDuration(duration);
		this._updateProgress();
	}

	/**
	 * @protected
	 */
	_reset() {
		this._setCurrentTime(0);
		this._setDuration(0);
		this._setProgress(0);
	}

	/**
	 * @return {number}
	 * @protected
	 */
	_getPosition() {
		return this._player.getPosition();
	}

	/**
	 * @return {number}
	 * @protected
	 */
	_getDuration() {
		return this._player.getDuration();
	}

	/**
	 * @protected
	 */
	_updateProgress() {
		const position = this._getPosition();
		this._setCurrentTime(position);

		const duration = this._getDuration();
		const progress = duration ? (position / duration * 100) : position;
		this._setProgress(progress);
	}

	/**
	 * @param {number} currentTime in milliseconds
	 * @protected
	 */
	_setCurrentTime(currentTime) {
		const currentTimeStr = this._formatTime(currentTime);
		zb.html.text(this._exported.currentTime, currentTimeStr);
	}

	/**
	 * @param {number} duration in milliseconds
	 * @protected
	 */
	_setDuration(duration) {
		const durationStr = this._formatTime(duration);
		zb.html.text(this._exported.duration, durationStr);
	}

	/**
	 * @protected
	 */
	_updateDuration() {
		this._setDuration(this._getDuration());
	}

	/**
	 * @param {number} progress in percents
	 * @protected
	 */
	_setProgress(progress) {
		this._exported.progress.style.width = `${progress}%`;
	}

	/**
	 * @param {number} time in milliseconds
	 * @return {string}
	 * @protected
	 */
	_formatTime(time) {
		const timeInSeconds = Math.floor(time / 1000);

		const seconds = timeInSeconds % 60;
		const minutes = Math.floor(timeInSeconds / 60);
		const hours = Math.floor(minutes / 60);

		const padNumber = (num) => (num < 10 ? '0' : '') + num;

		const paddedSeconds = padNumber(seconds);
		const paddedMinutes = padNumber(minutes % 60);

		const parts = minutes < 60 ? [minutes, paddedSeconds] : [hours, paddedMinutes, paddedSeconds];

		return parts.join(':');
	}
};


/**
 * @type {zb.ui.widgets.templates.playerProgress.PlayerProgressOut}
 * @protected
 */
zb.ui.widgets.PlayerProgress.prototype._exported;


/**
 * @type {?zb.device.IVideo}
 * @protected
 */
zb.ui.widgets.PlayerProgress.prototype._player;
