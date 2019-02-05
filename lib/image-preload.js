goog.provide('zb.ui.imagePreload');


/**
 * @param {Array.<string>} urlList
 * @return {IThenable.<Array.<string>>}
 */
zb.ui.imagePreload.array = (urlList) => new Promise((resolve, reject) => {
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
			.one(url)
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
 * @return {IThenable.<string>}
 */
zb.ui.imagePreload.one = (url) => {
	const image = new Image();
	image.src = url;

	return new Promise((resolve, reject) => {
		if (image.complete) {
			resolve(url);
		} else {
			image.addEventListener('load', () => {
				resolve(url);
			});
			image.addEventListener('error', () => {
				reject(url);
			});
		}
	});
};
