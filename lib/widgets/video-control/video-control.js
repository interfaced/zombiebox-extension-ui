/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.widgets.VideoControl');
goog.require('zb.device.IVideo');
goog.require('zb.ui.widgets.templates.videoControl');
goog.require('zb.widgets.CuteWidget');



/**
 * @extends {zb.widgets.CuteWidget}
 * @param {zb.ui.widgets.templates.VideoControlIn} params
 * @constructor
 */
zb.ui.widgets.VideoControl = function(params) {
	this._activeElement = null;
	this._cssClassName = params.className || '';

	goog.base(this);

	this._video = null;
	this._onVideoEventBinded = this._onVideoEvent.bind(this);
	this._buttons = new zb.ui.DataList();
	this._buttons.on(this._buttons.EVENT_ITEM_SELECTED, this._onButtonSelected.bind(this));
	this.setControlMode(zb.ui.widgets.VideoControl.ControlMode.ALL);
};
goog.inherits(zb.ui.widgets.VideoControl, zb.widgets.CuteWidget);


/**
 * @param {zb.ui.widgets.VideoControl.ControlMode} mode
 */
zb.ui.widgets.VideoControl.prototype.setControlMode = function(mode) {
	this._buttons.clear();
	this._buttons.add(this._exported.btnPlayPause);

	if (mode & zb.ui.widgets.VideoControl.ControlMode.RATE) {
		this._buttons.addAt(this._exported.btnRewind, 0);
		this._buttons.addAt(this._exported.btnForward, this._buttons.size());
		zb.html.show(this._exported.btnRewind);
		zb.html.show(this._exported.btnForward);
	} else {
		zb.html.hide(this._exported.btnRewind);
		zb.html.hide(this._exported.btnForward);
	}

	this._buttons.select(this._exported.btnPlayPause);
};


/**
 * @param {zb.device.IVideo} video
 */
zb.ui.widgets.VideoControl.prototype.setVideoObjectInstance = function(video) {
	if (this._video) {
		this._video.off(this._video.EVENT_PAUSE, this._onVideoEventBinded);
		this._video.off(this._video.EVENT_PLAY, this._onVideoEventBinded);
		this._video.off(this._video.EVENT_ENDED, this._onVideoEventBinded);
		this._video.off(this._video.EVENT_RATE_CHANGE, this._onVideoEventBinded);
	}
	this._video = video;
	if (this._video) {
		this._video.on(this._video.EVENT_PAUSE, this._onVideoEventBinded);
		this._video.on(this._video.EVENT_PLAY, this._onVideoEventBinded);
		this._video.on(this._video.EVENT_ENDED, this._onVideoEventBinded);
		this._video.on(this._video.EVENT_RATE_CHANGE, this._onVideoEventBinded);
	}
};


/**
 * Adds focus class to an element and removes it from current active
 * @param {HTMLElement} element
 */
zb.ui.widgets.VideoControl.prototype.focusElement = function(element) {
	this.blurElement(this._activeElement);
	element.classList.add(this._focusClass);
	this._activeElement = element;
};


/**
 * Remove focus from an element
 * @param {HTMLElement} element
 */
zb.ui.widgets.VideoControl.prototype.blurElement = function(element) {
	if (element) {
		element.classList.remove(this._focusClass);
	}
};


/**
 * Handles user-controlled key event
 * @inheritDoc
 */
zb.ui.widgets.VideoControl.prototype._processKey = function(zbKey, e) {
	var keys = zb.device.input.Keys;
	switch (zbKey) {
		case keys.LEFT:
			return this._buttons.selectPrevItem();
			break;
		case keys.RIGHT:
			return this._buttons.selectNextItem();
			break;
		case keys.ENTER:
			this._onButtonClick();
			return true;
			break;
	}
	return false;
};


/**
 * @param {string} e
 * @param {HTMLElement} button
 * @private
 */
zb.ui.widgets.VideoControl.prototype._onButtonSelected = function(e, button) {
	if (button) {
		this.focusElement(button);
	}
};


/**
 * @param {string} eventName
 * @param {*=} opt_data
 * @private
 */
