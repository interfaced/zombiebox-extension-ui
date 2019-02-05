goog.provide('zb.ui.imagePreload');


/**
 * @param {Array<string>} urlList
 * @param {number=} opt_timeout
 * @return {IThenable<Array<Image>>}
 */
zb.ui.imagePreload.array = (urlList, opt_timeout) => new Promise((resolve, reject) => {
	let counter = urlList.length;

	const loadedImages = [];
	const failedImages = [];

	const checkForEnd = () => {
		if (counter) {
			return;
		}

		if (failedImages.length) {
			reject(failedImages.filter(Boolean));
		} else {
			resolve(loadedImages.filter(Boolean));
		}
	};

	urlList.forEach((url, index) => {
		zb.ui.imagePreload.one(url, opt_timeout)
			.then((image) => {
				counter--;
				loadedImages[index] = image;
				checkForEnd();
			}, (image) => {
				counter--;
				failedImages[index] = image;
				checkForEnd();
			});
	});

	checkForEnd();
});


/**
 * @param {string} url
 * @param {number=} opt_timeout
 * @return {IThenable<Image>}
 */
zb.ui.imagePreload.one = (url, opt_timeout) => {
	const image = new Image();
	image.src = url;

	return new Promise((resolve, reject) => {
		if (image.complete) {
			resolve(image);
		} else {
			const onLoad = resolve.bind(null, image);
			const onError = reject.bind(null, image);

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
