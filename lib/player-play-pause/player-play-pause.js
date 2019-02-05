goog.provide('zb.ui.PlayerPlayPause');
goog.require('zb.device.IVideo');
goog.require('zb.html');
goog.require('zb.ui.Button');



/**
 * @inheritDoc
 * @extends {zb.ui.Button}
 * @constructor
 */
zb.ui.PlayerPlayPause = function(opt_container, opt_data) {
	goog.base(this, opt_container, opt_data);

	this._player = null;

	this._onPause = this._onPause.bind(this);
	this._onPlay = this._onPlay.bind(this);
	this._onEnded = this._onEnded.bind(this);
	this._onStop = this._onStop.bind(this);
	this._onRateChange = this._onRateChange.bind(this);

	this.onClick(this._onClick.bind(this));
};
goog.inherits(zb.ui.PlayerPlayPause, zb.ui.Button);


/**
 * @param {?zb.device.IVideo} player
 */
zb.ui.PlayerPlayPause.prototype.setPlayer = function(player) {
	if (this._player) {
		this._unbindEvents();
	}

	this._player = player;

	if (this._player) {
		this._bindEvents();
	}
};


/**
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._bindEvents = function() {
	this._player.on(this._player.EVENT_PLAY, this._onPlay);
	this._player.on(this._player.EVENT_PAUSE, this._onPause);
	this._player.on(this._player.EVENT_ENDED, this._onEnded);
	this._player.on(this._player.EVENT_STOP, this._onStop);
	this._player.on(this._player.EVENT_RATE_CHANGE, this._onRateChange);
};


/**
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._unbindEvents = function() {
	this._player.off(this._player.EVENT_PLAY, this._onPlay);
	this._player.off(this._player.EVENT_PAUSE, this._onPause);
	this._player.off(this._player.EVENT_ENDED, this._onEnded);
	this._player.off(this._player.EVENT_STOP, this._onStop);
	this._player.off(this._player.EVENT_RATE_CHANGE, this._onRateChange);
};


/**
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._onPlay = function() {
	this._setPaused(false);
};


/**
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._onPause = function() {
	this._setPaused(true);
};


/**
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._onEnded = function() {
	this._setPaused(true);
};


/**
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._onStop = function() {
	this._setPaused(true);
};


/**
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._onRateChange = function() {
	this._setPaused(this._player.getPlaybackRate() !== 1);
};


/**
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._onClick = function() {
	if (this._player) {
		this._player.togglePause();
	}
};


/**
 * @param {boolean} isPaused
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._setPaused = function(isPaused) {
	zb.html.updateClassName(this._container, '_play', isPaused);
	zb.html.updateClassName(this._container, '_pause', !isPaused);
};


/**
 * @type {?zb.device.IVideo}
 * @protected
 */
zb.ui.PlayerPlayPause.prototype._player;