zb.ui.widgets.VideoControl.prototype._onVideoEvent = function(eventName, opt_data) {
	if (!this._video) {
		this._setPlayPauseButtonState(zb.ui.widgets.VideoControl.PlayPauseButtonState.PAUSE);
		return;
	}
	switch (eventName) {
		case this._video.EVENT_PAUSE:
			this._setPlayPauseButtonState(zb.ui.widgets.VideoControl.PlayPauseButtonState.PAUSE);
			break;
		case this._video.EVENT_PLAY:
			this._setPlayPauseButtonState(zb.ui.widgets.VideoControl.PlayPauseButtonState.PLAY);
			break;
		case this._video.EVENT_ENDED:
			this._setPlayPauseButtonState(zb.ui.widgets.VideoControl.PlayPauseButtonState.PAUSE);
			break;
		case this._video.EVENT_RATE_CHANGE:
			this._setPlayPauseButtonState(this._video.getPlaybackRate() != 1 ?
				zb.ui.widgets.VideoControl.PlayPauseButtonState.PAUSE :
				zb.ui.widgets.VideoControl.PlayPauseButtonState.PLAY);
			break;
		default:
			break;
	}
};


/** @protected */
zb.ui.widgets.VideoControl.prototype._onButtonClick = function() {
	var btn = this._buttons.current();
	switch (btn) {
		case this._exported.btnRewind:
			this._fireEvent(this.EVENT_REWIND_CLICK);
			break;
		case this._exported.btnPlayPause:
			this._fireEvent(this.EVENT_PLAY_PAUSE_CLICK);
			break;
		case this._exported.btnForward:
			this._fireEvent(this.EVENT_FORWARD_CLICK);
			break;
	}
};


/**
 * @param {zb.ui.widgets.VideoControl.PlayPauseButtonState} state
 * @protected
 */
zb.ui.widgets.VideoControl.prototype._setPlayPauseButtonState = function(state) {
	if (state === zb.ui.widgets.VideoControl.PlayPauseButtonState.PLAY) {
		this._exported.btnPlayPause.classList.remove('_pause');
		this._exported.btnPlayPause.classList.add('_play');
	} else {
		this._exported.btnPlayPause.classList.remove('_play');
		this._exported.btnPlayPause.classList.add('_pause');
	}
};


/**
 * @inheritDoc
 */
zb.ui.widgets.VideoControl.prototype._renderTemplate = function() {
	return zb.ui.widgets.templates.videoControl(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @inheritDoc
 * @return {{className: string}}
 */
zb.ui.widgets.VideoControl.prototype._getTemplateData = function() {
	return {
		className: this._cssClassName
	};
};


/**
 * @type {zb.ui.widgets.templates.VideoControlOut}
 * @protected
 */
zb.ui.widgets.VideoControl.prototype._exported;


/**
 * @type {zb.ui.DataList.<HTMLDivElement>}
 * @protected
 */
zb.ui.widgets.VideoControl.prototype._buttons;


/**
 * @type {zb.device.IVideo}
 * @protected
 */
zb.ui.widgets.VideoControl.prototype._video;


/**
 * @type {string}
 * @protected
 */
zb.ui.widgets.VideoControl.prototype._cssClassName;


/**
 * @type {function(string, *=)}
 * @protected
 */
zb.ui.widgets.VideoControl.prototype._onVideoEventBinded;


/**
 * Current active element inside widget if exists
 * @type {HTMLElement}
 * @protected
 */
zb.ui.widgets.VideoControl.prototype._activeElement;


/**
 * @const {string}
 */
zb.ui.widgets.VideoControl.prototype.EVENT_PLAY_PAUSE_CLICK = 'play-pause-click';


/**
 * @const {string}
 */
zb.ui.widgets.VideoControl.prototype.EVENT_FORWARD_CLICK = 'forward-click';


/**
 * @const {string}
 */
zb.ui.widgets.VideoControl.prototype.EVENT_REWIND_CLICK = 'rewind-click';


/**
 * @enum {number}
 */
zb.ui.widgets.VideoControl.PlayPauseButtonState = {
	PLAY: 0,
	PAUSE: 1
};


/**
 * @enum {number}
 */
zb.ui.widgets.VideoControl.ControlMode = {
	CHAPTERS: 1,
	RATE: 2,
	STOP: 4,
	ALL: 7,
	NO_STOP: 3,
	NO_RATE: 5,
	NO_CHAPTERS: 6
};
