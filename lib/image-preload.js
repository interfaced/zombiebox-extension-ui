/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.imagePreload');


/**
 * @param {Array.<string>} urlList
 * @return {IThenable.<Array.<string>>}
 */
zb.ui.imagePreload.array = function(urlList) {
	return new Promise(function(resolve, reject) {
		var counter = urlList.length;
		var errUrlList = urlList.slice();

		var checkForEnd = function() {
			if (counter) {
				return;
			}

			if (errUrlList.length) {
				reject(errUrlList);
			} else {
				resolve(urlList);
			}
		};

		var removeErrUrl = function(url) {
			var index = errUrlList.indexOf(url);
			errUrlList.splice(index, 1);
		};

		urlList.forEach(function(url) {
			zb.ui.imagePreload
				.one(url)
				.then(function() {
					counter--;
					removeErrUrl(url);
					checkForEnd();
				}, function() {
					counter--;
					checkForEnd();
				});
		});

		checkForEnd();
	});
};


/**
 * @param {string} url
 * @return {IThenable.<string>}
 */
zb.ui.imagePreload.one = function(url) {
	var image = new Image;
	image.src = url;

	return new Promise(function(resolve, reject) {
		if (image.complete) {
			resolve(url);
		} else {
			image.addEventListener('load', function() {
				resolve(url);
			});
			image.addEventListener('error', function() {
				reject(url);
			});
		}
	});
};
