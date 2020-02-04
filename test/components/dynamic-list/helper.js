import DynamicList from 'ui/data/dynamic-list';

/**
 * @return {Array<string>}
 */
export const createDefaultArray = () => [
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
export const createEmptyArray = () => [];


/**
 * @param {number} from
 * @param {number} to
 * @return {Promise<Array<string>>}
 */
export const loadNow = (from, to) => {
	const array = createDefaultArray();
	return Promise.resolve(array.slice(from, to + 1));
};


/**
 * @param {number} from
 * @param {number} to
 * @return {Promise<Array<string>>}
 */
export const loadLater = (from, to) => new Promise((resolve) => {
	setTimeout(() => {
		const array = createDefaultArray();
		resolve(array.slice(from, to + 1));
	}, 100);
});


/**
 * @param {number} from
 * @param {number} to
 * @return {Promise<Array<string>>}
 */
export const loadRandom = (from, to) => {
	if (Math.random() > 0.5) {
		return loadNow(from, to);
	}
	return loadLater(from, to);
};


/**
 * @param {DynamicList} instance
 * @return {Promise}
 */
export const waitForLoad = (instance) => {
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
