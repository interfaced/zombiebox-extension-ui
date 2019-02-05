/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.widgets.VideoProgressBar');
goog.require('zb.device.IVideo');
goog.require('zb.ui.widgets.templates.videoProgressBar');
goog.require('zb.widgets.CuteWidget');



/**
 * @extends {zb.widgets.CuteWidget}
 * @constructor
 */
zb.ui.widgets.VideoProgressBar = function() {
	goog.base(this);

	this._reset();
	this._onVideoEvent = this._onVideoEvent.bind(this);
};
goog.inherits(zb.ui.widgets.VideoProgressBar, zb.widgets.CuteWidget);


/**
 * @param {zb.device.IVideo} video
 */
zb.ui.widgets.VideoProgressBar.prototype.setVideoObjectInstance = function(video) {
	this._reset();
	this._video = video;

	if (this._video) {
		this._video.on(this._video.EVENT_TIME_UPDATE, this._onVideoEvent);
		this._video.on(this._video.EVENT_DURATION_CHANGE, this._onVideoEvent);
		this._video.on(this._video.EVENT_ENDED, this._onVideoEvent);
	}
};


/**
 * @param {number} progress
 */
zb.ui.widgets.VideoProgressBar.prototype.setProgress = function(progress) {
	this._progress = progress || 0;
	this._exported.value.style.width = progress + '%';
};


/**
 * @param {number} time
 */
zb.ui.widgets.VideoProgressBar.prototype.setCurrentTime = function(time) {
	this._currentTime = time;
	zb.html.text(this._exported.currentTime, this._millisecondsToTimeString(this._currentTime));
};


/**
 * @param {number} time
 */
zb.ui.widgets.VideoProgressBar.prototype.setDuration = function(time) {
	this._duration = time || 0;
	zb.html.text(this._exported.duration, this._millisecondsToTimeString(this._duration));
};


/**
 * @inheritDoc
 */
zb.ui.widgets.VideoProgressBar.prototype._renderTemplate = function() {
	return zb.ui.widgets.templates.videoProgressBar(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * Handles user-controlled key event
 * @inheritDoc
 */
zb.ui.widgets.VideoProgressBar.prototype._processKey = function(zbKey, e) {
	return false;
};


/**
 * Reset state from previous media
 * @protected
 */
zb.ui.widgets.VideoProgressBar.prototype._reset = function() {
	if (this._video) {
		this._video.off(this._video.EVENT_TIME_UPDATE, this._onVideoEvent);
		this._video.off(this._video.EVENT_DURATION_CHANGE, this._onVideoEvent);
		this._video.off(this._video.EVENT_ENDED, this._onVideoEvent);
	}

	this._video = null;
	this._resetUI();
};


/**
 * Reset state from previous media
 * @protected
 */
zb.ui.widgets.VideoProgressBar.prototype._resetUI = function() {
	this.setDuration(0);
	this.setCurrentTime(0);
	this.setProgress(0);
};


/**
 * @param {number} num
 * @return {string}
 * @protected
 */
zb.ui.widgets.VideoProgressBar.prototype._addLeadingZeroIfNeeded = function(num) {
	return (num < 10 ? '0' : '') + num;
};


/**
 * @param {number} time
 * @return {string}
 * @protected
 */
zb.ui.widgets.VideoProgressBar.prototype._millisecondsToTimeString = function(time) {
	var seconds = Math.ceil(time / 1000);
	return this._addLeadingZeroIfNeeded(Math.floor(seconds / 3600)) + ':' +
		this._addLeadingZeroIfNeeded(Math.floor(seconds % 3600 / 60)) + ':' +
		this._addLeadingZeroIfNeeded(Math.floor(seconds % 60));
};


/**
 * @param {string} eventName
 * @param {*=} opt_data
 * @protected
 */
zb.ui.widgets.VideoProgressBar.prototype._onVideoEvent = function(eventName, opt_data) {
	if (!this._video) {
		this._resetUI();
		return;
	}

	switch (eventName) {
		case this._video.EVENT_TIME_UPDATE:
			var time = /** @type {number} */(opt_data);
			var progress = 0;
			this.setCurrentTime(time);
			if (this._duration) {
				progress = time / this._duration * 100;
			}
			this.setProgress(progress);
			break;
		case this._video.EVENT_DURATION_CHANGE:
			this.setDuration(/** @type {number} */(opt_data));
			break;
		case this._video.EVENT_ENDED:
			this._resetUI();
			break;
	}
};


/**
 * @type {zb.ui.widgets.templates.VideoProgressBarOut}
 * @protected
 */
zb.ui.widgets.VideoProgressBar.prototype._exported;


/**
 * @type {zb.device.IVideo}
 * @protected
 */
zb.ui.widgets.VideoProgressBar.prototype._video;


/**
 * @type {number}
 * @protected
 */
zb.ui.widgets.VideoProgressBar.prototype._duration;


/**
 * @type {number}
 * @protected
 */
zb.ui.widgets.VideoProgressBar.prototype._currentTime;


/**
 * @type {number}
 * @protected
 */
zb.ui.widgets.VideoProgressBar.prototype._progress;


/**
 * @deprecated Use own events, when inheriting.
 * @const {string}
 */
zb.ui.widgets.VideoProgressBar.prototype.EVENT_TIME_SELECTED = 'time-selected';
