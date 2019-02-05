goog.provide('zb.ui.test.dynamicListHelper');



/**
 * @return {Array.<string>}
 */
zb.ui.test.dynamicListHelper.createDefaultArray = function() {
	return [
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
};


/**
 * @return {Array.<string>}
 */
zb.ui.test.dynamicListHelper.createEmptyArray = function() {
	return [];
};


/**
 * @param {number} from
 * @param {number} to
 * @return {Promise.<Array.<string>>}
 */
zb.ui.test.dynamicListHelper.loadNow = function(from, to) {
	var array = zb.ui.test.dynamicListHelper.createDefaultArray();
	return Promise.resolve(array.slice(from, to + 1));
};


/**
 * @param {number} from
 * @param {number} to
 * @return {Promise.<Array.<string>>}
 */
zb.ui.test.dynamicListHelper.loadLater = function(from, to) {
	return new Promise(function(resolve) {
		setTimeout(function() {
			var array = zb.ui.test.dynamicListHelper.createDefaultArray();
			resolve(array.slice(from, to + 1));
		}, 500);
	});
};


/**
 * @param {number} from
 * @param {number} to
 * @return {Promise.<Array.<string>>}
 */
zb.ui.test.dynamicListHelper.loadRandom = function(from, to) {
	if (Math.random() > 0.5) {
		return zb.ui.test.dynamicListHelper.loadNow(from, to);
	} else {
		return zb.ui.test.dynamicListHelper.loadLater(from, to);
	}
};


/**
 * @param {zb.ui.DynamicList} instance
 * @return {Promise}
 */
zb.ui.test.dynamicListHelper.waitForLoad = function(instance) {
	var callback;

	return (new Promise(function(resolve) {
			callback = function(eventName, query) {
				query.then(resolve);
			};
			instance.on(instance.EVENT_LOADING_DATA, callback);

			setTimeout(resolve, 1000);
		}))
		.then(function() {
			instance.off(instance.EVENT_LOADING_DATA, callback);
		});
};
