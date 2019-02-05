goog.provide('zb.ui.PlayerProgress');
goog.require('zb.device.IVideo');
goog.require('zb.ui.templates.playerProgress.playerProgress');
goog.require('zb.widgets.CuteWidget');



/**
 * @extends {zb.widgets.CuteWidget}
 * @constructor
 */
zb.ui.PlayerProgress = function() {
	goog.base(this);

	this._player = null;

	this._onTimeUpdate = this._onTimeUpdate.bind(this);
	this._onDurationChange = this._onDurationChange.bind(this);
};
goog.inherits(zb.ui.PlayerProgress, zb.widgets.CuteWidget);


/**
 * @inheritDoc
 */
zb.ui.PlayerProgress.prototype.isFocusable = function() {
	return false;
};


/**
 * @param {?zb.device.IVideo} player
 */
zb.ui.PlayerProgress.prototype.setPlayer = function(player) {
	if (this._player) {
		this._unbindEvents();
	}

	this._player = player;
	this._reset();

	if (this._player) {
		this._bindEvents();
	}
};


/**
 * @inheritDoc
 */
zb.ui.PlayerProgress.prototype._renderTemplate = function() {
	return zb.ui.templates.playerProgress.playerProgress(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @protected
 */
zb.ui.PlayerProgress.prototype._bindEvents = function() {
	this._player.on(this._player.EVENT_TIME_UPDATE, this._onTimeUpdate);
	this._player.on(this._player.EVENT_DURATION_CHANGE, this._onDurationChange);
};


/**
 * @protected
 */
zb.ui.PlayerProgress.prototype._unbindEvents = function() {
	this._player.off(this._player.EVENT_TIME_UPDATE, this._onTimeUpdate);
	this._player.off(this._player.EVENT_DURATION_CHANGE, this._onDurationChange);
};


/**
 * @param {string} eventName
 * @param {number} currentTime
 * @protected
 */
zb.ui.PlayerProgress.prototype._onTimeUpdate = function(eventName, currentTime) {
	this._updateProgress();
};


/**
 * @param {string} eventName
 * @param {number} duration
 * @protected
 */
zb.ui.PlayerProgress.prototype._onDurationChange = function(eventName, duration) {
	this._setDuration(duration);
	this._updateProgress();
};


/**
 * @protected
 */
zb.ui.PlayerProgress.prototype._reset = function() {
	this._setCurrentTime(0);
	this._setDuration(0);
	this._setProgress(0);
};


/**
 * @return {number}
 * @protected
 */
zb.ui.PlayerProgress.prototype._getPosition = function() {
	return this._player.getPosition();
};


/**
 * @return {number}
 * @protected
 */
zb.ui.PlayerProgress.prototype._getDuration = function() {
	return this._player.getDuration();
};


/**
 * @protected
 */
zb.ui.PlayerProgress.prototype._updateProgress = function() {
	var position = this._getPosition();
	this._setCurrentTime(position);

	var duration = this._getDuration();
	var progress = duration ? (position / duration * 100) : position;
	this._setProgress(progress);
};


/**
 * @param {number} currentTime in milliseconds
 * @protected
 */
zb.ui.PlayerProgress.prototype._setCurrentTime = function(currentTime) {
	var currentTimeStr = this._formatTime(currentTime);
	zb.html.text(this._exported.currentTime, currentTimeStr);
};


/**
 * @param {number} duration in milliseconds
 * @protected
 */
zb.ui.PlayerProgress.prototype._setDuration = function(duration) {
	var durationStr = this._formatTime(duration);
	zb.html.text(this._exported.duration, durationStr);
};


/**
 * @param {number} progress in percents
 * @protected
 */
zb.ui.PlayerProgress.prototype._setProgress = function(progress) {
	this._exported.progress.style.width = progress + '%';
};


/**
 * @param {number} time in milliseconds
 * @return {string}
 * @protected
 */
zb.ui.PlayerProgress.prototype._formatTime = function(time) {
	var timeInSeconds = Math.floor(time / 1000);

	var seconds = timeInSeconds % 60;
	var minutes = Math.floor(timeInSeconds / 60);
	var hours = Math.floor(minutes / 60);

	var padNumber = function(num) {
		return (num < 10 ? '0' : '') + num;
	};

	var paddedSeconds = padNumber(seconds);
	var paddedMinutes = padNumber(minutes % 60);

	var parts = minutes < 60 ? [minutes, paddedSeconds] : [hours, paddedMinutes, paddedSeconds];

	return parts.join(':');
};


/**
 * @type {zb.ui.templates.playerProgress.PlayerProgressOut}
 * @protected
 */
zb.ui.PlayerProgress.prototype._exported;


/**
 * @type {?zb.device.IVideo}
 * @protected
 */
zb.ui.PlayerProgress.prototype._player;
