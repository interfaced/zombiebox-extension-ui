goog.provide('zb.ui.limit');


/**
 * @param {function(...*)} targetFunction
 * @param {number} waitTime
 * @return {function(...*)}
 */
zb.ui.limit.debounce = function(targetFunction, waitTime) {
	let timer = null;

	return function(...args) {
		function complete() {
			timer = null;
			targetFunction(...args);
		}

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(complete, waitTime);
	};
};


/**
 * @param {function(...*)} targetFunction
 * @param {number} waitTime
 * @return {function(...*)}
 */
zb.ui.limit.throttle = function(targetFunction, waitTime) {
	let lastEventTimestamp = null;

	return function(...args) {
		const now = Date.now();

		if (!lastEventTimestamp || now - lastEventTimestamp >= waitTime) {
			lastEventTimestamp = now;
			targetFunction(...args);
		}
	};
};
