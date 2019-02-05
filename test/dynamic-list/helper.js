goog.provide('zb.ui.test.dynamicListHelper');


/**
 * @return {Array<string>}
 */
zb.ui.test.dynamicListHelper.createDefaultArray = () => [
	'A', 'B', 'C',
	'D', 'E', 'F',
	'G', 'H', 'I',
	'J', 'K', 'L',
	'M', 'N', 'O',
	'P', 'Q', 'R',
	'S', 'T', 'U',
	'V', 'W', 'X',
	'Y', 'Z'
];


/**
 * @return {Array<string>}
 */
zb.ui.test.dynamicListHelper.createEmptyArray = () => [];


/**
 * @param {number} from
 * @param {number} to
 * @return {Promise<Array<string>>}
 */
zb.ui.test.dynamicListHelper.loadNow = (from, to) => {
	const array = zb.ui.test.dynamicListHelper.createDefaultArray();
	return Promise.resolve(array.slice(from, to + 1));
};


/**
 * @param {number} from
 * @param {number} to
 * @return {Promise<Array<string>>}
 */
zb.ui.test.dynamicListHelper.loadLater = (from, to) => new Promise((resolve) => {
	setTimeout(() => {
		const array = zb.ui.test.dynamicListHelper.createDefaultArray();
		resolve(array.slice(from, to + 1));
	}, 500);
});


/**
 * @param {number} from
 * @param {number} to
 * @return {Promise<Array<string>>}
 */
zb.ui.test.dynamicListHelper.loadRandom = (from, to) => {
	if (Math.random() > 0.5) {
		return zb.ui.test.dynamicListHelper.loadNow(from, to);
	} else {
		return zb.ui.test.dynamicListHelper.loadLater(from, to);
	}
};


/**
 * @param {zb.ui.data.DynamicList} instance
 * @return {Promise}
 */
zb.ui.test.dynamicListHelper.waitForLoad = (instance) => {
	let callback;

	return (new Promise((resolve) => {
		callback = (eventName, query) => {
			query.then(resolve);
		};
		instance.on(instance.EVENT_LOADING_DATA, callback);

		setTimeout(resolve, 1000);
	}))
		.then(() => {
			instance.off(instance.EVENT_LOADING_DATA, callback);
		});
};
