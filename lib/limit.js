goog.provide('zb.ui.limit');


/**
 * @param {function()|function(...*)} targetFunction
 * @param {number} waitTime
 * @return {function()|function(...*)}
 */
zb.ui.limit.debounce = (targetFunction, waitTime) => {
	let timer = null;

	const debouncedFunction = function(...args) {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			timer = null;
			targetFunction(...args);
		}, waitTime);
	};

	debouncedFunction.cancel = () => {
		clearTimeout(timer);
		timer = null;
	};

	return debouncedFunction;
};


/**
 * @param {function()|function(...*)} targetFunction
 * @param {number} waitTime
 * @return {function()|function(...*)}
 */
zb.ui.limit.throttle = (targetFunction, waitTime) => {
	let lastEventTimestamp = null;

	return function(...args) {
		const now = Date.now();

		if (!lastEventTimestamp || now - lastEventTimestamp >= waitTime) {
			lastEventTimestamp = now;
			targetFunction(...args);
		}
	};
};
