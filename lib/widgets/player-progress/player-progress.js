/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as template from 'generated/cutejs/ui/widgets/player-progress/player-progress.jst';
import AbstractCuteWidget from 'cutejs/widgets/abstract-widget';
import {text} from 'zb/html';
import IVideo from 'zb/device/interfaces/i-video';


/**
 */
export default class PlayerProgress extends AbstractCuteWidget {
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
	 * @param {?IVideo} player
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
		return template.render(
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
		text(this._exported.currentTime, currentTimeStr);
	}

	/**
	 * @param {number} duration in milliseconds
	 * @protected
	 */
	_setDuration(duration) {
		const durationStr = this._formatTime(duration);
		text(this._exported.duration, durationStr);
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
}


/**
 * @type {template.Out}
 * @protected
 */
PlayerProgress.prototype._exported;


/**
 * @type {?IVideo}
 * @protected
 */
PlayerProgress.prototype._player;
