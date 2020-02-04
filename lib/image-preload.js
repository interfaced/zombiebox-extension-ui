/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


/**
 * @param {Array<string>} urlList
 * @param {number=} timeout
 * @return {Promise<Array<Image>>}
 */
export const array = (urlList, timeout) => new Promise((resolve, reject) => {
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
		one(url, timeout)
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
 * @param {number=} timeout
 * @return {Promise<Image>}
 */
export const one = (url, timeout) => {
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

			if (typeof timeout === 'number') {
				setTimeout(() => {
					if (!image.complete) {
						image.removeEventListener('load', onLoad);
						image.removeEventListener('error', onError);

						onError();
					}
				}, Math.max(0, timeout));
			}
		}
	});
};
