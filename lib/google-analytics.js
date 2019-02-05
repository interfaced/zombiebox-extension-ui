/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.GoogleAnalytics');



/**
 * Google Universal Analytics wrapper.
 *
 * Note for platforms with app launched from file:// protocol. E.g. Samsung Smart TV.
 *      Google Google Universal Analytics script have check for http:// or https:// protocol and don't work with file://
 *      You need to download local copy of www.google-analytics.com/analytics.js, turn off protocol check (search for
 *      function Oa(){var a=M[B][E];if("http:"!=a&&"https:"!=a)throw"abort";}) and include modified copy through
 *      options.analyticsJS
 *
 * For docs see:
 *      https://developers.google.com/analytics/devguides/collection/analyticsjs/
 *      https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
 * @param {string} gaId
 * @param {zb.device.IDevice} device
 * @param {zb.ui.GoogleAnalytics.Options=} opt_options
 * @constructor
 */
zb.ui.GoogleAnalytics = function(gaId, device, opt_options) {
	this._options = {
		analyticsJS: opt_options.analyticsJS || '//www.google-analytics.com/analytics.js',
		clientId: opt_options.clientId || device.getMAC()
	};

	this._gaId = gaId;

	var gaFunctionName = 'ga';
	while (window.hasOwnProperty(gaFunctionName)) {
		gaFunctionName += '_';
	}
	this._gaFunctionName = gaFunctionName;

	this._loadGAScript();

	this._callGA('create', this._gaId, {
		'storage': 'none',
		'clientId': this._options.clientId
	});
	this._callGA('send', 'pageview');
};


/**
 * @param {string} page The page path and query string of the page (e.g. /homepage?id=10). This value must start with
 *      a / character.
 * @param {string=} opt_title
 */
zb.ui.GoogleAnalytics.prototype.sendPageview = function(page, opt_title) {
	this._callGA('send', 'pageview', {
		'page': page,
		'title': opt_title || document.title
	});
};


/**
 * @param {string} category
 * @param {string} action
 * @param {string|Object=} opt_label
 * @param {number|Object=} opt_value
 * @param {Object=} opt_options For more details see:
 *      https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
 */
zb.ui.GoogleAnalytics.prototype.sendEvent = function(category, action, opt_label, opt_value, opt_options) {
	if (opt_label instanceof Object) {
		opt_options = opt_label;
		opt_label = void 0;
	}
	if (opt_value instanceof Object) {
		opt_options = opt_value;
		opt_value = void 0;
	}
	var args = [
			'send',
			'event',
			category,
			action,
			opt_label,
			opt_value,
			opt_options
		]
		.filter(function(val) {
			return typeof val !== 'undefined';
		});
	this._callGA.apply(this, args);
};


/**
 * @param {string} category A string for categorizing all user timing variables into logical groups (e.g jQuery).
 * @param {string} varName A string to identify the variable being recorded. (e.g. JavaScript Load).
 * @param {number} varValue The number of milliseconds in elapsed time to report to Google Analytics. (e.g. 20)
 * @param {string|Object=} opt_label A string that can be used to add flexibility in visualizing user timings in
 *      the reports. (e.g. Google CDN)
 * @param {Object=} opt_options For more details see:
 *      https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
 */
zb.ui.GoogleAnalytics.prototype.sendTiming = function(category, varName, varValue, opt_label, opt_options) {
	if (opt_label instanceof Object) {
		opt_options = opt_label;
		opt_label = void 0;
	}
	var args = [
		'send',
		'timing',
		category,
		varName,
		varValue,
		opt_label,
		opt_options
	]
		.filter(function(val) {
			return typeof val !== 'undefined';
		});
	this._callGA.apply(this, args);
};


/**
 * @param {string} msg
 * @param {boolean=} opt_isFatal Default false
 */
zb.ui.GoogleAnalytics.prototype.sendException = function(msg, opt_isFatal) {
	zb.ui.GoogleAnalytics.prototype._callGA('send', 'exception', {
		'exDescription': msg,
		'exFatal': !!opt_isFatal
	});
};


/**
 * @protected
 */
zb.ui.GoogleAnalytics.prototype._loadGAScript = function() {

	var fakeDoc = {};
	for (var p in document) {
		fakeDoc[p] = p;
	}
	fakeDoc.domain = 'localhost';
	window['fakeDocument'] = fakeDoc;

	var gaKey = this._gaFunctionName;
	var scriptTagName = 'script';
	var doc = document;
	var win = window;
	win['GoogleAnalyticsObject'] = gaKey;
	win[gaKey] = win[gaKey] || function() {
		(win[gaKey]['q'] = win[gaKey]['q'] || []).push(arguments);
	};
	win[gaKey]['l'] = +(new Date);
	var a = doc.createElement(scriptTagName);
	var m = doc.getElementsByTagName(scriptTagName)[0];
	a['async'] = 1;
	a['src'] = this._options.analyticsJS;
	m.parentNode.insertBefore(a, m);
};


/**
 * @param {...*} var_args
 * @protected
 */
zb.ui.GoogleAnalytics.prototype._callGA = function(var_args) {
	var args = Array.prototype.slice.call(arguments);
	window[this._gaFunctionName].apply(window, args);
};


/**
 * @type {string}
 * @protected
 */
zb.ui.GoogleAnalytics.prototype._gaFunctionName;


/**
 * @type {string}
 * @protected
 */
zb.ui.GoogleAnalytics.prototype._gaId;


/**
 * @type {zb.ui.GoogleAnalytics.Options}
 * @protected
 */
zb.ui.GoogleAnalytics.prototype._options;


/**
 * @typedef {{
 *      analyticsJS: (string|undefined),
 *      clientId: (string|undefined)
 * }}
 */
zb.ui.GoogleAnalytics.Options;
