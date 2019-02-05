goog.provide('zb.ui.imagePreload');


/**
 * @param {Array.<string>} urlList
 * @param {number=} opt_timeout
 * @return {IThenable.<Array.<string>>}
 */
zb.ui.imagePreload.array = (urlList, opt_timeout) => new Promise((resolve, reject) => {
	let counter = urlList.length;
	const errUrlList = urlList.slice();

	const checkForEnd = () => {
		if (counter) {
			return;
		}

		if (errUrlList.length) {
			reject(errUrlList);
		} else {
			resolve(urlList);
		}
	};

	const removeErrUrl = (url) => {
		const index = errUrlList.indexOf(url);
		errUrlList.splice(index, 1);
	};

	urlList.forEach((url) => {
		zb.ui.imagePreload
			.one(url, opt_timeout)
			.then(() => {
				counter--;
				removeErrUrl(url);
				checkForEnd();
			}, () => {
				counter--;
				checkForEnd();
			});
	});

	checkForEnd();
});


/**
 * @param {string} url
 * @param {number=} opt_timeout
 * @return {IThenable.<string>}
 */
zb.ui.imagePreload.one = (url, opt_timeout) => {
	const image = new Image();
	image.src = url;

	return new Promise((resolve, reject) => {
		if (image.complete) {
			resolve(url);
		} else {
			const onLoad = resolve.bind(null, url);
			const onError = reject.bind(null, url);

			image.addEventListener('load', onLoad);
			image.addEventListener('error', onError);

			if (typeof opt_timeout === 'number') {
				setTimeout(() => {
					if (!image.complete) {
						image.removeEventListener('load', onLoad);
						image.removeEventListener('error', onError);

						onError();
					}
				}, Math.max(0, opt_timeout));
			}
		}
	});
};
